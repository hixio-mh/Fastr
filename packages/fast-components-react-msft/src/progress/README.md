# Progress
The *progress* component is an [div](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) element with it `role` set to "progressbar". Setting the `value` prop will automatically display child elements with their `role` set to "deteminate" if `value` is undefined child elements with their `role` set to "indeteminate" will be displayed.

## Usage
The *progress* component should be used for an element that displays the progress status for a task that takes a long time or consists of several steps. The *progress* component indicates that the user's request has been received and the application is making progress toward completing the requested action. If the `value` of the *progress* component can't be determined then the indeterminate visuals will be shown until the `value` is determined.

## Style guidance
The determinate visuals should indicate to the user how much is remaining of a given task. The indeterminate should be a repeating animation to indicate to the user that their request is being processed and the application is responsive.