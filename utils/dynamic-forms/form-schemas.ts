import { eIPlace, eIProfile, eICharacter, eIFights, eIGadget, franchise, eISpecies } from './../../types/entities';
import { IDynamicForm } from './../../types/forms';



export const characterForm: IDynamicForm<eICharacter> = {
    entity: "characters",
    queries: [
        {
            field: "name",
            value: "",
            type: "text",
            label: "Name",
            required: true,
            placeholder: "Enter a name for the character"
        },
        {
            field: "nick_name",
            value: "",
            type: "text",
            label: "Nick Name",
            required: true,
            placeholder: "Enter a nick name for the character",
        },
        {
            field: "species",
            value: "",
            type: "options",
            label: "Species",
            required: true,
            query: "type:rpc=get_species_for_select=franchise_id",
            placeholder: "Select a species",
            options: []

        },
        {
            field: "weapon",
            value: "",
            type: "options",
            label: "Weapon",
            required: true,
            query: "type:rpc=get_weapons_for_select=franchise_id",
            placeholder: "Select a weapon",
            options: []
        },
        {
            field: "bio",
            value: "",
            type: "description",
            label: "Bio",
            required: true,
            placeholder: "Enter a bio of the character"
        },
        {
            field: "attributes",
            value: "",
            type: "description",
            label: "Attributes",
            required: true,
            placeholder: "Enter a comma separated list of attributes"
        },
        {
            field: "description",
            value: "",
            type: "description",
            label: "Description",
            required: true,
            placeholder: "Enter a description of the character"
        },
        {
            field: "image",
            value: "",
            type: "image",
            label: "Image",
            required: true,
            placeholder: "Upload an image for the character",
        },
        {
            field: "expressive_color",
            value: "",
            type: "color",
            label: "Expressive Color",
            required: true,
            placeholder: "Select a color that suits the character"
        },
        {
            field: "franchise",
            value: "",
            type: "options",
            label: "Franchise",
            required: true,
            query: "type:rpc=get_franchises",
        }

    ],
    on_submit: "type:rpc=add_character",
    on_update: "type:rpc=update_creator_character"
}

export const gadgetForm: IDynamicForm<eIGadget> = {
    entity: "gadgets",
    queries: [
        {
            field: "name",
            value: "",
            type: "text",
            label: "Name",
            required: true,
            placeholder: "Enter a name for the gadget"
        },
        {
            field: "nick_name",
            value: "",
            type: "text",
            label: "Nick Name",
            required: true,
            placeholder: "Enter a nick name for the gadget",
        },
        {
            field: "franchise",
            value: "",
            type: "options",
            label: "Franchise",
            required: true,
            query: "type:rpc=get_franchises",
            options: []
        },
        {
            field: "type",
            value: "",
            type: "options",
            label: "Type",
            required: true,
            options: [
                "weapon",
                "vehicle",
                "software",
                "mechanical",
                "electronic"
            ],
            placeholder: "Select a type for the gadget"
        },
        {
            field: "inventor",
            value: null,
            type: "options",
            label: "Inventor",
            required: false,
            query: "type:rpc=get_characters_for_select=franchise_id",
            options: []
        },
        {
            field: "description",
            value: "",
            type: "description",
            label: "Description",
            required: true,
            placeholder: "Enter a description of the gadget"
        },
        {
            field: "image",
            value: "",
            type: "image",
            label: "Image",
            required: true,
            placeholder: "Upload an image for the gadget",
        },
        {
            field: "expressive_color",
            value: "",
            type: "color",
            label: "Expressive Color",
            required: true,
            placeholder: "Select a color that suits the gadget",
        }
    ],
    on_submit: "type:rpc=add_gadget",
    on_update: "type:rpc=update_creator_gadget"
}

export const placeForm: IDynamicForm<eIPlace> = {
    entity: "places",
    queries: [
        {
            field: "name",
            value: "",
            type: "text",
            label: "Name",
            required: true,
            placeholder: "Enter a name for the place"
        },
        {
            field: "franchise",
            value: "",
            type: "options",
            label: "Franchise",
            required: true,
            query: "type:rpc=get_franchises",
            options: []
        },
        {
            field: "description",
            value: "",
            type: "description",
            label: "Description",
            required: true,
            placeholder: "Enter a description of the place"
        },
        {
            field: "image",
            value: "",
            type: "image",
            label: "Image",
            required: true,
            placeholder: "Upload an image for the place",
        }
    ],
    on_submit: "type:rpc=add_place",
    on_update: "type:rpc=update_creator_place"
}

export const speciesForm: IDynamicForm<eISpecies> = {
    entity: "species",
    queries: [
        {
            field: "name",
            value: "",
            type: "text",
            label: "Name",
            required: true,
            placeholder: "Enter a name for the species"
        },
        {
            field: "nick_name",
            value: "",
            type: "text",
            label: "Nick Name",
            required: true,
            placeholder: "Enter a nick name for the species",
        },
        {
            field: "franchise",
            value: "",
            type: "options",
            label: "Franchise",
            required: true,
            query: "type:rpc=get_franchises",
            options: []
        },
        {
            field: "description",
            value: "",
            type: "description",
            label: "Description",
            required: true,
            placeholder: "Enter a description of the species"
        },
        {
            field: "image",
            value: "",
            type: "image",
            label: "Image",
            required: true,
            placeholder: "Upload an image for the species",
        },
        {
            field: "place",
            value: "",
            type: "options",
            label: "Place",
            required: true,
            query: "type:rpc=get_places_for_select=franchise_id",
            options: []
        }
    ],
    on_submit: "type:rpc=add_species",
    on_update: "type:rpc=update_creator_species"
}

export const franchiseForm: IDynamicForm<franchise> = {
    entity: "franchise",
    queries: [
        {
            field: "name",
            value: "",
            type: "text",
            label: "Name",
            required: true,
            placeholder: "Enter a name for the franchise"
        },
        {
            field: "start_date",
            value: "",
            type: "text",
            label: "Start Year",
            required: true,
            placeholder: "Enter the start year for the franchise"
        },
        {
            field: "end_date",
            value: "",
            type: "text",
            label: "End Year",
            required: true,
            placeholder: "Enter the end year for the franchise"
        },
        {
            field: "description",
            value: "",
            type: "description",
            label: "Description",
            required: true,
            placeholder: "Enter a description of the franchise"
        },
        {
            field: "image",
            value: "",
            type: "image",
            label: "Image",
            placeholder: "Upload an image for the franchise",
            required: true,
        }
    ],
    on_submit: "type:rpc=add_franchise",
    on_update: "type:rpc=update_creator_franchise"
}

export const fightForm: IDynamicForm<eIFights> = {
    entity: "fights",
    queries: [
        {
            field: "name",
            value: "",
            type: "text",
            label: "Name",
            required: true,
            placeholder: "Enter a name for the fight"
        },
        {
            field: "franchise",
            value: "",
            type: "options",
            label: "Franchise",
            required: true,
            placeholder: "Select a franchise for the fight",
            query: "type:rpc=get_franchises",
            options: []
        },
        {
            field: "image",
            value: "",
            type: "image",
            label: "Image",
            required: true,
            placeholder: "Upload an image for the fight",
        },
        {
            field: "description",
            value: "",
            type: "description",
            label: "Description",
            required: true,
            placeholder: "Enter a description of the fight"
        },

    ],
    on_submit: "type:rpc=add_fight",
    on_update: "type:rpc=update_creator_fight"
}


