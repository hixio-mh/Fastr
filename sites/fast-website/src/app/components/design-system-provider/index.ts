import {
    designSystemProperty,
    designSystemProvider,
    FASTDesignSystemProvider,
} from "@microsoft/fast-components";
import { attr } from "@microsoft/fast-element";

@designSystemProvider("website-design-system-provider")
export class WebsiteDesignSystemProvider extends FASTDesignSystemProvider {
    // @attr({ attribute: "accent-base-color" })
    // @designSystemProperty({
    // 	cssCustomProperty: "accent-base-color",
    // 	default: "#F0F"
    // }) public accentBaseColor: string;

    @attr({ attribute: "accent-secondary-color" })
    @designSystemProperty({
        cssCustomProperty: "accent-secondary-color",
        default: "#F0F",
    })
    public accentSecondaryColor: string;
}
