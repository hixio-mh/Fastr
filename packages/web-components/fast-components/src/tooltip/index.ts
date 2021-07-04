import { customElement } from "@microsoft/fast-element";
import { createTooltipTemplate, Tooltip } from "@microsoft/fast-foundation";
import { TooltipStyles as styles } from "./tooltip.styles";
import { FASTAnchoredRegion } from "../anchored-region";

// prevent tree shaking
FASTAnchoredRegion;

/**
 * The FAST Tooltip Custom Element. Implements {@link @microsoft/fast-foundation#Tooltip},
 * {@link @microsoft/fast-foundation#createTooltipTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-tooltip\>
 */
@customElement({
    name: "fast-tooltip",
    template: createTooltipTemplate("fast"),
    styles,
})
export class FASTTooltip extends Tooltip {}
