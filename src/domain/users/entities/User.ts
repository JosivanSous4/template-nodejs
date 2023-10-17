export class User {
    public readonly id: string
    public username: string
    public email: string
    public password: string
    public created_at?: Date | null
    public updated_at?: Date | null

    constructor(props: User) {
        Object.assign(this, props)
    }
}