import { Router } from 'express'

import usersRouter from './domain/users/users.routes'

const router = Router()

router.use('/users', usersRouter)

export { router }
