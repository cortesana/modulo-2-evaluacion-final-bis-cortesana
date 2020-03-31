'use strict'

const saveBtn = document.querySelector('#saveBtn');
const retrieveBtn = document.querySelector('#retrieveBtn');
const ulElem = document.querySelector('#contactList');
let savedContacts = new Array();
/* let isFriend = Boolean(null); */

function obtainInfofromAPI() {
  fetch('https://randomuser.me/api/?results=10')
    .then(response => response.json())
    .then(data => {
      let contactListArray = data.results;
      for(let i = 0; i < contactListArray.length; i++){
        savedContacts.push({

          id: {
            value: contactListArray[i].id.value,
          },
          picture: {
            large: contactListArray[i].picture.large
          },
          name: {
            first: contactListArray[i].name.first,
            last: contactListArray[i].name.last,
          },
          location: {
            city: contactListArray[i].location.city,
            country: contactListArray[i].location.country,
          },
          login: {
            username: contactListArray[i].login.username,
          }
        })
      }
      displayInfo(contactListArray);

    })
}

function addEventListeners() {
  const contacts = document.querySelectorAll('.contactListItem')
  for(let contact of contacts){
    contact.addEventListener('click', selectionOfFriends);
  }
}

function selectionOfFriends() {
  event.currentTarget.classList.toggle('friend');
}

function displayInfo(array) {
  ulElem.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    ulElem.innerHTML += `<li class="contactListItem" id="${array[i].id.value}"><div class="img-container"><img src="${array[i].picture.large}"></div><div class="contactInfo"><h2 id="contactName">${array[i].name.first} ${array[i].name.last}</h2><p id="contactLocation">${array[i].location.city}, ${array[i].location.country}</p><p id ="contactUsername">@${array[i].login.username}</p></div></li>`;
  }
  addEventListeners();
}

function saveIntoLocalStorage() {
  localStorage.setItem('savedContacts', JSON.stringify(savedContacts));
}

function retrieveFromLocalStorage() {
  const localStorageContacts = localStorage.getItem('savedContacts');
  if (localStorageContacts != null) {
    savedContacts = JSON.parse(localStorageContacts);
    displayInfo(savedContacts);
  }
}

obtainInfofromAPI();
saveBtn.addEventListener('click', saveIntoLocalStorage);
retrieveBtn.addEventListener('click', retrieveFromLocalStorage);