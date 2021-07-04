import {
    AnchoredRegion,
    anchoredRegionTemplate as template,
} from "@microsoft/fast-foundation";
import { anchoredRegionStyles as styles } from "./anchored-region.styles";

/**
 * The FAST AnchoredRegion Element. Implements {@link @microsoft/fast-foundation#AnchoredRegion},
 * {@link @microsoft/fast-foundation#anchoredRegionTemplate}
 *
 *
 * @beta
 * @remarks
 * HTML Element: \<fast-anchored-region\>
 */
export const fastAnchoredRegion = AnchoredRegion.compose({
    baseName: "anchored-region",
    template,
    styles,
});

/**
 * Styles for AnchoredRegion
 * @public
 */
export const anchoredRegionStyles = styles;
