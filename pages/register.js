import Link from "next/link";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

import { useContext, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import SmallSpinner from "../components/SmallSpinner";
import { AuthContext } from "../contexts/AuthProvider";
import { useRouter } from "next/router";

const Register = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const { createUser, updateUserProfile, signInWithGoogle, setUser, loading, setLoading } = useContext(AuthContext);
    const router = useRouter();

    const handelSignUp = event => {
        setErrorMessage("");
        setLoading(true);
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const image = event.target.image.files[0];
        console.log(name, email, password, image);

        const formData = new FormData();
        formData.append("image", image);
        // console.log(formData);

        const imageBBurl = `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`;

        fetch(imageBBurl, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(imageData => {
                console.log(imageData.data.display_url);
                createUser(email, password)
                    .then(result => {
                        const user = result.user;
                        // console.log(user);
                        updateUserProfile(name, imageData.data.url)
                            .then(() => {
                                toast.success("You have registered successfully");
                                // userJWT(user, accountType);
                                setLoading(false);
                                router.push("/");
                            })
                            .catch(err => {
                                setErrorMessage(err.message);
                                setLoading(false);
                                console.error(err);
                            });
                    })
                    .catch(err => {
                        setErrorMessage(err.message);
                        setLoading(false);
                        console.error(err);
                    });
            })
            .catch(err => {
                setLoading(false);
                console.error(err);
            });
    };

    const handelGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user);
                setUser(user);
                toast.success("You have registered successfully");
                userJWT(user, "user-account");
                setLoading(false);
                navigate("/");
            })
            .catch(err => console.error(err));
    };
    return (
        <div className="flex justify-center items-center pt-8">
            <div className="flex flex-col max-w-md p-6 rounded-xl sm:p-10 bg-gray-100 text-gray-900">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Register</h1>
                </div>
                <form
                    onSubmit={handelSignUp}
                    noValidate=""
                    action=""
                    className="space-y-12 ng-untouched ng-pristine ng-valid"
                >
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                placeholder="Enter Your Name Here"
                                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-[#FBE122] bg-gray-200 text-gray-900"
                                data-temp-mail-org="0"
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="block mb-2 text-sm">
                                Select Image:
                            </label>
                            <input type="file" id="image" name="image" accept="image/*" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">
                                Email address
                            </label>
                            <input
                                required
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email Here"
                                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-[#FBE122] bg-gray-200 text-[#23292E]"
                                data-temp-mail-org="0"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">
                                    Password
                                </label>
                            </div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                required
                                placeholder="*******"
                                className="w-full px-3 py-2 border rounded-xl border-gray-300 bg-gray-200 focus:outline-[#FBE122] text-[#23292E]"
                            />
                        </div>
                    </div>
                    <p className="text-red-500">{errorMessage && errorMessage}</p>
                    <div className="space-y-2">
                        <div>
                            <PrimaryButton type="submit" classes="w-full px-8 py-3 font-semibold">
                                {loading ? <SmallSpinner></SmallSpinner> : "Register"}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
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
                        <FaFacebook></FaFacebook>
                    </button>
                    <button
                        aria-label="Log in with Linkdin"
                        className="hover:cursor-pointer hover:bg-gray-300 bg-gray-200 p-3 rounded-full"
                    >
                        <FaLinkedinIn></FaLinkedinIn>
                    </button>
                </div>

                <p className="px-6 text-sm text-center text-gray-400">
                    Already have an account yet?{" "}
                    <Link href="/login" className="hover:underline text-[#23292E]">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
