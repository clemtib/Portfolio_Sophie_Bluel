
const takeProject = await fetch('http://localhost:5678/api/works')
let project = await takeProject.json();

const takeCategories = await fetch('http://localhost:5678/api/categories')
const categories = await takeCategories.json();

//Ajout du Titre "Mes Projet"
const sectionPortfolio = document.querySelector("#portfolio")
const containerTitlePortfolio = document.createElement('div')
containerTitlePortfolio.className = 'titlePortfolio'
const titlePortfolio = document.createElement("h2")
titlePortfolio.innerText = `Mes Projets`
sectionPortfolio.appendChild(containerTitlePortfolio)
containerTitlePortfolio.appendChild(titlePortfolio)
//

//Genere les button filter et filtre les travaux/categories
function generateFilter(categories) {
    const buttonInit = document.querySelectorAll('.filter button')
    buttonInit.forEach(element => element.remove())

    //création div pour filter
    const sectionFilter = document.createElement("div")
    sectionFilter.className = 'filter'
    sectionPortfolio.appendChild(sectionFilter)
        
    //button All
    const buttonFilterAll = document.createElement("button")
    buttonFilterAll.innerText = "Tous"
    buttonFilterAll.className = "high"
    buttonFilterAll.addEventListener('click', function () {
        const buttonInit = document.querySelectorAll('.filter button')
            buttonInit.forEach(element => element.className = 'low')
            buttonFilterAll.className = "high"
            generateFilter(categories)
            generateWorks(project);
        
    }) 
    sectionFilter.appendChild(buttonFilterAll)
    //stockage des filtres actif
    let bilan = []
    let bilanCategories = []
    let categoriesFilter = []

    
    //button categoriesFilter
    for (let i = 0; i < categories.length; i++) {
        
        const categoriesElement = categories[i]
        const buttonFilter = document.createElement("button")
        buttonFilter.innerText = categoriesElement.name
        // buttonFilter.className = "low"
        let check = false
       
        buttonFilter.addEventListener('click', function () {
           
            console.log('check befor', check)
            // toggle vert/blanc
            check = !check 
            console.log('check after', check)
            if (check) {
                this.className = 'high'
                bilan.push(categories[i].id)
                bilan.sort(function (a, b) {
                    return a - b
                })
                console.log(i)
                console.log(bilan)
                categoriesFilter = project.filter(project => project.categoryId === i + 1)
                bilanCategories.push(...categoriesFilter)
                // buttonFilterAll.className = "low" 
                
            } else {
                //si je click sur Objet et je rapuis dessus le "tous" sa
                this.className = 'low'
                let target = bilan.indexOf(categories[i].id)
                bilan.splice(target, 1)
                console.log(i)
                console.log(bilan)
                console.log(`target = ${target}`)
                categoriesFilter = project.filter(project => project.categoryId === i + 1)
                console.log('else', categoriesFilter)
               
                for (let i = 0; i < bilanCategories.length; i++) {
                    if (categoriesFilter.includes(bilanCategories[i])) {
                    bilanCategories.splice(i, 1);
                    i--;
                    }
                }         
            }
             if (bilan == false) {
                buttonFilterAll.className = "high"
                generateWorks(project)
            } else if(bilan.length === categories.length){
                const buttonInit = document.querySelectorAll('.filter button')
                buttonInit.forEach(element => element.className = 'low')
                buttonFilterAll.className = "high"
                generateFilter(categories)
                generateWorks(project)

             } else {
                buttonFilterAll.className = "low"
                console.log(bilanCategories)
                generateWorks(bilanCategories);
            }
          
           
        }) 
        sectionFilter.appendChild(buttonFilter)

        
    }    
}

//GenerelLes travaux enregistré
function generateWorks(project) {

    document.querySelector(".gallery").remove()
    //selection de la balise .gallery
    //const sectionGallery = document.querySelector(".gallery")
    const sectionGallery = document.createElement("div")
    sectionGallery.className = 'gallery';
    
    for (let i = 0; i < project.length; i++){

        const projectElement = project[i];
       

        //ajout d'un balise figure
        const galleryElement = document.createElement("figure")
        //ajout de l'image
        const imageElement = document.createElement("img")
        imageElement.src = projectElement.imageUrl
        imageElement.crossOrigin = 'anonymous'
        imageElement.alt = projectElement.title
        //ajout du titre
        const sectionTitle = document.createElement("figcaption")
        sectionTitle.innerText = projectElement.title


        //sectionPortfolio.appendChild(sectionGallery)
        galleryElement.appendChild(imageElement)
        galleryElement.appendChild(sectionTitle)
        sectionGallery.appendChild(galleryElement)     
    }
    sectionPortfolio.appendChild(sectionGallery)
}

//Creation du mode Edition 
function toLogin() {
    //modification et ajout des elements en mode EDIT
    
        //Bandeau noir
        const header = document.querySelector("header")
        const editionMode = document.createElement("div")
        editionMode.className = 'editionMode'
        //Changement du style du header. Conventionel ?
        header.className = 'headerEdition'
        //icon + "Mode edition"
        const iconEdition = document.createElement("i")
        iconEdition.className = "fa-regular fa-pen-to-square fa-lg iconEdition"
        const editionTitle = document.createElement("div")
        editionTitle.className ="editionTitle"
        editionTitle.innerText = "Mode édition"
        //button "publier les changements"
        const publishButton = document.createElement("button")
        publishButton.innerText = "publier les changements"
        //login to logout
        document.querySelector(".login").remove()
        const ulNav = document.querySelector('header nav ul')
        const logout_li = document.createElement("li")
        logout_li.className = "logout"
        const logout_a = document.createElement('a')
        logout_a.innerText = "logout"
       
        //suppression du token pour "logout"
        logout_a.addEventListener('click', function () {
            sessionStorage.clear('adminId')
            toLogout()
        })

        //supression des filtres
        document.querySelector('.filter').remove()


        // =========== Creation des bouton "MODIFIER" ===========
        //Modif figure
        const modifFigure = document.querySelector('section#introduction figure')
        const divFigure = document.createElement('div')
        divFigure.className = "divModif"
        const textFigure = document.createElement('a')
        textFigure.innerText = "Modifier"
        const iconFigure = document.createElement("i")
        iconFigure.className = "fa-regular fa-pen-to-square fa-lg iconModif"

        modifFigure.appendChild(divFigure)
        divFigure.appendChild(iconFigure)
        divFigure.appendChild(textFigure)

         //Modif article
        const modifArticle = document.querySelector('section#introduction article')
        const divArticle = document.createElement('div')
        divArticle.className = "divModif"
        const textArticle = document.createElement('a')
        textArticle.innerText = "Modifier"
        const iconArticle = document.createElement("i")
        iconArticle.className = "fa-regular fa-pen-to-square fa-lg iconModif"

        modifArticle.appendChild(divArticle)
        divArticle.appendChild(iconArticle)
        divArticle.appendChild(textArticle)

        //  Modif projet
        const modifProjet = document.querySelector('section#portfolio .titlePortfolio')
        const divProjet = document.createElement('div')
        divProjet.className = "divModif"
        const textProjet = document.createElement('a')
        textProjet.innerText = "Modifier"
        const iconProjet = document.createElement("i")
        iconProjet.className = "fa-regular fa-pen-to-square fa-lg iconModif"
         //openModal
        textProjet.addEventListener('click', function () {
            delModal.style.display = "block";
        })
        
        modifProjet.appendChild(divProjet)
        divProjet.appendChild(iconProjet)
        divProjet.appendChild(textProjet)

        //bloc noir
        header.appendChild(editionMode)
        editionMode.appendChild(editionTitle)
        editionTitle.appendChild(iconEdition)
        editionMode.appendChild(publishButton)

        //logout
        ulNav.appendChild(logout_li)
        logout_li.appendChild(logout_a)
}

//Retour sur la page LogIn
function toLogout() {
    
    document.querySelector(".editionMode").remove()
    document.querySelector("header").classList.remove('headerEdition')
    document.querySelector(".logout").remove()

    const ulNav = document.querySelector('header nav ul')
    const login_li = document.createElement("li")
    login_li.className = "login"
    const login_a = document.createElement('a')
    login_a.innerText = "login"
    login_a.setAttribute('href', 'pageConnexion.html')
    ulNav.appendChild(login_li)
    login_li.appendChild(login_a)

    const elementsModif = document.querySelectorAll(".divModif");
    elementsModif.forEach(function(element) {
    element.remove();
    });

    generateFilter(categories)
    generateWorks(project)
}

generateFilter(categories)
generateWorks(project)

// Pour rentrer dans le Mode Edition
if (sessionStorage.getItem('adminId')) {
    toLogin()
}


//Crée les boite modal et la navigation à l'interieur
function generateModal() {
    // Modal del Works 
    const delModal = document.getElementById("delModal");
    // Modal add Works
    const modal = document.getElementById("addWorkModal");
    const addWorks = document.querySelector("#addWorks")
    addWorks.addEventListener('click',function openAddModal() {
        modal.style.display = "block";
        delModal.style.display = "none";
    })
    // Fermer la modal avec la croix
    const closeModal = document.querySelectorAll('.close');
    closeModal.forEach(function (element) {
        element.addEventListener('click', function () {
            delModal.style.display = "none";
            modal.style.display = "none";
        })
    })
    // Revenir à la modal precedente 
    const previousModal = document.querySelector('.previous')
    previousModal.addEventListener('click', function () {
        delModal.style.display = "block";
        modal.style.display = "none";
    })
    // Fermer la modal quand on clic à coté
    window.onclick = function(event) {
        if (event.target ===  delModal) {
        delModal.style.display = "none";
        }
        if (event.target ===  modal) {
        modal.style.display = "none";
        }
    }
}

//Envoie une requete à l'API pour ajouter un nouveau projet
function worksInModal() {

    document.querySelector('.galeryEdition').remove()
    const containerModal = document.querySelector(".containerModal")
    const galleryEdition = document.createElement("div")
    galleryEdition.className = "galeryEdition"
   
    
    
    for (let i = 0; i < project.length; i++){

        const projectElement = project[i];
       

        //ajout d'un balise figure
        const galleryElement = document.createElement("figure")
        
        //ajout de l'image
        const imageElement = document.createElement("img")
        imageElement.src = projectElement.imageUrl
        imageElement.crossOrigin = 'anonymous'
        imageElement.alt = projectElement.title
        //ajout du titre
        const sectionTitle = document.createElement("figcaption")
        sectionTitle.innerText = 'éditer'
        const trashCanIcon = document.createElement('i')
        trashCanIcon.className = 'fa-regular fa-trash-can fa-sm delIcon'
        trashCanIcon.addEventListener('click', function (event) {
            event.preventDefault()

        const id = project[i].id
        fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",

            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem('adminId')}` },
        })

            .then(function (reponse) {
                fetch('http://localhost:5678/api/works')
                .then(response => response.json())
                .then(newProject => {
                project = [ ...newProject];
                generateWorks(project);
                
                //j'appel la fonction dans la fonction ...?
                worksInModal()
            })
            .catch(error => console.log(error));
            })
            .catch(function (error) {
                console.log('Il y a eu un problème avec l\'operation fetch : ' + error.message)
            })
        
      
        })

        galleryElement.appendChild(imageElement)
        galleryElement.appendChild(sectionTitle)
        galleryElement.appendChild(trashCanIcon)
        galleryEdition.appendChild(galleryElement)  
        
    }
    containerModal.appendChild(galleryEdition)
}

function newWork() {
    const inputCategory = document.querySelector('#category')
    for (let i = 0; i < categories.length; i++){
        const addOption = document.createElement('option')
        addOption.setAttribute('value', categories[i].id)
        addOption.innerText = categories[i].name   
        inputCategory.appendChild(addOption)
    }
    
    const formAddWork = document.querySelector(".addWork")

    formAddWork.addEventListener("submit", function (event) {
        event.preventDefault()

        const formData = new FormData(formAddWork);

        // formData.append("image", event.target.querySelector("[name=image]").files[0]);
        // formData.append("title", event.target.querySelector("[name=title]").value);
        // formData.append("category", event.target.querySelector("[name=category]").value);
        
        fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "accept": "application/json",
            // "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${sessionStorage.getItem('adminId')}`
        },
        body: formData
        })
         .then((function (reponse) {
             if (reponse.ok) {
                 //Reponse de l'API
                console.log(reponse.status, reponse.statusText)
            } else {
                alert("Le formulaire est incorrect, verifier la saisie")
            }
            }
            )
        )
       .then(() => {
           fetch('http://localhost:5678/api/works')
           
                .then(response => response.json())
                    
                .then(newProject => {
                    project = [...newProject];
                    const input = document.querySelector("input[type=file]");
                    input.value = ""
                    document.querySelector('#preview img').remove()
                    document.getElementById('elementFile').style.display = "flex"
                generateWorks(project);
                
                worksInModal()
            })
                .catch(error => {
                    console.log(error)
                    

                });
       })
            
    })
}

//Crée la preview du loaded 
const fileInput = document.getElementById("image")
const upPicture = document.getElementById("upPictur")
const preview = document.getElementById('preview')
const elementFile = document.getElementById('elementFile')

upPicture.addEventListener('click', function (event) {
    event.preventDefault()
    fileInput.click()
})

  fileInput.addEventListener("change", function() {
    var reader = new FileReader();
    reader.onload = function() {
      var img = document.createElement("img");
      img.src = reader.result;
      preview.appendChild(img);
    };
      reader.readAsDataURL(fileInput.files[0]);
      elementFile.style.display = "none"
    
  });
//

generateModal ()
worksInModal()
newWork()




