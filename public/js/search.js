const input = document.querySelector('.search-bar__search-input');
const bubbles = document.querySelector('.bubbles');
let bubble_block;

input.addEventListener('keyup', () => get_suggestions());

const get_suggestions = () => {
    const value = input.value;

    if (value.length > 2) {

        fetch('./get-job-offers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payload: value })
        }).then( (res) => res.json() ).then(data => {
            dispay_suggestions(data);
        })

    }
}

const dispay_suggestions = (data) => {
    let html = '';
    data.titles.forEach(element => {
        html += `<div class="bubbles__bubble-block">${element}</div>`;
    });

    document.querySelector('.bubbles').innerHTML = html;
    
    bubble_block = document.querySelectorAll('.bubbles__bubble-block').forEach(el => {
        el.addEventListener('click', () => {
            input.value = el.innerText;
            get_suggestions();
        });
    });
}