---
id: tooltip
title: fast-tooltip
sidebar_label: tooltip
custom_edit_url: https://github.com/microsoft/fast-dna/edit/master/packages/web-components/fast-foundation/src/tooltip/README.md
---

The `fast-tooltip` component is used provide extra information about another element when it is hovered.

## Usage

```html
      <div>
          <fast-button id="testbutton">
              Hover me for more info
          </fast-button>
          <fast-tooltip id="testtip">
              helpful text
          </fast-tooltip>
      </div>
```

See [Component Explorer](https://explore.fast.design/components/fast-tooltip) for usage examples.

---

## Applying custom styles

```ts
import { customElement } from "@microsoft/fast-element";
import { Tooltip, TooltipTemplate as template } from "@microsoft/fast-foundation";
import { TooltipStyles as styles } from "./tooltip.styles";

@customElement({
    name: "fast-tooltip",
    template,
    styles,
})
export class FASTTooltip extends Tooltip {}
```