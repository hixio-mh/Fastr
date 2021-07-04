import { customElement } from "@microsoft/fast-element";
import { FeatureCard } from "./feature-card";
import { FeatureCardTemplate as template } from "./feature-card.template";
import { FeatureCardStyles as styles } from "./feature-card.styles";

@customElement({
    name: "fast-feature-card",
    template,
    styles,
})
export class FASTFeatureCard extends FeatureCard {}
export * from "./feature-card.template";
export * from "./feature-card.styles";
export * from "./feature-card";
