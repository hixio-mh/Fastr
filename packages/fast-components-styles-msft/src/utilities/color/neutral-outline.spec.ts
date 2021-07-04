import {
    neutralOutline,
    neutralOutlineActive,
    neutralOutlineHover,
    neutralOutlineRest,
} from "./neutral-outline";
import designSystemDefaults, { DesignSystem } from "../../design-system";
import { palette, Palette, PaletteType } from "./palette";
import { Swatch, SwatchFamily } from "./common";
import { isColorStringHexRGB } from "@microsoft/fast-colors";

describe("neutralOutline", (): void => {
    const neutralPalette: Palette = palette(PaletteType.neutral)(designSystemDefaults);
    const accentPalette: Palette = palette(PaletteType.accent)(designSystemDefaults);

    test("should return by default", (): void => {
        expect(neutralOutlineRest({} as DesignSystem)).toBe(
            neutralPalette[designSystemDefaults.neutralOutlineRestDelta]
        );
        expect(neutralOutlineHover({} as DesignSystem)).toBe(
            neutralPalette[designSystemDefaults.neutralOutlineHoverDelta]
        );
        expect(neutralOutlineActive({} as DesignSystem)).toBe(
            neutralPalette[designSystemDefaults.neutralOutlineActiveDelta]
        );
    });

    test("should always return a color", (): void => {
        neutralPalette.concat(accentPalette).forEach(
            (swatch: Swatch): void => {
                expect(
                    isColorStringHexRGB(
                        neutralOutlineRest(() => swatch)({} as DesignSystem)
                    )
                ).toBe(true);
            }
        );
    });

    test("should return the same color from both implementations", (): void => {
        neutralPalette.concat(accentPalette).forEach(
            (swatch: Swatch): void => {
                expect(neutralOutlineRest(() => swatch)(designSystemDefaults)).toBe(
                    neutralOutlineRest(
                        Object.assign({}, designSystemDefaults, {
                            backgroundColor: swatch,
                        })
                    )
                );
                expect(neutralOutlineHover(() => swatch)(designSystemDefaults)).toBe(
                    neutralOutlineHover(
                        Object.assign({}, designSystemDefaults, {
                            backgroundColor: swatch,
                        })
                    )
                );
                expect(neutralOutlineActive(() => swatch)(designSystemDefaults)).toBe(
                    neutralOutlineActive(
                        Object.assign({}, designSystemDefaults, {
                            backgroundColor: swatch,
                        })
                    )
                );
            }
        );
    });

    test("should have consistent return values", (): void => {
        neutralPalette.concat(accentPalette).forEach(
            (swatch: Swatch): void => {
                const backplates: SwatchFamily = neutralOutline(() => swatch)(
                    designSystemDefaults
                );
                const rest: Swatch = neutralOutlineRest(() => swatch)(
                    designSystemDefaults
                );
                const hover: Swatch = neutralOutlineHover(() => swatch)(
                    designSystemDefaults
                );
                const active: Swatch = neutralOutlineActive(() => swatch)(
                    designSystemDefaults
                );

                expect(backplates.rest).toBe(rest);
                expect(backplates.hover).toBe(hover);
                expect(backplates.active).toBe(active);
            }
        );
    });
});
