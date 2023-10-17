import { Middleware } from '../../presentation/protocols'

import { Request, Response, NextFunction } from 'express'

export interface IRequest extends Request {
  user_id?: string | null
}

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.['authorization'],
      ...(req.headers || {})
    }

    const httpResponse = await middleware.handle(request)

    if (httpResponse.statusCode === 200) {
      httpResponse.body.user_id = httpResponse.body.user_id
      req.body.user_id = httpResponse.body.user_id

      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
