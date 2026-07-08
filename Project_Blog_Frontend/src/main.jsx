
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createRoot } from 'react-dom/client'
import Layout from './Pages/Layout.jsx'

import App from './App.jsx'
import {RouterProvider,Route,createBrowserRouter,createRoutesFromElements} from "react-router-dom"

import { Provider } from 'react-redux';

import Store from './store/Configstore.js'
import AddPost from './Pages/AddPost.jsx';
import Postdetails from './Pages/Body.jsx';
import CreateAccount from './Pages/Createaccount.jsx';
import Login from './Pages/Login.jsx';
import Details from './Pages/Postdetails.jsx';
import Search from './Pages/Search.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="AddPost" element={<AddPost />} />
      
      <Route path="Home" element={<Postdetails />} />
      <Route path="UpdatePost" element={<AddPost />} /> 
     
     
      <Route path="Signup" element={<CreateAccount />} />
      <Route path="Signin" element={<Login />} />
      <Route path="PostDetails" element={<Details />} />
      <Route path="Search" element={<Search />} />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>,
)
