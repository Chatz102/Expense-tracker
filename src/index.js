import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CategoriesProvider} from "./context/CategoryContexts"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CategoriesProvider>
            <App/>
        </CategoriesProvider>
    </React.StrictMode>
);
