import {
    Behavior,
    Binding,
    BindingObserver,
    CSSDirective,
    defaultExecutionContext,
    FASTElement,
    observable,
    Observable,
    Subscriber,
} from "@microsoft/fast-element";
import { DI, InterfaceSymbol, Registration } from "../di/di";
import { CustomPropertyManager } from "./custom-property-manager";
import type {
    DerivedDesignTokenValue,
    DesignTokenTarget,
    DesignTokenValue,
    StaticDesignTokenValue,
} from "./interfaces";

/**
 * Describes a DesignToken instance.
 * @alpha
 */
export interface DesignToken<T> extends CSSDirective {
    readonly name: string;

    /**
     * The {@link (DesignToken:interface)} formatted as a CSS custom property if the token is
     * configured to write a CSS custom property, otherwise empty string;
     */
    readonly cssCustomProperty: string;

    /**
     * Adds the token as a CSS Custom Property to an element
     * @param element - The element to add the CSS Custom Property to
     */
    addCustomPropertyFor(element: DesignTokenTarget): this;

    /**
     *
     * @param element - The element to remove the CSS Custom Property from
     */
    removeCustomPropertyFor(element: DesignTokenTarget): this;

    /**
     * Get the token value for an element.
     * @param element - The element to get the value for
     * @returns - The value set for the element, or the value set for the nearest element ancestor.
     */
    getValueFor(element: DesignTokenTarget): StaticDesignTokenValue<T>;

    /**
     * Sets the token to a value for an element.
     * @param element - The element to set the value for.
     * @param value - The value.
     */
    setValueFor(
        element: DesignTokenTarget,
        value: DesignTokenValue<T> | DesignToken<T>
    ): void;

    /**
     * Removes a value set for an element.
     * @param element - The element to remove the value from
     */
    deleteValueFor(element: DesignTokenTarget): this;
}

interface Disposable {
    dispose(): void;
}

/**
 * Implementation of {@link (DesignToken:interface)}
 */
class DesignTokenImpl<T> extends CSSDirective implements DesignToken<T> {
    private cssVar: string;
    private customPropertyChangeHandlers: WeakMap<
        DesignTokenTarget,
        Subscriber & Disposable
    > = new Map();

    constructor(public readonly name: string) {
        super();

        this.cssCustomProperty = `--${name}`;
        this.cssVar = `var(${this.cssCustomProperty})`;
    }

    public createCSS(): string {
        return this.cssVar;
    }

    public readonly cssCustomProperty: string;

    public getValueFor(element: DesignTokenTarget): StaticDesignTokenValue<T> {
        const node = DesignTokenNode.for(this, element);
        Observable.track(node, "value");
        return DesignTokenNode.for(this, element).value;
    }

    public setValueFor(
        element: DesignTokenTarget,
        value: DesignTokenValue<T> | DesignToken<T>
    ): this {
        if (value instanceof DesignTokenImpl) {
            const _value = value;
            value = ((_element: DesignTokenTarget) =>
                DesignTokenNode.for<T>(_value, _element)
                    .value) as DerivedDesignTokenValue<T>;
        }
        DesignTokenNode.for<T>(this, element).set(value);
        return this;
    }

    public deleteValueFor(element: DesignTokenTarget): this {
        DesignTokenNode.for(this, element).delete();
        return this;
    }

    public addCustomPropertyFor(element: DesignTokenTarget): this {
        if (!this.customPropertyChangeHandlers.has(element)) {
            const node = DesignTokenNode.for(this, element);
            let value = node.value;

            const add = () => CustomPropertyManager.addTo(element, this, value);
            const remove = () => CustomPropertyManager.removeFrom(element, this, value);

            const subscriber: Subscriber & Disposable = {
                handleChange: (source, key) => {
                    remove();
                    value = source[key];
                    add();
                },
                dispose: () => {
                    remove();
                    Observable.getNotifier(node).unsubscribe(subscriber, "value");
                    this.customPropertyChangeHandlers.delete(element);
                },
            };

            this.customPropertyChangeHandlers.set(element, subscriber);
            add();

            Observable.getNotifier(node).subscribe(subscriber, "value");
        }

        return this;
    }

    public removeCustomPropertyFor(element: DesignTokenTarget): this {
        if (this.customPropertyChangeHandlers.has(element)) {
            this.customPropertyChangeHandlers.get(element)!.dispose();
        }

        return this;
    }

    public createBehavior() {
        return new DesignTokenBehavior(this);
    }
}

/**
 * Behavior to add and Design Token custom properties for an element
 */
class DesignTokenBehavior<T> implements Behavior {
    constructor(public token: DesignToken<T>) {}

    bind(target: DesignTokenTarget) {
        this.token.addCustomPropertyFor(target);
    }
    unbind(target: DesignTokenTarget) {
        this.token.removeCustomPropertyFor(target);
    }
}

const nodeCache = new WeakMap<HTMLElement, Map<DesignToken<any>, DesignTokenNode<any>>>();
const channelCache = new Map<DesignToken<any>, InterfaceSymbol<DesignTokenNode<any>>>();
const childToParent = new WeakMap<DesignTokenNode<any>, DesignTokenNode<any>>();
const noop = Function.prototype;

/**
 * A node responsible for setting and getting token values,
 * emitting values to CSS custom properties, and maintaining
 * inheritance structures.
 */
class DesignTokenNode<T> {
    /** Track downstream nodes */
    private children: Set<DesignTokenNode<any>> = new Set();
    private bindingObserver: BindingObserver | undefined;

    /**
     * The raw, unresolved value that was set for a token.
     */
    @observable
    private _rawValue: DesignTokenValue<T> | undefined;
    private _rawValueChanged() {
        Observable.getNotifier(this).notify("value");
    }

    constructor(
        public readonly token: DesignToken<T>,
        public readonly target: DesignTokenTarget
    ) {
        if (nodeCache.has(target) && nodeCache.get(target)!.has(token)) {
            throw new Error(
                `DesignTokenNode already created for ${token.name} and ${target}. Use DesignTokenNode.for() to ensure proper reuse`
            );
        }

        const container = DI.getOrCreateDOMContainer(this.target);
        const channel = DesignTokenNode.channel(token);
        container.register(Registration.instance(channel, this));

        if (target instanceof FASTElement) {
            (target as FASTElement).$fastController.addBehaviors([
                {
                    bind: () => this.findParentNode()?.appendChild(this),
                    unbind: () => childToParent.get(this)?.removeChild(this),
                },
            ]);
        } else {
            this.findParentNode()?.appendChild(this);
        }
    }

    private resolveRealValueForNode(node: DesignTokenNode<T>): T {
        let current: DesignTokenNode<T> | undefined = node;

        while (current !== undefined) {
            if (current.rawValue !== undefined) {
                const { rawValue } = current;
                if (DesignTokenNode.isDerivedTokenValue(rawValue)) {
                    this.setupBindingObserver(rawValue);

                    return this.bindingObserver!.observe(
                        this.target,
                        defaultExecutionContext
                    );
                } else {
                    return rawValue as any;
                }
            }

            current = childToParent.get(current);
        }

        throw new Error(
            `Value could not be retrieved for token named "${this.token.name}". Ensure the value is set for ${this.target} or an ancestor of ${this.target}.`
        );
    }

    private static channel<T>(
        token: DesignToken<T>
    ): InterfaceSymbol<DesignTokenNode<T>> {
        return channelCache.has(token)
            ? channelCache.get(token)!
            : channelCache.set(token, DI.createInterface<DesignTokenNode<T>>()) &&
                  channelCache.get(token)!;
    }

    private static isDerivedTokenValue<T>(
        value: DesignTokenValue<T> | DesignTokenImpl<T>
    ): value is DerivedDesignTokenValue<T> {
        return typeof value === "function";
    }

    /**
     * Invoked when parent node's value changes
     */
    public handleChange = this.valueChangeHandler;

    private valueChangeHandler(source: DesignTokenNode<T>, key: "value") {
        if (this._rawValue === void 0) {
            Observable.getNotifier(this).notify("value");
        }
    }

    private setupBindingObserver(value: DerivedDesignTokenValue<T>) {
        this.tearDownBindingObserver();

        const handler = {
            handleChange: (source: Binding<HTMLElement>) => {
                Observable.getNotifier(this).notify("value");
            },
        };

        this.bindingObserver = Observable.binding(value, handler);
    }

    private tearDownBindingObserver() {
        if (this.bindingObserver) {
            this.bindingObserver.disconnect();
            this.bindingObserver = undefined;
        }
    }

    public static for<T>(token: DesignToken<T>, target: DesignTokenTarget) {
        const targetCache = nodeCache.has(target)
            ? nodeCache.get(target)!
            : nodeCache.set(target, new Map()) && nodeCache.get(target)!;
        return targetCache.has(token)
            ? targetCache.get(token)!
            : targetCache.set(token, new DesignTokenNode(token, target)) &&
                  targetCache.get(token)!;
    }

    public appendChild<T>(child: DesignTokenNode<T>) {
        if (this.children.has(child)) {
            return;
        }

        this.children.forEach(c => {
            if (child.contains(c)) {
                this.removeChild(c);
                child.appendChild(c);
            }
        });

        this.children.add(child);
        Observable.getNotifier(this).subscribe(child, "value");
        childToParent.set(child, this);
    }

    public removeChild<T>(child: DesignTokenNode<T>) {
        this.children.delete(child);
        childToParent.delete(child);
        Observable.getNotifier(this).unsubscribe(child, "value");
    }

    public contains<T>(node: DesignTokenNode<T>) {
        return this.target.contains(node.target);
    }

    private findParentNode() {
        if (this.target !== document.body && this.target.parentNode) {
            const container = DI.getOrCreateDOMContainer(this.target.parentElement!);
            try {
                return container.get(DesignTokenNode.channel(this.token));
            } catch (e) {
                return null;
            }
        } else {
            return null;
        }
    }

    /**
     * The resolved value for a node.
     */
    public get value(): T {
        try {
            return this.resolveRealValueForNode(this);
        } catch (e) {
            if (!childToParent.has(this)) {
                const parent = this.findParentNode();

                if (parent) {
                    parent.appendChild(this);
                    return this.resolveRealValueForNode(this);
                }
            }

            throw e;
        }
    }

    /**
     * The actual value set for the node, or undefined.
     * This will be a reference to the original object for all data types
     * passed by reference.
     */
    public get rawValue(): DesignTokenValue<T> | undefined {
        return this._rawValue;
    }

    /**
     * Sets a value for the node
     * @param value The value to set
     */
    public set(value: DesignTokenValue<T>): void {
        if (value === this._rawValue) {
            return;
        }

        if (DesignTokenNode.isDerivedTokenValue(value)) {
            this.handleChange = noop as () => void;
            this.setupBindingObserver(value);
        } else if (this._rawValue !== value) {
            this.handleChange = noop as () => void;
        }

        this._rawValue = value;
    }

    /**
     * Deletes any value set for the node.
     */
    public delete() {
        this._rawValue = void 0;
        this.handleChange = this.valueChangeHandler;
        this.tearDownBindingObserver();
    }
}

function create<T extends Function>(name: string): never;
function create<T extends undefined | void>(name: string): never;
function create<T>(name: string): DesignToken<T>;
function create<T>(name: string): any {
    return new DesignTokenImpl<T>(name);
}

/**
 * Factory object for creating {@link (DesignToken:interface)} instances.
 * @alpha
 */
export const DesignToken = Object.freeze({
    create,
});
