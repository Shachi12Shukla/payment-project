const token =
    localStorage.getItem("token");

if (!token) {
    window.location.href =
        "signin.html";
}

const params =
    new URLSearchParams(
        window.location.search
    );

const userId =
    params.get("id");

const name =
    params.get("name");

document.getElementById(
    "receiverName"
).innerText = name;

async function transferMoney() {

    const amount =
        document.getElementById(
            "amount"
        ).value;

    if (!amount || amount <= 0) {

        alert(
            "Enter valid amount"
        );

        return;
    }

    try {

        const response = await fetch(
            `${BASE_URL}/account/transfer`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    token: token
                },

                body: JSON.stringify({
                    transfer_user_id: userId,
                    amount: Number(amount)
                })
            }
        );

        const data =
            await response.json();

        alert(
            data.message
        );

        window.location.href =
            "dashboard.html";

    }
    catch (error) {

        console.log(error);

        alert(
            "Transfer failed"
        );
    }
}

function goBack() {

    window.location.href =
        "dashboard.html";
}