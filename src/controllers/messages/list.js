import Message from "../../models/message.js";
import { getAllMessage } from "./function.js";

// Get all messages
export const list = async (req, res, next) => {
  try {
    const messages = await getAllMessage();
    res.send(messages);

  } catch (err) {
    console.log(err);
    return next(err);
  }
};