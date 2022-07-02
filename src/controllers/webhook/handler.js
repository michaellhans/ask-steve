import dotenv from "dotenv";
import { request } from "express";
import state from "../../const/state.js";
import { answer, question, reply } from "../../const/conversation.js";

dotenv.config();

// Handles messages events
export function handleMessage(sender_psid, received_message) {
    // Receive the bot state from the database
    // CAUTION: CHANGE THIS PART
    const bot_state = state.START;
    let result = '';

  // Check if the message contains text
  if (received_message.text) {
    console.log(received_message.text);
    console.log(bot_state);

    if (bot_state == state.START) {
      result = question.OPENING;

    } else if (bot_state == state.GOT_NAME) {
      result = `${reply.GREETINGS} ${received_message.text} ${reply.GOT_NAME} ${question.ASK_BIRTH_DATE}`;

    } else if (bot_state == state.GOT_BIRTH) {
      result = `${reply.GOT_DATE} ${received_message.text} ${question.ASK_PREDICT}`;

    } else if (bot_state == state.GOT_RESPONSE) {
      const normalizeText = received_message.text.toLowerCase();
      if (answer.POSITIVE.includes(normalizeText)) {
        result = reply.GOT_RESPONSE + "2" + reply.DAYS;

      } else if (answer.NEGATIVE.includes(normalizeText)) {
        result = reply.GOODBYE;

      } else {
        result = reply.GOODBYE;
      }
    }
  }

  // Sends the response message
  const response = {text: result};
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
export function handlePostback(sender_psid, received_postback) {
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
  // Sends the response message
  const response = {text: result};
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: process.env.FB_PAGE_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );

  let mongoData = {
    id: 3,
    sender_id: sender_psid,
    message: response.text,
    timestamp: Date(),
  };

  request(
    {
      uri: "https://ask-steve-messenger.herokuapp.com/",
      method: "POST",
      json: mongoData,
    },
    (err, res, body) => {
      if (!err) {
        console.log("Message archived!");
      } else {
        console.error("Unable to archive message" + err);
      }
    }
  );

  bot_state = (bot_state + 1) % 4;
}
