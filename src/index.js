import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import App from './App';
import About from './pages/About'
import Courses from './pages/Courses'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

const router = createBrowserRouter([
   {
    path: '/',
    element: <App />
   },
   {
    path: '/sobre',
    element: <About />
   },
   {
    path: '/cursos',
    element: <Courses />
   },
   {
    path: '/:login',
    element: <Login />
   },
   {
    path: '/registro',
    element: <Register />
   },
   {
    path: '/dashboard',
    element: <Dashboard />
   }
  ])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);