/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Typography",
    description: "A typography component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/typography",
    formPluginId: "@microsoft/fast-components-react-base/typography",
    properties: {
        tag: {
            title: "HTML tag",
            type: "string",
            enum: [
                "caption",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "p",
                "span",
                "figcaption",
            ],
        },
        size: {
            title: "Type size",
            type: "number",
            enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-base/typography/children",
            defaults: ["text"],
        },
    },
};
