import {
    attr,
    FASTElement,
    Notifier,
    Observable,
    observable,
} from "@microsoft/fast-element";
import { Direction, Orientation } from "@microsoft/fast-web-utilities";
import { convertPixelToPercent } from "../slider/slider-utilities";
import { FASTSlider, SliderConfiguration } from "../slider";

const defaultConfig: SliderConfiguration = {
    min: 0,
    max: 0,
    direction: Direction.ltr,
    orientation: Orientation.horizontal,
    disabled: false,
};

export class SliderLabel extends FASTElement {
    @observable
    public positionStyle: string;

    public root: HTMLDivElement;

    @attr
    public position: string;
    private positionChanged(): void {
        this.positionStyle = this.positionAsStyle();
    }

    @attr({ attribute: "hide-mark", mode: "boolean" })
    public hideMark: boolean = false;

    @attr({ attribute: "disabled", mode: "boolean" })
    public disabled: boolean; // Map to proxy element

    @observable
    public sliderOrientation: Orientation;
    @observable
    public sliderMinPosition: number;
    @observable
    public sliderMaxPosition: number;
    @observable
    public sliderDirection: Direction = Direction.ltr;

    private notifier: Notifier;

    public connectedCallback(): void {
        super.connectedCallback();
        this.getSliderConfiguration();
        this.positionStyle = this.positionAsStyle();
        this.notifier = Observable.getNotifier(this.parentNode as FASTSlider);
        this.notifier.subscribe(this, "orientation");
        this.notifier.subscribe(this, "direction");
        this.notifier.subscribe(this, "max");
        this.notifier.subscribe(this, "min");
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
        this.notifier.unsubscribe(this, "orientation");
        this.notifier.unsubscribe(this, "direction");
        this.notifier.unsubscribe(this, "max");
        this.notifier.unsubscribe(this, "min");
    }

    public handleChange(source: any, propertyName: string) {
        switch (propertyName) {
            case "direction":
                this.sliderDirection = source.direction;
                break;
            case "orientation":
                this.sliderOrientation = source.orientation;
                break;
            case "max":
                this.sliderMinPosition = source.max;
                break;
            case "min":
                this.sliderMinPosition = source.min;
                break;
            default:
                break;
        }
        this.positionStyle = this.positionAsStyle();
    }

    private isSliderConfig(node: any): node is SliderConfiguration {
        return node.max !== undefined && node.min !== undefined;
    }

    private getSliderConfiguration = (): void => {
        if (!this.isSliderConfig(this.parentNode)) {
            this.sliderDirection = defaultConfig.direction || Direction.ltr;
            this.sliderOrientation = defaultConfig.orientation || Orientation.horizontal;
            this.sliderMaxPosition = defaultConfig.max;
            this.sliderMinPosition = defaultConfig.min;
        } else {
            const parentSlider: SliderConfiguration | null = this
                .parentNode as SliderConfiguration;
            const { min, max, direction, orientation, disabled } = parentSlider;
            if (disabled !== undefined) {
                this.disabled = disabled;
            }
            this.sliderDirection = direction || Direction.ltr;
            this.sliderOrientation = orientation || Orientation.horizontal;
            this.sliderMaxPosition = max;
            this.sliderMinPosition = min;
        }
    };

    private positionAsStyle = (): any => {
        const direction: Direction = this.sliderDirection
            ? this.sliderDirection
            : Direction.ltr;

        const pct = convertPixelToPercent(
            Number(this.position),
            Number(this.sliderMinPosition),
            Number(this.sliderMaxPosition)
        );
        let rightNum: number = Math.round((1 - pct) * 100);
        let leftNum: number = Math.round(pct * 100);
        if (leftNum === Number.NaN && rightNum === Number.NaN) {
            rightNum = 50;
            leftNum = 50;
        }

        if (this.sliderOrientation === Orientation.horizontal) {
            return direction === Direction.rtl
                ? `right: ${leftNum}%; left: ${rightNum}%;`
                : `left: ${leftNum}%; right: ${rightNum}%;`;
        } else {
            return `top: ${leftNum}%; bottom: ${rightNum}%;`;
        }
    };
}
