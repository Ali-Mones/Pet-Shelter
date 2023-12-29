export type Adopter = {
    id: number,
    name: string,
    email: string,
    phone: string,
    location: string,
    passwordHash?: string,
    passwordSalt?: string,
}
