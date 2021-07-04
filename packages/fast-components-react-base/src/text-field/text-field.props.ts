import * as React from "react";
import { IManagedClasses, ITextFieldClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";

export enum TextFieldType {
   email = "email",
   number = "number",
   password = "password",
   search = "search",
   tel = "tel",
   text = "text",
   url = "url"
}

export interface ITextFieldHandledProps {
    /**
     * The disabled state
     */
    disabled?: boolean;

    /**
     * Placeholder Text for input field
     */
    placeholder?: string;

    /**
     * The text field input type
     */
    type?: TextFieldType;
}

export interface ITextFieldUnhandledProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface ITextFieldManagedClasses extends IManagedClasses<ITextFieldClassNameContract> {}
export type TextFieldProps = ITextFieldHandledProps & ITextFieldUnhandledProps & ITextFieldManagedClasses;
