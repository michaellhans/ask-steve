import dotenv from "dotenv";
import axios from "axios";
import state from "../../const/state.js";
import { answer, question, reply } from "../../const/conversation.js";
import {
  getUser,
  saveUser,
  saveUserBirthDate,
  saveUserName,
} from "../users/function.js";
import { birthDateText, isBirthDayToday, isValidDate, nextBirthdayInDays } from "../../utils/birthday.js";
import { createMessage } from "../messages/function.js";

dotenv.config();

// Handles messages events
export async function handleMessage(sender_psid, received_message) {
  let result = "";
  let nextState = null;

  // Check if the message contains text
  if (received_message.text) {
    // Receive the bot state from the database
    // CAUTION: CHANGE THIS PART
    let userData = await getUser(sender_psid);
    let bot_state = state.START;
    if (!userData) {
      userData = await saveUser({ id: sender_psid, state: bot_state });
    } else {
      bot_state = userData.state;
    }

    console.log(received_message.text);
    console.log(bot_state);
    console.log(userData);

    // Add the message into the database
    const cleanMessage = {
      id: received_message.mid,
      user: sender_psid,
      message: received_message.text,
      timestamp: Date(),
    };
    await createMessage(cleanMessage);

    if (bot_state == state.START) {
      result = question.OPENING;
      nextState = state.GOT_NAME;
      await saveUser({ id: sender_psid, state: nextState });

    } else if (bot_state == state.GOT_NAME) {
      result = `${reply.GREETINGS} ${received_message.text} ${reply.GOT_NAME} ${question.ASK_BIRTH_DATE}`;
      nextState = state.GOT_BIRTH;
      // Update the name of the user
      await saveUserName({
        id: sender_psid,
        state: nextState,
        name: received_message.text,
      });

    } else if (bot_state == state.GOT_BIRTH) {
      if (isValidDate(received_message.text)){
        result = `${reply.GOT_DATE} ${birthDateText(received_message.text)} ${
          question.ASK_PREDICT
        }`;
        nextState = state.GOT_RESPONSE;
        // Update user data with birth date
        await saveUserBirthDate({
          id: sender_psid,
          state: nextState,
          birthDate: received_message.text,
        });

      } else {
        result = reply.INVALID_DATE;
      }

    } else if (bot_state == state.GOT_RESPONSE) {
      const normalizeText = received_message.text.toLowerCase();
      if (answer.POSITIVE.includes(normalizeText)) {
        if (isBirthDayToday(userData.birthDate)){
          result = reply.BIRTHDAY;

        } else {
          const days = nextBirthdayInDays(userData.birthDate);
          result = `${reply.GOT_RESPONSE} ${days} ${reply.DAYS}`;
        }
        nextState = state.START;

      } else if (answer.NEGATIVE.includes(normalizeText)) {
        result = reply.GOODBYE;
        nextState = state.START;

      } else {
        result = reply.INVALID_ANSWER;
      }
      await saveUser({ id: sender_psid, state: nextState });
    }
  }

  // Sends the response message
  if (nextState == state.GOT_RESPONSE){
    const quickReplies = [];
    answer.QUICK_REPLY.forEach((quickReply) => {
      quickReplies.push({
        content_type: 'text',
        title: quickReply,
        payload: quickReply,
      });
    });
    const response = { text: result, quick_replies: answer.QUICK_REPLY };
    callSendAPI(sender_psid, response);

  } else {
    const response = { text: result};
    callSendAPI(sender_psid, response);
  }
}

// Sends response messages via the Send API
async function callSendAPI(sender_psid, response) {
  // Send the HTTP request to the Messenger Platform
  const body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };
  const url = `${process.env.GRAPH_URL}?access_token=${process.env.ACCESS_TOKEN}`;
  await axios.post(url, body);
}
