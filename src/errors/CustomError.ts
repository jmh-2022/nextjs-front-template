class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ClientError extends CustomError {
  constructor(message: string) {
    super(message, 0); // 0 clinet error
  }
}

class NetworkError extends CustomError {
  statusText: string;
  errorBody: string;

  constructor(message: string, statusCode: number, statusText: string, errorBody: string) {
    super(message, statusCode);
    this.statusText = statusText;
    this.errorBody = errorBody;
  }
}

export { CustomError, ClientError, NetworkError };
