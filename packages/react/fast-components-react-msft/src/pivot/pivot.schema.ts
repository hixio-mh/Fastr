/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Pivot",
    description: "A pivot component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/pivot",
    formPluginId: "@microsoft/fast-components-react-msft/pivot",
    properties: {
        activeId: {
            title: "Active pivot ID",
            type: "string",
        },
        label: {
            title: "HTML aria-label attribute",
            type: "string",
        },
        orientation: {
            title: "HTML aria-orientation attribute",
            type: "string",
            enum: ["horizontal", "vertical"],
        },
        items: {
            title: "Items",
            type: "array",
            items: {
                title: "Item",
                type: "object",
                properties: {
                    id: {
                        title: "HTML id attribute",
                        type: "string",
                    },
                },
                required: ["tab", "content", "id"],
                reactProperties: {
                    tab: {
                        title: "Pivot tab",
                        type: "children",
                        formPluginId:
                            "@microsoft/fast-components-react-msft/pivot/items/tab",
                        pluginId: "@microsoft/fast-components-react-msft/pivot/items/tab",
                    },
                    content: {
                        title: "Pivot content",
                        type: "children",
                        formPluginId:
                            "@microsoft/fast-components-react-msft/pivot/items/content",
                        pluginId:
                            "@microsoft/fast-components-react-msft/pivot/items/content",
                    },
                },
            },
        },
    },
};
