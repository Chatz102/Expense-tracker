import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CategoriesProvider} from "./context/CategoryContexts";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <CategoriesProvider>
            <App/>
        </CategoriesProvider>
    </BrowserRouter>
);
