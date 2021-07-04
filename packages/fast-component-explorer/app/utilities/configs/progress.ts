import { ComponentViewConfig } from "./data.props";
import {
    Progress,
    ProgressProps,
    progressSchema,
} from "@microsoft/fast-components-react-msft";
import Guidance from "../../.tmp/progress/guidance";

const progressConfig: ComponentViewConfig<ProgressProps> = {
    schema: progressSchema,
    component: Progress,
    guidance: Guidance,
    scenarios: [
        {
            displayName: "Indeterminate",
            data: {},
        },
        {
            displayName: "Min, max and value",
            data: {
                minValue: 0,
                maxValue: 100,
                value: 72,
            },
        },
    ],
};

export default progressConfig;
