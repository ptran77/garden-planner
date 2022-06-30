// function to create a new garden inside the database
async function createGarden(event) {
  event.preventDefault();
  const garden_name = document.querySelector('#garden-name').value.trim();
  const plantIds = [];
  const plantList = document.getElementsByClassName("plant");
  for (let i = 0; i < plantList.length; i++) {
    plantIds.push(plantList[i].getAttribute('data-id'));
  }

  if (garden_name) {
    const response = await fetch("/api/gardens", {
      method: "POST",
      body: JSON.stringify({
        garden_name,
        plantIds
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
}

// Event Listener to create garden from database
$('#create-garden').on('click', createGarden);