function setSearchTable(inputId, tableId, nameClass) {
  document.getElementById(inputId).addEventListener("input", function () {
    // 検索ボックスに入力された値
    const filter = this.value.toLowerCase();

    // テーブルの行をすべて取得
    const rows = document.querySelectorAll(`#${tableId} tr`);
    // 各行をループして、条件に基づいて表示/非表示を切り替える
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const nameEN = row.querySelector(`.${nameClass}`).getAttribute("data-nameEN")?.toLowerCase();
      const match =
        Array.from(cells).some((cell) =>
          cell.textContent.toLowerCase().includes(filter)
        ) ||
        (nameEN && nameEN.includes(filter));

      // 検索にヒットした行だけを表示する
      row.style.display = match ? "" : "none";
    });
  });
}

// 「championSearch」と「emblemSearch」に対してそれぞれ適用
setSearchTable("championSearch", "tbody_champion", "champion-name");
setSearchTable("emblemSearch", "tbody_emblem", "emblem-name");
setSearchTable("itemSearch", "tbody_item", "item-name");