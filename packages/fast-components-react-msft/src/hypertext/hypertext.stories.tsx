import { storiesOf } from "@storybook/react";
import React from "react";
import { Hypertext } from "../hypertext";
import API from "./API.md";

storiesOf("Hypertext", module)
    .addParameters({
        readme: {
            sidebar: API,
        },
    })
    .add("With href", () => <Hypertext href="#">Hypertext</Hypertext>)
    .add("Without href", () => <Hypertext>Without href</Hypertext>);
