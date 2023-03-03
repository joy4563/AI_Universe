// fetch data for home page

const fetchData = (dataLimit) => {
  url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAllDetails(data.data.tools, dataLimit));
  // console.log(data.data.tools[1]);
};

function showAllDetails(details, dataLimit) {
  const imageContainer = document.getElementById("details-container");
  // console.log(details[0]);
  imageContainer.innerHTML = "";

  details = details.slice(0, dataLimit);

  for (const detail of details) {
    const div = document.createElement("div");
    div.innerHTML = `
                <div class="p-5 border border-[#111111]  bg-opacity-10 bg-[#FFFFFF] rounded-xl">
         <img class="rounded-xl  lg:h-60" src="${detail.image}" alt="">
          <div id="image-id" class="rounded-xl"></div>
          <p class="mt-5 mb-3 text-xl font-semibold text-black">Features</p>
          <ol class="pl-4 list-decimal font-normal text-xs text-[#585858]">
            <li>${detail.features[0]}</li>
            <li>${detail.features[1]}</li>
            <li>${detail.features[2]}</li>
          </ol>
          <hr class=" border-[#111111] opacity-20 my-5" />
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-xl font-semibold text-black mb-3">${detail.name}</h1>
              <p class="text-[#585858] font-medium text-sm">
                <i class="fa-solid fa-calendar-days"></i> &nbsp${detail.published_in}
              </p>
            </div>
            <button class="bg-[#FEF7F7] h-10 w-10 rounded-full"   data-modal-target="staticModal"
        data-modal-toggle="staticModal"
         ><i class="fa-solid fa-arrow-right text-[#EB5757]"></i></button>
          </div>
        </div>
        `;
    imageContainer.appendChild(div);
  }
}

function seeMore(dataLimit) {
  const seeMoreButton = document.getElementById("see-more");
  fetchData();
}

// fetchData(6);

// fetch data for modal
const fetchModalData = () => {
  url = `https://openapi.programming-hero.com/api/ai/tool/01`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showModalImage(data.data));
  // console.log(data.data.tools[1]);
};

function showModalImage(individualData) {
  console.log(individualData.pricing[2]);

  // modal image
  const modalImage = document.getElementById("modal-image");
  modalImage.innerHTML = `<img src="${individualData.image_link[0]}" class="rounded-xl" alt="">`;

  // modal input
  const inputField = document.getElementById("input-field");
  inputField.innerText = individualData.input_output_examples[0].input;
  // modal output
  const outputField = document.getElementById("output-field");
  outputField.innerText = individualData.input_output_examples[0].output;

  // modal descriptin

  const modalDescriptin = document.getElementById("modal-description");
  modalDescriptin.innerText = individualData.description;
  // basic,pro,enterprise 
  const basicField = document.getElementById("basic-price");
  basicField.innerText = individualData.pricing[0].price+"Basic";

  const proField = document.getElementById("pro-price");
  proField.innerText = individualData.pricing[1].price+"Pro";
  
  const enterpriseField = document.getElementById("enterprise-price");
  enterpriseField.innerText = individualData.pricing[2].price+"Enterprise";

}
fetchModalData();
