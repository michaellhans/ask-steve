import { getAllMessage } from "./function.js";
import { getAllUser } from "../users/function.js";

// Get all messages
export const summary = async (req, res, next) => {
  try {
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
    console.log(err);
    return next(err);
  }
};