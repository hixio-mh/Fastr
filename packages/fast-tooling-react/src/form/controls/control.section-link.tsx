import React from "react";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import { ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";
import { classNames } from "@microsoft/fast-web-utilities";
import styles, {
    SectionLinkControlClassNameContract,
} from "./control.section-link.style";
import { SectionLinkControlProps } from "./control.section-link.props";

/**
 * Form control definition
 */
/* tslint:disable-next-line */
class SectionLinkControl extends React.Component<
    SectionLinkControlProps & ManagedClasses<SectionLinkControlClassNameContract>,
    {}
> {
    public static displayName: string = "SectionLinkControl";

    public static defaultProps: Partial<
        SectionLinkControlProps & ManagedClasses<SectionLinkControlClassNameContract>
    > = {
        managedClasses: {},
    };

    public render(): React.ReactNode {
        const {
            sectionLinkControl,
            sectionLinkControl__disabled,
            sectionLinkControl__invalid,
        }: SectionLinkControlClassNameContract = this.props.managedClasses;

        return (
            <a
                className={classNames(
                    sectionLinkControl,
                    [sectionLinkControl__disabled, this.props.disabled],
                    [sectionLinkControl__invalid, this.props.invalidMessage !== ""]
                )}
                onClick={this.handleUpdateSection}
            >
                Edit: {this.props.label}
            </a>
        );
    }

    private handleUpdateSection = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        this.props.onUpdateSection({
            schemaLocation: this.props.schemaLocation,
            dataLocation: this.props.dataLocation,
        });
    };
}

export { SectionLinkControl };
export default manageJss(styles)(SectionLinkControl);
