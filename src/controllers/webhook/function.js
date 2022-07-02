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

// Sends response messages to the facebook server
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

// Handle received message from the user and return the chatbot response
export async function handleMessage(sender_psid, received_message) {
  let result = "";
  let nextState = null;

  // Check if the message contains text
  if (received_message.text) {
    // Receive the bot state from the database
    let userData = await getUser(sender_psid);
    let bot_state = state.START;

    // If the user is not available in the database, create new one
    if (!userData) {
      userData = await saveUser({ id: sender_psid, state: bot_state });
    } else {
      bot_state = userData.state;
    }

    // Insert the user message into the database
    const cleanMessage = {
      id: received_message.mid,
      user: sender_psid,
      message: received_message.text,
      timestamp: Date(),
    };
    await createMessage(cleanMessage);

    // CHATBOT RESPONSE based on the saved state
    // STATE 0: START / OPENING
    if (bot_state == state.START) {
      result = question.OPENING;
      nextState = state.GOT_NAME;
      await saveUser({ id: sender_psid, state: nextState });

    // STATE 1: GOT NAME FROM USER
    } else if (bot_state == state.GOT_NAME) {
      result = `${reply.GREETINGS} ${received_message.text} ${reply.GOT_NAME} ${question.ASK_BIRTH_DATE}`;
      nextState = state.GOT_BIRTH;
      // Update the name of the user
      await saveUserName({
        id: sender_psid,
        state: nextState,
        name: received_message.text,
      });

    // STATE 2: GOT BIRTH FROM USER
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

      // If the date is invalid, give invalid response to user and the state still remain
      } else {
        result = reply.INVALID_DATE;
      }

    // STATE 3: GOT FINAL RESPONSE FROM THE USER
    } else if (bot_state == state.GOT_RESPONSE) {
      const normalizeText = received_message.text.toLowerCase();
      // Positive answer from the user
      if (answer.POSITIVE.includes(normalizeText)) {
        if (isBirthDayToday(userData.birthDate)){
          result = reply.BIRTHDAY;

        } else {
          const days = nextBirthdayInDays(userData.birthDate);
          result = `${reply.GOT_RESPONSE} ${days} ${reply.DAYS}`;
        }
        nextState = state.START;
        await saveUser({ id: sender_psid, state: nextState });

      // Negative answer from the user
      } else if (answer.NEGATIVE.includes(normalizeText)) {
        result = reply.GOODBYE;
        nextState = state.START;
        await saveUser({ id: sender_psid, state: nextState });

      // Invalid answer from the user, give the invalid answer response and the state still remains
      } else {
        result = reply.INVALID_ANSWER;
      }
    }
  }

  // Sends the chatbot response to the server

  // QUICK REPLY OPTIONS only in GOT RESPONSE STATE
  if (nextState == state.GOT_RESPONSE){
    const quickReplies = [];
    answer.QUICK_REPLY.forEach((quickReply) => {
      quickReplies.push({
        content_type: 'text',
        title: quickReply,
        payload: quickReply,
      });
    });
    const response = { text: result, quick_replies: quickReplies };
    callSendAPI(sender_psid, response);

  // NO QUICK REPLY, just regular chatbot response
  } else {
    const response = { text: result};
    callSendAPI(sender_psid, response);
  }
}
