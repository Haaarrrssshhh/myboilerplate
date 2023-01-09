
export class CustomError extends Error {
    code:number;
    additional:any;
  constructor(name:any, message:any, code:any, additional:any) {
    super();
    Error.captureStackTrace(this, this.constructor);
    (this.code = code),
      (this.name = `${name} - Devloper Defined Error!`),
      (this.message = message);
    if (additional) this.additional = additional;
  }
}

