import * as UtilsServices from "../services/utils.service.js";

const isValidSecretLength = (length) => {
  const numLength = Number(length ?? 0);

  return !isNaN(numLength) && numLength > 0 && numLength % 1 === 0;
};

export const getSecret = async (req, res) => {
  const { length, encoding } = req.params;

  if (!isValidSecretLength(length))
    return res.status(400).json({
      code: 400,
      status: "Bad Request",
      error: `"${length}" is not a valid value for the length parameter.`,
    });

  try {
    const secret = await UtilsServices.getSecret(length, encoding);

    return res
      .status(200)
      .json({ code: 200, status: "OK", secret: `${secret}` });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "INTERNAL SREVER ERROR",
      error: `${error.message}`,
    });
  }
};
