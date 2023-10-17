import { Middleware, HttpResponse } from '../protocols'
import { ApiError, error, forbidden, ok, serverError } from '../helpers'
import { HTTP_CODE } from '../../constants/constants';
import { JwtAdapter } from '../../adapters/jwt-adapter';
import { IUserRepository } from '../../domain/traveler/users/repositories/IUserRepository';

export class TravelerMiddleware implements Middleware {
  constructor(
    private userRepository: IUserRepository,
  ) { }

  async handle(request: TravelerMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request

      const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '8h'
      const jwtSecret = process.env.JWT_SECRET || ''

      if (accessToken) {
        const token = accessToken.split(' ')[1]
        const jwtAdapter = new JwtAdapter(jwtSecret, jwtExpiresIn)

        const decodedToken: any = await jwtAdapter.decrypt(token)

        if (decodedToken) {
          const traveler = await this.userRepository.checkTraverById(decodedToken.id)

          if (traveler) {
            return ok({ user_id: decodedToken.id })
          }
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

export namespace TravelerMiddleware {
  export type Request = {
    accessToken?: string
  }
}
