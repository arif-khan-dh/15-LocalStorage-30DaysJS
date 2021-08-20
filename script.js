const form = document.querySelector('.add-items');
const plates = document.querySelector('.plates');
const formCollective = document.querySelector('.collective');

let items = JSON.parse(localStorage.getItem('items')) || [];
populateList(items, plates);

form.addEventListener('submit', addItem);

function addItem(e) {
    e.preventDefault();
    const text = this.querySelector('[name=item]').value;
    const item = {
        text,
        done: false
    }
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, plates);
    this.reset();
}

function addCollectiveButtons() {
    const btnNames = ['Select All', 'Deselect All', 'Delete All'];
    btnNames.forEach(name => {
        const anchor = document.createElement('a');
        const link = document.createTextNode(name);
        anchor.href = '';
        anchor.dataset.action = name;
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            switch(anchor.dataset.action) {
                case btnNames[0]:
                    items.forEach(item => { item.done = true});
                    break;
                case btnNames[1]:
                    items.forEach(item => { item.done = false});
                    break;
                default:
                    items = [];                   
            };
            localStorage.setItem('items', JSON.stringify(items));
            populateList(items, plates);
        })
        anchor.appendChild(link);
        formCollective.appendChild(anchor);
    });
}

function populateList(items = [], listEl) {
    listEl.innerHTML = items.map( (item, index) => {
        return `
            <li>
                <input type="checkbox" data-index=${index} id="item${index}" name="item" ${item.done ? 'checked' : ''}>
                <label for="item${index}">${item.text}</label>
                <span data-index=${index} class="cross"></span>
            </li>
        `
    }).join('');

    if(items.length >= 2 && formCollective.childElementCount === 0) {        
        addCollectiveButtons();
    }
    if(items.length < 2) {
        formCollective.innerHTML = '';
    }
}

function deleteItem() {

}

plates.addEventListener('click', (e) => {
    toggleDone(e);
});

function toggleDone(e) {
    if((!e.target.matches('input') && !e.target.matches('span'))) return;
    const el = e.target;
    console.log(el);
    if(el.type === 'checkbox') {
        items[el.dataset.index].done = el.checked;
        
        // if(el.checked) {
        //     el.parentNode.classList.add('checked');
        //     console.log(el.parentNode);
        // }

    } else {
        items.splice(el.dataset.index, 1);
    }
    
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, plates);
}
