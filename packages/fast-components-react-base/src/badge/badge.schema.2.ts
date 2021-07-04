import { linkedDataSchema } from "@microsoft/fast-tooling";

/**
 * Complies with FAST Tooling 2.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Badge",
    description: "A badge component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/badge",
    formPluginId: "@microsoft/fast-components-react-base/badge",
    properties: {
        children: {
            ...linkedDataSchema,
            formPluginId: "@microsoft/fast-components-react-base/badge/children",
        },
    },
};
