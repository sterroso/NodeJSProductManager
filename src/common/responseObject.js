import HttpStatus from "../constants/http.status.js";

class ResponseObject {
  #status;
  #responseBody = {
    status: undefined,
    error: undefined,
    payload: undefined,
  };

  static Status = HttpStatus;

  constructor(status = ResponseObject.Status.OK) {
    this.#status = status;
    this.#responseBody.status = this.#status.name;
    this.#responseBody.payload = null;
    this.#responseBody.error = undefined;
  }

  /**
   * @param {{ code: number; name: string; description?: string; reference?: string | URL }} value
   */
  set status(value) {
    const valuePropertyNames = Object.getOwnPropertyNames(value);

    // An http response status object must have, at least, two properties:
    // "code", of type number, and "name", of type string.
    if (
      typeof value === "object" &&
      valuePropertyNames.includes("code") &&
      typeof value?.code === "number" &&
      valuePropertyNames.includes("name") &&
      typeof value?.name === "string"
    ) {
      this.#status = value;
      this.#responseBody.status = value.name;
    }
  }

  get statusCode() {
    return this.#status.code;
  }

  get statusName() {
    return this.#status.name;
  }

  /**
   * @param {object} value Data requested as JSON object or Array.
   */
  set payload(value) {
    this.#responseBody.payload = value;
  }

  get payload() {
    return this.#responseBody.payload;
  }

  /**
   * @param {string} value
   */
  set error(value) {
    this.#responseBody.error = value;
  }

  get error() {
    return this.#responseBody.error;
  }

  toString() {
    return `ResponseObject { status: "${this.statusName}"${
      this?.payload || false ? ", payload: " + this.payload : ""
    }${this?.error || false ? ', error: "' + this.error + '"' : ""} }`;
  }

  toJSON() {
    const base = {
      status: this.statusName,
    };

    if (this?.payload || false) {
      base.payload = this.payload;
    }

    if (this?.error || false) {
      base.error = this.error;
    }

    return base;
  }
}

export default ResponseObject;
