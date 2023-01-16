export type item_status = "active" | "inactive" | "deleted";
export type gadget_type = "weapon" | "vehicle" | "electronic" | "software" | "mechanical"

export interface eIProfile {
    id: string,
    username: string,
    pic_url: string,
    access: "user" | "admin" | "creator"
}

export interface franchise {
    id: string,
    name: string,
    start_date: string,
    end_date: string,
    image: string,
    description: string,
    creator: Partial<eIProfile>,
    created_on: string,
    status: item_status,
    updated_on: string
}

export interface eICharacter {
    id: string,
    name: string,
    nick_name: string,
    species: string,
    weapon: string,
    bio: string,
    attributes: string,
    description: string,
    image: string,
    expressive_color: string,
    creator: Partial<eIProfile>,
    created_on: string,
    updated_on: string,
    status: item_status,
    franchise: Partial<franchise>
}

export interface eIGadget {
    id: string,
    name: string,
    nick_name: string,
    type: gadget_type,
    inventor: Partial<eICharacter>,
    image: string,
    expressive_color: string,
    created_by : Partial<eIProfile>,
    created_on: string,
    description: string,
    status: item_status,
    franchise: Partial<franchise>,
    updated_on: string
}

export interface eIFights {
    id: string,
    name: string,
    franchise: Partial<franchise>,
    description: string,
    created_by: Partial<eIProfile>,
    created_on: string,
    updated_on: string,
    status: item_status,
    image: string,
}


export interface eIPlace {
    id: string,
    name: string,
    description: string,
    image: string,
    created_by: Partial<eIProfile>,
    created_on: string,
    updated_on: string,
    status: item_status,
    franchise: Partial<franchise>
}


export interface eISpecies {
    id: string,
    name: string,
    nick_name: string,
    franchise: Partial<franchise>,
    created_by: Partial<eIProfile>,
    created_on: string,
    updated_on: string,
    description: string,
    status: item_status,
    place: Partial<eIPlace>,
    image: string,
}
