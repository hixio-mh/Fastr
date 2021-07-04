import { customElement } from "@microsoft/fast-element";
import { XCardTemplate as template } from "./x-card.template";
import { XCardStyles as styles } from "./x-card.styles";
import { FASTCard } from "@microsoft/fast-components";

@customElement({
    name: "x-card",
    template,
    styles,
})
export class XCard extends FASTCard {}
export * from "./x-card.template";
export * from "./x-card.styles";
export * from "./x-card";
