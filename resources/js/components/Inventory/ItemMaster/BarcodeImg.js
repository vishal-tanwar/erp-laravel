export const saveBarcodeImageToDB = (requestData) => {
  return fetch('http://localhost:5115/api/Item/AddItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to add item');
      }
    });
};
