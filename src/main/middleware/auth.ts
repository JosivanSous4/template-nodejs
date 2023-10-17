import { adaptMiddleware } from '../../main/adapter/express-middleware-adapter'
import { AuthMiddleware } from '../../presentation/middlewares'

export const auth = adaptMiddleware(new AuthMiddleware())
