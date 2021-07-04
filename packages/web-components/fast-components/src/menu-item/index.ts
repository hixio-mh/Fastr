import { MenuItem, menuItemTemplate as template } from "@microsoft/fast-foundation";
import { menuItemStyles as styles } from "./menu-item.styles";

/**
 * The FAST Menu Item Element. Implements {@link @microsoft/fast-foundation#MenuItem},
 * {@link @microsoft/fast-foundation#menuItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-menu-item\>
 */
export const fastMenuItem = MenuItem.compose({
    baseName: "menu-item",
    template,
    styles,
});

/**
 * Styles for MenuItem
 * @public
 */
export const menuItemStyles = styles;
