import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import DarkModeContainer from "./View/Component/DarkModeContainer";
import NavBar from "./View/SharedView/NavBar";
import RouteService from "./Service/RouteService";
import Footer from "./View/SharedView/Footer";
import UserContainer from "./View/Component/UserContainer";

import './styles.css';

const anchor: HTMLElement | null = document.getElementById('app')

if (!anchor) {
  throw new Error('Could not load the app')
}

createRoot(anchor)
  .render(
    // <React.StrictMode>
      <BrowserRouter>
        <DarkModeContainer>
          <UserContainer>
            <NavBar/>
            <div className="grow">
              <RouteService/>
            </div>
          </UserContainer>
          <Footer/>
        </DarkModeContainer>
      </BrowserRouter>
    // </React.StrictMode>
  )
