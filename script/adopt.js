const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
        .catch((error) => console.log(error))
    
}
const loadCategoryVideos =(id) =>{
    console.log(id)
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then(res => res.json())
    .then (data => {
        const activeBtn = document.getElementById(`btn-${id}`)
        console.log(activeBtn)
        displayAllPet(data.data)
    })
    .catch((error) => console.log(error))


}

const displayCategory = (petNames) => {
    // console.log(petNames)
    const allPetCategory = document.getElementById("load_category_dogs")

    petNames.forEach((pet) => {
        // console.log(pet)
        const btnDiv = document.createElement('div')
        btnDiv.classList.add(
            'md:py-12', 'py-4' , 'gap-4',
        )
        btnDiv.innerHTML = `
        <button id= "btn-${pet.category}"onclick = "loadCategoryVideos('${pet.category}')"
        
                class="btn hover:bg-green-100 hover:border-green-700 px-4 md:px-20 pt-10 pb-14 bg-transparent rounded-lg font-medium category-btn">
                <img class="w-8" src="${pet.category_icon}" alt="">
                <p class="font-bold text-xl">${pet.category}</p>
                </button>
        `
        allPetCategory.appendChild(btnDiv)
    })
  
}

const loadAllPet = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayAllPet(data.pets))
        .catch(error => console.log(error))
}

const displayAllPet = (allPet) => {
    // console.log(allPet)
    const allPetDiv = document.getElementById('load_all_pet')
    allPetDiv.innerHTML = ''
    if(allPet.length == 0){
        allPetDiv.classList.remove('grid', 'p-3' )
        allPetDiv.innerHTML = `
       <div class=" p-14 mx-auto flex flex-col gap-5 justify-center items-center bg-gray-100 ">
                <div>
                    <img src="images/no-data 1.png" alt="">
                </div>
                <div>
                    <h2 class="font-bold text-3xl">No Information Avialable</h2>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page
                        when looking at <br>
                        its layout. The point of using Lorem Ipsum is that it has a.</p>
                </div>
            </div>
        `
       return
    }
    else{
        allPetDiv.classList.add('grid', 'md:p-3', 'p-2')
    }
   
    allPet.forEach((pets) => {
        // console.log(pets)
        const petDiv = document.createElement('div')
        petDiv.classList ='card '
        petDiv.innerHTML = `
       
        
        <div class = "card-body p-0 mb-4 md:p-2 md:border-2 rounded-lg  ">
  <figure>
    <img class = "w-full object-cover rounded-lg"
      src="${pets.image}"
      alt="Shoes" />
  </figure>
  <div class=" text-left">
    <h2 class="card-title font-bold text-2xl">${pets.pet_name}</h2>
    <div class = ' pb-1'> <img class = "inline pr-1" src="images/Frame.png" alt=""> Breed: ${pets.breed}</div>
    <div class = ' pb-1'> <img class = "inline pr-1" src="images/birth.png" alt=""> Birth: ${pets.date_of_birth}</div>
    <div class = ' pb-1'> <img class = "inline pr-1" src="images/gender.png" alt=""> Sex: ${pets.gender}</div>
    <div class = ' pb-4'> <img class = "inline pr-1" src="images/price.png" alt=""> Price: ${pets.price}</div>
    <div class="card-actions border-t-2 pt-4"">
      <button onclick = "loadLikedPic('${pets.image}')" class="btn bg-transparent "><img class= 'w-4' src="https://img.icons8.com/?size=100&id=82788&format=png&color=000000" alt="">
</button>
      <button class="btn bg-transparent font-bold text-teal-600 ">Adopt</button>
      <button onclick="loadDetails('${pets.petId}')" class="btn bg-transparent font-bold text-teal-600 ">Details</button>
    </div>
  </div>
</div>
        

       `
       allPetDiv.append(petDiv)
      
    })
}
const loadLikedPic = (id) =>{
    console.log(id)
    const likedPicContainer = document.getElementById('liked-pic')
    const likedPic = document.createElement('div')
    likedPic.innerHTML = `
                <img src="${id}" alt="Liked Pic" class="w-full object-cover rounded-lg">

`;
    likedPicContainer.append(likedPic)
}

// w-full object-cover

// const loadLikedPic = (id) => {
//     console.log(id); // This should log the image URL

//     const likedPicContainer = document.getElementById('liked-pic');
//     const likedPic = document.createElement('div');

//     // Create an <img> element to display the image
//     likedPic.innerHTML = `
//         <img src="${id}" alt="Liked Pic" class="w-full h-auto rounded-xl">
//     `;

//     // Append the newly created image div to the container
//     likedPicContainer.appendChild(likedPic);
// };





const loadDetails = async (details) =>{
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${details}`
    const res = await fetch(uri)
    const data = await res.json()
    displayDetails(data.petData)
}

const displayDetails = (details) => {
    console.log(details)
    const modalContent =  document.getElementById('modal-content')
    const createModalText = document.createElement('div')
    modalContent.innerHTML = "";

    createModalText.innerHTML=`
    <h2 class="card-title font-bold text-2xl pb-3">${details.pet_name}</h2>
    <div class= 'grid grid-cols-2'>
    <div class = ' pb-1'> <img class = "inline pr-1" src="images/Frame.png" alt=""> Breed: ${details.breed}</div>
    <div class = ' pb-1'> <img class = "inline pr-1" src="images/birth.png" alt=""> Birth: ${details.date_of_birth}</div>
    <div class = ' pb-1'> <img class = "inline pr-1" src="images/gender.png" alt=""> Sex: ${details.gender}</div>
    <div class = ' pb-1'> <img class = "inline pr-1" src="images/price.png" alt=""> Price: ${details.price}</div>
    <div class = ' pb-1'> <img class = "inline pr-1" src="images/gender.png" alt=""> Vaccinated status: ${details.vaccinated_status}</div>
    </div>


     <div class="border-t-2 pt-4 ">
    <h4 class = 'font-bold text-gray-600'>Details Information</h4>
    <p class = 'text-gray-500'> ${details.pet_details} 
    </p> 
 </div>
    `

    modalContent.append(createModalText)
    document.getElementById('showModalData').click()
    // Way 1
}

loadAllPet()
loadCategory()

/* 
{
    "petId": 10,
    "breed": "Labrador Retriever",
    "category": "Dog",
    "date_of_birth": "2023-05-15",
    "price": 1100,
    "image": "https://i.ibb.co.com/hg9XBJV/pet-10.jpg",
    "gender": "Female",
    "pet_details": "This cheerful female Labrador is a playful bundle of joy. Born on May 15, 2023, she loves water and outdoor activities. Fully vaccinated and priced at $1100, she's perfect for families who enjoy active lifestyles.",
    "vaccinated_status": "Fully",
    "pet_name": "Daisy"
} */

