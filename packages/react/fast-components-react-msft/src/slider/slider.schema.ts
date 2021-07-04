/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Slider",
    description: "A slider component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/slider",
    formPluginId: "@microsoft/fast-components-react-msft/slider",
    properties: {
        disabled: {
            title: "Disabled",
            type: "boolean",
        },
        orientation: {
            title: "Orientation",
            type: "string",
            default: "horizontal",
            enum: ["horizontal", "vertical"],
        },
        mode: {
            title: "Mode",
            type: "string",
            default: "singleValue",
            enum: ["singleValue", "adustUpperValue", "adjustLowerValue", "adjustBoth"],
        },
        initialValue: {
            title: "Initial value",
            oneOf: [
                {
                    type: "number",
                    description: "Single value",
                },
                {
                    type: "object",
                    description: "Min and Max value of range",
                    properties: {
                        minValue: {
                            title: "Min value",
                            type: "number",
                        },
                        maxValue: {
                            title: "Max value",
                            type: "number",
                        },
                    },
                    required: ["minValue", "maxValue"],
                },
            ],
        },
        constrainedRange: {
            title: "Constrained range",
            type: "object",
            properties: {
                minValue: {
                    title: "- Min value",
                    type: "number",
                },
                maxValue: {
                    title: "- Max value",
                    type: "number",
                },
            },
            required: ["minValue", "maxValue"],
        },
        range: {
            title: "Range",
            type: "object",
            description: "Min and Max value of range",
            properties: {
                minValue: {
                    title: "Min value",
                    type: "number",
                },
                maxValue: {
                    title: "Max value",
                    type: "number",
                },
            },
            required: ["minValue", "maxValue"],
        },
        step: {
            title: "Step",
            type: "number",
        },
        pageStep: {
            title: "Page step",
            type: "number",
        },
        value: {
            title: "Value",
            type: "number",
        },
        name: {
            title: "Name",
            type: "string",
        },
        form: {
            title: "Form",
            type: "string",
        },
        labelledBy: {
            title: "Labelled by",
            type: "string",
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            defaults: [],
        },
    },
};
