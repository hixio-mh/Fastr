# Breadcrumb

## Overview
A `fast-breadcrumb` component is used as a navigational aid, allowing users to maintain awareness of their locations within a program, app, or a website.

### Use Cases
- James is browsing an ecommerce website and is looking for a few items to add to his new kitchen. He needs a knife set, and an espresso machine. He checks out `Home and Kitchen` page, then selects `Kitchen and Dining`, first category he picks is `Cutlery`, he finds the sets of knives. There is now a breadcrumb trail of the pages James has clicked through. `Home and Kitchen /  Kitchen and Dining / Cutlery / Knife Sets`
He clicks on `Kitchen and Dining` to go back to the category of kitchen items, selects `Coffee and Espresso` finds the best one that suits his needs. If James wants to continue looking for another item for his kitchen, or other things for his home, he just needs to click on any of the links in the breadcrumb trail to continue his search.

### Prior Art/Examples
- [Ant Design](https://ant.design/components/breadcrumb/)
- [Atlaskit](https://atlaskit.atlassian.com/packages/core/breadcrumbs)
- [Carbon Design](https://www.carbondesignsystem.com/components/breadcrumb/code/)
- [FAST Breadcrumb (React)](https://www.npmjs.com/package/@microsoft/fast-components-react-msft)
- [Lightning Design System](https://www.lightningdesignsystem.com/components/breadcrumbs/#site-main-content)
- [Material UI](https://material-ui.com/components/breadcrumbs/)
- [Office Fabric](https://developer.microsoft.com/en-us/fluentui#/controls/web/breadcrumb)

---

### API

*Component Name*
- `fast-breadcrumb`

*Properties*
- `slottedBreadcrumbItems` - an HTMLElement[] used in the slotted directive.

*Attribute*
- aria-current - attribute set on the last breadcrumb item, if it has an `href` set. It will always be `aria-current="page"`.

### Anatomy and Appearance

```html
<template
    role="navigation"
    aria-label="${x => x.ariaLabel}"
    aria-labelledby="${x => x.ariaLabelledby}"
>
    <div role="list">
        <slot ${slotted({ property: "slottedBreadcrumbItems", filter: elements() })}></slot>
    </div>
</template>
```

*Slot Names*
- slotted directive, with a property called `slottedBreadcrumbItems`.

---

## Implementation

```html
<fast-breadcrumb>
    <fast-breadcrumb-item name="Home" href="#"></fast-breadcrumb-item>
    <fast-breadcrumb-item name="Template" href="#"></fast-breadcrumb-item>
    <fast-breadcrumb-item name="Template Prices" href="#"></fast-breadcrumb-item>
</fast-breadcrumb>
```

### Accessibility

The breadcrumb should align to the interaction model provided by the [W3C](https://www.w3.org/TR/wai-aria-practices/#breadcrumb)
- `aria-current` - W3 specs says when using `aria-current="page"` the element should be a link. `fast-breadcrumb` will set `aria-current="page"` to the last element if there is an href attribute.

### Globalization

The overall order inside the breadcrumb will be reversed when switching in LTR/RTL.

### Test Plan

While testing is still TBD for our web components, I would expect this to align with the testing strategy and not require any additional test support.



# Breadcrumb Item

## Overview

The `fast-breadcrumb-item` is placed inside the `fast-breadcrumb` component. It provides a slot with a default anchor. The component also provides a slot for a separator that defaults using a `/`.

### API

*Component Name*
- `fast-breadcrumb-item`

*Properties*
- `showSeparator` - is a boolean to show and hide the separator.

*Slots*
- a slot that has an `<a></a>` as a default control.
- `separator` - used as part of the visual presentation that signifies the breadcrumb trail. The separator is defaulted to a `/`. To override the default separator, add an element with an attribute of `slot="separator"`.

*CSS Parts*
- `listitem-container` - class style to align the default slot content and the separator.
- `separator` - class style to adjust margin layout

### Anatomy and Appearance

```html
<div
    role="listitem"
    class="listitem"
    part="listitem"
>
    <slot>
        <a class="control" part="control" href="${x => x.href}">
            <span class="content" part="content">
                ${x => x.name}
            </span>
        </a>
    </slot>
    ${when(
        x => x.showSeparator,
        html<BreadcrumbItem>`
            <span class="separator" part="separator" aria-hidden="true">
                <slot name="separator">/</slot>"
            </span>
        `
    )}
</div>
```

## Implementation

```html
<fast-breadcrumb-item name="Home" href="#"></fast-breadcrumb-item>
```

*Overriding default separator with an SVG*

```html
<fast-breadcrumb-item name="Home" href="#">
    <span slot="separator">
        <svg>
            <path ... />
        </svg>
    </span>
</fast-breadcrumb-item>
```
