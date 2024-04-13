import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkAuthenticate } from "../redux/session";
import TopBarNav from "../components/TopBarNav";
import Loader from "../components/Loader";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate())
      .then(() => {
        setTimeout(() => setIsLoaded(true), 500);
      });
  }, [dispatch]);

  if (!isLoaded) {
   return <Loader/>
  }

  return (
    <>
        <TopBarNav/>
        {isLoaded && <Outlet />}
    </>
  );
}
