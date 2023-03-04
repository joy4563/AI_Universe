function loadData(dataLimit, sorting) {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools, dataLimit, sorting));
}

function displayData(apis, dataLimit, sorting) {
  const aiContainer = document.getElementById("ai_container");
  aiContainer.textContent = "";

  if (dataLimit && apis.length > 6) {
    apis = apis.slice(0, 6);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  if (sorting) {
    apis.sort((a, b) => {
      let da = new Date(a.published_in),
        db = new Date(b.published_in);
      return da - db;
    });
  }

  for (let j = 0; j < apis.length; j++) {
    const api = apis[j];
    // console.log(api);
    let headerId = "features_container" + j;
    // console.log(headerId);
    const div1 = document.createElement("div");
    div1.classList.add("col");
    div1.innerHTML = `
        <div class="card p-4">
            <img src="${api.image}" class="card-img-top rounded-3 mb-3" alt="..." style="height: 300px;">
            <h4 class="mb-3">Features</h4>
            <div class="features_container divSize">

            </div>
            <hr class="mb-3">
            <h3>${api.name}</h3>
            <div class="d-flex justify-content-between">
                <div class="d-flex gap-2">
                    <i class="fa-solid fa-calendar-days fs-5"></i>
                    <h5>${api.published_in}</h5>
                </div>
                <div>
                    <button><i class="fa-sharp fa-solid fa-arrow-right" onclick="featureDetails('${api.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></button>
                </div>
            </div>
        </div>
        `;
    aiContainer.appendChild(div1);
    const features_container =
      document.getElementsByClassName("features_container");
    for (let k = 0; k < api.features.length; k++) {
      features_container[j].id = headerId;
      const hFive = document.createElement("h5");
      hFive.innerHTML = `
            <h6 class="text-muted">${k + 1}. ${api.features[k]}</h6>
            `;
      document.getElementById(headerId).appendChild(hFive);
    }
  }
  showToggle(false);
}

function featureDetails(id) {
  const uri = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(uri)
    .then((res) => res.json())
    .then((data) => showParticularItem(data.data));
}

function showParticularItem(details) {
  console.log(details.features);

  const obj = details.features;
  const keys = Object.keys(obj);
  const arr = details.integrations;

  let input, output, score;

  if (details.input_output_examples == null) {
    input = "Can you give any example?";
    output = "No! Not Yet! Take a break!!!";
  } else {
    input = details.input_output_examples[0].input;
    output = details.input_output_examples[0].output;
  }

  document.getElementById("description").innerText = details.description;

  if (details.pricing == null) {
    document.getElementById("basicDiv").classList.add("d-none");
    document.getElementById("basicFree").classList.remove("d-none");

    document.getElementById("proDiv").classList.add("d-none");
    document.getElementById("proFree").classList.remove("d-none");

    document.getElementById("notContact").classList.remove("d-none");
    document.getElementById("contact").classList.add("d-none");
  } else {
    const basicMonth = details.pricing[0].price;
    const proMonth = details.pricing[1].price;
    const contact = details.pricing[2].plan;

    if (basicMonth[0] == "$") {
      document.getElementById("basic").innerText = basicMonth;
      document.getElementById("basicDiv").classList.remove("d-none");
      document.getElementById("basicFree").classList.add("d-none");
    } else {
      document.getElementById("basicDiv").classList.add("d-none");
      document.getElementById("basicFree").classList.remove("d-none");
    }

    if (proMonth[0] == "$") {
      document.getElementById("pro").innerText = proMonth;
      document.getElementById("proDiv").classList.remove("d-none");
      document.getElementById("proFree").classList.add("d-none");
    } else {
      document.getElementById("proDiv").classList.add("d-none");
      document.getElementById("proFree").classList.remove("d-none");
    }

    if (contact == "Enterprise") {
      document.getElementById("notContact").classList.add("d-none");
      document.getElementById("contact").classList.remove("d-none");
    } else {
      document.getElementById("notContact").classList.remove("d-none");
      document.getElementById("contact").classList.add("d-none");
    }
  }

  const feaTures = document.getElementById("features");
  feaTures.textContent = "";
  const unorderedList = document.createElement("ul");
  // console.log(obj);
  for (const key of keys) {
    const list = document.createElement("li");
    list.innerHTML = `
        <li>${obj[key].feature_name}</li>
        `;
    unorderedList.appendChild(list);
  }
  feaTures.appendChild(unorderedList);

  const integrations = document.getElementById("integrations");
  integrations.textContent = "";

  if (arr == null) {
    const header_six = document.createElement("h6");
    header_six.innerHTML = `
        <h6>No Data Found</h6>
        `;
    integrations.appendChild(header_six);
  } else {
    const unorderedList2 = document.createElement("ul");
    for (const val of arr) {
      const list2 = document.createElement("li");
      list2.innerHTML = `
            <li>${val}</li>
            `;
      unorderedList2.appendChild(list2);
    }
    integrations.appendChild(unorderedList2);
  }

  if (details.accuracy.score != null) {
    score = details.accuracy.score * 100;
  }

  const imgSiteDiv = document.getElementById("imgSite");
  imgSiteDiv.textContent = "";
  const div1 = document.createElement("div");
  if (details.accuracy.score == null) {
    div1.innerHTML = `
        <img src="${details.image_link[0]}" class="card-img-top p-3" alt="" style="border-radius: 26px;">
        `;
    imgSiteDiv.appendChild(div1);
  } else {
    div1.innerHTML = `
        <img src="${details.image_link[0]}" class="card-img-top p-3" alt="" style="border-radius: 26px;">
        <p class="text-white bg-danger w-25 text-center fw-bold rounded-3 accurate">${score}% accuracy</p>
        `;
    imgSiteDiv.appendChild(div1);
  }

  document.getElementById("input").innerText = input;
  document.getElementById("output").innerText = output;
}

function showToggle(b) {
  const toggle = document.getElementById("loader");
  if (b) {
    toggle.classList.remove("d-none");
  } else {
    toggle.classList.add("d-none");
  }
}

showToggle(true);
loadData(6);
let i = 0;
let j = 0;

document.getElementById("showAll-btn").addEventListener("click", function () {
  i = 1;
  showToggle(true);
  if (j === 1) {
    loadData("", "sort");
  } else {
    loadData();
  }
});

document.getElementById("sortDate").addEventListener("click", function () {
  j = 1;
  showToggle(true);
  if (i === 1) {
    loadData("", "sort");
  } else {
    loadData(6, "sort");
  }
});
