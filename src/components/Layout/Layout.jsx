import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout({ openLogin, openRegister }) {
  return (
    <>
      <Header onLoginClick={openLogin} onRegisterClick={openRegister} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
