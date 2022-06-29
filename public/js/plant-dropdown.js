// this file to display all plant options that the user can add to their garden
const plantDropdown = $("#dropdown-plant-choices");

async function getPlantDropDown() {
  const response = await fetch(`/api/plants`, {
    method: 'get'
  })

  if (response.ok) {
    response.json().then(function (plants) {
      createPlantChoices(plants)
    })
  } else {
    alert(response.statusText);
  }
}

function createPlantChoices(plants) {
  for (let i = 0; i < plants.length; i++) {
    let plantChoice = document.createElement("button");
    plantChoice.textContent = plants[i].name;
    plantChoice.setAttribute("class", "dropdown-plant-choice");
    plantChoice.setAttribute("data-id", plants[i].id);
    plantDropdown.append(plantChoice);
  }
}

getPlantDropDown();