import { storiesOf } from "@storybook/react";
import React from "react";
import { glyphFactory, SVGGlyph } from "../../assets/svg-element";
import { ContextMenuItem } from "./";

storiesOf("Context menu item", module)
    .add("Default", () => <ContextMenuItem>Default menu item</ContextMenuItem>)
    .add("With glyph", () => (
        <ContextMenuItem before={glyphFactory(SVGGlyph.download)()}>
            Menu item with glyph
        </ContextMenuItem>
    ))
    .add("Disabled", () => (
        <ContextMenuItem disabled={true}>Disabled menu item</ContextMenuItem>
    ));
