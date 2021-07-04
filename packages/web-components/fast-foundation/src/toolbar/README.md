---
id: toolbar
title: fast-toolbar
sidebar_label: toolbar
custom_edit_url: https://github.com/microsoft/fast-dna/edit/master/packages/web-components/fast-foundation/src/toolbar/README.md
---

The `fast-toolbar` component is used to TODO.

## Usage

```html live
<fast-design-system-provider use-defaults>
    <fast-toolbar>
    </fast-toolbar>
</fast-design-system-provider>
```
---

## Applying custom styles

```ts
import { customElement } from "@microsoft/fast-element";
import { Toolbar, ToolbarTemplate as template } from "@microsoft/fast-foundation";
import { ToolbarStyles as styles } from "./toolbar.styles";

@customElement({
    name: "fast-toolbar",
    template,
    styles,
})
export class FASTToolbar extends Toolbar {}
```