import getRandomSecret from "../utils/getRandomSecret.js";

export const getSecret = async (length, encoding) => {
  try {
    return await getRandomSecret({ length, encoding });
  } catch (error) {
    throw new Error(error.message);
  }
};
