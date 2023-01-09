
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

class DefinedErrors {
  public authFailed:CustomError = new CustomError('Authorization Failed!',
    `Uh oh! i can't tell you anymore #BruteForcers! alert`,
    401,
    ""
  );
  public dataInvalid:CustomError = new CustomError(
    'Data Invalid!',
    `Uh oh! the data you've sent is not as expected #Contact the developer!`,
    417,
    ""
  );
}

export default new DefinedErrors;