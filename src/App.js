/* eslint-disable require-jsdoc */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import CreateDeck from "./views/CreateDeck";
import Home from "./views/Home";
import Decks from "./views/Decks";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/decks" element={<Decks />} />
          <Route path="/decks/create" element={<CreateDeck />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
