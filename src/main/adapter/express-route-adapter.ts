import { Controller } from '../../presentation/protocols'

import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {}),
      ...(req.files || {}),
    }
    const httpResponse = await controller.handler(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {

      if (httpResponse?.download) {
        res.status(httpResponse.statusCode).download(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).json({
          ...httpResponse.body,
          status: 'success'
        })
      }
    } else {
      res.status(httpResponse.statusCode).json({
        ...httpResponse.body,
        status: 'error'
      })
    }
  }
}
