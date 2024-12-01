import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/user.service";
import { useState } from "react";
import google from "../../assets/google.png"
const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {

        if (email && password) {
            e.preventDefault();
            setLoading(true);
            setError(null);
            console.log(email, password)
            let user = {
                userId: email,
                password: password
            }
            let resp = await login(user)
            localStorage.setItem('token', resp.token)
            console.log(resp)
            navigate("/home")
        } else {

            const provider = new GoogleAuthProvider();

            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                console.log("User signed in:", user.email);
                let resp = await login({ userId: user.email })
                localStorage.setItem('token', resp.token)
                navigate('/home')
            } catch (error) {
                console.error("Error during sign-in:", error);
            }
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center h-[100vh] bg-gradient-to-br from-gray-900 via-blue-800 to-black">
            <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20">
                <h1 className="text-4xl font-bold text-center text-white mb-4">🚀 Rocket Post</h1>

                <div className=" flex items-center justify-center bg-gray-100">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    placeholder="Enter your password"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`w-full bg-blue-500 text-white p-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>

                            <hr className="border-2 border-gray-200"></hr>

                        </form>

                        {/* Error Message */}
                        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}<br></br>

                        <button
                            onClick={handleLogin}
                            className="flex items-center justify-center w-full px-5  text-sm font-semibold text-gray-800 bg-white rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
                        >

                            <div className="flex items-center justify-center"><img className="h-8 p-2" src={google} />
                                Continue with Google
                            </div>
                        </button>

                        <div className="mt-6 text-sm text-center text-gray-400" onClick={() => { navigate('/register') }}>
                            Don’t have an account?{" "}
                            <a
                                href="#"
                                className="font-medium text-blue-400 hover:text-blue-500 hover:underline"
                            >
                                Sign Up
                            </a>
                        </div>

                    </div>


                </div>

            </div>


        </div>
    );
};

export default Login;
