import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkAuthenticate } from "../redux/session";
import TopBarNav from "../components/TopBarNav";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
        <TopBarNav/>
        {isLoaded && <Outlet />}
    </>
  );
}
