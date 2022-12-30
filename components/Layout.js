import NavBar from "./NavBar";
import Footer from "./Footer";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Spinner from "./Spinner";

export default function Layout({ children }) {
    const { loading } = useContext(AuthContext);
    return (
        <>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
