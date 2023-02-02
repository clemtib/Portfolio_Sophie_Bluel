const formLogin = document.querySelector('.connexion')

formLogin.addEventListener('submit', function(event){

    event.preventDefault()

    let login ={
        email: event.target.querySelector("#signin-email").value,
        password: event.target.querySelector("#signin-password").value,
    }
    login = JSON.stringify(login)
    fetch("http://localhost:5678/api/users/login", {
       
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: login
    })  
    .then(function (reponse) {
        if (reponse.ok) {
            
            reponse.json()
            .then(function (reponse) {
                sessionStorage.setItem('adminId', reponse.token)
                document.location.href = "index.html"
            })
            .catch(function (error) {
            console.log('Il y a eu un problème avec la deuxieme opération fetch : ' + error.message)
            })

        } else {
            alert("identification ou mot de passe eronné")
            
        }
    })
    .catch(function (error) {
    console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message)
    })

   
})

