import dotenv from "dotenv";
import axios from "axios";
import state from "../../const/state.js";
import { answer, question, reply } from "../../const/conversation.js";
import { getUser, saveUser, saveUserBirthDate, saveUserName } from "../users/function.js";
import { nextBirthdayInDays } from "../../utils/birthday.js";
import { createMessage } from "../messages/function.js";

dotenv.config();

// Handles messages events
export async function handleMessage(sender_psid, received_message) {
    let result = '';
    let nextState = null;

  // Check if the message contains text
  if (received_message.text) {
    // Receive the bot state from the database
    // CAUTION: CHANGE THIS PART
    let userData = await getUser(sender_psid);
    const bot_state = userData ? userData.state : state.START;
    if (!userData) {
      userData = await saveUser({id: sender_psid, state})
    }

    console.log(received_message.text);
    console.log(bot_state);
    console.log(userData);

    if (bot_state == state.START) {
      result = question.OPENING;
      nextState = state.GOT_NAME;
      await saveUser({id: sender_psid, nextState})

    } else if (bot_state == state.GOT_NAME) {
      result = `${reply.GREETINGS} ${received_message.text} ${reply.GOT_NAME} ${question.ASK_BIRTH_DATE}`;
      nextState = state.GOT_BIRTH;
      // Update the name of the user
      await saveUserName({id: sender_psid, state: nextState, name: received_message.text})

    } else if (bot_state == state.GOT_BIRTH) {
      result = `${reply.GOT_DATE} ${received_message.text} ${question.ASK_PREDICT}`;
      nextState = state.GOT_RESPONSE;
      // Update user data with birth date
      await saveUserBirthDate({id: sender_psid, state: nextState, birthDate: received_message.text})

    } else if (bot_state == state.GOT_RESPONSE) {
      const normalizeText = received_message.text.toLowerCase();
      if (answer.POSITIVE.includes(normalizeText)) {
        const days = nextBirthdayInDays(userData.birthDate); 
        result = `${reply.GOT_RESPONSE} ${days} ${reply.DAYS}`;
        
      } else if (answer.NEGATIVE.includes(normalizeText)) {
        result = reply.GOODBYE;
        
      } else {
        result = reply.GOODBYE;
      }

      nextState = state.START;
      await saveUser({id: sender_psid, state: nextState});
    }
  }

  // Add the message into the database
  const response = {text: result};
  const cleanMessage = {
    "user": sender_psid,
    "message": response.text,
    "timestamp": Date(),
  }
  await createMessage(cleanMessage);

  // Sends the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
export async function handlePostback(sender_psid, received_postback) {
  // Get the payload for the postback
  let payload = received_postback.payload;
  let result = "";

  // Set the response based on the postback payload
  if (payload === "yes") {
    result = `${reply.GOT_RESPONSE} 2 ${reply.DAYS}`;
  } else if (payload === "no") {
    result = reply.GOODBYE;
  }
  
  // Send the message to acknowledge the postback
  // Add the message into the database
  const response = {text: result};
  const cleanMessage = {
    "user": sender_psid,
    "message": response.text,
    "timestamp": Date(),
  }
  await createMessage(cleanMessage);

  // Sends the response message
  callSendAPI(sender_psid, response);
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
