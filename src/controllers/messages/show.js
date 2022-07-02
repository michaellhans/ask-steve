import { getMessageByID } from "./function.js";

// Show all messages from user with certain id
export const show = async (req, res, next) => {
  const user_id = req.params.id;

  try {
    const messages = await getMessageByID(user_id);
    res.send(messages);
;
  } catch (err) {
    return next(err);
  }
};