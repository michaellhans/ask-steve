import 'mocha';
import { expect } from 'chai';
import { createMessage, getAllMessage, getMessageByUser, deleteMessageByUser } from '../../controllers/messages/function.js';
import { summary } from '../../controllers/messages/summary.js';
import connectDB from '../../database/index.js';
import dotenv from 'dotenv';
import { saveUser, deleteUser } from '../../controllers/users/function.js';

dotenv.config();

describe('FUNCTIONAL Message Model Testing', () => {
  const newUser = {
    "user": "4092923183",
    "name": "Michael",
    "birthDate": "2002-08-11",
    "state": 0,
  };

  const newMessage = {
    "id": "1IF1234",
    "user": newUser.user,
    "message": "Hello Shadow",
    "timestamp": "2022-01-19 03:14:07", 
}

  before(async () => {
    await connectDB();
    await saveUser({id: newUser.user, state: newUser.state});
  })

  after(async () => {
    await deleteMessageByUser(newUser.user);
    await deleteUser(newUser.user);
  });

  it('should return the created message', async () => {
    const message = await createMessage(newMessage);
    expect(message.id).to.equals(newMessage.id);
    expect(message.user).to.equals(newMessage.user);
    expect(message.message).to.equals(newMessage.message);
    expect(message).to.have.property('timestamp');
  });

  it('should return all messages', async () => {
    const message = await getAllMessage();
    expect(message).to.be.an('array');
  });

  it('should return all messages related to user', async () => {
    const message = await getMessageByUser(newUser.user);
    expect(message).to.be.an('array');
    expect(message[0].user).to.equals(newUser.user);
  });
});
