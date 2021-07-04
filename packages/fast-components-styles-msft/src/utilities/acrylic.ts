import { AcrylicConfig, applyAcrylic, toPx } from "@microsoft/fast-jss-utilities";
import { CSSRules } from "@microsoft/fast-jss-manager";
import designSystemDefaults, { DesignSystem } from "../design-system";
import { parseColorString } from "../utilities/color/common";
import { ColorRGBA64 } from "@microsoft/fast-colors";

/* tslint:disable max-line-length */
export const acrylicNoise: string =
    "data:image/png;base64,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";
/* tslint:enable max-line-length */

/*
 * Applies a Microsoft implementation of acrylic to a surface
 *
 * - backgroundColor: This should be an RGBa color value to achieve the acrylic effect
 * - opacity: The opacity of the background
 * - fallbackOpacity?: Applied in the event that backdrop-filter is not supported in the current browser, defaults to 0.9
 * - topHighlight?: The option to highlight the top border of the surface acrylic is applied to, defaults to false
 */
export function applyAcrylicMaterial(
    backgroundColor: string,
    opacity: number,
    fallbackOpacity: number = 0.9,
    topHighlight: boolean = false
): CSSRules<DesignSystem> {
    const background: ColorRGBA64 = parseColorString(backgroundColor);
    const acrylicConfig: AcrylicConfig = {
        textureImage: acrylicNoise,
        backgroundColor: new ColorRGBA64(
            background.r,
            background.g,
            background.b,
            opacity
        ).toStringWebRGBA(),
        fallbackBackgroundColor: new ColorRGBA64(
            background.r,
            background.g,
            background.b,
            fallbackOpacity
        ).toStringWebRGBA(),
    };

    return {
        borderTop: topHighlight
            ? `${toPx(1)} solid ${new ColorRGBA64(
                  background.r,
                  background.g,
                  background.b,
                  0.1
              ).toStringWebRGBA()}`
            : "",
        ...applyAcrylic<DesignSystem>(acrylicConfig),
    };
}
