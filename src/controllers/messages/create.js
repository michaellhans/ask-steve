import { createMessage } from "./function.js";

// Create new message and store it into database
export const create = async (req, res, next) => {
  try {
    const message = await createMessage(req.body);
    res.send(message);

  } catch (err) {
    return next(err);
  }
};