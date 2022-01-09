/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import styled from "styled-components/macro";
import GlobalStyle from "styles/GlobalStyle";

const App = () => {
    return (
        <>
            <GlobalStyle />
            <St>
                <p className="mt-5">Hello</p>
            </St>
        </>
    );
};

const St = styled.div`
    border: 1px solid orange;
`;

export default App;
