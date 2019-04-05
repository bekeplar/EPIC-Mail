function getMessage() {
    let messageId = document.getElementById("myDL").value;
    const url = "https://kepicmail.herokuapp.com/api/v2/messages/"+messageId

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
                    
                    <li>${mails.subject}</li>
                    <li>${mails.message}</li>
                    <li>${mails.sender_id}</li>
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

                document.getElementById('getSentMessages').innerHTML = output;
        })
        .catch((error) => console.log(error));


}
getSentMessages()
function logout() {
    localStorage.removeItem("token");
}