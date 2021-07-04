/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Listbox item",
    description: "A listbox item component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/listbox-item",
    formPluginId: "@microsoft/fast-components-react-base/listbox-item",
    properties: {
        disabled: {
            title: "Disabled",
            type: "boolean",
        },
        displayString: {
            title: "Display string",
            type: "string",
        },
        id: {
            title: "Unique ID",
            type: "string",
        },
        value: {
            title: "Value",
            type: "string",
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-base/listbox-item/children",
            defaults: ["text"],
        },
    },
    required: ["id", "value"],
};
