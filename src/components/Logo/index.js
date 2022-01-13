/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React from "react";
import styled from "styled-components";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import LogoIcon from "assets/img/logo.svg";

const Logo = () => {
    return (
        <Wrapper>
            <img width="100" src={LogoIcon} alt="Weda" />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    top: 10px;
    left: 25px;
    position: fixed;
    z-index: 410;
`;

export default Logo;
