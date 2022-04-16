import moment from 'moment-timezone';
import {getTimeZone} from 'react-native-localize';

const getLocalDateTime = (dateTime?: string): string => {
  return moment(dateTime).tz(getTimeZone()).format('yyyy-MM-DD h:mm A');
};

const prettyPrintTime = (dateTime: string): string => {
  const currentTime = moment().tz(getTimeZone());
  const timestamp = moment(dateTime).tz(getTimeZone());
  const minutesDiff = currentTime.diff(timestamp, 'minutes');
  const hoursDiff = currentTime.diff(timestamp, 'hours');
  const daysDiff = currentTime.diff(timestamp, 'days');
  const weeksDiff = currentTime.diff(timestamp, 'weeks');
  const monthsDiff = currentTime.diff(timestamp, 'months');

  if (currentTime.diff(timestamp, 'minutes') < 1) {
    return 'now';
  }
  if (hoursDiff < 1) {
    return minutesDiff === 1 ? '1 min' : `${minutesDiff} mins`;
  }
  if (daysDiff < 1) {
    return hoursDiff === 1 ? '1 hr' : `${hoursDiff} hrs`;
  }
  if (weeksDiff < 1) {
    return daysDiff === 1
      ? `Yesterday at ${timestamp.format('h:mm A')}`
      : `${timestamp.format('dddd')} at ${timestamp.format('h:mm A')}`;
  }
  if (weeksDiff <= 2) {
    return `${timestamp.format('MMMM D')} at ${timestamp.format('h:mm A')}`;
  }
  if (monthsDiff <= 6) {
    return timestamp.format('MMMM D');
  }
  return timestamp.format('MMMM D, YYYY');
};

export {getLocalDateTime, prettyPrintTime};
