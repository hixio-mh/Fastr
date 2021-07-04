import { customElement } from "@microsoft/fast-element";
import { ContentCardContainer } from "./content-card-container";
import { ContentCardContainerTemplate as template } from "./content-card-container.template";
import { ContentCardContainerStyles as styles } from "./content-card-container.styles";

@customElement({
    name: "fast-content-card-container",
    template,
    styles,
})
export class FASTContentCardContainer extends ContentCardContainer {}
export * from "./content-card-container.template";
export * from "./content-card-container.styles";
export * from "./content-card-container";
