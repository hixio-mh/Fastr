## Listbox
A generic listbox component implementing the [listbox](https://www.w3.org/TR/wai-aria-1.1/#listbox) role and the keyboard navigation aligning to that role.

### Usage
The *listbox* will accept any child elements but the only children that should receive focus are either *listbox-item* or custom components that have the role of "option" and appropriately call the "itemInvoked" and "itemFocused" functions on the ListboxContext provided by the parent *listbox* component.  It also expects that these elements are passed as *direct* children. Wrapping all menu items inside of a `React.Fragment` (or some other single element) will throw off the internal focus tracking of the *listbox*. Additionally, the *listbox* component sets the `tabIndex` property of its children as it manages focus, child components should not set tabindex independently.

The *listbox* "typeAheadPropertyKey" prop indicates which prop the *listbox* examines on children to manage focus when text entry is used to control focus.  The referenced property must be a string and the default value is "displayString" which matches the prop intended for user friendly strings on *listbox-item*.

To get results from user interaction with the *listbox* hook up to the "onSelectedItemsChanged" callback prop.  Whenever selection changes this function is called with the new array of selected "ListboxItemData" objects which have the following properties:
- id:  the unique id of the corresponding option
- value: the string value associated with the option
- displayString: optional, a user friendly version of the value to display in ui.

Use the optional "defaultSelection" prop to provide a string[] of the id's of selected items to the component.  Providing a new value for the defaultSelection prop in uncontrolled  mode after the component has intitially mounted will cause the component to reset its selection and focus accordingly.  "defaultSelection" has no effect in controlled mode ("ie. when the "selectedItems" prop is defined).

Invalid items (ie. that don't have matching non-disabled items with the same id as children of the *listbox*) are removed and in single select mode only the first valid item is relevant.

Use the "selectedItems" prop for a fully controlled mode.  The string[] of item ids provided with this prop override all the *listbox* internal selection logic.

### Accessibility
Listbox implements the recommended keyboard navigation scheme described [here](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox).