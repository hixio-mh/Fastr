import { css } from "@microsoft/fast-element";

export const FeatureCardStyles = css`
    fast-card {
        color: var(--neutral-foreground-rest);
        color: white;
        background: transparent;
        display: grid;
        grid-template-columns: 1fr 2fr;
        padding: 20px;
        box-shadow: unset;
        height: 140px;
    }

    fast-card::before {
        content: "";
        color: rgba(247, 247, 247, 0.2);
        position: fixed;
        background-color: currentcolor;
        height: 1px;
        width: 90%;
        left: 20px;
        transform-origin: center center;
        transition: all 0.3s ease 0s;
    }

    h4 {
        font-size: 20px;
        margin: 0;
    }

    h5 {
        font-size: 14px;
        margin: 0 0 10px 0;
    }

    ::slotted(p) {
        margin: 0;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    fast-anchor {
        margin-right: 20px;
        opacity: 0;
        filter: hue-rotate(100deg);
    }

    fast-card:hover fast-anchor {
        opacity: 1;
    }
`;
