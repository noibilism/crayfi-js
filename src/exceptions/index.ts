export class CrayException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CrayException";
  }
}

export class CrayAuthenticationException extends CrayException {
  constructor(message: string = "Unauthenticated.") {
    super(message);
    this.name = "CrayAuthenticationException";
  }
}

export class CrayValidationException extends CrayException {
  public errors: any;

  constructor(message: string, errors: any = null) {
    super(message);
    this.name = "CrayValidationException";
    this.errors = errors;
  }
}

export class CrayTimeoutException extends CrayException {
  constructor(message: string = "Request timed out.") {
    super(message);
    this.name = "CrayTimeoutException";
  }
}

export class CrayApiException extends CrayException {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "CrayApiException";
    this.statusCode = statusCode;
  }
}
