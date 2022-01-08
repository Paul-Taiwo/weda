import React from "react";
// eslint-disable-next-line no-unused-vars
import styled from "styled-components/macro";

import logo from "./logo.svg";
import "./App.css";

const App = () => {
    return (
        <St className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </St>
    );
};

const St = styled.div`
    border: 1px solid orange;
`;

export default App;
