import { WebComponentDefinition } from "@microsoft/fast-tooling/dist/esm/data-utilities/web-component";
import { DataType } from "@microsoft/fast-tooling";

export const pathDefinition: WebComponentDefinition = {
    version: 1,
    tags: [
        {
            name: "path",
            description: "The path element",
            attributes: [
                {
                    name: "d",
                    description: "The path d",
                    default: "",
                    type: DataType.string,
                    required: false,
                },
                {
                    name: "stroke-linecap",
                    description: "The path stroke-linecap",
                    default: "",
                    type: DataType.string,
                    required: false,
                },
                {
                    name: "stroke-linejoin",
                    description: "The path stroke-linejoin",
                    default: "",
                    type: DataType.string,
                    required: false,
                },
            ],
            slots: [],
        },
    ],
};
