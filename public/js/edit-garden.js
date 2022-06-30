// adds a plant to the garden if plant isn't in the garden yet
function addPlantToGarden(plant, id) {
  const plantList = document.getElementsByClassName("plant");
  let plantAlreadyExists = false;

  for (let i = 0; i < plantList.length; i++) {
    if (plantList[i].getAttribute('data-id') == id) {
      plantAlreadyExists = true;
      break;
    }
  }

  if(!plantAlreadyExists) {
    // make list item for plantlist
    let gardenItem = document.createElement('div');
    gardenItem.setAttribute("class", "garden-item bg-blue-100 border-2 border-black rounded-lg text-center mb-2");
    let plantName = document.createElement('div');
    plantName.textContent = plant;
    plantName.setAttribute("class", "plant");
    plantName.setAttribute("data-id", id);
    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("type", "button");
    removeBtn.setAttribute("class", "remove-plant bg-red-500 hover:bg-red-700 p-2 ");
    removeBtn.textContent = "Remove";
    gardenItem.appendChild(plantName);
    gardenItem.appendChild(removeBtn);

    // add to plantList
    $('#garden-list-items').append(gardenItem);
  }
}

// Event Listener to add a plant to the garden
$('#dropdown-plant-choices').on("click", ".dropdown-plant-choice", function () {
  addPlantToGarden($(this).text(), this.getAttribute("data-id"));
})

// Event Listener to remove a plant from the garden
$('#garden-list-items').on("click", ".remove-plant", function () {
  $(this).parent().remove();
})
