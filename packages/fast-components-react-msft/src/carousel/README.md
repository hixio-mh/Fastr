# Carousel

*Carousel* allows the user to move through a series of slides.

## Style guidance

Class names have been provided and applied to capture the transition of the slides, and allow animation or transformation depending on incoming slide entry position.

## Auto-rotation

Auto-rotation can be enabled by setting the `autoplay` prop to "true" and including an optional `autoplayInterval` (defaults to 6000ms). If the carousel has an auto-rotation enabled, the automatic slide rotation should stop when any element in the carousel receives keyboard focus or hover. It does not resume unless the user activates a control to enable rotation. To support this scenario, the carousel treats `autoplay` as a controlled feature of this component. A callback prop of `onFocus` can be passed as an unhandled prop to support disabling `autoplay` when focus enters the carousel. Similarly, `onMouseEnter` and `onMouseLeave` props can be provided to pause and resume autorotation on mouse hover and leave respectively. It is the responsibility of those implementing the control to ensure that the auto-rotation stops and starts as expected.