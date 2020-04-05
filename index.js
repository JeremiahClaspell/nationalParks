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
        renderData(responseJson)
    })
}

function renderData (options) {
    for (let i=0; i<options.data.length; i++){
     console.log(options.data[i].fullName) 
     $('#results').prepend(
         `<li>${options.data[i].fullName}<ul><li>${options.data[i].description}</li><li><a href="mailto:${options.data[i].contacts.emailAddresses[0].emailAddress}">${options.data[i].contacts.emailAddresses[0].emailAddress}</a></li>
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