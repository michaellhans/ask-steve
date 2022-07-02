import 'mocha';
import { app } from '../../../src/index.js';
import { expect } from 'chai';
import { agent as request } from 'supertest';
import { deleteMessageByUser } from '../../controllers/messages/function.js';
import { saveUser, deleteUser } from '../../controllers/users/function.js';
import connectDB from '../../database/index.js';
import dotenv from 'dotenv';

dotenv.config();

describe('INTEGRATION REST API Testing', () => {
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

  it('POST /messages/create should return the created message', async () => {
    const res = await request(app).post(`/messages/create`).send(newMessage);
    expect(res.status).to.equal(200);
    expect(res.body.id).to.equals(newMessage.id);
    expect(res.body.user).to.equals(newMessage.user);
    expect(res.body.message).to.equals(newMessage.message);
    expect(res.body).to.have.property('timestamp');
  });

  it('GET /messages should return all messages', async () => {
    const res = await request(app).get(`/messages/`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('GET /messages/:id should return a single message with ID', async () => {
    const res = await request(app).get(`/messages/${newMessage.id}`);
    expect(res.status).to.equal(200);
    expect(res.body.id).to.equals(newMessage.id);
    expect(res.body.user).to.equals(newMessage.user);
    expect(res.body.message).to.equals(newMessage.message);
    expect(res.body).to.have.property('timestamp');
  });

  it('GET /summary should return summary of all messages', async () => {
    const res = await request(app).get(`/summary`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].messages).to.be.an('array');
  });
});
