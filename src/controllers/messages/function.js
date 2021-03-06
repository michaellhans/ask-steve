import Message from "../../models/message.js";

// Create new message
export const createMessage = async (response) => {
  const message = await Message.create(response);
  return message;
};

// Get all messages
export const getAllMessage = async () => {
  const message = await Message.find({}, {_id :0, __v:0}).sort({timestamp: 'desc'});
  return message;
}

// Get a single message by ID
export const getMessageByID = async (id) => {
  const message = await Message.findOne({id: id}, {_id :0, __v:0}).sort({timestamp: 'desc'});
  return message;
}

// Delete all messages retrieved by user ID (testing purpose)
export const deleteMessageByUser = async (id) => {
  await Message.deleteMany({user: id});
}