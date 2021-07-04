import { customElement } from "@microsoft/fast-element";
import { ToolbarTemplate, Toolbar } from "@microsoft/fast-foundation";
import { ToolbarStyles as styles } from "./toolbar.styles";

/**
 * The FAST Toolbar Custom Element. Implements {@link @microsoft/fast-foundation#Toolbar},
 * {@link @microsoft/fast-foundation#ToolbarTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-toolbar\>
 */
@customElement({
    name: "fast-toolbar",
    template: ToolbarTemplate,
    styles,
})
export class FASTToolbar extends Toolbar {}
