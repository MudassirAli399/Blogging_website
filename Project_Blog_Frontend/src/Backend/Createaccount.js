
export default async function MakeAccount({
    username = "",
    password = "",
    email = ""
}) {

    if (!username || !password || !email) {

        throw new Error("All fields are required");

    }

    const response = await fetch(
        import.meta.env.VITE_CREATE_ACCOUNT,
        {
            method: "POST",

            credentials: "include",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password,
                email
            })
        }
    );

    const data = await response.json();

    console.log("Create Account API Response:", data);

    if (!response.ok || data.status !== "success") {

        throw new Error(
            data.message || "Account creation failed"
        );

    }

    return data;

}
