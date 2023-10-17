import { Middleware, HttpResponse } from '../../presentation/protocols'
import { ApiError, error, forbidden, ok, serverError } from '../../presentation/helpers'
import { HTTP_CODE } from '../../constants/constants';
import { JwtAdapter } from '../../adapters/jwt-adapter';

export class AuthMiddleware implements Middleware {
  constructor(
  ) { }

  async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request

      const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '8h'
      const jwtSecret = process.env.JWT_SECRET || ''

      if (accessToken) {
        const token = accessToken.split(' ')[1]
        const jwtAdapter = new JwtAdapter(jwtSecret, jwtExpiresIn)

        const decodedToken: any = await jwtAdapter.decrypt(token)

        if (decodedToken) {
          return ok({ user_id: decodedToken.id })
        }
      }

      return forbidden(new ApiError(
        'Acesso negado',
        HTTP_CODE.UNAUTHORIZED
      ))
    } catch (err) {
      return error(new ApiError(
        'Acesso negado',
        HTTP_CODE.UNAUTHORIZED
      ))
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
