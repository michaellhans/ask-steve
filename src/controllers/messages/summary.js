import { getAllMessage } from "./function.js";
import { getAllUser } from "../users/function.js";

// Get the summary of all messages
export const summary = async (req, res, next) => {
  try {
    // Summary need all messages and users data
    const messages = await getAllMessage();
    const users = await getAllUser();

    const summary = [];
    for (const user of users){
        const entry = {
            "user": user.user,
            "name": user.name,
            "messages": messages.filter(message => message.user === user.user),
        };
        summary.push(entry);
    }

    res.send(summary);

  } catch (err) {
    return next(err);
  }
};