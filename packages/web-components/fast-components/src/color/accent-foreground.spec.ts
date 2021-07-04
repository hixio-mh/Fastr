import { parseColorHexRGB } from "@microsoft/fast-colors";
import { expect } from "chai";
import { FASTDesignSystem, fastDesignSystemDefaults } from "../fast-design-system";
import {
    accentPalette as getAccentPalette,
    neutralPalette as getNeutralPalette,
} from "../fast-design-system";
import {
    accentForegroundActive,
    accentForegroundHover,
    accentForegroundLargeActive,
    accentForegroundLargeHover,
    accentForegroundLargeRest,
    accentForegroundRest,
    accentForeground
} from "./accent-foreground";
import { Palette } from "./palette";
import { contrast, Swatch } from "./common";
import { accentBaseColor, neutralBaseColor } from "./color-constants";
import { PaletteRGB } from "../color-vNext/palette";
import { SwatchRGB } from "../color-vNext/swatch";
import { accentForeground as accentForegroundNew } from "../color-vNext/recipes/accent-foreground";

describe("accentForeground", (): void => {
    const neutralPalette: Palette = getNeutralPalette(fastDesignSystemDefaults);
    const accentPalette: Palette = getAccentPalette(fastDesignSystemDefaults);

    it("should operate on design system defaults", (): void => {
        [
            accentForegroundActive,
            accentForegroundHover,
            accentForegroundLargeActive,
            accentForegroundLargeHover,
            accentForegroundLargeRest,
            accentForegroundRest,
        ].forEach(fn => {
            expect(accentPalette).to.include(fn({} as FASTDesignSystem));
        });
    });

    it("should accept a function that resolves a background swatch", (): void => {
        expect(typeof accentForegroundRest(() => "#FFF")).to.equal("function");
        expect(accentPalette).to.include(
            accentForegroundRest(() => "#000")({} as FASTDesignSystem)
        );
    });

    it("should increase contrast on hover state and decrease contrast on active state in either mode", (): void => {
        const darkDesignSystem: FASTDesignSystem = {
            ...fastDesignSystemDefaults,
            backgroundColor: "#000000",
        };

        expect(
            contrast(
                accentForegroundHover(fastDesignSystemDefaults),
                fastDesignSystemDefaults.backgroundColor
            )
        ).to.be.greaterThan(
            contrast(
                accentForegroundRest(fastDesignSystemDefaults),
                fastDesignSystemDefaults.backgroundColor
            )
        );

        expect(
            contrast(
                accentForegroundHover(darkDesignSystem),
                darkDesignSystem.backgroundColor
            )
        ).to.be.greaterThan(
            contrast(
                accentForegroundRest(darkDesignSystem),
                darkDesignSystem.backgroundColor
            )
        );
    });

    it("should have accessible rest and hover colors against the background color", (): void => {
        const accentColors: Swatch[] = [
            "#0078D4",
            "#107C10",
            "#5C2D91",
            "#D83B01",
            "#F2C812",
        ];

        accentColors.forEach(
            /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
            (accent: Swatch): void => {
                neutralPalette.forEach((swatch: Swatch): void => {
                    const designSystem: FASTDesignSystem = Object.assign(
                        {},
                        fastDesignSystemDefaults,
                        {
                            backgroundColor: swatch,
                            accentPaletteConfig: Object.assign(
                                {
                                    steps: 94,
                                    clipLight: 0,
                                    clipDark: 0,
                                },
                                {
                                    baseColor: parseColorHexRGB(swatch),
                                }
                            ),
                        }
                    );

                    expect(
                        contrast(swatch, accentForegroundRest(designSystem))
                        // There are a few states that are impossible to meet contrast on
                    ).to.be.gte(4.47);
                    expect(
                        contrast(swatch, accentForegroundHover(designSystem))
                        // There are a few states that are impossible to meet contrast on
                    ).to.be.gte(3.7);
                    expect(
                        contrast(swatch, accentForegroundLargeRest(designSystem))
                    ).to.be.gte(3);
                    expect(
                        contrast(swatch, accentForegroundLargeHover(designSystem))
                    ).to.be.gte(3);
                });
            }
        );
    });
});

describe("ensure parity between old and new recipe implementation", () => {
    const neutralBase = parseColorHexRGB(neutralBaseColor)!;
    const accentBase = parseColorHexRGB(accentBaseColor)!;

    const neutralPalette = PaletteRGB.create(SwatchRGB.create(neutralBase.r, neutralBase.g, neutralBase.b));
    const accentPalette = PaletteRGB.create(SwatchRGB.create(accentBase.r, accentBase.g, accentBase.b));
    
    neutralPalette.swatches.forEach((newSwatch, index) => {
        const {
            accentForegroundRestDelta,
            accentForegroundFocusDelta,
            accentForegroundActiveDelta,
            accentForegroundHoverDelta
        } = fastDesignSystemDefaults;
        const oldValues = accentForeground({
            ...fastDesignSystemDefaults,
            backgroundColor: fastDesignSystemDefaults.neutralPalette[index],
        });
        const newValues = accentForegroundNew(
            accentPalette,
            newSwatch,
            4.5,
            accentForegroundRestDelta,
            accentForegroundHoverDelta,
            accentForegroundActiveDelta,
            accentForegroundFocusDelta,
        );
        it(`should be the same for ${newSwatch}`, () => {
            for (let key in newValues) {
                expect(oldValues[key]).to.equal(
                    newValues[key].toColorString().toUpperCase()
                );
            }
        });
    });
});