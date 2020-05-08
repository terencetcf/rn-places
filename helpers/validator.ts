export default {
  isEmpty: (value: string | undefined | null) =>
    value ? value.length > 0 : false,

  isEmail: (value: string | undefined | null) =>
    value ? /\S+@\S+\.\S+/.test(value) : false,

  hasMinChar: (value: string | undefined | null, minimumCharacters: number) =>
    value ? value.length >= minimumCharacters : false,
};
