import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from '../components/LandingPage/LandingPage.jsx';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import MenuPage from '../components/MenuPage';
import {ColdCoffee, ColdTea, HotTea, HotCoffee} from "../components/DrinkMenus";
import DrinkDetails from "../components/DrinkDetails/index.js";
import ProductFormPage from "../components/ProductFormPage/ProductFormPage.jsx";
import EditDrink from "../components/EditDrink/EditDrink.jsx";
import Cart from "../components/Cart/Cart.jsx";

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
        path: "/drinks/:category",
        element: <HotCoffee />,
      },
      {
        path: `/drinks/:category/:drinkId`,
        element: <DrinkDetails/>
      },
      {
        path: `/drinks/:drinkId/edit`,
        element: <EditDrink/>
      },
      {
        path: '/menu/new',
        element: <ProductFormPage/>
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '*',
        element: <LandingPage/>
      }
    ],
  },
]);