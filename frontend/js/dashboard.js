const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "signin.html";
}

async function loadBalance() {

    try {

        const response = await fetch(
            `${BASE_URL}/account/balance`,
            {
                headers: {
                    token: token
                }
            }
        );

        const data = await response.json();

        document.getElementById(
            "balance"
        ).innerText = `₹ ${data.balance}`;

    }
    catch (error) {
        console.log(error);
    }
}

async function fetchUsers(filter = "") {

    try {

        const response = await fetch(
            `${BASE_URL}/user/bulk?filter=${filter}`
        );

        const data = await response.json();

        renderUsers(data.user);

    }
    catch (error) {
        console.log(error);
    }
}

function renderUsers(users) {

    const usersContainer =
        document.getElementById(
            "usersContainer"
        );

    usersContainer.innerHTML = "";

    users.forEach(user => {

        const initials =
            user.firstName[0].toUpperCase() +
            user.lastName[0].toUpperCase();

        const card =
            document.createElement("div");

        card.className = "card user-card";

        card.innerHTML = `
            <div class="user-info">

                <div class="avatar">
                    ${initials}
                </div>

                <div>
                    <strong>
                        ${user.firstName}
                        ${user.lastName}
                    </strong>

                    <br>

                    <small>
                        ${user.username}
                    </small>
                </div>

            </div>

            <button
                onclick="sendMoney(
                    '${user._id}',
                    '${user.firstName} ${user.lastName}'
                )"
            >
                Send Money
            </button>
        `;

        usersContainer.appendChild(card);
    });

}

function sendMoney(id, name) {

    window.location.href =
        `send.html?id=${id}&name=${encodeURIComponent(name)}`;
}

function logout() {

    localStorage.removeItem("token");

    window.location.href =
        "signin.html";
}

let timeout;

document
    .getElementById("search")
    .addEventListener(
        "input",
        (event) => {

            clearTimeout(timeout);

            timeout = setTimeout(() => {

                fetchUsers(
                    event.target.value
                );

            }, 300);

        }
    );

loadBalance();
fetchUsers();