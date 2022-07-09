// function to update garden information in database
async function updateGarden(event) {
  event.preventDefault();
  const garden_name = $('#garden-name').text();
  const plantIds = [];
  const plantList = document.getElementsByClassName("plant");
  for (let i = 0; i < plantList.length; i++) {
    plantIds.push(plantList[i].getAttribute('data-id'));
  }

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/gardens/${id}`, {
    method: 'PUT',
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

// function to delete garden from database
async function deleteGarden(event) {
  event.preventDefault();
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/gardens/${id}`, {
    method: "DELETE",
  })
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}


// Event Listener to update garden in the database
$('#update-garden').on('click', updateGarden);
// Event Listener to delete garden from database
$('#delete-garden').on('click', deleteGarden);