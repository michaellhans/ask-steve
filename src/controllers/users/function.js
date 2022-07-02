import User from "../../models/user.js";

// Get all users data from the database
export const getAllUser = async () => {
  const user = await User.find();
  return user;
}

// Get specific user with certain ID from the database
export const getUser = async (id) => {
  const user = await User.findOne({ user: id });
  return user;
};

// Insert user data or update existing user state
export const saveUser = async ({ id, state }) => {
  const user = await User.findOneAndUpdate(
    { user: id },
    { state },
    { new: true, upsert: true }
  );
  return user;
};

// Update the name of the existing user data
export const saveUserName = async ({ id, state, name }) => {
  const user = await User.findOneAndUpdate(
    { user: id },
    { name, state },
    { new: true }
  );
  return user;
};

// Update the birth date of the existing user data
export const saveUserBirthDate = async ({ id, state, birthDate }) => {
  const user = await User.findOneAndUpdate(
    { user: id },
    { birthDate, state },
    { new: true }
  );
  return user;
};

// Delete user from the database (testing purpose)
export const deleteUser = async (id) => {
  await User.deleteMany({user: id});
}
