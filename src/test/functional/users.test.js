import 'mocha';
import { expect } from 'chai';
import { getAllUser, getUser, saveUser, saveUserBirthDate, saveUserName, deleteUser } from '../../controllers/users/function.js';
import connectDB from '../../database/index.js';
import dotenv from 'dotenv';

dotenv.config();

describe('FUNCTIONAL User Model Testing', () => {
  const newUser = {
    "user": "4092923183",
    "name": "Michael",
    "birthDate": "2002-08-11",
    "state": 0,
  };

  before(async () => {
    await connectDB();
  })

  after(async () => {
    await deleteUser(newUser.user);
  });

  it('should return that the user created successfully', async () => {
    const user = await saveUser({id: newUser.user, state: newUser.state})
    expect(user.user).to.equals(newUser.user);
    expect(user.state).to.equals(newUser.state);
  });

  it('should return the list of users', async () => {
    const user = await getAllUser();
    expect(user).to.be.an('array');
  });

  it('should return the specific user', async () => {
    const user = await getUser(newUser.user);
    expect(user.user).to.equals(newUser.user);
    expect(user.state).to.equals(newUser.state);
  });

  it('should return the updated user on name', async () => {
    const user = await saveUserName({id: newUser.user, state: 2, name: newUser.name})
    expect(user.user).to.equals(newUser.user);
    expect(user.state).to.equals(2);
    expect(user.name).to.equals(newUser.name);
  });

  it('should return the updated user on birthdate', async () => {
    const user = await saveUserBirthDate({id: newUser.user, state: 3, birthDate: newUser.birthDate})
    expect(user.user).to.equals(newUser.user);
    expect(user.state).to.equals(3);
    expect(user.birthDate.toLocaleDateString('en-CA'),).to.equals(newUser.birthDate);
  });

});
