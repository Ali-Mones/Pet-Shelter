import { Adopter } from "./Adopter";
import { Pet } from "./Pet"

export type AdoptionApplication = {
    adopter: Adopter,
    pet: Pet,
    applicationStatus: "PENDING" | "APPROVED" | "REJECTED";
}