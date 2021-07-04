# Dialog

The *dialog* component accepts children and can either be a modal, or a non-modal dialog. Modal dialogs prevent users from interacting with the rest of the page content, while non-modal dialogs allow users the ability to continue interacting with the page. The width and height of the dialog content area can be set by props. If no props are passed to set width or height, the dialog width will default to 640px and the height will default to 480px.

## Accessibility

A *dialog* must include one focusable control. When the dialog appears on the screen, keyboard focus should move to the first focusable element. While not required to be focused, a dialog should include a label. This can be applied as an [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) using the `label` prop, or by referencing a child within the dialog with the [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute) attribute using the `labelledby` prop. Optionally, additional context can be provided to assistive technologies by including an [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute) attribute which can be applied using the `describedby` prop.

Learn more about [dialog accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_dialog_role).