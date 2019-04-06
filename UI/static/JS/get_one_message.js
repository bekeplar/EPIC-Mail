function getMessage() {
    let messageId = document.getElementById("myDL").value;
    const url = "https://kepicmail.herokuapp.com/api/v2/messages"
    let token = localStorage.getItem("token")
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

            } else if (data.status === 200) {
                //on success
                let messages = data["data"];
                data.data.forEach(function (mails) {


                    output += `
                    <hr>
                    <li style="list-style:none; font-size:50%; margin-left:5%;>subject:${mails.subject}</li>
                    <li style="list-style:none; font-size:50%; margin-left:5%;>message:${mails.message}</li>
                    <li style="list-style:none; font-size:50%; margin-left:5%;>sender:${mails.sender}</li>
                    <li style="list-style:none; font-size:50%; margin-left:5%;>messageId:${mails.message_id}</li>
                    <li style="list-style:none; font-size:50%; margin-left:5%;>reciever:${mails.reciever}</li>
                    <li style="list-style:none; font-size:50%; margin-left:5%;>date:${mails.created_on}</li>
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

                document.getElementById('getMessage').innerHTML = output;
        })
        .catch((error) => console.log(error));


}
getMessage()
function logout() {
    localStorage.removeItem("token");
}