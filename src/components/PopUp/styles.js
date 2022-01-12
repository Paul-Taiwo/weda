/* eslint-disable import/prefer-default-export */
/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import styled from "styled-components";
import { Popup } from "react-leaflet";

const StyledPopUp = styled(Popup)`
    &.custom-popup {
        .border-right {
            border-right: 1px solid white;
        }

        .leaflet-popup-tip {
            background: linear-gradient(180deg, #014351 0, #41747e 100%);
        }

        .leaflet-popup-content {
            min-width: 250px;
            font-family: "Nunito", sans-serif !important;

            &-wrapper {
                background: linear-gradient(180deg, #014351 0, #41747e 100%);
                color: var(--c-white);
            }

            .city {
                &-name {
                    text-transform: uppercase;
                    font-size: 1.2rem;
                    letter-spacing: 0.1rem;
                }

                &-temperature {
                    font-size: 2.4rem;
                    font-weight: 500;

                    &__min,
                    &__max {
                        font-size: 1.15rem;
                    }
                }

                &-weather__condition {
                    background-color: #76caac;
                    text-align: center;
                    border-radius: 50px;
                    padding: 4px 2px;

                    p {
                        white-space: nowrap;
                        text-transform: capitalize;
                        font-size: 0.75rem;
                    }
                }
            }

            .arrow {
                height: 1.25rem;
                margin: auto;

                &-max__icon {
                    margin-bottom: -0.65rem;
                }
            }

            .min__text,
            .max__text {
                font-size: 0.9375rem;
                text-align: center;
            }

            .min__text {
                color: #00ff9b;
            }

            .max__text {
                color: #ff0070;
            }
        }
    }
`;

export { StyledPopUp };
