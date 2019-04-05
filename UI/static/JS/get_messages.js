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
            console.log('hbjh')
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
                    <a href="#"onclick="openPage('la-boni')">${mails.subject}</a>
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