import React from "react";
import styles, { CSSControlClassNameContract } from "./control.css.style";
import { CSSControlProps } from "./control.css.props";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import { ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";
import { classNames } from "@microsoft/fast-web-utilities";
import { properties } from "@microsoft/fast-tooling/dist/css-data";
import {
    CSSProperty,
    CSSPropertiesDictionary,
    CSSPropertyRef,
    CSSPropertySyntax,
} from "@microsoft/fast-tooling/dist/data-utilities/mapping.mdn-data";
import { XOR } from "@microsoft/fast-tooling/dist/data-utilities/type.utilities";

/**
 * Custom form control definition
 */
class CSSControl extends React.Component<
    CSSControlProps & ManagedClasses<CSSControlClassNameContract>,
    {}
> {
    public render(): React.ReactNode {
        return (
            <div className={classNames(this.props.managedClasses.css)}>
                {this.renderProperties()}
            </div>
        );
    }

    private renderProperties(): React.ReactNode {
        return Object.entries((properties as unknown) as CSSPropertiesDictionary).map(
            ([, cssProperty]: [string, CSSProperty]): React.ReactNode => {
                return this.renderProperty(cssProperty);
            }
        );
    }

    private renderProperty(cssProperty: CSSProperty): React.ReactNode {
        return (
            <fieldset key={cssProperty.name}>
                <label>{cssProperty.name}</label>
                {this.renderPropertySyntax(cssProperty.syntax)}
            </fieldset>
        );
    }

    private renderPropertySyntax(
        cssPropertySyntax: CSSPropertySyntax[]
    ): React.ReactNode {
        console.log(cssPropertySyntax);
        return cssPropertySyntax.map((cssPropertySyntaxItem: CSSPropertySyntax) => {
            return (
                <div>
                    {this.renderPropertySyntaxSwitch(cssPropertySyntaxItem.ref)}
                    TODO: Determine the form elements here
                </div>
            );
        });
    }

    private renderPropertySyntaxSwitch(
        ref: XOR<string, CSSPropertyRef[]>
    ): React.ReactNode {
        if (typeof ref === "string") {
            return null;
        }

        return (
            <select>
                {ref.map((refItem: CSSPropertyRef) => {
                    if (typeof refItem.ref === "string") {
                        // This should always be a string, but check in case
                        return <option>{refItem.ref}</option>;
                    }
                })}
            </select>
        );
    }

    private renderTypeProperty(): React.ReactNode {
        return null;
    }

    private renderTypeValue(): React.ReactNode {
        return null;
    }

    private renderTypeSyntax(): React.ReactNode {
        return null;
    }
}

export { CSSControl };
export default manageJss(styles)(CSSControl);
