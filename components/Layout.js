import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <>
            <NavBar></NavBar>
            <main>{children}</main>
            <Footer></Footer>
        </>
    );
};

export default Layout;
