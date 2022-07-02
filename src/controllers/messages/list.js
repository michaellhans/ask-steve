import { getAllMessage } from "./function.js";

// Get all messages
export const list = async (req, res, next) => {
  try {
    const messages = await getAllMessage();
    res.send(messages);

  } catch (err) {
    return next(err);
  }
};