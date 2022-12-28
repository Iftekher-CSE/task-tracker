import Footer from "./Footer";
import NavBar from "./navbar";

const Layout = ({ children }) => {
    return (
        <>
            <NavBar></NavBar>
            <main>{children}</main>
            {/* <Footer></Footer> */}
        </>
    );
};

export default Layout;
