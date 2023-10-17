import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient({
    // log: ['query'],
})


prismaClient.$use(async (params, next) => {
    if (params.action === 'findUnique' || params.action === 'findFirst') {
        params.action = 'findFirst'
        params.args.where['deleted_at'] = null
    }
    if (params.action === 'findMany') {
        if (params.args.where) {
            if (params.args.where.deleted == undefined) {
                params.args.where['deleted_at'] = null
            }
        } else {
            params.args['where'] = { deleted_at: null }
        }
    }
    return next(params)
})


export { prismaClient }
