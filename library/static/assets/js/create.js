const createButton = document.querySelector('#create');
const inputs = {
    title: document.querySelector('#inputTitle'),
    author: document.querySelector('#inputAuthor'),
    year: document.querySelector('#inputYear'),
    url: document.querySelector('#inputLink'),
};

async function createBook(data){
    console.log(data);
    await fetch('/api/save_book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(data => data.json()).then(data => {
        console.log(data);
    });
} 

function createBookData(){
    let result = new Object();

    for(let el in inputs){
        result[el] = inputs[el].value;
    }

    return result;
}

async function start(){
    await createBook(createBookData());
}

createButton.addEventListener('click', () => {
    start();
});