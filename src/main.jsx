import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css';
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);

