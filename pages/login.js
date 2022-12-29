import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import { useRouter } from "next/router";
import PrimaryButton from "../components/PrimaryButton";
import SmallSpinner from "../components/SmallSpinner";
import Link from "next/link";
import Head from "next/head";

const Login = () => {
    const { signIn, signInWithGoogle, setUser, loading, setLoading, resetPassword } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    // const location = useLocation();
    const router = useRouter();

    // const from = location.state?.from?.pathname || "/";

    const handelLogin = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        // console.log(name, email, password, image);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                // userJWT(user);
                // navigate("/all-user");
                // router.push(from, { replace: true });
            })
            .catch(err => {
                toast.error(err.message);
                console.error(err);
                setLoading(false);
            });
    };
    const handelGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user);
                setUser(user);
                // userJWT(user, "user-account");
                toast.success("You have Logged In successfully");
                setLoading(false);
                // navigate(from, { replace: true });
            })
            .catch(err => console.error(err));
    };

    const handelReset = () => {
        resetPassword(email)
            .then(() => {
                toast.success("Please check email to reset your password");
                setLoading(false);
            })
            .catch(err => console.error(err));
        setLoading(false);
    };
    return (
        <div className="flex justify-center items-center pt-8">
            <Head>
                <title>Login | Task Tracker</title>
            </Head>
            <div className="flex flex-col max-w-md p-6 rounded-xl sm:p-10 bg-gray-100 text-gray-900">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Sign in</h1>
                </div>
                <form
                    onSubmit={handelLogin}
                    noValidate=""
                    action=""
                    className="space-y-6 ng-untouched ng-pristine ng-valid"
                >
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">
                                Email address
                            </label>
                            <input
                                onBlur={event => setEmail(event.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder="Enter Your Email Here"
                                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-[#FBE122] bg-gray-200 text-gray-900"
                                data-temp-mail-org="0"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-sm mb-2">
                                    Password
                                </label>
                            </div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                required
                                placeholder="*******"
                                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-[#FBE122] bg-gray-200 text-gray-900"
                            />
                        </div>
                    </div>

                    <div>
                        <PrimaryButton
                            type="submit"
                            classes="w-full px-8 py-3 font-semibold rounded-xl bg-gray-900 hover:bg-[#23292E] hover:text-white text-gray-100"
                        >
                            {loading ? <SmallSpinner></SmallSpinner> : "Sign In"}
                        </PrimaryButton>
                    </div>
                </form>
                <div className="space-y-1">
                    <button onClick={handelReset} className="text-xs hover:underline text-gray-400">
                        Forgot password?
                    </button>
                </div>
                <div className="divider">OR</div>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handelGoogleSignIn}
                        aria-label="Log in with Google"
                        className="hover:cursor-pointer hover:bg-gray-300 bg-gray-200 p-3 rounded-full"
                    >
                        <FcGoogle></FcGoogle>
                    </button>
                    <button
                        aria-label="Log in with Facebook"
                        className="hover:cursor-pointer hover:bg-gray-300 bg-gray-200 p-3 rounded-full"
                    >
                        <FaFacebookF></FaFacebookF>
                    </button>
                    <button
                        aria-label="Log in with Linkdin"
                        className="hover:cursor-pointer hover:bg-gray-300 bg-gray-200 p-3 rounded-full"
                    >
                        <FaLinkedinIn></FaLinkedinIn>
                    </button>
                </div>
                <p className="px-6 text-sm text-center text-gray-400">
                    Don't have an account yet?{" "}
                    <Link href="/register" className="hover:underline text-[#23292E]">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
