# FAST Components React Microsoft
A set of React components which implements the Microsoft styling.

## Installation
`npm i --save @microsoft/fast-components-react-msft`

## Usage
An example of using one of the components from the `@microsoft/fast-components-react-msft` package:

```
import React from "react";
import ReactDOM from "react-dom";
import { Button } from "@microsoft/fast-components-react-msft";

const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

function render(): void {
    ReactDOM.render(
        <Button primary={true}>
            Click me!
        </Button>,
        root
    );
}

render();
```

## Documentation site
[FAST Components React Microsoft](https://msft-docs.fast-dna.net/)
