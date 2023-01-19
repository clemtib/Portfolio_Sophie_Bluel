
const takeProject = await fetch('http://localhost:5678/api/works')
const project = await takeProject.json();

const takeCategories = await fetch('http://localhost:5678/api/categories')
const categories = await takeCategories.json();





//Ajout du Titre
const sectionPortfolio = document.querySelector("#portfolio")
const containerTitlePortfolio = document.createElement('div')
containerTitlePortfolio.className = 'titlePortfolio'
const titlePortfolio = document.createElement("h2")
titlePortfolio.innerText = `Mes Projets`
sectionPortfolio.appendChild(containerTitlePortfolio)
containerTitlePortfolio.appendChild(titlePortfolio)





function generateFilter(categories) {

    // document.querySelector(".filter").remove()
    //création div pour filter
    const sectionFilter = document.createElement("div")
    sectionFilter.className = 'filter'
    sectionPortfolio.appendChild(sectionFilter)
        

    //button Init
    const buttonFilter = document.createElement("button")
    buttonFilter.innerText = "Tous"
    sectionFilter.appendChild(buttonFilter)
    buttonFilter.addEventListener('click', function () {
        const categoriesFilter = project
        generateWorks(categoriesFilter);
    }) 
    sectionFilter.appendChild(buttonFilter)
    //stockage des filtres actif
    // let bilan = []
    // let bilanCategories = []
    //button categoriesFilter
    for (let i = 0; i < categories.length; i++) {
        
        const categoriesElement = categories[i]
        const buttonFilter = document.createElement("button")
        buttonFilter.innerText = categoriesElement.name
        // buttonFilter.className = "low"
        let check = false
        
        buttonFilter.addEventListener('click', function () {
           
            // toggle vert/blanc
            check = !check 
//utiliser indexOf() pour suprimer l'index corespondant au filtre
            if (check) {
                this.className = 'high'
                // bilan.push(categories[i].id)
                // bilan.sort(function (a, b) {
                //     return a - b
                // })
            } else {
                this.className = 'low'
                // bilan.splice(i,1)
            }

            // bilan

            
            const categoriesFilter = project.filter(function (project) {
                // return project.categoryId === bilan //syntaxe pour ajouter deux valeur dans un filtre de array 
                // for (let i = 0; i < bilan.length; i++){
                //     bilanCategories.push(bilan[i])
                // }
                // return project.categoryId === bilanCategories
                return project.categoryId === categories[i].id
                //si les trois sont vert 
            })
            // console.log(bilanCategories)
          
            // buttonFilter.className = "high"
            // document.querySelector(".gallery").innerHTML = "";
            generateWorks(categoriesFilter);
        }) 
        sectionFilter.appendChild(buttonFilter)
    }
}



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









//Modification de la page => Home-page Edit 
//Verifier si c'est comme ca que l'on fait ... j'ai un doute 
function adminLogin() {
    //modification et ajout des elements en mode EDIT
    if (sessionStorage.getItem('adminId')) {
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
            removeEdition()
        })

        //supression des filtres
        document.querySelector('.filter').remove()


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
        
        
        modifProjet.appendChild(divProjet)
        divProjet.appendChild(iconProjet)
        divProjet.appendChild(textProjet)

       
        //openModal
        textProjet.addEventListener('click', openModal)



        //bloc noir
        header.appendChild(editionMode)
        editionMode.appendChild(editionTitle)
        editionTitle.appendChild(iconEdition)
        editionMode.appendChild(publishButton)

        //logout
        ulNav.appendChild(logout_li)
        logout_li.appendChild(logout_a)

    } else {
        console.log("bye")
    }  
}

function removeEdition() {
    
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
adminLogin()


//====================== BOITE MODAL ======================





// function openModal() {
//     console.log('openModal')
//     // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
// }




    // Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];


function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
