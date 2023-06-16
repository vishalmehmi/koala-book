const subBtn = document.getElementById('submit');
const table = document.getElementById('bookTable');

getData();

async function getData() {

    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const row = document.createElement('tr');
        const title = document.createElement('td');
        const auth = document.createElement('td');
        const page = document.createElement('td');
        const del = document.createElement('button');
        const dup = document.createElement('button');

        title.textContent = item.bookTitle;
        auth.textContent = item.author;
        page.textContent = item.noPages;
        del.id = 'delete';
        del.name = item.bookTitle;
        del.textContent = 'Delete';
        dup.id = 'duplicate';
        dup.name = item.bookTitle;
        dup.textContent = 'Duplicate';


        row.append(title, auth, page, del, dup);
        table.append(row);
    };
};

subBtn.addEventListener('click', async function() {
    const bookTitle = document.getElementById('bookTitle').value;
    const author = document.getElementById('author').value;
    const noPages = document.getElementById('noPages').value;
    data = {bookTitle, author, noPages};

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
});

document.addEventListener('click', async function(e) {
    if(e.target.id === 'delete') {
        const delName = e.target.name;
        data = {delName};

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type": "application/json"
            }
        };
        const response = await fetch('/del', options);
        const json = await response.json();
        console.log(json);
    };
});

document.addEventListener('click', async function(e) {
    if(e.target.id === 'duplicate') {
        const dupName = e.target.name;
        data = {dupName};

        console.log(data);
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type": "application/json"
            }
        };
        const response = await fetch('/dup', options);
        const json = await response.json();
        console.log(json);
    };
});


