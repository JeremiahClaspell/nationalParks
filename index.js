"use strict";

function submitForm (){
    $('form').submit( event =>{
        event.preventDefault(); 
        $("#results").empty().removeClass('hidden'); 
        let states = $('#states').val(); 
        let maxResults = $('#maxResults').val(); 
        getParks(states, maxResults); 
    })
}

function getParks(state, maxResult) {
    const key = "pg03SY7nLwj5LhlhpCq9GZTwN75xWoPbjDbYDTkc"; 
    const base = "https://developer.nps.gov/api/v1/parks"; 
    const url = `${base}?stateCode=${state}&limit=${maxResult}&api_key=${key}`; 
    fetch(url)
    .then(response => response.json())
    .then(responseJson=>{
        if(responseJson.status !== "error"){
            renderData(responseJson)
        } else {
            alert(responseJson.message); 
    }}) 
}

function renderData (options) {
    for (let i=0; i<options.data.length; i++){
     $('#results').prepend(
         `<li>${options.data[i].fullName}<ul><li>${options.data[i].description}</li><li><a href="${options.data[i].url}" target="_blank">${options.data[i].url}</a></li>
         <li>
         ${options.data[i].addresses[0].line1}<br>
         ${options.data[i].addresses[0].line2}<br>
         ${options.data[i].addresses[0].city}, ${options.data[i].addresses[0].stateCode} ${options.data[i].addresses[0].postalCode}
         </li>
         </ul></li>`
        )
    }
}

function eventHandler () {
    submitForm(); 
}

$(submitForm)