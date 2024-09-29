displayChampions(championDatas);
displayEmblems(emblemDatas);
displayItems(itemDatas);

function displayChampions(championDatas) {
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
    let row = "";
    if (cost == 5) {
      row = `
            <tr class="champion-row">
              <td class="champion-cost5">5</td>
              <td class="champion-name" style="text-align:left;" data-nameEN="${nameEN}">${name}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          `;
    } else {
      let select = `
          <select class="form-select form-select-sm champion-star">
            <option value="${starMap.ANY}" ${s_5_4}>Any</option>
            <option value="${starMap.ONE}">1</option>
            <option value="${starMap.TWO}">2</option>
            <option value="${starMap.TWO_MINUS}">2-</option>
            <option value="${starMap.TWO_PLUS}">2+</option>
            <option value="${starMap.THREE}" ${s_3_2_1}>3</option>
          </select>
        `;
        console.log(`${name}のコストは${cost}`);
      row = `
          <tr class="champion-row">
            <td class="champion-cost${cost}">${cost}</td>
            <td class="champion-name" style="text-align:left;" data-nameEN="${nameEN}">${name}</td>
            <td><input type="checkbox" class="form-check-input champion-filter"></td>
            <td class="p-0 m-0">${select}</td>
            <td><input type="checkbox" class="form-check-input champion-include" checked></td>
          </tr>
        `;
    }
    table += row;
  });
  const tbody_champion = document.getElementById("tbody_champion");
  tbody_champion.innerHTML += table;
}

function displayEmblems(emblemDatas) {
  let table = "";
  emblemDatas.forEach((emblemData, index) => {
    if (index == 0) return;
    const name = emblemData[0];
    const nameEN = emblemData[1];
    let row = `
          <tr class="emblem-row">
            <td style="text-align:left;" class="emblem-name" data-nameEN="${nameEN}">${name}</td>
            <td><input class="form-check-input emblem-filter" type="checkbox"></td>
            <td><input class="form-check-input emblem-include" type="checkbox" checked></td>
          </tr>
        `;
    table += row;
  });
  const tbody_emblem = document.getElementById("tbody_emblem");
  tbody_emblem.innerHTML += table;
}

function displayItems() {
  let table = "";
  itemDatas.forEach((itemData, index) => {
    if (index == 0) return;
    const name = itemData[0];
    const nameEN = itemData[1];
    let row = `
          <tr class="item-row">
            <td style="text-align:left;" class="item-name" data-nameEN="${nameEN}">${name}</td>
            <td><input class="form-check-input item-filter" type="checkbox"></td>
            <td><input class="form-check-input item-include" type="checkbox" checked></td>
          </tr>
        `;
    table += row;
  });
  const tbody_item = document.getElementById("tbody_item");
  tbody_item.innerHTML += table;
}
