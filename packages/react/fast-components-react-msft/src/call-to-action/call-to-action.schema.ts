/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Call to action",
    description: "A call to action component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/call-to-action",
    formPluginId: "@microsoft/fast-components-react-msft/call-to-action",
    properties: {
        href: {
            title: "HTML href attribute",
            type: "string",
        },
        appearance: {
            title: "Appearance",
            type: "string",
            default: "primary",
            enum: ["justified", "lightweight", "outline", "primary", "stealth"],
        },
        disabled: {
            title: "Disabled",
            type: "boolean",
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-msft/call-to-action/children",
            defaults: ["text"],
            examples: ["Lorem ipsum sit"],
        },
    },
    required: ["children"],
};
