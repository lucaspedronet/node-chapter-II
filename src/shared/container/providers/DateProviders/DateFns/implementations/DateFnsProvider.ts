import { differenceInHours, parseISO } from 'date-fns';

import { IDateProvider } from '../Interfaces/IDateProvider';

class DateFnsProvider implements IDateProvider {
  public compareInHours(dateLeft: Date, dateRight: Date): number {
    const compareDifferenceHours = differenceInHours(
      this.convertToUTC(dateLeft),
      this.convertToUTC(dateRight)
    );

    // console.log('compareDifferenceHours', compareDifferenceHours);

    return compareDifferenceHours;
  }

  public convertToUTC(date: Date): Date {
    const dateUTC = parseISO(date.toISOString());
    return dateUTC;
  }

  public dateNow(): Date {
    return new Date();
  }
}

export { DateFnsProvider };
