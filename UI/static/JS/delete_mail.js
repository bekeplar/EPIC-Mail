function deleteMessage(messageId) {

    const url = "http://127.0.0.1:5000/api/v2/".concat(messages, "/", messageId);

    var token = localStorage.getItem("token");

    fetch(url, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },

    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                document.getElementById('getMessages').innerHTML = data["data"][0].success;

                alert(data["data"][0].success);
                window.location.replace("../templates/user_dashboard.html?type=".concat(message));
            } else if (data.status === 400 || data.status === 404) {
                alert(data.error)
            } else if (data.status === 401) {
                alert(data.error)
            } else if (data.status === 403) {
                alert(data.error)
            }

        });

}