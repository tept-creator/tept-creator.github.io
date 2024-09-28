setChampions(championDatas);
setEmblems(emblemDatas);
setItems(itemDatas);

function displayData(datas) {
  setChampions(datas.championDatas);
  setEmblems(datas.emblemDatas);
}

function setChampions(championDatas) {
  let table = "";
  championDatas.forEach((championData, index) => {
    if (index == 0) return;
    const name = championData[0];
    const nameEN = championData[1];
    const cost = championData[2];
    let s_3_2_1 = "";
    let s_5_4 = "";
    if (cost > 3) {
      s_5_4 = "selected";
    } else {
      s_3_2_1 = "selected";
    }
    if (cost == 5) {
      let row = `
            <tr>
              <td>${cost}</td>
              <td class="c5" style="text-align:left;" data-nameEN="${nameEN}">${name}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          `;
      table += row;
    } else {
      let select = `
          <select class="form-select form-select-sm champion-star c${cost}" data-nameEN="${nameEN}">
            <option value="Any" ${s_5_4}>Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="2-">2-</option>
            <option value="2+">2+</option>
            <option value="3" ${s_3_2_1}>3</option>
          </select>
        `;

      let row = `
          <tr>
            <td>${cost}</td>
            <td style="text-align:left;">${name}</td>
            <td><input type="checkbox" class="form-check-input champion-filter c${cost}" data-nameEN="${nameEN}"></td>
            <td class="p-0 m-0">${select}</td>
            <td><input type="checkbox" class="form-check-input champion-include c${cost}" data-nameEN="${nameEN}" checked></td>
          </tr>
        `;
      table += row;
    }
  });
  const tbody_champion = document.getElementById("tbody_champion");
  tbody_champion.innerHTML += table;
}

function setEmblems(emblemDatas) {
  let table = "";
  emblemDatas.forEach((emblemData, index) => {
    if (index == 0) return;
    const name = emblemData[0];
    const nameEN = emblemData[1];
    let row = `
          <tr>
            <td style="text-align:left;">${name}</td>
            <td><input class="form-check-input emblem-filter" type="checkbox" data-nameEN="${nameEN}"></td>
            <td><input class="form-check-input emblem-include" type="checkbox" data-nameEN="${nameEN}" checked></td>
          </tr>
        `;
    table += row;
  });
  const tbody_emblem = document.getElementById("tbody_emblem");
  tbody_emblem.innerHTML += table;
}

function setItems(){
  let table = "";
  itemDatas.forEach((itemData, index) => {
    if (index == 0) return;
    const name = itemData[0];
    const nameEN = itemData[1];
    let row = `
          <tr>
            <td style="text-align:left;">${name}</td>
            <td><input class="form-check-input item-filter" type="checkbox" data-nameEN="${nameEN}"></td>
            <td><input class="form-check-input item-include" type="checkbox" data-nameEN="${nameEN}" checked></td>
          </tr>
        `;
    table += row;
  });
  const tbody_item = document.getElementById("tbody_item");
  tbody_item.innerHTML += table;
}

function openURL(linkId) {
  let baseUrl = `https://www.metatft.com/explorer?tab=comps`;
  let cost5Url = "";
  let levelUrl = "";
  switch (linkId) {
    case "lv8ex5link":
      const lv8ex5link = document.getElementById("lv8ex5link");
      cost5Url = generateCost5URL("Any");
      levelUrl = "&num_unit_slots=8";
      break;
    case "lv8ex5_2link":
      const lv8ex5_2link = document.getElementById("lv8ex5_2link");
      cost5Url = generateCost5URL();
      levelUrl = "&num_unit_slots=8";
      break;
    case "lv9link":
      const lv9link = document.getElementById("lv9link");
      cost5Url = generateCost5URL();
      levelUrl = "&num_unit_slots=9";
      break;
  }
  let unitUrl = "";
  document.querySelectorAll(".champion-filter").forEach((filterCheckbox) => {
    if (filterCheckbox.checked) {
      const nameEN = filterCheckbox.getAttribute("data-nameEN");
      console.log("data-nameEN = " + nameEN);
      const includeCheckbox = document.querySelector(
        `.champion-include[data-nameEN="${nameEN}"]`
      );
      const starSelect = document.querySelector(
        `.champion-star[data-nameEN="${nameEN}"]`
      );
      let starUrl = "";
      switch (starSelect.value) {
        case "Any":
          starUrl = "x";
          break;
        case "2-":
          starUrl = "1,2";
          break;
        case "2+":
          starUrl = "2,3";
          break;
        default:
          starUrl = starSelect.value;
          break;
      }

      if (includeCheckbox.checked) {
        unitUrl += `&unit=TFT12_${nameEN}_${starUrl}_3`;
      } else {
        unitUrl += `&unit=!TFT12_${nameEN}_${starUrl}_x`;
      }
    }
  });
  let emblemUrl = "";
  document.querySelectorAll(".emblem-filter").forEach((filterCheckbox) => {
    if (filterCheckbox.checked) {
      const nameEN = filterCheckbox.getAttribute("data-nameEN");
      const includeCheckbox = document.querySelector(
        `.emblem-include[data-nameEN="${nameEN}"]`
      );
      if (includeCheckbox.checked) {
        emblemUrl += `&item=TFT12_Item_${nameEN}EmblemItem&trait=TFT12_${nameEN}`;
      } else {
        emblemUrl += `&item=!TFT12_Item_${nameEN}EmblemItem`;
      }
    }
  });
  let heroUrl = "";
  const heroCheckbox = document.querySelector(".hero-filter");
  if (heroCheckbox.checked) {
    heroUrl = `&augment=!TFT12_Augment_BlitzcrankCarry&augment=!TFT12_Augment_PoppyCarry&augment=!TFT12_Augment_EliseCarry&augment=!TFT12_Augment_NunuCarry&augment=!TFT12_Augment_RumbleCarry&augment=!TFT12_Augment_GalioCarry&augment=!TFT12_Augment_ShenCarry&augment=!TFT12_Augment_LilliaCarry`;
  }

  let itemUrl = "";
  document.querySelectorAll(".item-filter").forEach(filterCheckbox => {
    if(filterCheckbox.checked){
      const nameEN = filterCheckbox.getAttribute("data-nameEN");
      const includeCheckbox = document.querySelector(
        `.item-include[data-nameEN="${nameEN}"]`
      );
      if (includeCheckbox.checked) {
        itemUrl += `&item=TFT_Item_${nameEN}`;
      } else {
        itemUrl += `&item=!TFT_Item_${nameEN}`;
      }
    }
  });

  const url = `${baseUrl}${levelUrl}${cost5Url}${unitUrl}${emblemUrl}${heroUrl}${itemUrl}`;
  window.open(url, "_blank");
}

function generateCost5URL(exType) {
  console.log(exType);
  let ex = "";
  if (exType == "Any") {
    ex = "x";
  } else {
    ex = "2,3";
  }
  let url = "";
  document.querySelectorAll(".c5").forEach((c5) => {
    const nameEN = c5.getAttribute("data-nameEN");
    url += `&unit=!TFT12_${nameEN}_${ex}_x`;
  });
  return url;
}

function reset() {
  reset1();
  reset23();
  reset4();
  resetEmblem();
}

function handleChampionSettings(
  costClass,
  filterChecked,
  starValue,
  includeChecked
) {
  // 指定されたコストクラスのチャンピオンに対して処理を行う
  document
    .querySelectorAll(`.champion-filter.${costClass}`)
    .forEach((filterCheckbox) => {
      const nameEN = filterCheckbox.getAttribute("data-nameEN");
      const starSelect = document.querySelector(
        `.champion-star[data-nameEN="${nameEN}"]`
      );
      const includeCheckbox = document.querySelector(
        `.champion-include[data-nameEN="${nameEN}"]`
      );

      // チェックボックスやセレクトの状態を更新
      filterCheckbox.checked = filterChecked;
      starSelect.value = starValue;
      includeCheckbox.checked = includeChecked;
    });
}

function reset4() {
  handleChampionSettings("c4", false, "Any", true);
}

function exclude23Star3() {
  handleChampionSettings("c2", true, "3", false);
  handleChampionSettings("c3", true, "3", false);
}

function reset23() {
  handleChampionSettings("c2", false, "3", true);
  handleChampionSettings("c3", false, "3", true);
}

function exclude1Star3() {
  handleChampionSettings("c1", true, "3", false);
}

function reset1() {
  handleChampionSettings("c1", false, "3", true);
}

function handleEmblemSettings(includeChecked, filterChecked) {
  document.querySelectorAll(".emblem-filter").forEach((filterCheckbox) => {
    const nameEN = filterCheckbox.getAttribute("data-nameEN");
    const includeCheckbox = document.querySelector(
      `.emblem-include[data-nameEN="${nameEN}"]`
    );
    filterCheckbox.checked = filterChecked;
    includeCheckbox.checked = includeChecked;
  });
}

function excludeEmblem() {
  handleEmblemSettings(false, true);
}

function resetEmblem() {
  handleEmblemSettings(true, false);
}

function handleItemSettings(includeChecked, filterChecked) {
  document.querySelectorAll(".item-filter").forEach((filterCheckbox) => {
    const nameEN = filterCheckbox.getAttribute("data-nameEN");
    const includeCheckbox = document.querySelector(
      `.item-include[data-nameEN="${nameEN}"]`
    );
    filterCheckbox.checked = filterChecked;
    includeCheckbox.checked = includeChecked;
  });
}

function resetItem(){
  handleItemSettings(true, false);
}