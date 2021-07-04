/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Breadcrumb",
    description: "A breadcrumb component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/breadcrumb",
    formPluginId: "@microsoft/fast-components-react-msft/breadcrumb",
    properties: {
        label: {
            title: "label",
            type: "string",
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            examples: ["Lorem"],
        },
        separator: {
            title: "Separator",
            type: "children",
            pluginId: "@microsoft/fast-components-react-msft/breadcrumb/separator",
            formPluginId: "@microsoft/fast-components-react-msft/breadcrumb/separator",
            defaults: ["text"],
        },
    },
    required: ["children"],
};
