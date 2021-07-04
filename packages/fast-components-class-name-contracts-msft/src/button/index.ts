import { ButtonClassNameContract as BaseButtonClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";

/**
 * The class name contract for the button component
 */
export interface ButtonClassNameContract extends BaseButtonClassNameContract {
    /**
     * The primary appearance modifier
     */
    button__primary?: string;

    /**
     * The outline appearance modifier
     */
    button__outline?: string;

    /**
     * The lightweight appearance modifier
     */
    button__lightweight?: string;

    /**
     * The justified appearance modifier
     */
    button__justified?: string;

    /**
     * The stealth appearance modifier
     */
    button__stealth?: string;

    /**
     * The button content region
     */
    button_contentRegion?: string;

    /**
     * The disabled modifier
     */
    button__disabled?: string;

    /**
     * The before content
     */
    button_beforeContent?: string;

    /**
     * The after content
     */
    button_afterContent?: string;
}
