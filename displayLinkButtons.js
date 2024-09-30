displayLinkButtons();

function displayLinkButtons(){
  const linkTypes = ["normal", "ex5", "ex5_2"];
  linkTypes.forEach(linkType =>{
    var linkContainer = document.getElementById(`${linkType}links`);
    const levels = [7, 8, 9];
    levels.forEach(level => {
      const button = document.createElement("button");
      button.id = `lv${level}${linkType}`;
      button.textContent = `${level}`;
      button.classList.add("btn", "btn-outline-light", "px-3", "mx-1");
      button.onclick = () => openURL(button.id);
      linkContainer.appendChild(button);
    });
  });
}