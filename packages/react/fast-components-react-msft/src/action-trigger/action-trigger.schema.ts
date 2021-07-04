/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Action trigger",
    description: "An action trigger component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/action-trigger",
    formPluginId: "@microsoft/fast-components-react-msft/action-trigger",
    properties: {
        disabled: {
            title: "Disabled",
            type: "boolean",
        },
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
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-msft/action-trigger/children",
            examples: ["Lorem ipsum"],
        },
        glyph: {
            title: "Glyph",
            type: "children",
            pluginId: "@microsoft/fast-components-react-msft/action-trigger/glyph",
            formPluginId: "@microsoft/fast-components-react-msft/action-trigger/glyph",
            examples: [
                {
                    id: "svg-svg-element",
                    props: {},
                },
            ],
        },
    },
    required: ["children", "glyph"],
};
