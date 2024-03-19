const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-ftb-et-web-am/events";

// STATE
const state = {
    parties: [],
};

// Query Variables
const partyList = document.querySelector('#parties');
const addPartyForm = document.querySelector('#addParty');

// Add Event Listener
addPartyForm.addEventListener('submit', addParty);


// Get Parties from API
async function getParties() {
    try {
        const response = await fetch(API_URL)      
        const json = await response.json();
        state.parties = json.data;
    } catch (error) {
        console.error(error);
    }
}

// Add Parties
async function addParty(event) {
    event.preventDefault();
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: addPartyForm.name.value,
                description: addPartyForm.description.value,
                date: new Date(addPartyForm.date.value).toISOString(),
                location: addPartyForm.location.value,
            }),
        });       
        if (!response.ok) {
            throw new Error('Failed to create party');
        }
        render();
    }   catch (error) {
        console.error(error);
    }
}

// Remove Parties 
async function deleteParty(eventID) {
    try {
        const response = await fetch(API_URL + '/' + eventID, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to remove party');
        }
        render();
    }   catch (error) {
        console.error(error);
    }
} 

// View Parites
function renderParties() {
    if (!state.parties.length) {
      partyList.innerHTML = '<li> No Parties</li>';
      return;
    }
  
    const partyCards = state.parties.map((party) => {
      const partyCard = document.createElement('li');
      partyCard.classList.add('party')
      partyCard.innerHTML = `
          <h2>${party.name}</h2>
          <h3>${party.description}</h3>
          <h3>${party.date}</h3>
          <h3>${party.location}</h3>
          `;

// delete button
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', () => deleteParty(party.id));
      partyCard.append(deleteButton);
      return partyCard;
    });
    partyList.replaceChildren(...partyCards);
  }
  
  async function render() {
    await getParties();
    renderParties();
  }
  render();
