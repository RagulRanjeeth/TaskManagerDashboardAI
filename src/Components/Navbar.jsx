import { useState } from "react";
import { login } from "../Api/Auth";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const res = await login({
                email,
                password
            });

            console.log(res.data);

            alert("Login Successful");

            navigate("/dashboard");

        } catch (err) {

            console.log(err);

            if (err.response) {
                alert(err.response.data.message || "Invalid Email or Password");
            } else {
                alert("Server Error");
            }
        }
    };

    return (
        <div style={styles.container}>

            <div style={styles.card}>

                <h2 style={styles.heading}>Login</h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />

                <button onClick={handleLogin} style={styles.button}>
                    Login
                </button>

            </div>

        </div>
    );
}

const styles = {

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f3f4f6"
    },

    card: {
        width: "350px",
        padding: "30px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },

    heading: {
        textAlign: "center",
        marginBottom: "10px"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "15px"
    },

    button: {
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        background: "#2563eb",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer"
    }
};