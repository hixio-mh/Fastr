import { ManagedClasses } from "@microsoft/fast-jss-manager-react";
import { CSSPositionClassNameContract } from "./position.style";

export enum PositionValue {
    static = "static",
    absolute = "absolute",
    relative = "relative",
    fixed = "fixed",
}

export enum Location {
    top = "top",
    left = "left",
    right = "right",
    bottom = "bottom",
}

export interface LocationsMappedToClassNames {
    location: Location;
    className: string;
}

export type CSSPositionUnhandledProps = React.HTMLAttributes<HTMLDivElement>;

export interface CSSPositionValues {
    position?: PositionValue;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
}

export interface CSSPositionHandledProps
    extends ManagedClasses<CSSPositionClassNameContract> {
    /**
     * The data
     */
    data?: CSSPositionValues;

    /**
     * The onChange callback
     */
    onChange?: (position: CSSPositionValues) => void;
}

export type CSSPositionProps = CSSPositionHandledProps & CSSPositionUnhandledProps;
