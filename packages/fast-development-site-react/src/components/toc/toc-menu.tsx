import * as React from "react";
import { Link } from "react-router-dom";
import devSiteDesignSystemDefaults, { DevSiteDesignSystem } from "../design-system";
import manageJss, {
    ComponentStyles,
    ManagedClasses,
    ManagedJSSProps,
} from "@microsoft/fast-jss-manager-react";
import { toPx } from "@microsoft/fast-jss-utilities";
import Toc from "./";

export interface TocMenuProps {
    controls: string;
    active: boolean;
}

export interface TocMenuState {
    active: boolean;
}

export interface TocMenuManagedClasses {
    tocMenu_button: string;
}

// tslint:disable-next-line
const dropdownActive: string =
    "PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHRpdGxlPmNoZXZyb24tZG93bjwvdGl0bGU+PHBhdGggZD0iTTMwLjUsNy4yOSwzMS45LDguNywxNi4yLDI0LjQuNSw4LjcsMS45LDcuMjlsMTQuMywxNC4zWiIvPjwvc3ZnPg==";
// tslint:disable-next-line
const dropdownInactive: string =
    "PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHRpdGxlPmNoZXZyb24tcmlnaHQ8L3RpdGxlPjxwYXRoIGQ9Ik0yMi43OCwxNiw4LjI1LDEuNDUsOS42NSwwbDE2LDE2LTE2LDE2LTEuNC0xLjQxWiIvPjwvc3ZnPg==";

const style: ComponentStyles<TocMenuManagedClasses, DevSiteDesignSystem> = {
    tocMenu_button: {
        background: "none",
        outline: "0",
        border: `${toPx(1)} solid transparent`,
        position: "relative",
        width: "100%",
        fontFamily: "inherit",
        fontSize: toPx(14),
        padding: `${toPx(9)} ${toPx(31)}`,
        textAlign: "left",
        "&[aria-expanded='true']": {
            "&::after": {
                content: `url('data:image/svg+xml;base64,${dropdownActive}')`,
            },
        },
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
        "&:focus": {
            border: (config: DevSiteDesignSystem): string => {
                return `${toPx(1)} solid ${config.brandColor ||
                    devSiteDesignSystemDefaults.brandColor}`;
            },
        },
        "&::after": {
            content: `url('data:image/svg+xml;base64,${dropdownInactive}')`,
            fill: "white",
            position: "absolute",
            right: toPx(11),
            top: toPx(11),
            verticalAlign: "middle",
            display: "inline-block",
            width: toPx(11),
            height: toPx(11),
        },
    },
};

class TocMenu extends React.Component<
    TocMenuProps & ManagedClasses<TocMenuManagedClasses>,
    TocMenuState
> {
    constructor(props: TocMenuProps & ManagedClasses<TocMenuManagedClasses>) {
        super(props);

        this.state = {
            active: this.props.active,
        };
    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <button
                    className={this.props.managedClasses.tocMenu_button}
                    onClick={this.handleButtonClick}
                    aria-expanded={this.state.active}
                    aria-controls={this.props.controls}
                >
                    {this.props.children[0]}
                </button>
                <Toc id={this.props.controls} ariaHidden={!this.state.active}>
                    {this.props.children[1]}
                </Toc>
            </React.Fragment>
        );
    }

    private handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        this.setState({
            active: !this.state.active,
        });
    };
}

export default manageJss(style)(TocMenu);
