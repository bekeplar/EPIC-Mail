function getMessages() {
    const url = "https://kepicmail.herokuapp.com/api/v2/messages";
    var token = localStorage.getItem("token");
    let output = '';
    fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 401) {
                window.setTimeout(function () {
                    window.location.replace("../templates/index.html");
                }, 5000);

            console.log(data.data.subject)
            } else if (data.status === 200) {
                //on success
                let messages = data["data"];
                
                data.data.forEach(function (mails) {


                    output += `
                    <hr>
                    <a >${mails.subject}</a>
                    <li style="list-style:none; font-size:50%; margin-left:5%;>Date:${mails.created_on}</li>
                    <li style="list-style:none; font-size:50%; margin-left:5%;>From:${mails.sender}</li>
                    <button href="#"onclick="openPage('la-boni')">ViewDetails</button>            
                                `;

                if (messages.length === 0) {
                        output += `
                            
                            <section class="flex-col-sp-btn border-radius-30p border-round-lg">
                                    <h2>You have'nt received any mail yet!</h2>
                                  
                            </section>
                        `;
                    }
                
                
    
                    });
                }

                document.getElementById('getMessages').innerHTML = output;
        })
        .catch((error) => console.log(error));


}
getMessages()
function logout() {
    localStorage.removeItem("token");
}