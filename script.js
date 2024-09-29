function openURL(linkId) {
  let baseUrl = `https://www.metatft.com/explorer?tab=comps`;

  let slotUrl = "";
  if (linkId == "lv9"){
    slotUrl = "&num_unit_slots=9";
  }else{
    slotUrl = "&num_unit_slots=8";
  }

  let cost5Url = "";
  document.querySelectorAll(".champion-cost5").forEach((costCell) => {
    var row = costCell.closest("tr");
    const nameEN = row.querySelector(".champion-name").getAttribute("data-nameEN");
    if (linkId == "lv8ex5"){
      cost5Url += `&unit=!TFT12_${nameEN}_${starMap.ANY}_x`;
    }else{
      cost5Url += `&unit=!TFT12_${nameEN}_${starMap.TWO_PLUS}_x`;
    }
  });

  let unitUrl = "";
  document.querySelectorAll(".champion-filter").forEach((filterCheckbox) => {
    if (filterCheckbox.checked) {
      const row = filterCheckbox.closest("tr");
      const nameEN = row.querySelector(".champion-name").getAttribute("data-nameEN");
      const includeCheckbox = row.querySelector(
        ".champion-include"
      );
      const starSelect = row.querySelector(
        ".champion-star"
      );
      console.log("starSelect.value = " + starSelect.value);
      if (includeCheckbox.checked) {
        unitUrl += `&unit=TFT12_${nameEN}_${starSelect.value}_3`;
      } else {
        unitUrl += `&unit=!TFT12_${nameEN}_${starSelect.value}_x`;
      }
    }
  });

  let emblemUrl = "";
  document.querySelectorAll(".emblem-filter").forEach((filterCheckbox) => {
    if (filterCheckbox.checked) {
      const row = filterCheckbox.closest("tr");
      const nameEN = row.querySelector(".emblem-name").getAttribute("data-nameEN");
      const includeCheckbox = document.querySelector(".emblem-include");
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
  document.querySelectorAll(".item-filter").forEach((filterCheckbox) => {
    if (filterCheckbox.checked) {
      const row = filterCheckbox.closest("tr");
      const nameEN = row.querySelector(".item-name").getAttribute("data-nameEN");
      const includeCheckbox = row.querySelector(".item-include");
      if (includeCheckbox.checked) {
        itemUrl += `&item=TFT_Item_${nameEN}`;
      } else {
        itemUrl += `&item=!TFT_Item_${nameEN}`;
      }
    }
  });

  const url = `${baseUrl}${slotUrl}${cost5Url}${unitUrl}${emblemUrl}${heroUrl}${itemUrl}`;
  window.open(url, "_blank");
}

function reset() {
  reset1();
  reset23();
  reset4();
  resetEmblem();
  resetItem();
}

function handleChampionSettings(
  cost,
  filterChecked,
  starValue,
  includeChecked
) {
  // 指定されたコストクラスのチャンピオンに対して処理を行う
  document
    .querySelectorAll(`.champion-cost${cost}`)
    .forEach((championCost) => {
      const row = championCost.closest("tr");
      const name = row.querySelector(".champion-name").getAttribute("data-nameEN");
      console.log(name+cost);
      const filterCheckbox = row.querySelector(".champion-filter");
      const starSelect = row.querySelector(".champion-star");
      const includeCheckbox = row.querySelector(".champion-include");

      // チェックボックスやセレクトの状態を更新
      filterCheckbox.checked = filterChecked;
      starSelect.value = starValue;
      includeCheckbox.checked = includeChecked;
    });
}

function reset4() {
  handleChampionSettings(4, false, starMap.ANY, true);
}

function exclude23Star3() {
  handleChampionSettings(2, true, starMap.THREE, false);
  handleChampionSettings(3, true, starMap.THREE, false);
}

function reset23() {
  handleChampionSettings(2, false, starMap.THREE, true);
  handleChampionSettings(3, false, starMap.THREE, true);
}

function exclude1Star3() {
  handleChampionSettings(1, true, starMap.THREE, false);
}

function reset1() {
  handleChampionSettings(1, false, starMap.THREE, true);
}

function handleEmblemSettings(includeChecked, filterChecked) {
  document.querySelectorAll(".emblem-filter").forEach((filterCheckbox) => {
    const row = filterCheckbox.closest("tr");
    const includeCheckbox = row.querySelector(".emblem-include");
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
    const row = filterCheckbox.closest("tr");
    const includeCheckbox = row.querySelector(".item-include");
    filterCheckbox.checked = filterChecked;
    includeCheckbox.checked = includeChecked;
  });
}

function resetItem() {
  handleItemSettings(true, false);
}