async function addPlantFormHandler(event) {
    event.preventDefault;

    const name = document.querySelector('input[name="plant-name"]').value;
    const type = document.querySelector('input[name="plant-type"]').value;
    const sun_intake = document.querySelector('input[name="sun-intake"]').value;
    const water_intake = document.querySelector('input[name="water-intake"]').value;
    const soil_type = document.querySelector('input[name="soil-type"]').value;
    
    const response = await fetch(`/api/plants`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          type,
          sun_intake,
          water_intake,
          soil_type
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      if (response.ok) {
        document.location.replace('/plants');
      } else {
        alert(response.statusText);
      }
}

document.querySelector('.add-plant-form').addEventListener('submit', addPlantFormHandler);

