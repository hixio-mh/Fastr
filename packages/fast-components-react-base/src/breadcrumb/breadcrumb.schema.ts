export default {
    $schema: "http://json-schema.org/schema#",
    title: "Breadcrumb",
    description: "A breadcrumb component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/breadcrumb",
    formPluginId: "@microsoft/fast-components-react-base/breadcrumb",
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
            formPluginId: "@microsoft/fast-components-react-base/breadcrumb/children",
            defaults: ["text"],
        },
        separator: {
            title: "Separator",
            type: "children",
            formPluginId:
                "@microsoft/fast-components-react-base/badbreadcrumbge/separator",
            pluginId: "@microsoft/fast-components-react-base/breadcrumb/separator",
            defaults: ["text"],
        },
    },
};
