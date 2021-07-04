import { DesignToken } from "@microsoft/fast-foundation";

export const accentColor = DesignToken.create<string>("accent-color");
export const accentPalette = DesignToken.create<string[]>("accent-palette");
export const neutralColor = DesignToken.create<string>("neutral-color");
export const neutralPalette = DesignToken.create<string[]>("neutral-palette");
export const backgroundColor = DesignToken.create<string>("background-color");

export const neutralFillCardDelta = DesignToken.create<number>("neutral-fill-card-delta");
export const neutralFillCard = DesignToken.create<string>("neutral-fill-card");

export const neutralForegroundRest = DesignToken.create<string>(
    "neutral-foreground-rest"
);
