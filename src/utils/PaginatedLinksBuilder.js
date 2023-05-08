import { DEFAULT_LIMIT } from "../constants/app.constants.js";
/**
 * Generates a URL for a paginated result's next page. Includes options and
 * queries to ensue results are consistent between pages.
 *
 * @param {number} pageNumber The number of page for the next page. If a
 * null-ish value is passed, function will return null.
 * @param {object} request Original http request object.
 * @param {object} query An object containing a query's key-value pairs.
 * @param {object} options An object containing options' key-value pairs.
 * @returns {string} A URL for the next page of results.
 * @throws {Error} if any parameter is missing (undefined) or null.
 */
const getPageLink = (pageNumber = null, request, query, options) => {
  if (!(pageNumber ?? false)) return null;

  const pageURL = new URL(request.host);

  pageURL.pathname = `${request.baseUrl}${request.path}`;

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          for (const [subkey, subvalue] of Object.entries(item)) {
            switch (subkey) {
              case "$gte":
                pageURL.searchParams.append(
                  `min${key.at(0).toUpperCase()}${key.slice(1)}`,
                  subvalue
                );
                break;
              case "$lte":
                pageURL.searchParams.append(
                  `max${key.at(0).toUpperCase()}${key.slice(1)}`,
                  subvalue
                );
                break;
              default:
                throw new Error("Comparison operator not recognized.");
            }
          }
        });
      } else {
        pageURL.searchParams.append(key, value);
      }
    }
  }

  if (options?.sort) {
    for (const [key, value] of Object.entries(options.sort)) {
      pageURL.searchParams.append(
        `sortBy${key.at(0).toUpperCase()}${key.slice(1)}`,
        `${value === 1 ? "asc" : "desc"}`
      );
    }
  }

  pageURL.searchParams.append(
    "limit",
    options?.limit || false ? Number(options.limit) : DEFAULT_LIMIT
  );

  pageURL.searchParams.append("page", Number(pageNumber));

  if (options?.offset || false) {
    pageURL.searchParams.append("offset", Number(options.offset));
  }

  return pageURL.toString();
};

export default getPageLink;
