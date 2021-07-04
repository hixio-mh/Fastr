import { linkedDataSchema } from "@microsoft/fast-tooling";

/**
 * Complies with FAST Tooling 2.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Radio",
    description: "A radio component's schema definition",
    type: "object",
    id: "@microsoft/fast-components-react-base/radio",
    formPluginId: "@microsoft/fast-components-react-base/radio",
    properties: {
        inputId: {
            title: "Unique Id",
            type: "string",
            examples: ["radio01"],
        },
        checked: {
            title: "Checked",
            type: "boolean",
        },
        disabled: {
            title: "Disabled",
            type: "boolean",
        },
        ariaLabel: {
            title: "Aria-label",
            type: "string",
            examples: ["label"],
        },
        name: {
            title: "Name",
            type: "string",
            examples: ["name"],
        },
        children: {
            ...linkedDataSchema,
            formPluginId: "@microsoft/fast-components-react-base/radio/children",
            defaults: ["text"],
        },
        label: {
            ...linkedDataSchema,
            title: "Label",
            formPluginId: "@microsoft/fast-components-react-base/radio/label",
            pluginId: "@microsoft/fast-components-react-base/radio/label",
        },
    },
    required: ["inputId"],
};
