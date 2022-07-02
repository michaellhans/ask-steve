import Message from "../../models/message.js";

// Get all messages
export const list = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({timestamp: 'desc'});
    res.send(messages);

  } catch (err) {
    console.log(err);
    return next(err);
  }
};