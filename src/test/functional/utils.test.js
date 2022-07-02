import 'mocha';
import { expect } from 'chai';
import {
  hasBirthDayPassed,
  isBirthDayToday,
  isValidDate,
  nextBirthdayInDays,
} from '../../utils/birthday.js';

describe('FUNCTIONAL Utils Testing', () => {
  
  it('should return that the birthday has passed', () => {
    const date = new Date(2022, 1, 1);
    const hasPassed = hasBirthDayPassed(date);
    expect(hasPassed).to.equal(true);
  });

  it('should return that the birthday has not passed', () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    const hasPassed = hasBirthDayPassed(date);
    expect(hasPassed).to.equal(false);
  });

  it('should return that today is the birthday', () => {
    const date = new Date();
    const isToday = isBirthDayToday(date);
    expect(isToday).to.equal(true);
  });

  it('should return that tomorrow is not the birthday', () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const isToday = isBirthDayToday(date);
    expect(isToday).to.equal(false);
  });

  it('should return that the next birthday is 100 days', () => {
    const date = new Date();
    date.setDate(date.getDate() + 100);
    const nextBirthDay = nextBirthdayInDays(date);
    expect(nextBirthDay).to.equal(100);
  });

  it('should return that the date is valid', () => {
    const validDate = isValidDate('1999-20-11');
    expect(validDate).to.equal(true);
  });

  it('should return that the date is invalid', () => {
    const validDate = isValidDate('19999-20-112');
    expect(validDate).to.equal(false);
  });
});
