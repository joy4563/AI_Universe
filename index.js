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
  console.log(details[11]);
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
                        <button class="bg-[#FEF7F7] h-10 w-10 rounded-full" onClick="clickOnDetails('${detail.id}')"
                           data-modal-target="defaultModal"
      data-modal-toggle="defaultModal" > joy<i class="fa-solid fa-arrow-right text-[#EB5757]"></i></button>
                    </div>
                </div>
        `;
    imageContainer.appendChild(div);
  }
}

function clickOnDetails(detailID) {
  console.log(detailID);
}
function seeMore(dataLimit) {
  const seeMoreButton = document.getElementById("see-more");
  fetchData();
}

// fetchData(6);

// fetch data for modal
const fetchModalData = () => {
  url = `https://openapi.programming-hero.com/api/ai/tool/12`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showModalData(data.data));
  // console.log(data.data.tools[1]);
};

function showModalData(individualData) {
  // console --------------------
  // console.log(individualData.features);

  // modal descriptin
  const modalDescriptin = document.getElementById("modal-description");
  modalDescriptin.innerText = individualData.description;

  //  --pricing section
  // basic
  const basicField = document.getElementById("basic-price");
  basicField.innerText = `${
    individualData.pricing == null
      ? "Free of cost"
      : individualData.pricing[0].price[0] != "$"
      ? "Free of cost"
      : individualData.pricing[0].price
  }`;

  // pro
  const proField = document.getElementById("pro-price");
  // proField.innerText = individualData.pricing[1].price;
  proField.innerText = `${
    individualData.pricing == null
      ? "Free of cost"
      : individualData.pricing[1].price[0] != "$"
      ? "Free of cost"
      : individualData.pricing[1].price
  }`;

  // enterprise
  const enterpriseField = document.getElementById("enterprise-price");
  enterpriseField.innerText = `${
    individualData.pricing == null
      ? "Free of cost"
      : individualData.pricing[2].price
  }
  `;

  // feature and intigration

  // feature
  const featureKey = Object.keys(individualData.features);
  const featureContainer = document.getElementById("featurs-container");
  featureContainer.innerHTML = "";
  for (const key of featureKey) {
    const list = document.createElement("li");
    list.innerText = `${individualData.features[key].feature_name}

    `;
    featureContainer.appendChild(list);
  }

  // integration
  console.log(individualData);
  const integrationObject = individualData.integrations;
  const integrationContainer = document.getElementById("integration-container");
  integrationContainer.innerHTML = "";
  if (integrationObject == null) {
    const list = document.createElement("li");
    list.innerText = "No data found";
    integrationContainer.appendChild(list);
  } else {
    const integrationKey = Object.keys(integrationObject);

    for (const key of integrationKey) {
      const list = document.createElement("li");
      list.innerText = `${individualData.integrations[key].feature_name}
    `;
      integrationContainer.appendChild(list);
    }
  }

  // modal image
  const modalImage = document.getElementById("modal-image");
  modalImage.innerHTML = `<img src="${individualData.image_link[0]}" class="rounded-xl md:w-80 md:h-72" alt="">`;

  // modal input
  const inputField = document.getElementById("input-field");
  inputField.innerText = `${
    individualData.input_output_examples == null
      ? "Can you give any example?"
      : individualData.input_output_examples[0].input
  }`;
  // modal output
  const outputField = document.getElementById("output-field");
  outputField.innerText = `${
    individualData.input_output_examples == null
      ? "No! Not Yet! Take a break!!!"
      : individualData.input_output_examples[0].output
  }`;
}
fetchModalData();
