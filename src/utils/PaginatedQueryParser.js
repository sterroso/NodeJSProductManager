import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_OFFSET,
  PAGINATE,
} from "../constants/app.constants.js";
import { isValidPage } from "../common/RequestParameterValidator.js";

/**
 * Parses the list of path parameters from a valid http request passed as
 * an object (req.params), and generates the query and options objects to
 * be passed to a mongoose-paginate-v2 querying function:
 *
 * @param {{page?:string|number, ...}} params The path parameters object from a valid http request (req.params).
 * @param {{ exactSearches?: [string] }} options A list of strings containing the names of
 * the properties whose values will be searched exactly as they are passed.
 * For those parameters, the search will not be converted into a regular
 * expression.
 * @returns {{query:object, options:object}}
 */
const PaginatedQueryParser = (params, options = { exactSearches: [] }) => {
  let returnObject = {
    query: {},
    options: {
      customLabels: PAGINATE.CUSTOM_LABELS,
      limit: DEFAULT_LIMIT,
      offset: DEFAULT_OFFSET,
    },
  };

  if (params?.page || false) {
    returnObject.options.page = isValidPage(params.page)
      ? Number(params.page)
      : DEFAULT_PAGE;
    delete params.page;
  } else {
    returnObject.options.page = DEFAULT_PAGE;
  }

  if (params?.limit || false) {
    /***************************************************************************
     *  Disable user-defined limits.
     *
    returnObject.options.limit = isValidLimit(params.limit)
    ? Number(params.limit)
    : DEFAULT_LIMIT;

    **************************************************************************/
    delete params.limit;
  } /* else {
    returnObject.options.limit = DEFAULT_LIMIT;
  }
  */

  if (params?.offset || false) {
    /*************************************************************************
    if (isValidOffset(params.offset)) {
      returnObject.options.offset = Number(params.offset);
    }

    *************************************************************************/
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

    if ((options?.exactSearches || []).length === 0) {
      Object.defineProperty(returnObject.query, key, {
        writable: true,
        configurable: false,
        enumerable: true,
        value: new RegExp(`${value}`, "ig"),
      });
    } else {
      Object.defineProperty(returnObject.query, key, {
        writable: true,
        configurable: false,
        enumerable: true,
        value: options.exactSearches.includes(key)
          ? `${value}`
          : new RegExp(`${value}`, "ig"),
      });
    }
  }

  return returnObject;
};

export default PaginatedQueryParser;
