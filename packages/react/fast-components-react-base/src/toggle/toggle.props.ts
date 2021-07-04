import React from "react";
import {
    ManagedClasses,
    ToggleClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-base";

export type ToggleManagedClasses = ManagedClasses<ToggleClassNameContract>;
export type ToggleUnhandledProps = React.HTMLAttributes<HTMLDivElement>;
export interface ToggleHandledProps extends ToggleManagedClasses {
    /**
     * The label content
     */
    children?: React.ReactNode;

    /**
     * The disabled state
     */
    disabled?: boolean;

    /**
     * The toggle HTML id attribute
     */
    inputId: string;

    /**
     * The HTML id attribute associated with the label
     */
    labelId?: string;

    /**
     * The name of the input
     */
    name?: string;

    /**
     * The onChange event handler
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    /**
     * The toggle selected state
     */
    selected?: boolean;

    /**
     * The text to display when selected
     */
    selectedMessage?: string;

    /**
     * The status label HTML id attribute
     */
    statusMessageId?: string;

    /**
     * The text to display when unselected
     */
    unselectedMessage?: string;
}

export type ToggleProps = ToggleHandledProps & ToggleUnhandledProps;
