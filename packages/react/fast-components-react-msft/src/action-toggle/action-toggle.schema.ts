/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Action toggle",
    description: "An action toggle component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/action-toggle",
    formPluginId: "@microsoft/fast-components-react-msft/action-toggle",
    properties: {
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
        selected: {
            title: "Selected",
            type: "boolean",
        },
        selectedLabel: {
            title: "Selected HTML aria-label attribute",
            type: "string",
        },
        unselectedLabel: {
            title: "Unselected HTML aria-label attribute",
            type: "string",
        },
    },
    reactProperties: {
        selectedGlyph: {
            title: "Selected glyph",
            type: "children",
            formPluginId:
                "@microsoft/fast-components-react-msft/action-toggle/selectedGlyph",
            pluginId: "@microsoft/fast-components-react-msft/action-toggle/selectedGlyph",
        },
        unselectedGlyph: {
            title: "Unselected glyph",
            type: "children",
            formPluginId:
                "@microsoft/fast-components-react-msft/action-toggle/unselectedGlyph",
            pluginId:
                "@microsoft/fast-components-react-msft/action-toggle/unselectedGlyph",
        },
        selectedContent: {
            title: "Selected content",
            type: "children",
            formPluginId:
                "@microsoft/fast-components-react-msft/action-toggle/selectedContent",
        },
        unselectedContent: {
            title: "Unselected content",
            type: "children",
            formPluginId:
                "@microsoft/fast-components-react-msft/action-toggle/unselectedContent",
        },
    },
};
