import { generateExampleData } from "../utilities";
import React from "react";
import { cloneDeep, get, uniqueId } from "lodash-es";
import HTML5Backend from "react-dnd-html5-backend";
import { ContextComponent, DragDropContext } from "react-dnd";
import {
    keyCodeArrowDown,
    keyCodeArrowUp,
    keyCodeEnter,
    keyCodeTab,
} from "@microsoft/fast-web-utilities";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import { ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";
import { canUseDOM } from "exenv-es6";
import { getChildOptionBySchemaId } from "../../data-utilities/location";
import { FormChildOptionItem } from "../form.props";
import { reactChildrenStringSchema } from "./control.children.text";
import styles from "./control.children.style";
import BaseFormControl from "./template.control.abstract";
import {
    ChildComponent,
    ChildComponentConfig,
    ChildrenFormControlClassNameContract,
    ChildrenFormControlProps,
    ChildrenFormControlState,
} from "./control.children.props";
import DragItem from "./drag-item";
import { ArrayAction } from "./control.props";

/**
 * Schema form component definition
 * @extends React.Component
 */
/* tslint:disable-next-line */
class ChildrenFormControl extends BaseFormControl<
    ChildrenFormControlProps & ManagedClasses<ChildrenFormControlClassNameContract>,
    ChildrenFormControlState
> {
    public static displayName: string = "ChildrenFormControl";

    /**
     * Store a reference to the children list
     */
    private filteredChildrenList: React.RefObject<HTMLUListElement>;

    /**
     * Store a reference to the children list trigger
     */
    private filteredChildrenListTrigger: React.RefObject<HTMLButtonElement>;

    /**
     * Store a reference to the combobox input
     */
    private filteredChildrenInput: React.RefObject<HTMLInputElement>;

    /**
     * Store a reference to the selected child option
     */
    private selectedChildOption: React.RefObject<HTMLLIElement>;

    /**
     * The child options available to be filtered
     */
    private childOptions: FormChildOptionItem[];

    constructor(
        props: ChildrenFormControlProps &
            ManagedClasses<ChildrenFormControlClassNameContract>
    ) {
        super(props);

        this.filteredChildrenList = React.createRef();
        this.filteredChildrenListTrigger = React.createRef();
        this.filteredChildrenInput = React.createRef();
        this.selectedChildOption = React.createRef();

        const defaultOptions: FormChildOptionItem[] = [];

        if (
            Array.isArray(this.props.defaultChildOptions) &&
            this.props.defaultChildOptions.includes("text")
        ) {
            defaultOptions.push({
                name: "Text",
                component: null,
                schema: reactChildrenStringSchema,
            });
        }

        this.childOptions = defaultOptions.concat(this.props.childOptions);

        this.state = {
            childrenSearchTerm: "",
            indexOfSelectedFilteredChildOption: 0,
            filteredChildOptions: this.childOptions,
            hideChildrenList: true,
            editChildIndex: -1,
            isDragging: false,
            data: [].concat(props.data || []),
        };
    }

    public render(): JSX.Element {
        // Convert to search component when #3006 has been completed
        return (
            <div className={this.props.managedClasses.childrenFormControl}>
                <div className={this.props.managedClasses.childrenFormControl_control}>
                    <div
                        className={get(
                            this.props,
                            "managedClasses.childrenFormControl_controlLabelRegion"
                        )}
                    >
                        <label
                            className={
                                this.props.managedClasses.childrenFormControl_controlLabel
                            }
                            id={this.getLabelId()}
                        >
                            {this.props.label}
                        </label>
                        {this.renderDefaultValueIndicator(
                            get(
                                this.props,
                                "managedClasses.childrenFormControl_defaultValueIndicator"
                            )
                        )}
                        {this.renderBadge(
                            get(this.props, "managedClasses.childrenFormControl_badge")
                        )}
                    </div>
                </div>
                {this.renderDefaultChildren()}
                {this.renderExistingChildren()}
                {this.renderAddChild()}
            </div>
        );
    }

    public componentDidMount(): void {
        if (canUseDOM()) {
            document.addEventListener("click", this.handleWindowClick);
        }
    }

    public componentDidUpdate(): void {
        const editIndex: number = this.state.editChildIndex;

        if (editIndex > -1) {
            const children: ChildComponent[] = this.currentChildrenArray();
            const childToEdit: ChildComponent | undefined = children[editIndex];

            if (childToEdit !== undefined) {
                this.onEditComponent(
                    childToEdit,
                    editIndex === 0 && !Array.isArray(this.props.data)
                        ? undefined
                        : editIndex
                );

                this.setState({
                    editChildIndex: -1,
                });
            }
        }

        if (
            Array.isArray(this.props.data) &&
            this.props.data.length !== this.state.data.length
        ) {
            this.setState({
                data: [].concat(this.props.data),
            });
        }
    }

    public componentWillUnmount(): void {
        if (canUseDOM()) {
            document.removeEventListener("click", this.handleWindowClick);
        }
    }

    /**
     * Renders the input, button and listbox for
     * adding a child
     */
    private renderAddChild(): React.ReactNode {
        return (
            <div>
                <div
                    className={
                        this.props.managedClasses.childrenFormControl_childrenListControl
                    }
                >
                    <input
                        className={
                            this.props.managedClasses
                                .childrenFormControl_childrenListInput
                        }
                        type={"text"}
                        aria-autocomplete={"list"}
                        aria-controls={this.getFilteredChildrenInputId()}
                        aria-labelledby={this.getLabelId()}
                        value={this.state.childrenSearchTerm}
                        placeholder="Add"
                        onChange={this.handleChildOptionFilterInputChange}
                        onKeyDown={this.handleChildrenListInputKeydown}
                        ref={this.filteredChildrenInput}
                    />
                    <button
                        type="button" // Ensure the form doesn't see this as a submit button
                        className={
                            this.props.managedClasses
                                .childrenFormControl_childrenListTrigger
                        }
                        tabIndex={-1}
                        aria-label={"Show children options"}
                        onClick={this.handleChildrenListTriggerClick}
                        ref={this.filteredChildrenListTrigger}
                    />
                </div>
                <ul
                    id={this.getFilteredChildrenInputId()}
                    aria-labelledby={this.getLabelId()}
                    aria-hidden={this.state.hideChildrenList}
                    className={this.props.managedClasses.childrenFormControl_childrenList}
                    role={"listbox"}
                    ref={this.filteredChildrenList}
                >
                    {this.renderFilteredChildOptions()}
                </ul>
            </div>
        );
    }

    /**
     * Renders the optional children
     */
    private renderFilteredChildOptions(): JSX.Element[] {
        return this.state.filteredChildOptions.map(
            (option: FormChildOptionItem, index: number): JSX.Element => {
                const selected: boolean =
                    this.state.filteredChildOptions[
                        this.state.indexOfSelectedFilteredChildOption
                    ] === option;

                return (
                    <li
                        className={
                            this.props.managedClasses.childrenFormControl_childrenListItem
                        }
                        key={uniqueId()}
                        role={"option"}
                        aria-selected={selected}
                        onClick={this.clickAddComponentFactory(option)}
                        ref={selected ? this.selectedChildOption : null}
                    >
                        <span>{option.name}</span>
                    </li>
                );
            }
        );
    }

    /**
     * Renders a caption for an existing child item
     */
    private renderExistingChildCaption(instance: ChildComponent): JSX.Element {
        if (
            instance &&
            (instance as ChildComponentConfig).props &&
            (instance as ChildComponentConfig).props.text
        ) {
            return (
                <React.Fragment>
                    <br />
                    <i
                        className={
                            this.props.managedClasses
                                .childrenFormControl_existingChildrenItemContent
                        }
                    >
                        {(instance as ChildComponentConfig).props.text}
                    </i>
                </React.Fragment>
            );
        }

        return null;
    }

    /**
     * Renders the delete button for an existing child
     */
    private renderExistingChildDelete(): JSX.Element {
        return (
            <button
                type="button" // Ensure the form doesn't see this as a submit button
                aria-label={"Select to remove"}
                className={this.props.managedClasses.childrenFormControl_deleteButton}
                onClick={this.clickDeleteComponentFactory(ArrayAction.remove)}
            />
        );
    }

    /**
     * Generate the text to use as display for a child option
     */
    private generateChildOptionText(item: any): string {
        const childOption: FormChildOptionItem = getChildOptionBySchemaId(
            item.id,
            this.childOptions
        );

        if (typeof childOption === "object" && childOption !== null) {
            return childOption.name;
        } else {
            return this.getChildOptionTextString(item);
        }
    }

    private currentChildrenArray(): ChildComponent[] {
        return Array.isArray(this.props.data) ? this.props.data : [this.props.data];
    }

    /**
     * Generate all items for the list of existing children
     */
    private renderExistingChildItems(): React.ReactNode {
        if (Array.isArray(this.props.data)) {
            return this.state.data.map(
                (data: ChildComponent, index: number): React.ReactNode => {
                    return (
                        <DragItem
                            key={index}
                            itemClassName={this.getExistingChildItemClassNames()}
                            itemLinkClassName={
                                this.props.managedClasses
                                    .childrenFormControl_existingChildrenItemLink
                            }
                            itemRemoveClassName={
                                this.props.managedClasses.childrenFormControl_deleteButton
                            }
                            minItems={0}
                            itemLength={this.props.data.length}
                            index={index}
                            onClick={this.clickEditComponentFactory}
                            removeDragItem={this.clickDeleteComponentFactory}
                            moveDragItem={this.handleMoveDragItem}
                            dropDragItem={this.handleDropDragItem}
                            dragStart={this.handleDragStart}
                            dragEnd={this.handleDragEnd}
                        >
                            {this.renderChildrenListItem(data)}
                        </DragItem>
                    );
                }
            );
        }

        if (typeof this.props.data !== "undefined") {
            return (
                <li className={this.getExistingChildItemClassNames()}>
                    <a
                        aria-label={"Select to edit"}
                        className={
                            this.props.managedClasses
                                .childrenFormControl_existingChildrenItemLink
                        }
                        onClick={this.clickEditComponentFactory(this.props.data)}
                    >
                        {this.renderChildrenListItem(this.props.data)}
                    </a>
                    {this.renderExistingChildDelete()}
                </li>
            );
        }

        return null;
    }

    private renderChildrenListItem(data: ChildComponent): React.ReactNode {
        return (
            <React.Fragment>
                <span
                    className={
                        this.props.managedClasses
                            .childrenFormControl_existingChildrenItemName
                    }
                >
                    {this.generateChildOptionText(data)}
                </span>
                {this.renderExistingChildCaption(data)}
            </React.Fragment>
        );
    }

    /**
     * Render the list of existing children for a component
     */
    private renderExistingChildren(): React.ReactNode {
        const childItems: React.ReactNode = this.renderExistingChildItems();

        if (childItems) {
            return (
                <ul
                    className={
                        this.props.managedClasses.childrenFormControl_existingChildren
                    }
                >
                    {childItems}
                </ul>
            );
        }
    }

    /**
     * Render default children
     */
    private renderDefaultChildren(): React.ReactNode {
        if (
            typeof this.props.data === "undefined" &&
            typeof this.props.default !== "undefined"
        ) {
            const defaultValue: any[] = Array.isArray(this.props.default)
                ? this.props.default
                : [this.props.default];

            const defaultChildItems: React.ReactNode = this.renderDefaultChildItems(
                defaultValue
            );

            return (
                <ul
                    className={
                        this.props.managedClasses.childrenFormControl_existingChildren
                    }
                >
                    {defaultChildItems}
                </ul>
            );
        }
    }

    /**
     * Render default child items
     */
    private renderDefaultChildItems(defaultValue: any[]): React.ReactNode {
        return defaultValue.map(
            (defaultItem: ChildComponent, index: number): JSX.Element => {
                const displayValue: string =
                    typeof defaultItem === "object"
                        ? this.generateChildOptionText(defaultItem)
                        : defaultItem;

                return (
                    <li
                        key={`item-${index}`}
                        className={this.getExistingChildItemClassNames(true)}
                    >
                        <span
                            className={
                                this.props.managedClasses
                                    .childrenFormControl_existingChildrenItemLink
                            }
                        >
                            <span
                                className={
                                    this.props.managedClasses
                                        .childrenFormControl_existingChildrenItemName
                                }
                            >
                                {displayValue}
                            </span>
                            {this.renderExistingChildCaption(defaultItem)}
                        </span>
                    </li>
                );
            }
        );
    }

    private getExistingChildItemClassNames(isDefault?: boolean): string {
        let classes: string = get(
            this.props,
            "managedClasses.childrenFormControl_existingChildrenItem"
        );

        if (isDefault) {
            classes = `${classes} ${get(
                this.props,
                "managedClasses.childrenFormControl_existingChildrenItem__default"
            )}`;
        }

        return classes;
    }

    private handleDragStart = (): void => {
        this.setState({
            isDragging: true,
            data: [].concat(this.props.data || []),
        });
    };

    private handleDragEnd = (): void => {
        this.setState({
            isDragging: false,
        });
    };

    private handleDropDragItem = (): void => {
        this.props.onChange(this.props.dataLocation, this.state.data);
    };

    private handleMoveDragItem = (sourceIndex: number, targetIndex: number): void => {
        const currentData: unknown[] = [].concat(this.props.data);

        if (sourceIndex !== targetIndex) {
            currentData.splice(targetIndex, 0, currentData.splice(sourceIndex, 1)[0]);
        }

        this.setState({
            data: currentData,
        });
    };

    /**
     * Keydown handler for the child option filter
     */
    private handleChildrenListInputKeydown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        switch (e.keyCode) {
            case keyCodeEnter:
                e.preventDefault();
            case keyCodeTab:
                if (this.state.childrenSearchTerm !== "") {
                    this.onAddComponent(
                        this.state.filteredChildOptions[
                            this.state.indexOfSelectedFilteredChildOption
                        ],
                        e.ctrlKey
                    );
                }

                this.setState({
                    hideChildrenList: true,
                });
                break;
            case keyCodeArrowUp:
                this.selectPreviousFilteredChildOption();
                break;
            case keyCodeArrowDown:
                this.selectNextFilteredChildOption();
                break;
        }
    };

    /**
     * Click handler for the children list trigger
     */
    private handleChildrenListTriggerClick = (
        e: React.MouseEvent<HTMLButtonElement>
    ): void => {
        this.handleToggleChildrenListVisibility(e);

        if (this.filteredChildrenInput.current instanceof HTMLElement) {
            this.filteredChildrenInput.current.focus();
        }
    };

    /**
     * Click handler for toggling the visibility of the children list
     */
    private handleToggleChildrenListVisibility = (
        e: React.MouseEvent<HTMLButtonElement>
    ): void => {
        this.setState({
            hideChildrenList: !this.state.hideChildrenList,
        });

        if (this.filteredChildrenList.current instanceof HTMLElement) {
            this.filteredChildrenList.current.scrollTop = 0;
        }
    };

    /**
     * Click handler for the window
     */
    private handleWindowClick = (e: MouseEvent): void => {
        if (this.isTargetingChildrenList(e)) {
            this.setState({ hideChildrenList: true });
        }
    };

    /**
     * Change handler for editing the child option filter
     */
    private handleChildOptionFilterInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const filteredChildOptions: FormChildOptionItem[] = this.childOptions.filter(
            (option: FormChildOptionItem): boolean => {
                return option.name.toLowerCase().includes(e.target.value.toLowerCase());
            }
        );

        this.setState({
            childrenSearchTerm: e.target.value,
            indexOfSelectedFilteredChildOption: 0,
            filteredChildOptions,
            hideChildrenList: e.target.value === "",
        });
    };

    /**
     * Click handler for editing a component
     */
    private onEditComponent(component: ChildComponent, index: number): void {
        let childSchema: any;

        if (typeof component === "string") {
            childSchema = reactChildrenStringSchema;
        } else if (
            typeof component === "object" &&
            typeof (component as ChildComponentConfig).props === "object"
        ) {
            this.childOptions.forEach((childOption: FormChildOptionItem) => {
                if (childOption.schema.id === (component as ChildComponentConfig).id) {
                    childSchema = childOption.schema;
                }
            });
        }

        const dataLocation: string = this.getDataLocation(component, index);

        this.props.onUpdateActiveSection("", dataLocation, childSchema);
    }

    /**
     * Click handler for deleting a component
     */
    private onDeleteComponent(index?: number): void {
        this.props.onChange(
            this.props.dataLocation,
            undefined,
            typeof index === "number",
            index,
            true
        );
    }

    /**
     * Click event for adding a component
     */
    private onAddComponent(item: FormChildOptionItem, navigateToItem: boolean): void {
        const currentChildren: ChildComponent[] = this.getCurrentChildren(
            this.props.data
        );
        const items: null | string | ChildComponent[] | ChildComponentConfig =
            typeof item === "object" && item !== null
                ? this.getChildComponents(currentChildren, item)
                : typeof item === "string"
                    ? this.getChildStrings(currentChildren, item)
                    : null;

        if (items !== null) {
            this.props.onChange(
                this.props.dataLocation,
                items,
                undefined,
                undefined,
                true
            );

            if (navigateToItem) {
                this.setState({
                    editChildIndex: this.currentChildrenArray().filter(
                        (childItem: ChildComponent) => !!childItem
                    ).length,
                });
            }
        }

        this.setState({
            hideChildrenList: true,
            childrenSearchTerm: "",
        });
    }

    /**
     * Click factory for adding a child item
     */
    private clickAddComponentFactory = (
        component: FormChildOptionItem
    ): ((e: React.MouseEvent<HTMLLIElement>) => void) => {
        return (e: React.MouseEvent<HTMLLIElement>): void => {
            this.onAddComponent(component, e.ctrlKey);
        };
    };

    /**
     * Click factory for editing a child item
     */
    private clickEditComponentFactory = (
        index?: number
    ): ((e: React.MouseEvent<HTMLAnchorElement>) => void) => {
        return (e: React.MouseEvent<HTMLAnchorElement>): void => {
            e.preventDefault();

            this.onEditComponent(
                typeof index === "number" ? this.props.data[index] : this.props.data,
                index
            );
        };
    };

    /**
     * Click factory for removing a child item
     */
    private clickDeleteComponentFactory = (
        type: ArrayAction,
        index?: number
    ): ((e: React.MouseEvent<HTMLButtonElement>) => void) => {
        return (e: React.MouseEvent<HTMLButtonElement>): void => {
            e.preventDefault();

            if (type === ArrayAction.remove) {
                this.onDeleteComponent(index);
            }
        };
    };

    /**
     * Updates the filtered child options to select the next child
     */
    private selectNextFilteredChildOption(): void {
        if (this.state.filteredChildOptions.length > 1) {
            if (
                this.state.indexOfSelectedFilteredChildOption ===
                this.state.filteredChildOptions.length - 1
            ) {
                this.setState({
                    indexOfSelectedFilteredChildOption: 0,
                });

                this.filteredChildrenList.current.scrollTop = 0;
            } else {
                this.setState({
                    indexOfSelectedFilteredChildOption:
                        this.state.indexOfSelectedFilteredChildOption + 1,
                });

                this.filteredChildrenList.current.scrollTop = (this.selectedChildOption
                    .current.nextSibling as HTMLLIElement).offsetTop;
            }
        }
    }

    /**
     * Updates the filtered child options to select the previous child
     */
    private selectPreviousFilteredChildOption(): void {
        if (this.state.filteredChildOptions.length > 1) {
            if (this.state.indexOfSelectedFilteredChildOption === 0) {
                this.setState({
                    indexOfSelectedFilteredChildOption:
                        this.state.filteredChildOptions.length - 1,
                });

                this.filteredChildrenList.current.scrollTop = this.filteredChildrenList.current.scrollHeight;
            } else {
                this.setState({
                    indexOfSelectedFilteredChildOption:
                        this.state.indexOfSelectedFilteredChildOption - 1,
                });

                this.filteredChildrenList.current.scrollTop = (this.selectedChildOption
                    .current.previousSibling as HTMLLIElement).offsetTop;
            }
        }
    }

    private isTargetingChildrenList(e: MouseEvent): boolean {
        return (
            e.target instanceof Element &&
            get(this.filteredChildrenList, "current") &&
            get(this.filteredChildrenListTrigger, "current") &&
            !this.filteredChildrenList.current.contains(e.target) &&
            !this.filteredChildrenListTrigger.current.contains(e.target) &&
            this.filteredChildrenListTrigger.current !== e.target
        );
    }

    private getLabelId(): string {
        return `${this.props.dataLocation}-label`;
    }

    private getFilteredChildrenInputId(): string {
        return `${this.props.dataLocation}-input`;
    }

    private getChildComponents(
        currentChildren: ChildComponent[],
        item: FormChildOptionItem
    ): ChildComponent[] {
        const components: ChildComponent[] = [].concat(currentChildren);
        const isString: boolean = item.schema === reactChildrenStringSchema;
        components.push(this.getChildComponent(item, isString));

        return components;
    }

    private getChildStrings(
        currentChildren: ChildComponent[],
        item: string
    ): ChildComponent[] | ChildComponent {
        const components: ChildComponent[] = currentChildren;

        if (components.length > 0) {
            components.push(item);
        }

        return components.length > 0 ? components : item;
    }

    private getCurrentChildren(currentChildren: ChildComponent): ChildComponent[] {
        return Array.isArray(currentChildren)
            ? currentChildren
            : typeof currentChildren !== "undefined" && currentChildren !== null
                ? [currentChildren]
                : [];
    }

    private getChildComponent(
        item: FormChildOptionItem,
        isString?: boolean
    ): ChildComponentConfig {
        if (!!isString) {
            return generateExampleData(item.schema, "");
        }

        return {
            id: item.schema.id,
            props: generateExampleData(item.schema, ""),
        };
    }

    private getDataLocation(component: ChildComponent, index: number): string {
        const propLocation: string = typeof component === "string" ? "" : ".props";

        if (typeof index === "number") {
            return `${this.props.dataLocation}[${index}]${propLocation}`;
        }

        return `${this.props.dataLocation}${propLocation}`;
    }

    private getChildOptionTextString(item: any): string {
        const textString: string = typeof item.props === "string" ? item.props : item;

        return textString ? textString : "Untitled";
    }
}

const TestChildrenFormControl: typeof ChildrenFormControl &
    ContextComponent<any> = DragDropContext(HTML5Backend)(ChildrenFormControl);

export { TestChildrenFormControl };
export default DragDropContext(HTML5Backend)(manageJss(styles)(ChildrenFormControl));
