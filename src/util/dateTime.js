import moment from 'moment-timezone';
import {getTimeZone} from 'react-native-localize';

const getLocalDateTime = (dateTime) => {
  return moment(dateTime).tz(getTimeZone()).format('yyyy-MM-DD h:mm A');
};

export {getLocalDateTime};
