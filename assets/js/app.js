
var button = document.querySelector('#start-button');
var output = document.querySelector('#output');

function wait3seconds(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url);
    }, 3000);
  });
}

function doGetRequest(url) {
  return fetch(url);
}

function doPutRequest(url) {
  const person = { name: 'Edy Segura', age: 36 }

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(person),
  }

  return fetch(url, requestOptions);
}

function parseJSON(response) {
  return response.json();
}

function showName(data) {
  output.textContent = data.name || data.json.name;
}

button.addEventListener('click', async function () {
  // Create a new Promise here and use setTimeout inside the function you pass to the constructor

  // setTimeout(function() { // <- Store this INSIDE the Promise you created!
  //   // Resolve the following URL: https://swapi.co/api/people/1
  // }, 3000);
  // Handle the Promise "response" (=> the value you resolved) and return a fetch()
  // call to the value (= URL) you resolved (use a GET request)

  await wait3seconds('https://swapi.dev/api/people/1')
    .then(doGetRequest)
    .then(parseJSON)
    .then(showName);

  await wait3seconds('https://httpbin.org/put')
    .then(doPutRequest)
    .then(parseJSON)
    .then(showName);

  //putRequest();

  // Handle the response of the fetch() call and extract the JSON data, return that
  // and handle it in yet another then() block

  // Finally, output the "name" property of the data you got back (e.g. data.name) inside
  // the "output" element (see variables at top of the file)

  // Repeat the exercise with a PUT request you send to https://httpbin.org/put
  // Make sure to set the appropriate headers (as shown in the lecture)
  // Send any data of your choice, make sure to access it correctly when outputting it
  // Example: If you send {person: {name: 'Max', age: 28}}, you access data.json.person.name
  // to output the name (assuming your parsed JSON is stored in "data")

  // To finish the assignment, add an error to URL and add handle the error both as
  // a second argument to then() as well as via the alternative taught in the module
});