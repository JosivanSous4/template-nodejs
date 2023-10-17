import { Middleware, HttpResponse } from '../protocols'
import { ApiError, error, forbidden, ok, serverError } from '../helpers'
import { HTTP_CODE } from '../../constants/constants';
import { JwtAdapter } from '../../adapters/jwt-adapter';
import { IUserRepository } from '../../domain/organization/users/repositories/IUserRepository';

export class OrgMiddleware implements Middleware {
  constructor(
    private userRepository: IUserRepository,
  ) { }

  async handle(request: OrgMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request

      const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '8h'
      const jwtSecret = process.env.JWT_SECRET || ''

      if (accessToken) {
        const token = accessToken.split(' ')[1]
        const jwtAdapter = new JwtAdapter(jwtSecret, jwtExpiresIn)

        const decodedToken: any = await jwtAdapter.decrypt(token)

        if (decodedToken) {
          // console.log(decodedToken.id, 'decodedToken.id');

          // const user = await this.userRepository.checkUserById(decodedToken.id)

          // if (user) {
          return ok({ user_id: decodedToken.id })
          // }
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

export namespace OrgMiddleware {
  export type Request = {
    accessToken?: string
  }
}
