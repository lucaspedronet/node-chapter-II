import { formatISO, differenceInHours } from 'date-fns';

import { IDateProvider } from '../Interfaces/IDateProvider';

class DateFnsProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const compareDifferenceHours = differenceInHours(
      new Date(end_date),
      new Date(start_date)
    );

    return compareDifferenceHours;
  }
  convertToUTC(date: Date): Date {
    const dateUTC = new Date(formatISO(date));
    return dateUTC;
  }
}

export { DateFnsProvider };
