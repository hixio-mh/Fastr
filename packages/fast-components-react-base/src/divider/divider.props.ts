import * as React from "react";
import { IDividerClassNameContract, IManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";

/**
 * Divider HTML Roles
 */
export enum DividerRoles {
    presentation = "presentation",
    separator = "separator"
}

export interface IDividerHandledProps {
    /**
     * The HTML role attribute
     */
    role?: DividerRoles;
}

export interface IDividerUnhandledProps extends React.HTMLAttributes<HTMLHRElement> {}
export interface IDividerManagedClasses extends IManagedClasses<IDividerClassNameContract> {}
export type DividerProps = IDividerHandledProps & IDividerUnhandledProps & IDividerManagedClasses;
