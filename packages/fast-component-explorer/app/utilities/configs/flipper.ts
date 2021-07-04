import React from "react";
import { ComponentViewConfig } from "./data.props";
import {
    Flipper,
    FlipperDirection,
    FlipperProps,
    flipperSchema,
} from "@microsoft/fast-components-react-msft";
import Guidance from "../../.tmp/flipper/guidance";
import API from "../api";

const flipperConfig: ComponentViewConfig<FlipperProps> = {
    api: API(React.lazy(() => import("../../.tmp/flipper/api"))),
    schema: flipperSchema,
    component: Flipper,
    guidance: Guidance,
    scenarios: [
        {
            displayName: "Next",
            data: {},
        },
        {
            displayName: "Previous",
            data: {
                direction: FlipperDirection.previous,
            },
        },
    ],
};

export default flipperConfig;
