const FASTComponents = require("@microsoft/fast-components");

// Tree shaking
FASTComponents.FASTButton;

const button = document.createElement("fast-button");
button.innerText = "FooBar";

document.body.appendChild(button);
