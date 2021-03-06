import { handleMessage } from "./function.js";

// Post Webhook
export const postWebhook = async (req, res, next) => {
  // Parse the request body from the POST
    let body = req.body;

  try {
    // Check the webhook event is from a Page subscription
    if (body.object === "page") {
      // Iterate over each entry - there may be multiple if batched
      for (const entry of body.entry) {
        // Gets the body of the webhook event
        let webhook_event = entry.messaging[0];

        // Get the sender PSID
        let sender_psid = webhook_event.sender.id;

        await handleMessage(sender_psid, webhook_event.message);
      };

      // Return a '200 OK' response to all events
      res.status(200).send("EVENT_RECEIVED");
    } else {
      // Return a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
