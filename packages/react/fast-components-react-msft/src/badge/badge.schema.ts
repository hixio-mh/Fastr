/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Badge",
    description: "A badge component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/badge",
    formPluginId: "@microsoft/fast-components-react-msft/badge",
    properties: {
        filled: {
            title: "Filled",
            type: "boolean",
        },
        size: {
            title: "Size",
            type: "string",
            default: "primary",
            enum: ["small", "large"],
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            defaults: ["text"],
            formPluginId: "@microsoft/fast-components-react-msft/badge/children",
            examples: ["Lorem"],
        },
    },
    required: ["children"],
};
