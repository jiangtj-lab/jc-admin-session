import moment from 'moment';

export function parse(str) {
  return moment(str, 'YYYY-MM-DD HH:mm:ss').toDate();
}
export function format(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}
export function formatDate(date) {
  return moment(date).format('YYYY-MM-DD');
}
