import Message from "../../models/message.js";

export const createMessage = async (response) => {
  const message = await Message.create(response);
  return message;
};

export const getAllMessage = async () => {
  const message = await Message.find().sort({timestamp: 'desc'});
  return message;
}

export const getMessageByUser = async (id) => {
  const message = await Message.find({user: id}).sort({timestamp: 'desc'});
  return message;
} 