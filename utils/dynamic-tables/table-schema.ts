import { franchise, eICharacter, eISpecies, eIGadget, eIFights } from './../../types/entities';
import { ITable } from './../../types/tables';


export {}

export const  franchiseTableSchema: ITable<franchise> = {
    name: "franchise",
    label: "Franchises Table",
    has_actions: true,
    unique_identifier: "id",
    query: "type:rpc=get_creator_franchises",
    delete_query: "type:rpc=delete_creator_franchise",
    columns: [
        {
            label: "id",
            key: "id",
            fetched_data_key: "id",
            type: "text"
        },
        {
            label: "Name",
            key: "name",
            fetched_data_key: "name",
            type: "text"
        },
        {
            label: "Image",
            key: "image",
            fetched_data_key: "image",
            type: "image"
        },
        {
            label: "description",
            key: "description",
            fetched_data_key: "description",
            type: "description"
        },
        {
            label: "Created On",
            key: "created_on",
            fetched_data_key: "created_on",
            type: "date"
        },
        {
            label: "Updated On",
            key: "updated_on",
            fetched_data_key: "updated_on",
            type: "date"
        },
        {
            label: "Status",
            key: "status",
            fetched_data_key: "status",
            type: "text"
        },
    ]
}

export const  publicFranchiseTableSchema: ITable<franchise> = {
    name: "franchise",
    label: "Franchises Table",
    has_actions: true,
    unique_identifier: "id",
    query: "type:rpc=get_public_franchises",
    delete_query: "type:rpc=delete_public_creator_franchise",
    columns: [
        {
            label: "id",
            key: "id",
            fetched_data_key: "id",
            type: "text"
        },
        {
            label: "Name",
            key: "name",
            fetched_data_key: "name",
            type: "text"
        },
        {
            label: "Image",
            key: "image",
            fetched_data_key: "image",
            type: "image"
        },
        {
            label: "description",
            key: "description",
            fetched_data_key: "description",
            type: "description"
        },
        {
            label: "Created On",
            key: "created_on",
            fetched_data_key: "created_on",
            type: "date"
        },
        {
            label: "Updated On",
            key: "updated_on",
            fetched_data_key: "updated_on",
            type: "date"
        },
        {
            label: "Status",
            key: "status",
            fetched_data_key: "status",
            type: "text"
        },
    ]
}


export const creatorCharactersTableSchema: ITable<eICharacter> = {
    name: "characters",
    label: "Characters Table",
    has_actions: true,
    unique_identifier: "id",
    query: "type:rpc=get_creator_characters",
    delete_query: "type:rpc=delete_creator_character",
    columns: [
        {
            label: "id",
            key: "id",
            fetched_data_key: "id",
            type: "text"
        },
        {
            label: "Name",
            key: "name",
            fetched_data_key: "name",
            type: "text"
        },
        {
            label: "Bio",
            key: "bio",
            fetched_data_key: "bio",
            type: "description"

        },
        {
            label: "attributes",
            key: "attributes",
            fetched_data_key: "attributes",
            type: "badges"

        },
        {
            label: "Image",
            key: "image",
            fetched_data_key: "image",
            type: "image"

        },
        {
            label: "Created On",
            key: "created_on",
            fetched_data_key: "created_on",
            type: "date"
        },
        {
            label: "Description",
            key: "description",
            fetched_data_key: "description",
            type: "description"
        },
        {
            label: "Expressive Color",
            key: "expressive_color",
            fetched_data_key: "expressive_color",
            type: "color"
        },
        {
            label: "Status",
            key: "status",
            fetched_data_key: "status",
            type: "badge"
        },
        {
            label: "Franchise",
            key: "franchise",
            fetched_data_key: "franchise.name",
            type: "badge"
        },
        {
            label: "Species",
            key: "species",
            fetched_data_key: "species.name",
            type: "badge"
        },
        {
            label: "Weapon",
            key: "weapon",
            fetched_data_key: "weapon.name",
            type: "badge"
        }
    ]
}

export const publicCharactersTableSchema: ITable<eICharacter> = {
    name: "characters",
    label: "Characters Table",
    has_actions: true,
    unique_identifier: "id",
    query: "type:rpc=get_public_characters",
    delete_query: "type:rpc=delete_creator_character",
    columns: [
        {
            label: "id",
            key: "id",
            fetched_data_key: "id",
            type: "text"
        },
        {
            label: "Name",
            key: "name",
            fetched_data_key: "name",
            type: "text"
        },
        {
            label: "Bio",
            key: "bio",
            fetched_data_key: "bio",
            type: "description"

        },
        {
            label: "attributes",
            key: "attributes",
            fetched_data_key: "attributes",
            type: "badges"

        },
        {
            label: "Image",
            key: "image",
            fetched_data_key: "image",
            type: "image"

        },
        {
            label: "Created On",
            key: "created_on",
            fetched_data_key: "created_on",
            type: "date"
        },
        {
            label: "Description",
            key: "description",
            fetched_data_key: "description",
            type: "description"
        },
        {
            label: "Expressive Color",
            key: "expressive_color",
            fetched_data_key: "expressive_color",
            type: "color"
        },
        {
            label: "Status",
            key: "status",
            fetched_data_key: "status",
            type: "badge"
        },
        {
            label: "Franchise",
            key: "franchise",
            fetched_data_key: "franchise.name",
            type: "badge"
        },
        {
            label: "Species",
            key: "species",
            fetched_data_key: "species.name",
            type: "badge"
        },
        {
            label: "Weapon",
            key: "weapon",
            fetched_data_key: "weapon.name",
            type: "badge"
        }
    ]
}

export const creatorsSpeciesTableSchema: ITable<eISpecies> = {
    name: "species",
    label: "Species Table",
    has_actions: true,
    delete_query: "type:rpc=delete_creator_species",
    unique_identifier: "id",
    query: "type:rpc=get_creator_species",
    columns: [
        {
            label: "id",
            key: "id",
            fetched_data_key: "id",
            type: "text"

        },
        {
            label: "Name",
            key: "name",
            fetched_data_key: "name",
            type: "text"

        },
        {
            label: "Nick Name",
            key: "nick_name",
            fetched_data_key: "nick_name",
            type: "text"
        },
        {
            label: "Image",
            key: "image",
            fetched_data_key: "image",
            type: "image"

        },
        {
            label: "Status",
            key: "status",
            fetched_data_key: "status",
            type: "badge"
        },
        {
            label: "Franchise",
            key: "franchise",
            fetched_data_key: "franchise.name",
            type: "badge"
        },
        {
            label: "Place",
            key: "place",
            fetched_data_key: "place.name",
            type: "badge"
        }
    ]
}

export const publicSpeciesTableSchema: ITable<eISpecies> = {
    name: "species",
    label: "Species Table",
    has_actions: true,
    delete_query: "type:rpc=delete_creator_species",
    unique_identifier: "id",
    query: "type:rpc=get_public_species",
    columns: [
        {
            label: "id",
            key: "id",
            fetched_data_key: "id",
            type: "text"

        },
        {
            label: "Name",
            key: "name",
            fetched_data_key: "name",
            type: "text"

        },
        {
            label: "Nick Name",
            key: "nick_name",
            fetched_data_key: "nick_name",
            type: "text"
        },
        {
            label: "Image",
            key: "image",
            fetched_data_key: "image",
            type: "image"

        },
        {
            label: "Status",
            key: "status",
            fetched_data_key: "status",
            type: "badge"
        },
        {
            label: "Franchise",
            key: "franchise",
            fetched_data_key: "franchise.name",
            type: "badge"
        },
        {
            label: "Place",
            key: "place",
            fetched_data_key: "place.name",
            type: "badge"
        }
    ]
}


export const creatorGadgetTableSchema: ITable<eIGadget> = {
    name: "gadgets",
    label: "Gadgets Table",
    has_actions: true,
    delete_query: "type:rpc=delete_creator_gadget",
    query: "type:rpc=get_creator_gadgets",
    unique_identifier: "id",
    columns: [
        {
            label: "Id",
            key: "id",
            fetched_data_key: "id",
            type: "text"
        },
        {
            label: "Name",
            key: "name",
            fetched_data_key: "name",
            type: "text"
        },
        {
            label: "Description",
            key: "description",
            fetched_data_key: "description",
            type: "description"
        },
        {
            label: "Image",
            key: "image",
            fetched_data_key: "image",
            type: "image"
        },
        {
            label: "Status",
            key: "status",
            fetched_data_key: "status",
            type: "badge"
        },
        {
            label: "Inventor",
            key: "inventor",
            fetched_data_key: "inventor.name",
            type: "text"
        },
        {
            label: "Franchise",
            key: "franchise",
            fetched_data_key: "franchise.name",
            type: "badge"
        },
    ]
}

export const publicGadgetTableSchema: ITable<eIGadget> = {
    name: "gadgets",
    label: "Gadgets Table",
    has_actions: true,
    delete_query: "type:rpc=delete_creator_gadget",
    query: "type:rpc=get_public_gadgets",
    unique_identifier: "id",
    columns: [
        {
            label: "Id",
            key: "id",
            fetched_data_key: "id",
            type: "text"
        },
        {
            label: "Name",
            key: "name",
            fetched_data_key: "name",
            type: "text"
        },
        {
            label: "Description",
            key: "description",
            fetched_data_key: "description",
            type: "description"
        },
        {
            label: "Image",
            key: "image",
            fetched_data_key: "image",
            type: "image"
        },
        {
            label: "Status",
            key: "status",
            fetched_data_key: "status",
            type: "badge"
        },
        {
            label: "Inventor",
            key: "inventor",
            fetched_data_key: "inventor.name",
            type: "text"
        },
        {
            label: "Franchise",
            key: "franchise",
            fetched_data_key: "franchise.name",
            type: "badge"
        },
    ]
}


export const creatorPlacesTableSchema: ITable<eICharacter> = {
    name: "places",
    label: "Places Table",
    has_actions: true,
    delete_query: "type:rpc=delete_creator_place",
    query: "type:rpc=get_creator_places",
    unique_identifier: "id",
    columns: [
        {
            label: "Id",
            key: "id",
            fetched_data_key: "id",
            type: "text"
        },
        {
            label: "Name",
            key: "name",
            fetched_data_key: "name",
            type: "text"
        },
        {
            label: "Description",
            key: "description",
            fetched_data_key: "description",
            type: "description"
        },
        {
            label: "Image",
            key: "image",
            fetched_data_key: "image",
            type: "image"
        },
        {
            label: "Status",
            key: "status",
            fetched_data_key: "status",
            type: "badge"
        },
        {
            label: "Franchise",
            key: "franchise",
            fetched_data_key: "franchise.name",
            type: "badge"
        }
    ]
}

export const publicPlacesTableSchema: ITable<eICharacter> = {
    name: "places",
    label: "Places Table",
    has_actions: true,
    delete_query: "type:rpc=delete_creator_place",
    query: "type:rpc=get_public_places",
    unique_identifier: "id",
    columns: [
        {
            label: "Id",
            key: "id",
            fetched_data_key: "id",
            type: "text"
        },
        {
            label: "Name",
            key: "name",
            fetched_data_key: "name",
            type: "text"
        },
        {
            label: "Description",
            key: "description",
            fetched_data_key: "description",
            type: "description"
        },
        {
            label: "Image",
            key: "image",
            fetched_data_key: "image",
            type: "image"
        },
        {
            label: "Status",
            key: "status",
            fetched_data_key: "status",
            type: "badge"
        },
        {
            label: "Franchise",
            key: "franchise",
            fetched_data_key: "franchise.name",
            type: "badge"
        }
    ]
}

const creatorFightsTableSchema: ITable<eIFights> = {
    name: "fights",
    label: "Fights Table",
    has_actions: true,
    delete_query: "type:rpc=delete_creator_fight",
    query: "type:rpc=get_creator_fights",
    unique_identifier: "id",
    columns: [
        {
            label: "Id",
            key: "id",
            fetched_data_key: "id",
            type: "text"
        },
        {
            label: "Name",
            key: "name",
            fetched_data_key: "name",
            type: "text"
        },
        {
            label: "description",
            key: "description",
            fetched_data_key: "description",
            type: "description"
        },
        {
            label: "Image",
            key: "image",
            fetched_data_key: "image",
            type: "image"
        },
        {
            label: "Status",
            key: "status",
            fetched_data_key: "status",
            type: "badge"
        },
        {
            label: "Franchise",
            key: "franchise",
            fetched_data_key: "franchise.name",
            type: "badge"
        }
    ]
}

const publicFightsTableSchema: ITable<eIFights> = {
    name: "fights",
    label: "Fights Table",
    has_actions: true,
    delete_query: "type:rpc=delete_creator_fight",
    query: "type:rpc=get_public_fights",
    unique_identifier: "id",
    columns: [
        {
            label: "Id",
            key: "id",
            fetched_data_key: "id",
            type: "text"
        },
        {
            label: "Name",
            key: "name",
            fetched_data_key: "name",
            type: "text"
        },
        {
            label: "description",
            key: "description",
            fetched_data_key: "description",
            type: "description"
        },
        {
            label: "Image",
            key: "image",
            fetched_data_key: "image",
            type: "image"
        },
        {
            label: "Status",
            key: "status",
            fetched_data_key: "status",
            type: "badge"
        },
        {
            label: "Franchise",
            key: "franchise",
            fetched_data_key: "franchise.name",
            type: "badge"
        }
    ]
}





export const tableSchemas = {
    franchiseTableSchema,
    creatorCharactersTableSchema,
    creatorsSpeciesTableSchema,
    creatorGadgetTableSchema,
    creatorPlacesTableSchema,
    creatorFightsTableSchema,
    publicCharactersTableSchema,
    publicSpeciesTableSchema,
    publicGadgetTableSchema,
    publicPlacesTableSchema,
    publicFightsTableSchema,
    publicFranchiseTableSchema
}