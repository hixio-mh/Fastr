/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Context menu",
    description: "A context menu component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/context-menu",
    formPluginId: "@microsoft/fast-components-react-base/context-menu",
    properties: {},
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-base/context-menu/children",
            ids: [
                "@microsoft/fast-components-react-base/context-menu-item",
                "@microsoft/fast-components-react-base/divider",
            ],
        },
    },
};
