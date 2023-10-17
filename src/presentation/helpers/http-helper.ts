import { HttpResponse } from '../../presentation/protocols/'
import { ServerError } from '../../presentation/errors/'

export const badRequest = (error: ApiError): HttpResponse => ({
  statusCode: 400,
  body: {
    ...error,
    message: error.message
  }
})

export const forbidden = (error: ApiError): HttpResponse => ({
  statusCode: 403,
  body: {
    ...error,
    message: error.message
  }
})

export const unauthorized = (error: ApiError): HttpResponse => ({
  statusCode: 401,
  body: {
    ...error,
    message: error.message
  }
})


export const error = (error: ApiError): HttpResponse => {
  const res = {
    statusCode: error.code || 501,
    body: {
      ...error,
      message: error.message
    }
  }
  return res
}


export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error.message
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const okDownload = (data: any): HttpResponse => ({
  statusCode: 200,
  download: true,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export class ApiError extends Error {
  constructor(public message: string, public code: number, public details?: any) {
    super(message);
    this.code = code;
    this.details = details;
    // Garantindo a correta cadeia de protótipos
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

