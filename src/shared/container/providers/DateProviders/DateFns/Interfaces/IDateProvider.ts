interface IDateProvider {
  compareInHours(dateLeft: Date, dateRight: Date): number;
  convertToUTC(date: Date): Date;
  dateNow(): Date;
}

export { IDateProvider };
