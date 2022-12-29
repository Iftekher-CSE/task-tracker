import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import AuthProvider from "../contexts/AuthProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Layout>
                <Component {...pageProps} />
                <Toaster />
            </Layout>
        </AuthProvider>
    );
}

export default MyApp;
