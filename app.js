import data from "./data.json" assert { type: "json" };
const searchForm = document.getElementById("searchForm");
const filterBar = document.getElementById("filterBar");
const container = document.getElementById("container");

let searchData = new Set();

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchData.add(event.target.search.value.trim().toUpperCase());
  event.target.reset();
  filterData();
  addFilterType();
});

const filterData = () => {
  const filteredData = data.filter(({ role, level, languages, tools }) => {
    return [...searchData].every((searchCategory) => {
      const matchesRole = role && searchCategory === role.toUpperCase();
      const matchesLevel = level && searchCategory === level.toUpperCase();
      const matchesLanguages =
        languages &&
        languages.some((lang) => searchCategory === lang.toUpperCase());
      const matchesTools =
        tools && tools.some((tool) => searchCategory === tool.toUpperCase());
      return matchesRole || matchesLevel || matchesLanguages || matchesTools;
    });
  });
  displayFilteredJob(filteredData);
};

const addFilterType = () => {
  filterBar.style.display = "flex";
  filterBar.textContent = "";
  searchData.forEach((element) => {
    const container = document.createElement("div");
    const content = document.createElement("span");
    const iconContainer = document.createElement("span");
    const iconImg = document.createElement("img");
    container.classList.add("filterType");
    content.classList.add("content");
    iconContainer.classList.add("icon");
    iconContainer.dataset.filterType = element;
    iconImg.dataset.filterType = element;
    iconContainer.onclick = removeFilterType;
    iconImg.src = "./images/icon-remove.svg";
    content.textContent = element.toLowerCase();
    iconContainer.append(iconImg);
    container.append(content);
    container.append(iconContainer);
    filterBar.append(container);
  });
};

const removeFilterType = (event) => {
  searchData.delete(event.target.getAttribute("data-filter-Type"));
  filterData();
  addFilterType();
  if (searchData.size === 0) {
    filterBar.style.display = "none";
    displayFilteredJob(data);
  }
};

const displayFilteredJob = (filteredData = data) => {
  container.textContent = "";
  const noResultContainer = document.createElement("div");
  noResultContainer.classList.add("noResult");
  noResultContainer.textContent = "not found any job";
  filteredData.length === 0
    ? container.appendChild(noResultContainer)
    : filteredData.forEach((job) => {
        const jobContainer = document.createElement("div");
        jobContainer.classList.add("job");

        const companyInfo = document.createElement("div");
        companyInfo.classList.add("companyInfo");

        const companyLogo = document.createElement("img");
        companyLogo.src = job.logo;
        companyLogo.classList.add("companyLogo");

        const jobInfo = document.createElement("div");
        jobInfo.classList.add("jobInfo");

        const jobfeatured = document.createElement("div");
        jobfeatured.innerHTML = `<div class="features"><span>${
          job.company
        }</span>${job.new ? `<span class="new">new` : ""}</span></span>${
          job.featured ? `<span class="featured">featured` : ""
        }</span></div>`;

        const jobTitle = document.createElement("p");
        jobTitle.textContent = job.position;

        const jobDetails = document.createElement("div");
        jobDetails.innerHTML = `<span>${job.postedAt} .</span><span>${job.contract} . </span><span>${job.location} </span>`;

        const tagsContainer = document.createElement("div");
        tagsContainer.classList.add("tag");
        const tag1 = document.createElement("span");
        const tag2 = document.createElement("span");
        tag1.textContent = job.role;
        tag2.textContent = job.level;
        tagsContainer.appendChild(tag1);
        tagsContainer.appendChild(tag2);
        job.languages?.forEach((tagName) => {
          const tag = document.createElement("span");
          tag.textContent = tagName;
          tagsContainer.appendChild(tag);
        });
        job.tools?.forEach((tagName) => {
          const tag = document.createElement("span");
          tag.textContent = tagName;
          tagsContainer.appendChild(tag);
        });

        jobInfo.appendChild(jobfeatured);
        jobInfo.appendChild(jobTitle);
        jobInfo.appendChild(jobDetails);

        companyInfo.appendChild(companyLogo);
        companyInfo.appendChild(jobInfo);

        jobContainer.appendChild(companyInfo);
        jobContainer.appendChild(tagsContainer);

        container.appendChild(jobContainer);
      });
};

displayFilteredJob();
