import { CaptureType } from "./template";
import { Behavior } from "../observation/behavior";
import { AttachedBehaviorHTMLDirective } from "./html-directive";

/**
 * The runtime behavior for template references.
 * @public
 */
export class RefBehavior implements Behavior {
    /**
     * Creates an instance of RefBehavior.
     * @param target - The element to reference.
     * @param propertyName - The name of the property to assign the reference to.
     */
    public constructor(private target: HTMLElement, private propertyName: string) {}

    /**
     * Bind this behavior to the source.
     * @param source - The source to bind to.
     * @param context - The execution context that the binding is operating within.
     */
    public bind(source: any): void {
        source[this.propertyName] = this.target;
    }

    /* eslint-disable-next-line @typescript-eslint/no-empty-function */
    /**
     * Unbinds this behavior from the source.
     * @param source - The source to unbind from.
     */
    public unbind(): void {}
}

/**
 * A directive that observes the updates a property with a reference to the element.
 * @param propertyName - The name of the property to assign the reference to.
 * @public
 */
export function ref<T = any>(propertyName: keyof T & string): CaptureType<T> {
    return new AttachedBehaviorHTMLDirective("fast-ref", RefBehavior, propertyName);
}
