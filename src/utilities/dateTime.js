//* dateTime.js

import moment from 'moment';

const parseDate = timestamp => {
  if (!timestamp) return null;

  // Firebase Timestamp
  if (timestamp?.toDate) {
    return moment(timestamp.toDate());
  }

  // ISO String
  if (typeof timestamp === 'string') {
    return moment(timestamp);
  }

  // Native Date
  if (timestamp instanceof Date) {
    return moment(timestamp);
  }

  return null;
};

export const getToday = () => {
  return moment(new Date()).format();
};

export const rawDateTime = timestamp => {
  const date = parseDate(timestamp);

  if (!date || !date.isValid()) return null;

  return date.format();
};

export const dateTimeStringDate = timestamp => {
  const date = parseDate(timestamp);

  if (!date || !date.isValid()) return null;

  return date.format('MMDDYYYY');
};

export const dateTimeStringTime = timestamp => {
  const date = parseDate(timestamp);

  if (!date || !date.isValid()) return null;

  return date.format('HHmmss');
};

export const dateTimeStringMDYT = timestamp => {
  const date = parseDate(timestamp);

  if (!date || !date.isValid()) return null;

  return date.format('MMDDYYYYYTHHmmss');
};

export const dateTimeDisplay = timestamp => {
  const date = parseDate(timestamp);

  if (!date || !date.isValid()) return null;

  return date.format('MM-DD-YYYY HH:mm:ss');
};

export const dateDisplay = timestamp => {
  const date = parseDate(timestamp);

  if (!date || !date.isValid()) return null;

  return date.format('MM-DD-YYYY');
};

export const timeDisplay = timestamp => {
  const date = parseDate(timestamp);

  if (!date || !date.isValid()) return null;

  return date.format('HH:mm:ss');
};
