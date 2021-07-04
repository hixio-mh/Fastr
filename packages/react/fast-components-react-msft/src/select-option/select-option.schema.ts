/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Select option",
    description: "A select option component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/select-option",
    formPluginId: "@microsoft/fast-components-react-msft/select-option",
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
            formPluginId: "@microsoft/fast-components-react-msft/select-option/children",
            defaults: ["text"],
        },
        glyph: {
            title: "Glyph",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-msft/select-option/glyph",
            pluginId: "@microsoft/fast-components-react-msft/select-option/glyph",
        },
    },
    required: ["id", "value"],
};
