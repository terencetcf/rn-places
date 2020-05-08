export default {
  toString: (value: number, currency: string = '$') =>
    `${currency} ${value.toFixed(2)}`,
};
