import { useState } from "react";
import { login } from "../Api/Auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await login({ email, password });
                navigate("/dashboard");
            } 
         catch (err) {
            alert("Login failed: Invalid credentials");
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.card} onSubmit={handleLogin}>
                <h2>Login</h2>

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        marginTop: 100
    },
    card: {
        padding: 20,
        boxShadow: "0 0 10px #ccc",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: 300
    }
};