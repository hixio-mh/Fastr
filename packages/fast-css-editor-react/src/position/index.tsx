import * as React from "react";
import { IManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";
import manageJss, { IJSSManagerProps } from "@microsoft/fast-jss-manager-react";
import style, { ICSSPositionClassNameContract } from "./position.style";

export enum PositionValue {
    static = "static",
    absolute = "absolute"
}

export enum Location {
    top = "top",
    left = "left",
    right = "right",
    bottom = "bottom"
}

export interface ILocationsMappedToClassNames {
    location: Location;
    className: string;
}

export interface ICSSPositionProps {
    position?: PositionValue;
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    onChange?: (positionValues: any) => void;
}

class CSSPosition extends React.Component<ICSSPositionProps & IManagedClasses<ICSSPositionClassNameContract>, {}> {
    private positionKey: string = "position";

    public render(): JSX.Element {
        return (
            <div className={this.props.managedClasses.cssPosition}>
                <span className={this.props.managedClasses.cssPosition_selectContainer}>
                    <select
                        className={this.props.managedClasses.cssPosition_selectContainer_select}
                        data-location={this.positionKey}
                        onChange={this.handleOnChange}
                        value={this.props.position ? this.props.position : PositionValue.static}
                    >
                        <option value={PositionValue.static}>Static</option>
                        <option value={PositionValue.absolute}>Absolute</option>
                    </select>
                </span>
                {this.renderControls(this.props.position)}
            </div>
        );
    }

    private renderControls(position?: PositionValue): JSX.Element {
        switch (position) {
            case PositionValue.absolute:
                return (
                    <div>
                        <div className={this.props.managedClasses.absoluteInput_row}>
                            {this.renderLocationInput(Location.top)}
                        </div>
                        <div className={this.props.managedClasses.absoluteInput_row}>
                            {this.renderLocationInput(Location.left)}
                            <div className={this.generateCenterRowClassNames()} />
                            {this.renderLocationInput(Location.right)}
                        </div>
                        <div className={this.props.managedClasses.absoluteInput_row}>
                            {this.renderLocationInput(Location.bottom)}
                        </div>
                    </div>
                );
            case PositionValue.static:
            default:
                return null;
        }
    }

    private renderLocationInput(location: Location): JSX.Element {
        return (
            <input
                type="number"
                className={this.props.managedClasses.cssPosition_input}
                data-location={location}
                onChange={this.handleOnChange}
                value={this.props[location] || ""}
            />
        );
    }

    private generateCenterRowClassNames(): string {
        let classNames: string = this.props.managedClasses.absoluteInput_row_center;

        [
            {
                location: Location.top,
                className: this.props.managedClasses.absoluteInput_row_center__activeTop
            },
            {
                location: Location.bottom,
                className: this.props.managedClasses.absoluteInput_row_center__activeBottom
            },
            {
                location: Location.left,
                className: this.props.managedClasses.absoluteInput_row_center__activeLeft
            },
            {
                location: Location.right,
                className: this.props.managedClasses.absoluteInput_row_center__activeRight
            }
        ].forEach((locationsMappedToClassNames: ILocationsMappedToClassNames): void => {
            classNames = this.props[locationsMappedToClassNames.location]
                ? `${classNames} ${locationsMappedToClassNames.className}`
                : classNames;
        });

        return classNames;
    }

    private handleOnChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>): void => {
        const updatedProps: Partial<ICSSPositionProps> = this.assignUpdatedProps(
            [this.positionKey, Location.top, Location.left, Location.right, Location.bottom],
            e.target.dataset.location,
            e.target.value
        );

        this.props.onChange(updatedProps);
    }

    private assignUpdatedProps(props: string[], updatedPropKey: string, updatedPropValue: string): Partial<ICSSPositionProps> {
        let updatedProps: Partial<ICSSPositionProps> = {};

        switch (updatedPropKey) {
            case "position":
                updatedProps[updatedPropKey] = updatedPropValue as PositionValue;
                break;
            case Location.left:
            case Location.right:
            case Location.top:
            case Location.bottom:
                updatedProps = this.getUpdatedPositions(props, updatedPropKey, updatedPropValue);
                break;
        }

        return updatedProps;
    }

    private getUpdatedPositions(props: string[], updatedPropKey: Location, updatedPropValue: string): Partial<ICSSPositionProps> {
        const updatedProps: Partial<ICSSPositionProps> = {};
        const excludedProp: Location = this.getExcludedLocation(updatedPropKey);

        props.forEach((prop: string): void => {
            if (this.props[prop] && prop !== excludedProp) {
                updatedProps[prop] = this.props[prop];
            }
        });

        updatedProps[updatedPropKey] = parseInt(updatedPropValue, 10);

        return updatedProps;
    }

    // Get the location that should be excluded from being added to the object,
    // this should be used for the opposing location, eg. if left is being set,
    // do not set right value.
    private getExcludedLocation(updatedPropKey: Location): Location {
        return updatedPropKey === Location.left
            ? Location.right
            : updatedPropKey === Location.right
            ? Location.left
            : updatedPropKey === Location.top
            ? Location.bottom
            : Location.top;
    }
}

export default manageJss(style)(CSSPosition);
