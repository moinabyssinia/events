// using allOrigins to bypass same-origin policy problems
const eventTable = document.querySelector('#table-canvas');

// wing selector
// by default show results for wing B
currentWing = 'B';

const wingSelection = document.querySelector("#wing");
wingSelection.addEventListener('change', (e) => {
    console.log(e.target.value);
    currentWing = e.target.value;

    //clear previous data

    const expendables = document.querySelectorAll('.expendable');
    if(expendables.length !== 0) {
        console.log("they exist");
        for (let ii of expendables){
            // console.log(ii);
            ii.remove();
        }
    }
    

    // pull data based on new wing data
    axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent
        ('https://api.serviceu.com/rest/91c1e592-0eec-490f-80bd-b253cdfe8441?nextDays=3&format=json.json')}`)
        .then(data => {
            const dat = JSON.parse(data.data.contents);
            for(let ii of dat) {
                
                // filter out events in the B wing only
                if (ii.ResourceList.startsWith(currentWing)){
                    console.log(`selected wing is ${currentWing}`);

                    // console.log(`${ii.EventId} - ${ii.Name} - ${ii.OccurrenceStartTime} - ${ii.ResourceList}`);
                    
                    // create table row
                    const newRow = document.createElement('tr');
                    newRow.setAttribute('class', 'expendable');

                    // create table columns
                    const nameCol = document.createElement('td');
                    nameCol.textContent = ii.Name;

                    const timeCol = document.createElement('td');
                    timeCol.textContent = ii.OccurrenceStartTime;
                
                    const locCol = document.createElement('td');
                    locCol.textContent = ii.CategoryList;

                    const resourceCol = document.createElement('td');
                    resourceCol.textContent = ii.ResourceList;   //${ii.Name} - ${ii.OccurrenceStartTime}`;

                    const descCol = document.createElement('td');
                    descCol.textContent = ii.Description;


                    const breaker = document.createElement('br');

                    // append to table row
                    newRow.append(nameCol);
                    newRow.append(timeCol);
                    newRow.append(locCol);
                    newRow.append(resourceCol);
                    newRow.append(descCol);
                    newRow.append(breaker);

                    // apend to dom
                    eventTable.append(newRow);

                }
            }
        })  


})


