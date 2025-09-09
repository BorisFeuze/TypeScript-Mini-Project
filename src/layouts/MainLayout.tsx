import { Outlet } from "react-router";
import ArtworkProvider from "../context/artworkProvider";

const MainLayout = () => {
  return (
    <ArtworkProvider>
      <Outlet />
    </ArtworkProvider>
  );
};

export default MainLayout;
