import React from "react";
import { camelCase, get, isNil } from "lodash-es";
import Foundation, {
    FoundationProps,
    HandledProps,
} from "@microsoft/fast-components-foundation-react";
import {
    CSSPropertyEditorRowHandledProps,
    CSSPropertyEditorRowUnhandledProps,
} from "./property-editor-row.props";
import { KeyCodes, spinalCase } from "@microsoft/fast-web-utilities";

export default class CSSPropertyEditorRow extends Foundation<
    CSSPropertyEditorRowHandledProps,
    CSSPropertyEditorRowUnhandledProps,
    {}
> {
    public static displayName: string = "CSSPropertyEditorRow";

    protected handledProps: HandledProps<CSSPropertyEditorRowHandledProps> = {
        cssPropertyName: void 0,
        value: void 0,
        rowIndex: void 0,
        onPropertyNameChange: void 0,
        onValueChange: void 0,
        onClickOutside: void 0,
        onCommitPropertyNameEdit: void 0,
        onRowFocus: void 0,
        onRowBlur: void 0,
        managedClasses: void 0,
    };

    private monospaceFontWidthMultiplier: number = 7.6;
    private rowRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    private nameInputRef: React.RefObject<HTMLInputElement> = React.createRef<
        HTMLInputElement
    >();
    private valueInputRef: React.RefObject<HTMLInputElement> = React.createRef<
        HTMLInputElement
    >();

    public componentDidMount(): void {
        if (
            isNil(this.rowRef.current) ||
            isNil(this.nameInputRef.current) ||
            isNil(this.valueInputRef.current)
        ) {
            return;
        }

        // force focus to a new row when it mounts
        if (
            this.props.cssPropertyName === "" &&
            this.props.value === "" &&
            !this.rowRef.current.contains(document.activeElement)
        ) {
            this.nameInputRef.current.focus();
        }
    }

    /**
     * main render function for the row
     */
    public render(): React.ReactNode {
        return (
            <div
                ref={this.rowRef}
                className={get(this.props.managedClasses, "cssPropertyEditorRow", "")}
                tabIndex={-1}
                onClick={this.handleClick}
            >
                <input
                    type={"text"}
                    ref={this.nameInputRef}
                    className={this.generateNameInputClassNames()}
                    onChange={this.handleNameInputChange}
                    onBlur={this.handleNameInputBlur}
                    onFocus={this.handleFocus}
                    onKeyDown={this.handleNameInputKeyDown}
                    value={spinalCase(this.props.cssPropertyName)}
                    style={{
                        width: `${this.getMonospaceInputWidth(
                            this.props.cssPropertyName
                        )}px`,
                    }}
                />
                :
                <input
                    type={"text"}
                    ref={this.valueInputRef}
                    className={this.generateValueInputClassNames()}
                    onChange={this.handleValueInputChange}
                    onBlur={this.handleValueInputBlur}
                    onFocus={this.handleFocus}
                    value={this.props.value}
                    style={{
                        width: `${this.getMonospaceInputWidth(this.props.value)}px`,
                    }}
                />
                ;
            </div>
        );
    }

    /**
     * calculate mono space width of an input
     */
    private getMonospaceInputWidth = (inputValue: string): number => {
        if (isNil(inputValue)) {
            return 0;
        }
        return inputValue.length * this.monospaceFontWidthMultiplier;
    };

    /**
     * get classes for name input
     */
    private generateNameInputClassNames(): string {
        return `${get(this.props.managedClasses, "cssPropertyEditorRow_input", "")} ${get(
            this.props.managedClasses,
            "cssPropertyEditorRow_inputKey",
            ""
        )}`;
    }

    /**
     * get classes for value input
     */
    private generateValueInputClassNames(): string {
        return `${get(this.props.managedClasses, "cssPropertyEditorRow_input", "")} ${get(
            this.props.managedClasses,
            "cssPropertyEditorRow_inputValue",
            ""
        )}`;
    }

    /**
     * value has changed in key input
     */
    private handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newName: string = e.target.value;
        if (this.props.cssPropertyName !== newName) {
            this.props.onPropertyNameChange(
                camelCase(newName),
                this.props.cssPropertyName,
                this.props.rowIndex
            );
        }
    };

    /**
     * value has changed in value input
     */
    private handleValueInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue: string = e.target.value;
        if (this.props.value !== newValue) {
            this.props.onValueChange(
                newValue,
                this.props.cssPropertyName,
                this.props.rowIndex
            );
        }
    };

    /**
     *  Handle focus events
     */
    private handleFocus = (): void => {
        this.props.onRowFocus(this.props.cssPropertyName, this.props.rowIndex);
    };

    /**
     *  key input has lost focus
     */
    private handleNameInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
        this.props.onCommitPropertyNameEdit(
            this.props.cssPropertyName,
            this.props.rowIndex
        );

        this.checkForRowBlur(e);
    };

    /**
     *  value input has lost focus
     */
    private handleValueInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
        this.checkForRowBlur(e);
    };

    /**
     *  check if the row is losing focus in the provided focus event
     */
    private checkForRowBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (
            !isNil(this.rowRef.current) &&
            !this.rowRef.current.contains(e.relatedTarget as Element)
        ) {
            this.props.onRowBlur(this.props.cssPropertyName, this.props.rowIndex);
        }
    };

    /**
     * Handle click
     */
    private handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        if ((e.target as HTMLElement).nodeName !== "INPUT") {
            this.props.onClickOutside(this.props.cssPropertyName, this.props.rowIndex);
        }
        e.preventDefault();
    };

    /**
     * Handle key presses on key input
     */
    private handleNameInputKeyDown = (e: React.KeyboardEvent): void => {
        if (e.keyCode !== KeyCodes.enter) {
            return;
        }
        e.preventDefault();
        this.props.onCommitPropertyNameEdit(
            this.props.cssPropertyName,
            this.props.rowIndex
        );
    };
}
