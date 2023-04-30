import { randomBytes } from "node:crypto";

const MIN_LENGTH = 9;

const MAX_LENGTH = 2048;

const DEFAULT_LENGTH = 12;

const isValidLength = (length) => {
  const numLength = Number(length);

  return (
    !isNaN(numLength) &&
    numLength >= MIN_LENGTH &&
    numLength <= MAX_LENGTH &&
    numLength % 1 === 0
  );
};

const validEncodings = [
  /^utf(-)?8$/i,
  /^utf(-)?16le$/i,
  /^latin1$/i,
  /^base64(url)?$/i,
  /^hex$/i,
  /^ascii$/i,
  /^binary$/i,
  /^ucs2$/i,
];

const DEFAULT_ENCODING = "hex";

const getRandomSecret = (
  options = { length: DEFAULT_LENGTH, encoding: DEFAULT_ENCODING }
) => {
  if (!isValidLength(options?.length || 0)) {
    throw new Error(
      `length must be an integer between ${MIN_LENGTH} and ${MAX_LENGTH}, inclusive.`
    );
  }

  if (!validEncodings.some((enc) => enc.test(options?.encoding))) {
    throw new Error(`"${options.encoding}" is not a valid encoding.`);
  }

  return randomBytes(Number(options.length)).toString(options.encoding);
};

export default getRandomSecret;
