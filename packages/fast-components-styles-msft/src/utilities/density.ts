import {
    DesignSystem,
    DesignSystemResolver,
    ensureDesignSystemDefaults,
    withDesignSystemDefaults,
} from "../design-system";
import { toPx } from "@microsoft/fast-jss-utilities";

export enum DensityCategory {
    compact = "compact",
    normal = "normal",
    spacious = "spacious",
}

/**
 * Returns the component height formatted in the provided unit or px by default.
 *
 * @param lines The logical number of lines the component takes, typically 1.
 * @param unit The unit of measurement; px by default.
 */
export function height(lines: number = 1, unit?: string): DesignSystemResolver<string> {
    return ensureDesignSystemDefaults(
        (designSystem: DesignSystem): string => {
            const value: number = heightNumber(lines)(designSystem);
            return typeof unit === "string" ? `${value}${unit}` : toPx(value);
        }
    );
}

/**
 * Returns the component height as a number.
 *
 * @param lines The logical number of lines the component takes, typically 1.
 */
export function heightNumber(lines: number = 1): DesignSystemResolver<number> {
    return ensureDesignSystemDefaults(
        (designSystem: DesignSystem): number => {
            const value: number =
                (designSystem.baseHeightMultiplier + designSystem.density) *
                designSystem.designUnit *
                lines;
            return value;
        }
    );
}

/**
 * Returns the higher-level category for the density setting.
 *
 * @param designSystem The design system config.
 */
export function getDensityCategory(designSystem: DesignSystem): DensityCategory {
    const category: DensityCategory =
        designSystem.density >= 2
            ? DensityCategory.spacious
            : designSystem.density <= -2
                ? DensityCategory.compact
                : DensityCategory.normal;
    return category;
}

/**
 * Returns the standard horizontal spacing for text and icons formatted in the provided unit or px by default.
 *
 * @param adjustment Any border that should be removed from the overall content spacing.
 * @param unit The unit of measurement; px by default.
 */
export function horizontalSpacing(
    adjustment: number = 0,
    unit?: string
): DesignSystemResolver<string> {
    return ensureDesignSystemDefaults(
        (designSystem: DesignSystem): string => {
            const value: number = horizontalSpacingNumber(adjustment)(designSystem);
            return typeof unit === "string" ? `${value}${unit}` : toPx(value);
        }
    );
}

/**
 * Returns the standard horizontal spacing for text and icons as a number.
 *
 * @param adjustment Any border that should be removed from the overall content spacing.
 */
export function horizontalSpacingNumber(
    adjustment: number = 0
): DesignSystemResolver<number> {
    return ensureDesignSystemDefaults(
        (designSystem: DesignSystem): number => {
            const category: DensityCategory = getDensityCategory(designSystem);
            const densityOffset: number =
                category === DensityCategory.compact
                    ? -1
                    : category === DensityCategory.spacious
                        ? 1
                        : 0;
            const value: number =
                (designSystem.baseHorizontalSpacingMultiplier + densityOffset) *
                    designSystem.designUnit -
                adjustment;
            return value;
        }
    );
}

/**
 * Returns the width and height for an icon formatted in pixels.
 *
 * @param designSystem The design system config.
 */
export function glyphSize(designSystem: DesignSystem): string;

/**
 * Returns the width and height for an icon formatted in the provided unit.
 *
 * @param unit The unit of measurement; px by default.
 */
export function glyphSize(unit: string): DesignSystemResolver<string>;

/**
 * Returns the width and height for an icon.
 *
 * @param arg The design system config or the unit of measurement.
 */
export function glyphSize(arg: any): any {
    return typeof arg === "string"
        ? (designSystem: DesignSystem): string => `${glyphSizeNumber(designSystem)}${arg}`
        : toPx(glyphSizeNumber(arg));
}

/**
 * Returns the width and height for an icon as a number.
 */
export function glyphSizeNumber(config: DesignSystem): number {
    const designSystem: DesignSystem = withDesignSystemDefaults(config);
    const category: DensityCategory = getDensityCategory(designSystem);
    const sizeOffset: number =
        category === DensityCategory.compact
            ? -2
            : category === DensityCategory.spacious
                ? 2
                : 0;
    const value: number =
        (designSystem.baseHeightMultiplier / 2) * designSystem.designUnit + sizeOffset;
    return value;
}

/**
 * @deprecated Use height instead.
 * @param value
 * @param unit
 */
export function density(value: number, unit?: string): (config: DesignSystem) => string {
    return (config: DesignSystem): string => {
        const designSystem: DesignSystem = withDesignSystemDefaults(config);
        const augmented: number = value * 1;
        return typeof unit === "string" ? `${augmented}${unit}` : toPx(augmented);
    };
}
