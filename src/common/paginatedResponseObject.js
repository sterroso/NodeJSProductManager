import ResponseObject from "./responseObject.js";

class PaginatedResponseObject extends ResponseObject {
  limit = undefined;
  page = undefined;
  offset = undefined;
  count = undefined;
  nextPage = undefined;
  prevPage = undefined;
  hasNextPage = undefined;
  hasPrevPage = undefined;
  nextPageLink = undefined;
  prevPageLink = undefined;
  totalPages = undefined;
  pagingCounter = undefined;
  meta = undefined;

  constructor(status = ResponseObject.Status.OK) {
    super(status);
  }

  toJSON = () => {
    return Object.defineProperties(super.toJSON(), {
      limit: {
        value: this.limit,
        writable: true,
      },
      page: {
        value: this.page,
        writable: true,
      },
      offset: {
        value: this.offset,
        writable: true,
      },
      count: {
        value: this.count,
        writable: true,
      },
      nextPage: {
        value: this.nextPage,
        writable: true,
      },
      prevPage: {
        value: this.prevPage,
        writable: true,
      },
      hasNextPage: {
        value: this.hasNextPage,
        writable: true,
      },
      hasPrevPage: {
        value: this.hasPrevPage,
        writable: true,
      },
      nextPageLink: {
        value: this.nextPageLink,
        writable: true,
      },
      prevPageLink: {
        value: this.prevPageLink,
        writable: true,
      },
      totalPages: {
        value: this.totalPages,
        writable: true,
      },
      pagingCounter: {
        value: this.pagingCounter,
        writable: true,
      },
      meta: {
        value: this.meta,
        writable: true,
      },
    });
  };

  toString() {
    return `PaginatedResponseObject { "status": "${this.status}"${
      this?.payload || false ? ', "payload": ' + this.payload : ""
    }${this?.error || false ? ', "error": "' + this.error + '"' : ""}${
      this?.limit || false ? ', "limit": ' + this.limit : ""
    }${this?.page || false ? ', "page": ' + this.page : ""}${
      this?.offset || false ? ', "offset": ' + this.offset : ""
    }${this?.totalPages || false ? ', "totalPages": ' + this.totalPages : ""}${
      this?.hasNextPage || false ? ', "hasNextPage": ' + this.hasNextPage : ""
    }${
      this?.hasPrevPage || false ? ', "hasPrevPage": ' + this.hasPrevPage : ""
    }${this?.nextPage || false ? ', "nextPage": ' + this.nextPage : ""}${
      this?.prevPage || false ? ', "prevPage": ' + this.prevPage : ""
    }${
      this?.pagingCounter || false
        ? ', "pagingCounter": ' + this.pagingCounter
        : ""
    }${this?.meta || false ? ', "meta": ' + this.meta : ""} }`;
  }

  /**
   * Procesa un objeto devuelto por el plugin mongoose-paginate-v2
   * y devuelve un PaginatedResponseObject.
   *
   * @param {{payload: object, limit: number, page: number, offset?: number, count: number, nextPage?: number, prevPage?: number, hasNextPage?: boolean, hasPrevPage?: boolean, pagingCounter?: number | null, meta?: any}} object El objeto a procesar.
   * @param {{code: number, name: string, description?: string, reference?: string | URL}} status Initital HTTP Response Status.
   */
  static parse = (object, status) => {
    const base = new PaginatedResponseObject(status);
    return Object.assign(base, object);
  };
}

export default PaginatedResponseObject;
