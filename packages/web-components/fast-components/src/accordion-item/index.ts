import {
    AccordionItem,
    accordionItemTemplate as template,
} from "@microsoft/fast-foundation";
import { accordionItemStyles as styles } from "./accordion-item.styles";

/**
 * The FAST Accordion Item Element. Implements {@link @microsoft/fast-foundation#AccordionItem},
 * {@link @microsoft/fast-foundation#accordionItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-accordion-item\>
 */
export const fastAccordionItem = AccordionItem.compose({
    baseName: "accordion-item",
    template,
    styles,
});

/**
 * Styles for AccordionItem
 * @public
 */
export const accordionItemStyles = styles;
