import Message from "../../models/message.js";

// Show all messages from user with certain id
export const show = async (req, res, next) => {
  const user_id = req.params.id;

  try {
    const messages = await Message.find({id: user_id}).sort({timestamp: 'desc'});
    res.send(messages);
;
  } catch (err) {
    console.log(err);
    return next(err);
  }
};