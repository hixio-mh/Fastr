import React from "react";
import { TextFieldClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { TextFieldType } from "@microsoft/fast-components-react-base";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import {
    DesignSystem,
    textFieldDependencies,
} from "@microsoft/fast-components-styles-msft";
import TextFieldStyles from "@microsoft/fast-components-styles-msft/css/text-field.css";
import { Subtract } from "utility-types";
import { MergeManagedClasses } from "../css-modules";
import textFieldSchema from "./text-field.schema";
import MSFTTextField, {
    TextFieldHandledProps as MSFTTextFieldHandledProps,
    TextFieldProps as MSFTTextFieldProps,
    TextFieldAppearance,
    TextFieldManagedClasses,
    TextFieldUnhandledProps,
} from "./text-field";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const TextField = manageJss()(
    withCSSCustomProperties(...textFieldDependencies)(
        MergeManagedClasses(MSFTTextField, TextFieldStyles)
    )
);
type TextField = InstanceType<typeof TextField>;

type TextFieldHandledProps = Subtract<MSFTTextFieldHandledProps, TextFieldManagedClasses>;
type TextFieldProps = ManagedJSSProps<
    MSFTTextFieldProps,
    TextFieldClassNameContract,
    DesignSystem
>;

export {
    TextFieldClassNameContract,
    TextFieldHandledProps,
    TextFieldUnhandledProps,
    TextField,
    TextFieldAppearance,
    TextFieldProps,
    textFieldSchema,
    TextFieldType,
};
