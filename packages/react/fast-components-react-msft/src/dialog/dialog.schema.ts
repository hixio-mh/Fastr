/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Dialog",
    description: "A dialog component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/dialog",
    formPluginId: "@microsoft/fast-components-react-msft/dialog",
    properties: {
        describedBy: {
            title: "HTML aria-describedby attribute",
            type: "string",
            examples: ["exampleId01"],
        },
        label: {
            title: "HTML aria-label attribute",
            type: "string",
            examples: ["Dialog label"],
        },
        labelledBy: {
            title: "HTML aria-labelledby attribute",
            type: "string",
            examples: ["exampleId02"],
        },
        contentHeight: {
            title: "Content height",
            type: "string",
            examples: ["300px"],
        },
        contentWidth: {
            title: "Content width",
            type: "string",
            examples: ["500px"],
        },
        modal: {
            title: "Modal",
            type: "boolean",
        },
        visible: {
            title: "Visible",
            type: "boolean",
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-msft/dialog/children",
            defaults: ["text"],
        },
    },
};
