import { Outlet } from "react-router";
import ArtworkProvider from "../context/ArtworkProvider";
import { Navbar, Footer } from "../components";

const MainLayout = () => {
  return (
    <ArtworkProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ArtworkProvider>
  );
};

export default MainLayout;
