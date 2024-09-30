function openURL(linkId) {
  let baseUrl = `https://www.metatft.com/explorer?tab=comps`;

  const levelMatch = linkId.match(/lv(\d+)/);
  const numSlots = levelMatch ? levelMatch[1] : 8;
  const slotUrl = `&num_unit_slots=${numSlots}`;

  let cost5Url = "";
  if(!linkId.includes("normal")){
    document.querySelectorAll(".champion-cost").forEach((costCell) => {
      var cost = costCell.getAttribute("data-cost");
      if (cost < 5) return;
      var row = costCell.closest("tr");
      const nameEN = row.querySelector(".champion-name").getAttribute("data-nameEN");
      if (linkId.includes("ex5_2")){
        cost5Url += `&unit=!TFT12_${nameEN}_${starMap.TWO_PLUS}_x`;
      }else if(linkId.includes("ex5")) {
        cost5Url += `&unit=!TFT12_${nameEN}_${starMap.ANY}_x`;
      }
    });
  }

  let unitUrl = "";
  document.querySelectorAll(".champion-filter").forEach((filterCheckbox) => {
    if (filterCheckbox.checked) {
      const row = filterCheckbox.closest("tr");
      const costCell = row.querySelector(".champion-cost");
      var cost = costCell.getAttribute("data-cost");
      if(cost == 5 && !linkId.includes("normal")) return;
      const nameEN = row.querySelector(".champion-name").getAttribute("data-nameEN");
      const includeCheckbox = row.querySelector(".champion-include");
      const itemCheckbox = row.querySelector(".champion-item");
      var item = itemCheckbox.checked && includeCheckbox.checked ? "3" : "x";
      const starSelect = row.querySelector(".champion-star");
      var include = includeCheckbox.checked ? "" : "!";
      unitUrl += `&unit=${include}TFT12_${nameEN}_${starSelect.value}_${item}`;
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
  reset45();
  resetEmblem();
  resetItem();
}

function handleChampionSettings(
  cost,
  filterChecked,
  itemChecked,
  starValue,
  includeChecked
) {
  // 指定されたコストクラスのチャンピオンに対して処理を行う
  document
    .querySelectorAll(`.champion-cost`)
    .forEach((championCost) => {
      if (cost != championCost.getAttribute("data-cost"))return;
      const row = championCost.closest("tr");
      const name = row.querySelector(".champion-name").getAttribute("data-nameEN");
      console.log(name+cost);
      const filterCheckbox = row.querySelector(".champion-filter");
      const itemCheckbox = row.querySelector(".champion-item");
      const starSelect = row.querySelector(".champion-star");
      const includeCheckbox = row.querySelector(".champion-include");

      // チェックボックスやセレクトの状態を更新
      filterCheckbox.checked = filterChecked;
      itemCheckbox.checked = itemChecked;
      starSelect.value = starValue;
      includeCheckbox.checked = includeChecked;
    });
}

function reset45() {
  handleChampionSettings(4, false, true, starMap.ANY, true);
  handleChampionSettings(5, false, false, starMap.ONE, true);
}

function exclude23Star3() {
  handleChampionSettings(2, true, true, starMap.THREE, false);
  handleChampionSettings(3, true, true, starMap.THREE, false);
}

function reset23() {
  handleChampionSettings(2, false, true, starMap.THREE, true);
  handleChampionSettings(3, false, true, starMap.THREE, true);
}

function exclude1Star3() {
  handleChampionSettings(1, true, true, starMap.THREE, false);
}

function reset1() {
  handleChampionSettings(1, false, true, starMap.THREE, true);
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