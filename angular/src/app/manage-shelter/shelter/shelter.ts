import { Staff } from "./staff"

export type Shelter = {
    id: number,
    name: string,
    location: string,
    phone: string,
    email: string,
    staff: Staff[]
}