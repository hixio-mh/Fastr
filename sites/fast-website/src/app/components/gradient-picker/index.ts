import { css, customElement, FASTElement } from "@microsoft/fast-element";

// TODO: Make sure custom-properties is provided by @microsoft/fast-components (#3077)
import {
    cssCustomPropertyBehaviorFactory,
    DesignSystemProvider,
} from "@microsoft/fast-components";

const styles = css`
    :host {
        background: linear-gradient(
            4deg,
            var(--start-color) 3.91%,
            var(--end-color) 96.09%
        );
        box-shadow: 0px 1.5px 1px rgba(0, 0, 0, 0.08), 0px 1.6px 5px rgba(0, 0, 0, 0.15);
        height: 130px;
        box-sizing: border-box;
        display: inline-block;
        padding: 16px 1px 13px 46px;
        width: 150px;
    }

    :host(::after) {
        background-image: inherit;
        border-radius: 3px;
        content: "";
        display: block;
        filter: blur(30px);
        height: 100%;
        opacity: 0.6;
        width: 100%;
    }
`.withBehaviors(
    cssCustomPropertyBehaviorFactory(
        "start-color",
        (designSystem: any) => designSystem.accentBaseColor,
        DesignSystemProvider.findProvider
    ),
    cssCustomPropertyBehaviorFactory(
        "end-color",
        (designSystem: any) => {
            console.log(designSystem);
            return designSystem.accentSecondaryColor;
        },
        DesignSystemProvider.findProvider
    )
);

@customElement({ name: "gradient-picker", styles })
export class GradientPicker extends FASTElement {}
