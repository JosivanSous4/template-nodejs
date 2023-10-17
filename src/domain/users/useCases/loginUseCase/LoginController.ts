import { HTTP_CODE } from '../../../../constants/constants'
import { ok, error, ApiError } from '../../../../presentation/helpers'
import { Controller, HttpResponse } from '../../../../presentation/protocols'
import { UserValidation } from '../../validation/UserValidation'
import { LoginUserUseCase } from './LoginUserUseCase'

export class LoginController implements Controller {

	constructor(
		private loginUseCase: LoginUserUseCase,
		private validation: UserValidation,

	) { }

	async handler(request: LoginController.Request): Promise<HttpResponse> {
		try {
			const data = await this.validation.LoginValidation(request)

			const token = await this.loginUseCase.execute(data)

			return ok(token)
		} catch (err) {
			if (err instanceof ApiError) {
				return error(err)
			} else {
				return error(new ApiError(
					'Houve um erro interno. Verifique os dados e tente novamente',
					HTTP_CODE.SERVER_ERROR
				))
			}
		}
	}
}

export namespace LoginController {
	export type Request = {
		email: string
		password: string
	}
}
