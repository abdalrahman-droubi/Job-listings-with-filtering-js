const filterData1 = (searchData) => {
  const filteredData = data.filter((job) => {
    if (
      job.role?.toUpperCase() === searchData ||
      job.level?.toUpperCase() === searchData ||
      job.languages?.map((lang) => lang.toUpperCase()).includes(searchData) ||
      job.tools?.map((tool) => tool.toUpperCase()).includes(searchData)
    ) {
      return true;
    }
  });
  console.log(filteredData);
};

const filterData2 = (searchData) => {
  const filteredData = data.filter((job) => {
    if (
      searchData.some((elem) => job.role?.toUpperCase() === elem) ||
      searchData.some((elem) => job.level?.toUpperCase() === elem) ||
      searchData.some((elem) =>
        job.languages?.map((lang) => lang.toUpperCase()).includes(elem)
      ) ||
      searchData.some((elem) =>
        job.tools?.map((tool) => tool.toUpperCase()).includes(elem)
      )
    ) {
      return true;
    }
  });
  resultarr.push(...filteredData);
  console.log(filteredData);
};

const filterData3 = () => {
  const filteredData = data.filter(({ role, level, languages, tools }) => {
    const matchesRole = role && searchData.has(role.toUpperCase());
    const matchesLevel = level && searchData.has(level.toUpperCase());
    const matchesLanguages =
      languages && languages.some((lang) => searchData.has(lang.toUpperCase()));
    const matchesTools =
      tools && tools.some((tool) => searchData.has(tool.toUpperCase()));

    return matchesRole || matchesLevel || matchesLanguages || matchesTools;
  });

  console.log(filteredData);
  displayFilteredJob(filteredData);
};

/* box-shadow: rgba(0, 0, 0, 0.19) 0px 8px 20px 0px,
    rgba(0, 0, 0, 0.23) 0px 3px 20px 0px; */

// <div class="filterType">
//         <span class="content"> java script </span>
//         <span class="icon">
//           <img src="./images/icon-remove.svg" alt="" />
//         </span>
//       </div>

<div class="job">
  <div class="companyInfo">
    <img src="./images/account.svg" class="companyLogo" />
    <div class="jobInfo">
      <div>
        <span>photo snap</span>
        <span class="new">new</span>
        <span class="featured">featured</span>
      </div>
      <p>senior Frontend developer</p>
      <span>1d ago .</span>
      <span>full time . </span>
      <span>usa </span>
    </div>
  </div>

  <div class="tag">
    <span>html</span>
    <span>css</span>
    <span>js</span>
    <span>react</span>
  </div>
</div>;
