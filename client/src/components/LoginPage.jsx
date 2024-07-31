import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate=useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log("Sign Up:", userData);
            // Add your sign-up logic here
            setIsLogin(false);
        } else {
            console.log("Login:", userData);
            // Add your login logic here
            navigate('/home');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center mx-2">
            <h1 className="text-red-600 font-bold text-5xl mt-4 mb-24">LPU Path To Success</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1 border w-[35%] bg-slate-100 rounded-md p-8">
                <h1 className="text-green-700 text-2xl font-bold  ">{isLogin ? "Sign Up" : "Login"}</h1>
                {isLogin && (
                    <div className="">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your Name"
                            value={userData.name}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                )}
                <div className="">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={userData.email}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                        value={userData.password}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white mx-auto cursor-pointer font-semibold rounded-lg p-2 px-5 mt-4">
                    {isLogin ? "Sign Up" : "Login"}
                </button>
                <div className="mt-4 text-center">
                    {isLogin ? (
                        <p>Already registered? <span onClick={() => setIsLogin(false)} className="text-blue-500 font-semibold cursor-pointer">Login</span></p>
                    ) : (
                        <p>Not registered yet? <span onClick={() => setIsLogin(true)} className="text-blue-500 font-semibold cursor-pointer">Create account</span></p>
                    )}
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
