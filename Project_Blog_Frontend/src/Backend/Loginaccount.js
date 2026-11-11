
async function LoginAccount({
    useremail = "",
    password = ""
}) {

    if (!useremail || !password) {

        throw new Error("Email and password are required");

    }

    const response = await fetch(
        import.meta.env.VITE_LOGIN_ACCOUNT,
        {
            method: "POST",

            credentials: "include",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                useremail,
                password
            })
        }
    );

    const data = await response.json();

    console.log("Login API Response:", data);

    if (!response.ok || data.status !== "success") {

        throw new Error(
            data.message || "Login failed"
        );

    }

    return data;

}

export default LoginAccount;
