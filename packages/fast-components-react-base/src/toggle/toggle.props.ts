import * as React from "react";
import { IManagedClasses, IToggleClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";

export interface IToggleHandledProps {
    /**
     * The label content
     */
    children?: React.ReactNode | React.ReactNode[];

    /**
     * The disabled state
     */
    disabled?: boolean;

    /**
     * The toggle HTML id attribute
     */
    id: string;

    /**
     * The HTML id attribute associated with the label
     */
    labelId?: string;

    /**
     * The toggle selected state
     */
    selected?: boolean;

    /**
     * The text to display when selected
     */
    selectedString: string;

    /**
     * The status label HTML id attribute
     */
    statusLabelId: string;

    /**
     * The text to display when unselected
     */
    unselectedString: string;
}

export interface IToggleUnhandledProps extends React.AllHTMLAttributes<HTMLElement> {}
export interface IToggleManagedClasses extends IManagedClasses<IToggleClassNameContract> {}
export type ToggleProps = IToggleHandledProps & IToggleUnhandledProps & IToggleManagedClasses;
