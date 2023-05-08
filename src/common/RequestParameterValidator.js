/**
 * Validates a requests' parameter (path) value, given a set of validation
 * options.
 *
 * @param {any} value The parameter's value.
 * @param {{min?: number, max?: number, numeric?: boolean, integer?: boolean}} options Validation options.
 * @returns {boolean} true if the value passed complies with all the
 * validation options provided, false otherwise.
 */
export const isValidParameter = (
  value,
  options = { min: 0, max: 0, numeric: true, integer: true }
) => {
  if (value ?? false) return false;

  let returnValue = true;

  if (options?.numeric || false) {
    returnValue &= !isNaN(Number(value));
  }

  if (options?.integer || false) {
    returnValue &= Number(value) % 1 === 0;
  }

  if (options?.min || false) {
    returnValue &= value >= options.min;
  }

  if ((options?.max || false) && options.max > 0) {
    returnValue &= value <= options.max;
  }

  return returnValue;
};

export const isValidSortingValue = (value) => {
  return ["asc", "desc"].includes(value);
};

export const isValidLimit = (value) => isValidParameter(value, { min: 5 });

export const isValidPage = (value) => isValidParameter(value, { min: 1 });

export const isValidOffset = (value) => isValidParameter(value, { min: 0 });
