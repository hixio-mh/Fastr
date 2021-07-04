import React from "react";
import { BadgeProps } from "./badge.props";
import { BadgeType } from "./template.control.utilities.props";

export default class Badge extends React.Component<BadgeProps, {}> {
    public render(): React.ReactNode {
        switch (this.props.type) {
            case BadgeType.info:
                return (
                    <svg
                        className={this.props.className}
                        width="12"
                        height="12"
                        viewBox="0 0 15 15"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {this.renderTitle()}
                        <path d="M7.5 15C6.80729 15 6.14062 14.9115 5.5 14.7344C4.86458 14.5573 4.26823 14.3073 3.71094 13.9844C3.15365 13.6562 2.64583 13.2656 2.1875 12.8125C1.73438 12.3542 1.34375 11.8464 1.01562 11.2891C0.692708 10.7318 0.442708 10.1354 0.265625 9.5C0.0885417 8.85938 0 8.19271 0 7.5C0 6.80729 0.0885417 6.14323 0.265625 5.50781C0.442708 4.86719 0.692708 4.26823 1.01562 3.71094C1.34375 3.15365 1.73438 2.64844 2.1875 2.19531C2.64583 1.73698 3.15365 1.34635 3.71094 1.02344C4.26823 0.695312 4.86458 0.442708 5.5 0.265625C6.14062 0.0885417 6.80729 0 7.5 0C8.19271 0 8.85677 0.0885417 9.49219 0.265625C10.1328 0.442708 10.7318 0.695312 11.2891 1.02344C11.8464 1.34635 12.3516 1.73698 12.8047 2.19531C13.263 2.64844 13.6536 3.15365 13.9766 3.71094C14.3047 4.26823 14.5573 4.86719 14.7344 5.50781C14.9115 6.14323 15 6.80729 15 7.5C15 8.19271 14.9115 8.85938 14.7344 9.5C14.5573 10.1354 14.3047 10.7318 13.9766 11.2891C13.6536 11.8464 13.263 12.3542 12.8047 12.8125C12.3516 13.2656 11.8464 13.6562 11.2891 13.9844C10.7318 14.3073 10.1328 14.5573 9.49219 14.7344C8.85677 14.9115 8.19271 15 7.5 15ZM7.5 1C6.90104 1 6.32552 1.07812 5.77344 1.23438C5.22135 1.39062 4.70312 1.60938 4.21875 1.89062C3.73958 2.17188 3.30208 2.51042 2.90625 2.90625C2.51042 3.30208 2.17188 3.74219 1.89062 4.22656C1.60938 4.70573 1.39062 5.22396 1.23438 5.78125C1.07812 6.33333 1 6.90625 1 7.5C1 8.09375 1.07812 8.66927 1.23438 9.22656C1.39062 9.77865 1.60938 10.2969 1.89062 10.7812C2.17188 11.2604 2.51042 11.6979 2.90625 12.0938C3.30208 12.4896 3.73958 12.8281 4.21875 13.1094C4.70312 13.3906 5.22135 13.6094 5.77344 13.7656C6.32552 13.9219 6.90104 14 7.5 14C8.09375 14 8.66667 13.9219 9.21875 13.7656C9.77604 13.6094 10.2943 13.3906 10.7734 13.1094C11.2578 12.8281 11.6979 12.4896 12.0938 12.0938C12.4896 11.6979 12.8281 11.2604 13.1094 10.7812C13.3906 10.2969 13.6094 9.77865 13.7656 9.22656C13.9219 8.67448 14 8.09896 14 7.5C14 6.90625 13.9219 6.33333 13.7656 5.78125C13.6094 5.22396 13.3906 4.70573 13.1094 4.22656C12.8281 3.74219 12.4896 3.30208 12.0938 2.90625C11.6979 2.51042 11.2578 2.17188 10.7734 1.89062C10.2943 1.60938 9.77604 1.39062 9.21875 1.23438C8.66667 1.07812 8.09375 1 7.5 1ZM7 6H8V11H7V6ZM7 4H8V5H7V4Z" />
                    </svg>
                );
            case BadgeType.warning:
                return (
                    <svg
                        className={this.props.className}
                        width="12"
                        height="12"
                        viewBox="0 0 15 15"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {this.renderTitle()}
                        <path d="M15 15H0L7.5 0L15 15ZM1.61719 14H13.3828L7.5 2.23438L1.61719 14ZM8 6V11H7V6H8ZM7 12H8V13H7V12Z" />
                    </svg>
                );
            case BadgeType.locked:
                return (
                    <svg
                        className={this.props.className}
                        width="12"
                        height="12"
                        viewBox="0 0 12 16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {this.renderTitle()}
                        <path d="M12 7V16H0V7H2V4.07812C2 3.51562 2.10156 2.98698 2.30469 2.49219C2.50781 1.9974 2.78906 1.5651 3.14844 1.19531C3.50781 0.825521 3.92969 0.533854 4.41406 0.320312C4.90365 0.106771 5.43229 0 6 0C6.56771 0 7.09375 0.106771 7.57812 0.320312C8.06771 0.533854 8.49219 0.825521 8.85156 1.19531C9.21094 1.5651 9.49219 1.9974 9.69531 2.49219C9.89844 2.98698 10 3.51562 10 4.07812V7H12ZM3 7H9V4.07812C9 3.65625 8.92448 3.26042 8.77344 2.89062C8.6224 2.51562 8.41146 2.1875 8.14062 1.90625C7.875 1.625 7.55729 1.40365 7.1875 1.24219C6.82292 1.08073 6.42708 1 6 1C5.57292 1 5.17448 1.08073 4.80469 1.24219C4.4401 1.40365 4.1224 1.625 3.85156 1.90625C3.58594 2.1875 3.3776 2.51562 3.22656 2.89062C3.07552 3.26042 3 3.65625 3 4.07812V7ZM11 8H1V15H11V8Z" />
                    </svg>
                );
            default:
                return null;
        }
    }

    private renderTitle(): React.ReactNode {
        if (this.props.description) {
            return <title>{this.props.description}</title>;
        }
    }
}
