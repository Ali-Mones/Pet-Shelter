export type Gender = "MALE" | "FEMALE";

export type Pet = {
    petId: number,
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
    documents: PetDocument[]
}

export type PetDocument = {
    documentId: number,
    petId: number,
    name: string,
    file: Blob
}
