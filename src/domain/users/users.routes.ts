import { Router } from 'express'
import { adaptRoute } from '../../main/adapter/express-route-adapter'
import { loginController } from './useCases/loginUseCase'

const router = Router()

router.post('/auth', adaptRoute(loginController))

export default router
