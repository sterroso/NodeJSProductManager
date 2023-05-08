import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  PAGINATE,
} from "../constants/app.constants.js";
import {
  isValidLimit,
  isValidPage,
  isValidOffset,
} from "../common/RequestParameterValidator.js";

/**
 * Parses the list of path parameters from a valid http request passed as
 * an object (req.params), and generates the query and options objects to
 * be passed to a mongoose-paginate-v2 querying function:
 * @example
 * @param {{limit?:string|number, page?:string|limit, offset?:string|number}} params The path parameters object from a valid http request (req.params).
 * @param {[string]} exactSearches A list of strings containing the names of
 * the properties whose values will be searched exactly as they are passed.
 * For those parameters, the search will not be converted into a regular
 * expression.
 * @returns {{query:object, options:object}}
 */
const queryParser = (params, exactSearches) => {
  let returnObject = {
    query: {},
    options: {
      customLabels: PAGINATE.CUSTOM_LABELS,
    },
  };

  if (params?.limit || false) {
    returnObject.options.limit = isValidLimit(params.limit)
      ? Number(params.limit)
      : DEFAULT_LIMIT;
    delete params.limit;
  } else {
    returnObject.options.limit = DEFAULT_LIMIT;
  }

  if (params?.page || false) {
    returnObject.options.page = isValidPage(params.page)
      ? Number(params.page)
      : DEFAULT_PAGE;
    delete params.page;
  } else {
    returnObject.options.page = DEFAULT_PAGE;
  }

  if (params?.offset || false) {
    if (isValidOffset(params.offset)) {
      returnObject.options.offset = Number(params.offset);
    }
    delete params.offset;
  }

  for (const [key, value] of Object.entries(params)) {
    if (/^sortBy/i.test(key)) {
      if (/^(a|de)sc$/gi.test(value)) {
        const keyName = `${key.at(6).toLowerCase()}${key.slice(7)}`;

        if (!(returnObject.options?.sort || false)) {
          returnObject.options.sort = {};
        }

        Object.defineProperty(returnObject.options.sort, keyName, {
          writable: true,
          configurable: false,
          enumerable: true,
          value: value.toLowerCase() === "asc" ? 1 : -1,
        });
      }
      continue;
    }

    if (/^min/i.test(key)) {
      const keyName = `${key.at(3).toLowerCase()}${key.slice(4)}`;

      if (!Object.hasOwn(returnObject.query, keyName)) {
        Object.defineProperty(returnObject.query, keyName, {
          writable: true,
          configurable: true,
          enumerable: true,
          value: {},
        });
      }

      returnObject.query[`${keyName}`].$gte = isNaN(Number(value))
        ? `${value}`
        : Number(value);

      continue;
    }

    if (/^max/i.test(key)) {
      const keyName = `${key.at(3).toLowerCase()}${key.slice(4)}`;

      if (!Object.hasOwn(returnObject.query, keyName)) {
        Object.defineProperty(returnObject.query, keyName, {
          writable: true,
          configurable: true,
          enumerable: true,
          value: {},
        });
      }

      returnObject.query[`${keyName}`].$lte = isNaN(Number(value))
        ? `${value}`
        : Number(value);
      continue;
    }

    Object.defineProperty(returnObject.query, key, {
      writable: true,
      configurable: false,
      enumerable: true,
      value: exactSearches.includes(key)
        ? `${value}`
        : new RegExp(`${value}`, "ig"),
    });
  }

  return returnObject;
};

export default queryParser;
