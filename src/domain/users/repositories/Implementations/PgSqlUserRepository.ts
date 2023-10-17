import { IUserRepository } from '../IUserRepository'
import { prismaClient } from '../../../../prisma/prismaClient'
import { User } from '../../entities/User'

export class PgSqlUserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User> {
        try {
            const user = await prismaClient.users.findFirst({
                where: {
                    email
                }
            })

            return user
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}