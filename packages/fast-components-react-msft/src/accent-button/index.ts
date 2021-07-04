import React from "react";
import { ButtonBaseClassNameContract as AccentButtonClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import { AccentButtonStyles, DesignSystem } from "@microsoft/fast-components-styles-msft";
import {
    ButtonBase,
    ButtonBaseHandledProps,
    ButtonBaseManagedClasses,
    ButtonBaseProps,
    ButtonBaseUnhandledProps as AccentButtonUnhandledProps,
} from "../button-base";
import accentButtonSchema from "./accent-button.schema";
import { Subtract } from "utility-types";
import { DisplayNamePrefix } from "../utilities";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
/* tslint:disable-next-line:typedef */
const AccentButton = manageJss(AccentButtonStyles)(ButtonBase);
type AccentButton = InstanceType<typeof AccentButton>;

interface AccentButtonHandledProps
    extends Subtract<ButtonBaseHandledProps, ButtonBaseManagedClasses> {}
type AccentButtonProps = ManagedJSSProps<
    ButtonBaseProps,
    AccentButtonClassNameContract,
    DesignSystem
>;

/**
 * Set the display name for the accent button
 */
AccentButton.displayName = `${DisplayNamePrefix}AccentButton`;

export {
    AccentButton,
    AccentButtonProps,
    AccentButtonClassNameContract,
    AccentButtonHandledProps,
    AccentButtonUnhandledProps,
    accentButtonSchema,
};
