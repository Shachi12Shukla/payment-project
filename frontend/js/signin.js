async function signin() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const response = await fetch(
        `${BASE_URL}/user/signin`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        }
    );

    const data = await response.json();

    localStorage.setItem(
        "token",
        data.token
    );

    window.location.href =
        "dashboard.html";
}

