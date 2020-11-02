// Selecting the form elemensts using the queryselector
const inputForm = document.querySelector('#search-form');
const inputElement1 = document.querySelector('#input1');
const inputElement2 = document.querySelector('#input2');
const inputRadio = document.getElementsByName("contest-type");

// Adding an eventListener and printing to the app
inputForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Changing display of message elements to none
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`message${i}`).style.display = 'none';
  }

  const userOneHandle = inputElement1.value;
  const userTwoHandle = inputElement2.value;
  let searchQuery = '';

  // Code for selecting the Div-value from radio buttons
  let found = false;
  let i = 0;
  while (!found && i < inputRadio.length) {
    if (inputRadio[i].checked) {
      searchQuery = inputRadio[i].value;
      found = true;
    }
    i++;
  }

  document.getElementById('message3').style.display = 'block';
  document.getElementById('message3').innerHTML = '<img src="/img/loading.gif">';

  // Fetching data from form and providing it to backend
  fetch(`/contests?user1=${userOneHandle}&user2=${userTwoHandle}&search=${searchQuery}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        document.getElementById('message3').innerHTML = data.error;
        document.getElementById('message3').href = '#';
        document.getElementById('message3').target = '';
      } else {
        document.getElementById('message1').style.display = 'block';
        document.getElementById('message1').innerHTML = data[0].contestName;
        document.getElementById('message1').href = `https://codeforces.com/contest/${data[0].contestId}`;

        document.getElementById('message2').style.display = 'block';
        document.getElementById('message2').innerHTML = data[1].contestName;
        document.getElementById('message2').href = `https://codeforces.com/contest/${data[1].contestId}`;

        document.getElementById('message3').target = '_blank';
        document.getElementById('message3').innerHTML = data[2].contestName;
        document.getElementById('message3').href = `https://codeforces.com/contest/${data[2].contestId}`;
      }
    });
  });
});