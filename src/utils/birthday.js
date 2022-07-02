export const isBirthDayToday = (birthDate) => {
  const today = new Date();
  return (
    birthDate.getMonth() === today.getMonth() &&
    birthDate.getDate() === today.getDate()
  );
};

export const hasBirthDayPassed = (birthDate) => {
  const today = new Date();
  const birthDateTemp = new Date(birthDate);
  birthDateTemp.setFullYear(today.getFullYear());
  return birthDateTemp.getTime() < today.getTime();
};

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

export const birthDateText = (birthDate) => {
  return birthDate.toLocaleDateString();
};

export const isValidDate = (birthDate) => {
  return birthDate.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
};