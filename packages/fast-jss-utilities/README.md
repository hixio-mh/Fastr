# FAST JSS utilities

This package is a collection of utilities intended to be used with JSS (JavaScript Style Sheets) projects.

## Installation

`npm i --save @microsoft/fast-jss-utilities`

## Usage

### Direction

The `Direction` is an enum which can be either ltr or rtl.

```ts
import { Direction } from "@microsoft/fast-jss-utilities";

const direction = Direction.ltr;
```

### localizeSpacing

The `localizeSpacing` function should be used in conjuction with `Direction` to switch the spacing on a padding or margin.

```ts
import { Direction, localizeSpacing } from "@microsoft/fast-jss-utilities";

const styles = {
    button: {
        padding: localizeSpacing(Direction.ltr)("8px 8px 12px 12px")
    }
};
```

### applyFocusVisible

`applyFocusVisible` accepts style(s) and an optional selector string. `applyFocusVisible` automatically removes user-agent focus outlines by setting `outline: "none"`.

This function implements the utility for all focus states, if you want to enable focus-visible support you should implement the [focus-visible polyfill](https://www.npmjs.com/package/focus-visible). Styles that are given will be returned with a focus selector that is based on whether focus-visible is supported natively by the browser, if focus-visible is not supported we apply selectors that mimic polyfill's behavior. If a selector has been passed, this will be added to the focus selector string for the styles. If you are padding a selector be sure to include a space before the selector so it appends properly.

```js
import { applyFocusVisible } from "@microsoft/fast-jss-utilities";

const styles = {
    myComponent: {
        background: "blue",
        ...applyFocusVisible({
            background: "red",
        }),
    },
    myOtherComponent: {
        ...applyFocusVisible("& $optionalSelectorClass", {
            background: "red"
        })
    }
}
```

```css
    myComponent {
        background: blue;
    }

    myComponent:focus-visible {
        background: red;
    }

    myOtherComponent:focus-visible .optionalSelectorClass {
        background: red;
    }
```

### applyLocalizedProperty

The `applyLocalizedProperty` function will swap the strings for the property based on the `Direction`.

```ts
import { Direction, applyLocalizedProperty } from "@microsoft/fast-jss-utilities";

const styles = {
    button: {
        [applyLocalizedProperty("left", "right", Direction.ltr)]: "0"
    }
};
```

### toPx

The `toPx` function transforms a number to a string appended with `px`.

```ts
import { toPx } from "@microsoft/fast-jss-utilities";

const styles = {
    button: {
        padding: toPx(5)
    }
};
```

### applyMaxLines

The `applyMaxLines` function is used whenever there is a limit on the number of lines shown. It takes two parameters, the number of lines and the line-height in px.

```ts
import { applyMaxLines } from "@microsoft/fast-jss-utilities";

const styles = {
    button: {
        ...applyMaxLines(2, 24)
    }
};
```

### applyScreenReader

The `applyScreenReader` function should be used whenever there is an item that is hidden from a sighted user but visible to screen readers.

```ts
import { applyScreenReader } from "@microsoft/fast-jss-utilities";

const styles = {
    label: {
        ...applyScreenReader()
    }
};
```

### ellipsis

The `ellipsis` function will create the standard CSS needed to give an element with text an ellipsis.

```ts
import { ellipsis } from "@microsoft/fast-jss-utilities";

const styles = {
    label: {
        ...ellipsis()
    }
};
```

### applyAcrylic

The `applyAcrylic` function can be used to create a partially transparent texture for the background of a specific element.

```ts
import { applyAcrylic } from "@microsoft/fast-jss-utilities";

const acrylicConfig: IAcrylicConfig = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    fallbackBackgroundColor: "#000000",
    blurRadius: "20px",
    saturation: "112%",
}

const styles = {
    backgroundElement: {
        ...applyAcrylic<IDesignSystem>(acrylicConfig)
    }
};
```

### withDefaults

The `withDefaults` function can be used to ensure that all properties of a given object are assigned values.

```ts
import { withDefaults } from "@microsoft/fast-jss-utilities";

const globalVariableDefaults: GlobalConfig = {
    backgroundColor: "#000",
    foregroundColor: "#FFF",
    accentColor: "#FB356D"
};

const withGlobalDefaults: (config: Partial<GlobalDefaults>) => GlobalDefaults = (
    config: Partial<GlobalDefaults>
): GlobalDefaults => withDefaults(globalVariableDefaults)(config);
```

### format

The `format` function is used to format strings with the result of functions. It returns a single function which accepts the design-system
the stylesheet is compiled with. The first argument is the string to be formatted - all other arguments should be functions that accept your design-system and return a string. The first formatter function passed replaces the literal string `"{0}"`, while the second replaces `"{1}"`, etc. There is no limit to the number of formatters that can be used with the function:

```ts

function getMyColor(designSystem) {
    return designSystem.myColor
}

{
    border: format("1px solid {0}", getMyColor)
}
```

### toString

The `toString` function is used to convert the return value of a function that accepts the design system to a string.

```ts
{
    opacity: toString((designSystem) => designSystem.disabledOpacity)
}
```

### add / subtract / multiply / divide
the `add`, `subtract`, `multiply`, and `divide` functions are used to operate on numbers or functions that accept design-systems and return numbers. They accept any number of arguments and perform their operations from left to right, starting with the first argument. eg, subtract(10, 2) => 10 - 2 => 8

```ts
function fontSize(designSystem): number {
    return designSystem.fontSize;
} 

{
   // ...other styles
   fontSize: multiply(fontSize, 2)
}

```
