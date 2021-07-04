import { WebComponentDefinition } from "@microsoft/fast-tooling/dist/data-utilities/web-component";
import { ListboxRole } from "@microsoft/fast-foundation/dist/esm/listbox/listbox.options";
import { DataType } from "@microsoft/fast-tooling";

export const fastListboxDefinition: WebComponentDefinition = {
    version: 1,
    tags: [
        {
            name: "fast-listbox",
            description: "The FAST listbox element",
            attributes: [
                {
                    name: "role",
                    description: "The role attribute",
                    type: DataType.string,
                    default: ListboxRole.listbox,
                    required: true,
                    values: Object.keys(ListboxRole).map(e => ({ name: `${e}` })),
                },
                {
                    name: "disabled",
                    description: "The disabled attribute",
                    type: DataType.boolean,
                    default: false,
                    required: false,
                },
            ],
            slots: [
                {
                    name: "",
                    description: "The default slot",
                },
            ],
        },
    ],
};
