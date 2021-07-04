/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Text action",
    description: "A text action component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/text-action",
    formPluginId: "@microsoft/fast-components-react-msft/text-action",
    properties: {
        disabled: {
            title: "Disabled",
            type: "boolean",
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
    reactProperties: {
        beforeGlyph: {
            title: "Before glyph",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-msft/text-action/beforeGlyph",
            pluginId: "@microsoft/fast-components-react-msft/text-action/beforeGlyph",
        },
        button: {
            title: "Button",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-msft/text-action/button",
            pluginId: "@microsoft/fast-components-react-msft/text-action/button",
        },
        afterGlyph: {
            title: "After glyph",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-msft/text-action/afterGlyph",
            pluginId: "@microsoft/fast-components-react-msft/text-action/afterGlyph",
        },
    },
};
