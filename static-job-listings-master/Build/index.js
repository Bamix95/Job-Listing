const getData = async () => {
    try{
    const response = await fetch("../data.json")
    if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    const data = await response.json()
    renderJobCards(data)
    searchInputEventListener(data)
    }
    catch(error){
    console.error("Error fetching data:", error);
    }
}
function searchInputEventListener(data){
  let searchInput = document.getElementById("inPut")
  searchInput.addEventListener("change", (event) => handleChange(event, data))
 }

function handleChange(event, data){
let inputValue = event.target.value

let filteredArray = data.filter(dataNeeded => dataNeeded.role.toLowerCase() === inputValue.toLowerCase() || 
                    dataNeeded.level.toLowerCase() === inputValue.toLowerCase() || 
                    dataNeeded.languages.some(language=> language.toLowerCase() === inputValue.toLowerCase())) 
                    renderJobCards(filteredArray.length > 0 ? filteredArray : data);
}
function renderJobCards(dataArray) {
  const jobCardContainer = document.querySelector(".jobCardContainer");
  jobCardContainer.innerHTML = "";
  dataArray.forEach(dataElement => {
      const cardContainer = document.createElement("div");
      const cardContainerTwo = document.createElement("div");
      const cardContainerwrapper = document.createElement("div");

      const logo = document.createElement("img");
      logo.src = dataElement.logo;
      cardContainerwrapper.appendChild(logo);

      const jobCompany = document.createElement("span");
      jobCompany.classList.add("cardPar");
      jobCompany.textContent = dataElement.company;
      cardContainerTwo.appendChild(jobCompany);

      if (dataElement.new) {
          const newLabel = document.createElement("span");
          newLabel.classList.add("newLabel");
          newLabel.textContent = "NEW!";
          cardContainerTwo.appendChild(newLabel);
      }

      if (dataElement.featured) {
          const featuredLabel = document.createElement("span");
          featuredLabel.classList.add("featured");
          featuredLabel.textContent = "FEATURED";
          cardContainerTwo.appendChild(featuredLabel);
      }

      const jobTitle = document.createElement("p");
      jobTitle.classList.add("job");
      jobTitle.textContent = dataElement.position;
      cardContainerTwo.appendChild(jobTitle);

      const unOrderContain = document.createElement("ul");
      unOrderContain.classList.add('ul', 'unordered');
      const postedAt = document.createElement("li");
      const contract = document.createElement("li");
      const location = document.createElement("li");
      postedAt.style.listStyle = "none";
      postedAt.textContent = dataElement.postedAt;
      contract.textContent = dataElement.contract;
      location.textContent = dataElement.location;
      unOrderContain.append(postedAt, contract, location);
      cardContainerTwo.appendChild(unOrderContain);

      const LangContainer = document.createElement("div");
      LangContainer.classList.add("LangContainer");
      const role = document.createElement("span");
      const level = document.createElement("span");
      role.classList.add("LangContainerSpan");
      level.classList.add("LangContainerSpan");
      role.textContent = dataElement.role;
      level.textContent = dataElement.level;
      LangContainer.append(role, level);
      dataElement.languages.forEach(language => {
          const languageSpan = document.createElement("span");
          languageSpan.classList.add("LangContainerSpan");
          languageSpan.textContent = language;
          LangContainer.appendChild(languageSpan);
      });

      cardContainer.append(cardContainerwrapper, LangContainer);
      jobCardContainer.appendChild(cardContainer);
      cardContainerwrapper.appendChild(cardContainerTwo);
      cardContainer.classList.add("cardContainer");
      cardContainerwrapper.classList.add("cardContainerwrapper");
      
      if (dataElement.featured && dataElement.new) {
          cardContainer.style.borderLeft = "5px solid hsl(180, 29%, 50%)";
      }
  });
}
function debounce(func, delay) {
  let debounceTimer;
  return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
}
getData()
  

  
 