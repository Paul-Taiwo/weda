/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React from "react";
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import Map from "components/Map";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Map />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
