// Utils for birthday calculation

// Check if today is the birthday
export const isBirthDayToday = (birthDate) => {
  const today = new Date();
  const birthDateTemp = new Date(birthDate);
  return (
    birthDateTemp.getMonth() === today.getMonth() &&
    birthDateTemp.getDate() === today.getDate()
  );
};

// Check if the birthday in this year has passed
export const hasBirthDayPassed = (birthDate) => {
  const today = new Date();
  const birthDateTemp = new Date(birthDate);
  birthDateTemp.setFullYear(today.getFullYear());
  return birthDateTemp.getTime() < today.getTime();
};

// Calculate how many days into the next birthday
export const nextBirthdayInDays = (birthDate) => {
  const today = new Date();
  const nextBirthDate = new Date(birthDate);

  if (hasBirthDayPassed(birthDate)) {
    nextBirthDate.setFullYear(today.getFullYear() + 1);
  } else {
    nextBirthDate.setFullYear(today.getFullYear());
  }

  const difference = nextBirthDate.getTime() - today.getTime();
  const millisecondsInADay = 24 * 3600 * 1000;
  return Math.ceil(difference / millisecondsInADay);
};

// Convert from Date into String
export const birthDateText = (birthDate) => {
  return new Date(birthDate).toLocaleDateString();
};

// Check if the date text is valid
export const isValidDate = (birthDate) => {
  return birthDate.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
};