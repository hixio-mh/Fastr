export default {
    $schema: "http://json-schema.org/schema#",
    title: "Image",
    description: "An image component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/image",
    formPluginId: "@microsoft/fast-components-react-base/image",
    properties: {
        alt: {
            title: "HTML alt attribute",
            type: "string",
            examples: ["HTML alt attribute example text"],
        },
        sizes: {
            title: "HTML sizes attribute",
            type: "string",
        },
        src: {
            title: "HTML src attribute",
            type: "string",
            examples: ["https://placehold.it/80x80"],
        },
        srcSet: {
            title: "HTML srcSet attribute",
            type: "string",
        },
    },
    required: ["src", "alt"],
};
