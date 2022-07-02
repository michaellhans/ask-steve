import User from "../../models/user.js";

export const getUser = async (id) => {
  const user = await User.findOne({ id });
  return user;
};

export const saveUser = async ({ id, state }) => {
  const user = await User.findOneAndUpdate(
    { user: id },
    { state },
    { new: true, upsert: true }
  );
  return user;
};

export const saveUserName = async ({ id, state, name }) => {
  const user = await User.findOneAndUpdate(
    { user: id },
    { name, state },
    { new: true, upsert: true }
  );
  return user;
};

export const saveUserBirthDate = async ({ id, state, birthDate }) => {
  const user = await User.findOneAndUpdate(
    { user: id },
    { birthDate, state },
    { new: true, upsert: true }
  );
  return user;
};
