export type Staff = {
    id: number,
    shelterId: number,
    name: string,
    role: string,
    phone: string,
    email: string,
    passwordSalt?: string,
    passwordHash?: string
}
