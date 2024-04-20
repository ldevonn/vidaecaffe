import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from '../components/LandingPage/LandingPage.jsx';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import MenuPage from '../components/MenuPage';
import {ColdCoffee, ColdTea, HotTea, HotCoffee} from "../components/DrinkMenus";
import DrinkDetails from "../components/DrinkDetails/index.js";
import ProductFormPage from "../components/ProductFormPage/ProductFormPage.jsx";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage/>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "/drinks/hot-coffee",
        element: <HotCoffee />,
      },
      {
        path: "/drinks/cold-coffee",
        element: <ColdCoffee />,
      },
      {
        path: "/drinks/cold-tea",
        element: <ColdTea />,
      },
      {
        path: "/drinks/hot-tea",
        element: <HotTea />,
      },
      {
        path: `/drinks/:drinkId`,
        element: <DrinkDetails/>
      },
      {
        path: '/menu/new',
        element: <ProductFormPage/>
      }
    ],
  },
]);