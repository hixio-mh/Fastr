---
id: design-system-provider
title: fast-design-system-provider
sidebar_label: design-system-provider
custom_edit_url: https://github.com/microsoft/fast/edit/master/packages/web-components/fast-foundation/src/design-system-provider/README.md
---

## What is a design system?

The _design system_ can generally be thought of as a collection of named values that inform visual rendering. It quantifies concepts such as type-ramp, color palettes, design units, etc to be used in UI components. Other common names for this concept are _design variables_, _design tokens_ or _theme_.

These values are mutable throughout a UI tree. Where UI tree _A_ may see their contextual _design-unit_ as `4px`, tree _B_ may have its scale increased by providing a _design-unit_ of `6px`. Or, tree _C_ may see a contextual _background color_ of `#FFF` where tree _D_ may see a contextual _background color_ as `#000`.

## Design system provider

A _design system_ isn't much use without convenient mechanisms to surface the _design system_ values to UI components and change values where desired. This is where the _Design System Provider_ comes in. `@microsoft/fast-components` exports the `FASTDesignSystemProvider` Web Components to help with:

1. Declaring _design system_ properties and default values.
2. Surfacing _design system_ values as [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
3. Surfacing the _design system_ as a JavaScript object accessible on the Custom Element.
4. Facilitate _design system_ composition in _document order_.
5. Registering CSS Custom Property definitions to create arbitrary CSS Custom Properties as a function of the _design system_.

### FAST design system provider

The easiest way to get up-and-running is to use the `FASTDesignSystemProvider`. This Web Component is an implementation of the `DesignSystemProvider` that is configured with _design system_ properties used by the Web Components in the `@microsoft/fast-components` library.

**EXAMPLE: Using the FASTDesignSystemProvider**

```js
import { FASTDesignSystemProvider } from "@microsoft/fast-components";
```

```html
<fast-design-system-provider use-defaults>
    Hello World
</fast-design-system-provider>
```

_Design system_ properties can be overridden by setting the property or attribute on the `fast-design-system-provider`. See [FAST Design System Properties](#FAST-Design-System-Properties) for a comprehensive list of properties.

**EXAMPLE: Setting design system properties**

```html
<fast-design-system-provider use-defaults background-color="#111111" design-unit="6">
    Hello world!
</fast-design-system-provider>
```

### `use-defaults`

In general, a _Design System Provider_ element with the `use-defaults` attribute should exist as an ancestor to all rendered UI - this will ensure that all the values enumerated in the _design system_ are expressed as _CSS custom properties_.

Notice below that none of the code-samples initialize a value to a declared _design system_ property. This is because the _design system_ is designed to function as a waterfall of values - where values assigned lower in the DOM tree override values defined by ancestors. Initializing the value on the instance assigns the value to every instance of the _Design System Provider_ which is generally un-desired.

**EXAMPLE: initialized vs non-initialized properties**

```ts
class ExampleClass {
    public nonInitialized;
    // vs
    public initialized = true;
}
```

The `use-defaults` boolean attribute exposes a mechanism to apply the default values to an element while still allowing nested design system elements to intentionally override specific values. For details on how to set default values, see [Declaring Design System Properties](#Declaring-Design-System-Properties)

### Composing design system providers

*Design System Providers* are designed to compose their values with ancestor *Design System Providers* to facilitate changing values for decedents of the provider.

```html
<fast-design-system-provider design-unit="4" background-color="#FFFFFF">
    <p style="height: calc(var(--design-unit) * 1px)">4px</p>
    <p style="background: var(--background-color)">#FFFFFF</p>

    <fast-design-system-provider design-unit="8">
        <p style="height: calc(var(--design-unit) * 1px)">8px</p>
        <p style="background: var(--background-color)">#FFFFFF</p>
    </fast-design-system-provider>
</fast-design-system-provider>
```


### Recipes

There are some things that CSS just can't do. Advanced math, array manipulation, and conditionals are simply not possible with today's CSS.

To address this gap, the _DesignSystemProvider_ is capable of registering `CSSCustomPropertyDefinition` types through the `registerCSSCustomProperty` method:

**EXAMPLE: Register a CSS custom property that is a function of the _design system_**

```ts
DesignSystemProvider.registerCSSCustomProperty({
    name: "design-unit-12th",
    value: designSystem => Math.pow(designSystem.designUnit, 12),
});
```

In the above example, the value function will be re-evaluated if the _design system_ ever changes.

The above API is made especially useful when defining a [component stylesheet](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-element/docs/building-components.md#defining-css) - individual stylesheets can declare dependencies on CSS custom properties that are functions of the element instance's *design system*.

**EXAMPLE: creating a recipe dependency**
```ts
import { css } from "@microsoft/fast-element";
import { cssCustomPropertyBehaviorFactory, FASTDesignSystemProvider } from "@microsoft/fast-components";

const styles = css`
    :host {
        height: var(--fancy-height);
    }
`.withBehaviors(
    cssCustomPropertyBehaviorFactory(
        "fancy-height",
        designSystem => Math.pow(designSystem.designUnit, 12),
        FASTDesignSystemProvider.findProvider
    )
)
```

### Creating a design system provider

To create a new _Design System Provider_, extend the `DesignSystemProvider` class and decorate it with the `@designSystemProvider` decorator, providing the decorator the element _tag name_ you wish to use:

**EXAMPLE: Creating a custom Design System Provider**

```ts
import { DesignSystemProvider, designSystemProvider, DesignSystemProviderTemplate as template } from "@microsoft/fast-foundation";
import { MyDesignSystemProviderStyles as styles} from "../design-system-provider.styles.ts";

@designSystemProvider({name: "fancy-design-system-provider", template, styles})
class FancyDesignSystemProvider extends DesignSystemProvider {}
```

```html
<fancy-design-system-provider use-defaults>
    Hello Fancy World!
</fancy-design-system-provider>
```

#### Declaring design system properties

Building off the above, _design system_ properties can be declared using the `@designSystemProperty` decorator.

**EXAMPLE: Creating a design system property declaration**

```ts
// ..
@designSystemProvider({name: "fancy-design-system-provider", template, styles})
class FancyDesignSystemProvider extends DesignSystemProvider {
    @attr({attribute: "fancy-property"})
    @designSystemProperty({ cssCustomProperty: "fancy-property", default: "red" })
    public fancyProperty;
}
```

```html
<fancy-design-system-provider use-defaults>
    <p style="color: var(--fancy-property)">Red text!</p>
</fancy-design-system-provider>
```

Declaring a _design system_ property will do several things. By default, the property name being decorated will become a CSS custom property when the value is set. This name can be customized by setting `cssCustomProperty` on the provided config object.

```ts
// Will create a CSS custom property accessible by `var(--fooBar)`
@designSystemProperty({default: "foo"})
public fooBar;
```

```ts
// Will create a CSS custom property accessible by `var(--foo-bar)`
@designSystemProperty({default: "foo", cssCustomProperty: "foo-bar"})
public fooBar;
```

Additionally, creation of CSS custom properties can also be disabled by setting `cssCustomProperty` to `false`;

```ts
// No CSS custom property will be created
@designSystemProperty({default: "foo", cssCustomProperty: false})
public fooBar;
```

The default value _must_ be set through the `default` property on the supplied config. This is the value that will be applied when the `use-defaults` attribute is used and no override property is provided.