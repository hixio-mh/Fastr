import { parseColorHexRGB } from "@microsoft/fast-colors";
import { createColorPalette } from "@microsoft/fast-components";
import { DesignSystem } from "@microsoft/fast-foundation";
import { CardDefinition } from "./card";
import { neutralFillCardRecipe, neutralForegroundRestRecipe } from "./recipes";
import * as DesignTokens from "./tokens";

const root = document.body as HTMLBodyElement;
DesignTokens.accentColor.withDefault("0078D4");
DesignTokens.accentPalette.withDefault(element =>
    createColorPalette(parseColorHexRGB(DesignTokens.accentColor.getValueFor(element)))
);
DesignTokens.neutralColor.withDefault("#878787");
DesignTokens.neutralPalette.withDefault(element =>
    createColorPalette(parseColorHexRGB(DesignTokens.neutralColor.getValueFor(element)))
);
DesignTokens.backgroundColor.withDefault(
    element => DesignTokens.neutralPalette.getValueFor(element)[0]
);

DesignTokens.neutralFillCardDelta.withDefault(3);
DesignTokens.neutralFillCard.withDefault(neutralFillCardRecipe);

DesignTokens.backgroundColor.addCustomPropertyFor(root) &&
    root.style.setProperty("background-color", DesignTokens.backgroundColor.createCSS());
DesignTokens.neutralForegroundRest.withDefault(neutralForegroundRestRecipe);

const ds = new DesignSystem().withPrefix("test").register(CardDefinition()).applyTo(root);

document.getElementById("mode-switch")?.addEventListener("click", () => {
    const palette = DesignTokens.neutralPalette.getValueFor(root);
    const bg = DesignTokens.backgroundColor.getValueFor(root);
    DesignTokens.backgroundColor.setValueFor(
        root,
        bg === palette[0] ? palette[palette.length - 1] : palette[0]
    );
});
