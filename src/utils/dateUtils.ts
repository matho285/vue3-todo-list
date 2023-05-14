import { format, parseISO } from 'date-fns';

export const DATE_FORMAT = 'dd.MM.yyyy';
export const formatDate = (date: string) => format(parseISO(date), DATE_FORMAT);
