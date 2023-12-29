import { Gender } from "./Gender";
import { PetDocument } from "./PetDocument";

export type Pet = {
    id: number,
    shelterId: number,
    name: string,
    species: string,
    breed: string,
    age: number,
    gender: Gender,
    healthStatus: string,
    behaviour: string,
    description: string,
    houseTraining: boolean,
    spayedNeutered: boolean,
    documents?: PetDocument[]
}
