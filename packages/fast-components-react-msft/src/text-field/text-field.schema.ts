export default {
    $schema: "http://json-schema.org/schema#",
    title: "Text field",
    description: "A Text Field component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/text-field",
    formPluginId: "@microsoft/fast-components-react-msft/text-field",
    properties: {
        disabled: {
            title: "Disabled",
            type: "boolean",
        },
        type: {
            title: "Input type",
            type: "string",
            enum: ["email", "number", "password", "search", "tel", "text", "url"],
        },
        placeholder: {
            title: "Placeholder",
            type: "string",
        },
        appearance: {
            title: "Appearance",
            type: "string",
            enum: ["filled", "outline"],
        },
    },
};
