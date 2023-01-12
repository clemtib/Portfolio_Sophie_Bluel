const takeProject = await fetch('http://localhost:5678/api/works')
const project = await takeProject.json();

const takeCategories = await fetch('http://localhost:5678/api/categories')
const categories = await takeCategories.json();


//Ajout du Titre
const sectionPortfolio = document.querySelector("#portfolio")
const titlePortfolio = document.createElement("h2")
titlePortfolio.innerText = `Mes Projets`
sectionPortfolio.appendChild(titlePortfolio)

//création div pour filter
const sectionFilter = document.createElement("div")
sectionFilter.className = 'filter'
sectionPortfolio.appendChild(sectionFilter)




function generateFilter(categories) {
    const buttonFilter = document.createElement("button")
    buttonFilter.innerText = "Tous"
    sectionFilter.appendChild(buttonFilter)
    for (let i = 0; i < categories.length; i++) {
        
        const categoriesElement = categories[i]
        const buttonFilter = document.createElement("button")
        buttonFilter.innerText = categoriesElement.name
        const idButton = categories[i].id
        buttonFilter.addEventListener('click', function () {
            const categoriesFilter = project.filter(function (project) {
                return project.categoryId === idButton
            })
            document.querySelector(".gallery").innerHTML = "";
            generateWorks(categoriesFilter);
             console.log(categoriesFilter)
        }) 
        sectionFilter.appendChild(buttonFilter)
    }
}



function generateWorks(project) {
    for (let i = 0;  i < project.length; i++){

        const projectElement = project[i];
       
        //selection de la balise .gallery
        const sectionGallery = document.querySelector(".gallery")
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


        sectionPortfolio.appendChild(sectionGallery)
        sectionGallery.appendChild(galleryElement)
        galleryElement.appendChild(imageElement)
        galleryElement.appendChild(sectionTitle)
     
    }
}


generateWorks(project)

generateFilter(categories)

