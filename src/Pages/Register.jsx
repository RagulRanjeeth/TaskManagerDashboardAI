import { useState } from "react";
import { register } from "../Api/Auth";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {

            await register({
                name,
                email,
                password
            });

            alert("Registered Successfully");

            navigate("/");

        } 
        
        catch (err) {

    console.log(err);

    if (err.response) {
        alert(err.response.data);
    } else {
        alert("Server Error");
    }

}
        
    };

    return (
        <div style={styles.container}>

            <form style={styles.card} onSubmit={handleRegister}>

                <h2 style={styles.heading}>Create Account</h2>

                <input
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    style={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button style={styles.button} type="submit">
                    Register
                </button>

            </form>

        </div>
    );
}

const styles = {

    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6"
    },

    card: {
        width: 350,
        background: "#fff",
        padding: 30,
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 15
    },

    heading: {
        textAlign: "center",
        marginBottom: 10
    },

    input: {
        padding: 12,
        borderRadius: 8,
        border: "1px solid #d1d5db",
        fontSize: 14
    },

    button: {
        padding: 12,
        border: "none",
        borderRadius: 8,
        background: "#2563eb",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer"
    }
};