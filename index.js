const fetchData = () => {
  url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAllDetails(data.data.tools));
  // console.log(data.data.tools[1]);
};

function showAllDetails(details) {
    console.log(details[0]);
  const imageContainer = document.getElementById("details-container");
  for (const detail of details) {

    const div = document.createElement("div");
    div.innerHTML = `
                <div class="p-5 border border-[#111111]  bg-opacity-10 bg-[#FFFFFF] rounded-xl">
         <img class="rounded-xl  h-60" src="${detail.image}" alt="">
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
            <button><i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
        `;
    imageContainer.appendChild(div);
  }
}

fetchData();
