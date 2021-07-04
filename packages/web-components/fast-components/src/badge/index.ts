import { customElement } from "@microsoft/fast-element";
import { Badge, BadgeTemplate as template } from "@microsoft/fast-foundation";
import { BadgeStyles as styles } from "./badge.styles";

/**
 * The FAST Badge Element. Implements {@link @microsoft/fast-foundation#Badge},
 * {@link @microsoft/fast-foundation#BadgeTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-badge\>
 */
@customElement({
    name: "fast-badge",
    template,
    styles,
})
export class FASTBadge extends Badge {}

/**
 * Styles for Badge
 * @public
 */
export { BadgeStyles } from "./badge.styles";
