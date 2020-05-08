import moment, { DurationInputArg1, DurationInputArg2 } from 'moment';

export default {
  toNewUtcDate: (
    amount?: DurationInputArg1,
    unit?: DurationInputArg2
  ): moment.Moment => moment.utc().add(amount, unit),
};
