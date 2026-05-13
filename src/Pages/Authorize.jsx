import { useState } from "react";
import { login, register } from "../Api/Auth";
import { useNavigate } from "react-router-dom";

export default function Auth() {

    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (isLogin) {

                const res = await login({
                    email,
                    password
                });

                if (res.data === "Login Successful") {

                    localStorage.setItem(
                        "userEmail",
                        email
                    );

                    navigate("/dashboard");
                }

            } else {

                const res = await register({
                    name,
                    email,
                    password
                });

                alert(res.data);

                setIsLogin(true);
            }

        } catch (err) {

            alert(
                err.response?.data ||
                "Something went wrong"
            );
        }
    };

    return (

        <div className="auth-container">

            <div>

                <button
                    onClick={() =>
                        setIsLogin(true)
                    }
                >
                    Login
                </button>

                <button
                    onClick={() =>
                        setIsLogin(false)
                    }
                >
                    Sign Up
                </button>

            </div>

            <form onSubmit={handleSubmit}>

                {
                    !isLogin && (

                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />
                    )
                }

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button type="submit">

                    {
                        isLogin
                            ? "Login"
                            : "Sign Up"
                    }

                </button>

            </form>

        </div>
    );
}