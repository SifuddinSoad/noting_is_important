document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const resultDiv = document.querySelector('.result');

  // Load existing data on page load
  fetchData();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = document.querySelector('.text').value;
    const number = document.querySelector('.number').value;

    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, number }),
      });

      if (response.ok) {
        alert('Data saved successfully');
        form.reset();
        fetchData(); // Refresh the displayed data
      } else {
        alert('Error saving data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving data');
    }
  });

  async function fetchData() {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      displayData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      resultDiv.innerHTML = '<p>Error fetching data</p>';
    }
  }

  function displayData(data) {
    resultDiv.innerHTML = '<h3>Saved Data:</h3>';
    data.forEach(item => {
      resultDiv.innerHTML += `<p>Text: ${item.text}, Number: ${item.number}</p>`;
    });
  }
});
