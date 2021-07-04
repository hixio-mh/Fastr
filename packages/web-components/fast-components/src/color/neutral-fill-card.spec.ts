import { expect } from "chai";
import { FASTDesignSystem, fastDesignSystemDefaults } from "../fast-design-system";
import { neutralFillCard } from "./neutral-fill-card";

describe("neutralFillCard", (): void => {
    it("should operate on design system defaults", (): void => {
        expect(fastDesignSystemDefaults.neutralPalette).to.include(
            neutralFillCard({} as FASTDesignSystem)
        );
    });
    it("should get darker when the index of the backgroundColor is lower than the offset index", (): void => {
        for (let i: number = 0; i < fastDesignSystemDefaults.neutralFillCardDelta; i++) {
            expect(
                fastDesignSystemDefaults.neutralPalette.indexOf(
                    neutralFillCard(
                        Object.assign({}, fastDesignSystemDefaults, {
                            backgroundColor: fastDesignSystemDefaults.neutralPalette[i],
                        })
                    )
                )
            ).to.equal(fastDesignSystemDefaults.neutralFillCardDelta + i);
        }
    });
    it("should return the color at three steps lower than the background color", (): void => {
        for (let i: number = 3; i < fastDesignSystemDefaults.neutralPalette.length; i++) {
            expect(
                fastDesignSystemDefaults.neutralPalette.indexOf(
                    neutralFillCard(
                        Object.assign({}, fastDesignSystemDefaults, {
                            backgroundColor: fastDesignSystemDefaults.neutralPalette[i],
                        })
                    )
                )
            ).to.equal(i - 3);
        }
    });
    it("should generate a color based on the background color returned by a provided callback", (): void => {
        expect(
            neutralFillCard(() => fastDesignSystemDefaults.neutralPalette[4])(
                fastDesignSystemDefaults
            )
        ).to.equal(fastDesignSystemDefaults.neutralPalette[1]);
    });
});
