import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import RouteService from "./Service/RouteService";

import './styles.css';

const anchor: HTMLElement | null = document.getElementById('app')

if (!anchor) {
  throw new Error('Could not load the app')
}

createRoot(anchor)
  .render(
    <React.StrictMode>
      <BrowserRouter>
        <RouteService/>
      </BrowserRouter>
    </React.StrictMode>
  )
