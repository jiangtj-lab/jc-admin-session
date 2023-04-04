import moment, { Moment } from 'moment';

export function parse(str: string) {
  return moment(str, 'YYYY-MM-DD HH:mm:ss').toDate();
}
export function format(date: Moment) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}
export function formatDate(date: Moment) {
  return moment(date).format('YYYY-MM-DD');
}
