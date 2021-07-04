/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Context menu item",
    description: "A context menu item component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/context-menu-item",
    formPluginId: "@microsoft/fast-components-react-base/context-menu-item",
    properties: {
        disabled: {
            title: "Disabled",
            type: "boolean",
        },
        role: {
            title: "HTML role attribute",
            type: "string",
            default: "menuitem",
            enum: ["menuitem", "menuitemradio", "menuitemcheckbox"],
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId:
                "@microsoft/fast-components-react-base/context-menu-item/children",
            ids: ["metatext"],
            defaults: ["text"],
        },
    },
};
