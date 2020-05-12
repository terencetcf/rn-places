import { isEmpty } from 'lodash';

export default {
  isEmpty: (value: any) => isEmpty(value),

  isEmail: (value: string | undefined | null) =>
    value ? /\S+@\S+\.\S+/.test(value) : false,

  hasMinChar: (value: string | undefined | null, minimumCharacters: number) =>
    value ? value.length >= minimumCharacters : false,
};
