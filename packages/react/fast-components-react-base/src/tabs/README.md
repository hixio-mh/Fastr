# Tabs
Use *tabs* when there is a paged interface where one controlling tab element corresponds to one tab panel.

## Usage
The *tabs* component can be passed a collection of *tabitems* via the `items` prop. The `items` prop expects an array of the interface `Item`. `Item` consists of `tab`, `content` and `id`. `tab` and `content` will render a ReactNode and `id` is a string that represents its unique identifier.

## Accessibility
The *tabs* component is based off the [WAI-ARIA spec](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel). It utilizes activation on left/right keyboard buttons for navigation through the tab list and the home and end keyboard buttons to navigate to the beginning and end tabs respectively.
