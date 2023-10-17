import { PgSqlUserRepository } from '../../repositories/Implementations/PgSqlUserRepository'
import { LoginController } from './LoginController'
import { LoginUserUseCase } from './LoginUserUseCase'
import { YupUserValidation } from '../../validation/implement/YupUserValidation'
import { BcryptAdapter } from '../../../../adapters/bcrypt-adapter'
import { JwtAdapter } from '../../../../adapters/jwt-adapter'

const pgSqlUserRepository = new PgSqlUserRepository()
const yupUserValidation = new YupUserValidation()

const bCryptSalt = Number(process.env.BCRYPT_SALT) || 12
const bCryptAdapter = new BcryptAdapter(bCryptSalt)
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '8h'
const jwtSecret = process.env.JWT_SECRET || ''

const jwtAdapter = new JwtAdapter(jwtSecret, jwtExpiresIn)

const loginUserUseCase = new LoginUserUseCase(
  pgSqlUserRepository,
  bCryptAdapter,
  jwtAdapter
)

const loginController = new LoginController(
  loginUserUseCase,
  yupUserValidation
)

export { loginUserUseCase, loginController }
