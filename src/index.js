import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import {Provider} from 'react-redux'
import {PersistGate} from 'reduxjs-toolkit-persist/integration/react'
import {persistor, store} from './redux/store'

import App from './App';
import About from './pages/About'
import Courses from './pages/Courses'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import StudentCourses from './pages/profile/StudentCourses'
import StudentGrades from './pages/profile/StudentGrades'
import StudentSubjects from './pages/profile/StudentSubjects'

import Admin from './pages/admin/Admin'
import AdminCourses from './pages/admin/AdminCourses'
import AdminSubjects from './pages/admin/AdminSubjects'
import AdminLessons from './pages/admin/AdminLessons'
import AdminPermissions from './pages/admin/AdminPermissions'
import AdminQuestions from './pages/admin/AdminQuestions'

import CourseStudy from './pages/study/CourseStudy'
import SubjectsStudy from './pages/study/SubjectsStudy'
import LessonStudy from './pages/study/LessonStudy'
import Study from './pages/study/Study'

import ErrorPage from './pages/ErrorPage'

//root router
const router = createBrowserRouter([
   {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
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
    path: '/dashboard/:id',
    element: <Dashboard />
   },
   {
    path: '/dashboard/:id/perfil',
    element: <Profile />
   },
   {
    path: '/dashboard/:id/cursos',
    element: <StudentCourses />
   },
   {
    path: '/dashboard/:id/notas',
    element: <StudentGrades />
   },
   {
    path: '/dashboard/:id/disciplinas',
    element: <StudentSubjects />
   },
   {
    path: '/dashboard/admin',
    element: <Admin />
   },
   {
    path: '/dashboard/admin/cursos/:option',
    element: <AdminCourses />
   },
   {
    path: '/dashboard/admin/disciplinas/:option',
    element: <AdminSubjects />
   },
   {
    path: '/dashboard/admin/aulas/:option',
    element: <AdminLessons />
   },
   {
    path: '/dashboard/admin/permissão/:option',
    element: <AdminPermissions />
   },
   {
    path: '/dashboard/admin/questão/:option',
    element: <AdminQuestions />
   },
   {
    path: '/study/:userId/:courseId/:course',
    element: <CourseStudy />
   },
   {
    path: '/study/:userId/:courseId/:course/:semester',
    element: <SubjectsStudy />
   },
   {
    path: '/study/:userId/:courseId/:course/:semester/:subjectId',
    element: <LessonStudy />
   },
   {
    path: '/study/:userId/:courseId/:course/:semester/:subjectId/:lessonId',
    element: <Study />
   }
  ])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);