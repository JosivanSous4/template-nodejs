import { HTTP_CODE } from '../../../../constants/constants'
import { ApiError } from '../../../../presentation/helpers'
import { IUserRepository } from '../../repositories/IUserRepository'
import { HashComparer, Encrypter } from '../../../../data/protocols'

interface IToken {
    id: string
    name: string
    email: string
    costs_center_id: string,
}

export interface IRequest {
    email: string
    password: string,
}

export class LoginUserUseCase {
    constructor(
        private loginRepository: IUserRepository,
        private comparer: HashComparer,
        private encrypter: Encrypter
    ) { }

    async execute(data: IRequest) {
        try {
            const user = await this.loginRepository.getUserByEmail(data.email)

            if (!user) throw new ApiError('Usuário ou senha inválida', HTTP_CODE.UNAUTHORIZED)

            const comparerPassword = await this.comparer.compare(
                data.password,
                user.password
            )

            if (!comparerPassword) throw new ApiError('Usuário ou senha inválida', HTTP_CODE.UNAUTHORIZED)

            const accessTokenContent: IToken = {
                id: user.id,
                email: user.email,
                name: user.employees.name,
                costs_center_id: user.costs_center_id
            }

            const accessToken = await this.encrypter.encrypt(accessTokenContent)

            return {
                accessToken
            }
        } catch (error) {
            console.error(error)

            if (error instanceof ApiError) {
                throw error
            } else {
                throw new ApiError(
                    'Houve um erro interno',
                    HTTP_CODE.SERVER_ERROR
                )
            }
        }
    }

}