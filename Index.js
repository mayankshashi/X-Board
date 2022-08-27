let ID = () => Math.random().toString(36).substr(2,9);

let createAccordion = (data,id) =>{
return`
<div class="accordian-card" >  
  <div> 
    <div>
      <button class="accordion-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
      <i class="fas fa-angle-down"></i>
     <p class="px-2 d-inline-flex"> ${data.feed.title}</p>
      </button>
    </div>
  </div>

  <div id="collapse${id}" class="collapse" aria-labelledby="collapse${id}">
  
  </div>

 </div>`;
};

let createCarouselOuter = (id, carouselInnerId) => {
    return`
     <div id="carouselControls${id}" class="carousel slide accordian-body" data-bs-ride="carousel">
        <div class="carousel-inner" id=${carouselInnerId}>
          
          </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>`
};

let createCarouselInner = (id, zero) => {
    return`
    <div class="carousel-item ${zero ? "active" :""}" id="${id}">
    </div>`;
};

let createCard = (item) => {
    return`
    <div class="carousel-inner" >
      <div class="d-block">
      <img class="d-block w-100" src="${item["enclosure"]["link"]}" alt="card image cap">
      <div class-"card-body">
      <h5 class="card-title">${item["title"]}</h5>
      <h6 class= "card-subtitle mb-2 text-muted">${item["author"]}</h6>
      <p class="card-subtitle text-secondry">${item["pubDate"]}</p>
      <p class="card-text">${item["description"]}</p>
     </div>
    </div>
    `;
};

let addContent = async ()=> {
    for(let i=0; i<magazines.length; i++) {
        let url = magazines[i];

        //fetch data
        let response = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`
        );
        let data= await response.json();

        console.log(data);
        //create accordion
        let accordionId = ID();
        let accordion = createAccordion(data, accordionId);
        document.getElementById("accordionId").innerHTML+= accordion;

        // expand only for first accordion
        if(i==0){
          document.getElementById(`collapse${accordionId}`).classList.add("show");
          }
        //create carousel
        let carouselId = ID();
        let carouselInnerId = ID();
        let carousel = createCarouselOuter(carouselId, carouselInnerId);
        document.getElementById(`collapse${accordionId}`).innerHTML = carousel;

        //Add the cards in the carousel
        let items = data["items"];
        for (j in items) {
            let card = createCard(items[j]);
            let innerCarouselCardId = ID();
            let innerCarouselCard = createCarouselInner(innerCarouselCardId, j==0);
            document.getElementById(`${carouselInnerId}`).innerHTML +=innerCarouselCard;
            document.getElementById(`${innerCarouselCardId}`).innerHTML += card;
        }
    }
};

addContent();
