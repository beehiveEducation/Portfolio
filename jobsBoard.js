let container = document.querySelector('.jobsContainer')
let button = document.querySelector('button');
let originalData = [];
let nineIds;

//story call first
const callFirstAPI = () => {
    fetch('https://hacker-news.firebaseio.com/v0/jobstories.json').then(response => response.json())
        .then(data => {

            // 1 - 60
            originalData = data;

            //makes a copy of the first nine ids
            nineIds = originalData.slice(0,9);
            // 1 2 3 4 5 6 7 8 9
         
            //updates the originalData
            originalData = originalData.slice(9, originalData.length)
            //9 - 60
          
            //It is now 51 items
            callSecondAPI(nineIds);
            })
        }



//from calling the stories ask for jobs
const callSecondAPI = (ids) => {
for(let i = 0; i < ids.length; i++){
        fetch(`https://hacker-news.firebaseio.com/v0/item/${ids[i]}.json`).then(response => response.json())
        .then(data => { 


       createCards(data);
        })
            
    }
}

const createCards = (info) => {
    //create cards
    let card = document.createElement('div');
    card.classList.add('card')


    let jobDate = new Date(info.time * 1000).toLocaleString();
    let x = jobDate.split(',')
    let usableDate = x.shift()

    
    let y = info.title.toLowerCase();


    let index = info.title.toLowerCase().indexOf('is hiring');
    let realTitle = info.title.slice(0, index)
    let jobInfo = info.title.slice(index)

    //output info
    let title = `<div class="title">${realTitle}</div>`
    let hiringInfo = `<div class="information">${jobInfo}</div>`
    let date = `<div class="date">${usableDate}</div>`
    

    card.innerHTML = title + hiringInfo + date
 
    container.appendChild(card)

}

const addSix = () => {

    // 9-15
    nineIds = originalData.slice(0,6);

    
    originalData = originalData.slice(6, originalData.length)
    // 15-60

    //originalData now is equal to 45 items
    callSecondAPI(nineIds);

}

const initialize = () => {
    callFirstAPI();
    button.addEventListener('click', addSix)
}

initialize();


