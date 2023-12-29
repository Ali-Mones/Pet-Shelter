import { Role } from "./Role"

export type Staff = {
    id: number,
    shelterId: number,
    name: string,
    role: Role,
    phone: string,
    email: string,
    passwordSalt?: string,
    passwordHash?: string
}
