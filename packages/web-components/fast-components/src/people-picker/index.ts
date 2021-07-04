import { customElement, html, ViewTemplate } from "@microsoft/fast-element";
import {
    createPickerListTemplate,
    createPickerMenuTemplate,
    createPickerTemplate,
    PickerList,
    PickerMenu,
} from "@microsoft/fast-foundation";
import { PeoplePickerStyles as pickerStyles } from "./people-picker.styles";
import { PeoplePickerMenuStyles as pickerMenuStyles } from "./people-picker-menu.styles";
import { PeoplePickerListStyles as pickerListStyles } from "./people-picker-list.styles";
import { PeoplePicker } from "./people-picker";

const itemTemplate: ViewTemplate = html`
    <button
        role="listitem"
        tabindex="0"
        @click="${(x, c) => c.parent.handleItemClick(c.event as MouseEvent, c.index)}"
        @keydown="${(x, c) =>
            c.parent.handleItemKeyDown(c.event as KeyboardEvent, c.index)}"
    >
        <mgt-person user-id="${x => x}" view="oneLine"></mgt-person>
    </button>
`;

const optionTemplate: ViewTemplate = html`
    <button
        role="listitem"
        tabindex="-1"
        @click="${(x, c) => c.parent.handleOptionClick(c.event as MouseEvent, x)}"
    >
        <mgt-person
            user-id="${x => x}"
            view="twoLines"
            line2-property="jobTitle"
        ></mgt-person>
    </button>
`;

/**
 * The FAST People Picker Custom Element. Implements {@link @microsoft/fast-foundation#PeoplePicker},
 * {@link @microsoft/fast-foundation#PeoplePickerTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-people-picker\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
    name: "fast-people-picker",
    template: createPickerTemplate("fast", "people", itemTemplate, optionTemplate),
    styles: pickerStyles,
    shadowOptions: {
        delegatesFocus: true,
    },
})
export class FASTPeoplePicker extends PeoplePicker {}

/**
 * Styles for PeoplePicker
 * @public
 */
export const PeoplePickerStyles = pickerStyles;

/**
 *
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-people-picker-menu\>
 *
 */
@customElement({
    name: "fast-people-picker-menu",
    template: createPickerMenuTemplate("fast"),
    styles: pickerMenuStyles,
})
export class FASTPeoplePickerMenu extends PickerMenu {}

/**
 * Styles for PeoplePickerMenu
 * @public
 */
export const PeoplePickerMenuStyles = pickerMenuStyles;

/**
 *
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-people-picker-list\>
 *
 */
@customElement({
    name: "fast-people-picker-list",
    template: createPickerListTemplate("fast"),
    styles: pickerListStyles,
})
export class FASTPeoplePickerList extends PickerList {}

/**
 * Styles for PeoplePickerList
 * @public
 */
export const PeoplePickerListStyles = pickerListStyles;
