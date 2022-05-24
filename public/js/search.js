const input = document.querySelector('.search-bar__search-input');
const bubbles = document.querySelector('.bubbles');
let bubble_block;
let blocked = 0;
let skiped = 0;

let subways = {
    red: [
        'Девяткино',
        'Гражданский проспект',
        'Академическая',
        'Политехническая',
        'Площадь Мужества',
        'Лесная',
        'Выборгская',
        'Площадь Ленина',
        'Чернышевская',
        'Площадь Восстания',
        'Владимирская',
        'Пушкинская',
        'Технологический институт-1',
        'Балтийская',
        'Нарвская',
        'Кировский завод',
        'Автово',
        'Ленинский проспект',
        'Проспект Ветеранов'
    ],
    blue: [
        'Парнас',
        'Проспект Просвещения',
        'Озерки',
        'Удельная',
        'Пионерская',
        'Черная речка',
        'Петроградская',
        'Горьковская',
        'Невский проспект',
        'Сенная площадь',
        'Технологический институт-2',
        'Фрунзенская',
        'Московские ворота',
        'Электросила',
        'Парк Победы',
        'Московская',
        'Звёздная',
        'Купчино'
    ],
    green: [
        'Беговая',
        'Зенит',
        'Приморская',
        'Василеостровская',
        'Гостиный двор',
        'Маяковская',
        'Площадь Александра Невского',
        'Елизаровская',
        'Ломоносовская',
        'Пролетарская',
        'Обухово',
        'Рыбацкое'
    ],
    orange: [
        'Спасская',
        'Достоевская',
        'Лиговский проспект',
        'Площадь Александра Невского',
        'Новочеркасская',
        'Ладожская',
        'Проспект Большевиков',
        'Улица Дыбенко'
    ],
    purple: [
        'Комендантский проспект',
        'Старая Деревня',
        'Krestovsty ostrov',
        'Чкаловская',
        'Спортивная',
        'Адмиралтейская',
        'Садовая',
        'Звенигородская',
        'Обводный канал',
        'Волковская',
        'Бухарестская',
        'Международная',
        'Проспект Славы',
        'Дунайская',
        'Шушары'
    ]
}

window.onload = () => {get_job_offers(0, ''),add_elem()};

window.addEventListener('resize', () => {

    if (window.innerWidth > 1331) {
        if (blocked == 1) {
            blocked = 0;
            get_job_offers(0, '');
        }
    }

    if (window.innerWidth > 1001) {
        if (blocked == 2) {
            blocked = 1;
            get_job_offers(0, '');
        }
    }

    if (window.innerWidth > 651) {
        if (blocked == 3) {
            blocked = 2;
            get_job_offers(0, '');
        }
    }

    if (window.innerWidth < 1331) {
        if (blocked == 0) {
            blocked = 1;
            get_job_offers(0, '');
        }
    }

    if (window.innerWidth < 1001) {
        if (blocked == 1) {
            blocked = 2;
            get_job_offers(0, '');
        }
    }

    if (window.innerWidth < 651) {
        if (blocked == 2) {
            blocked = 3;
            get_job_offers(0, '');
        }
    }
})

input.addEventListener('keyup', () => get_suggestions());

const get_suggestions = () => {
    const value = input.value;

    if (value.length > 2) {

        fetch('./get-job-offers-title', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payload: value })
        }).then( (res) => res.json() ).then(data => {
            dispay_suggestions(data);
            get_job_offers(0, value)
        })
    }

    if (value.length == 0) {
        get_job_offers(0, '');
    }
}

const dispay_suggestions = (data) => {
    let html = '';
    data.titles.forEach(element => {
        if (!html.includes(`<div class="bubbles__bubble-block">${element}</div>`)) {
            html += `<div class="bubbles__bubble-block">${element}</div>`;
        }
    });

    document.querySelector('.bubbles').innerHTML = html;
    
    bubble_block = document.querySelectorAll('.bubbles__bubble-block').forEach(el => {
        el.addEventListener('click', () => {
            input.value = el.innerText;
            get_suggestions();
            el.style.display = 'none';
        });
    });
}

function get_job_offers(skip,title) {

    fetch('./get-job-offers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ skip: skip, title: title})
    }).then( (res) => res.json() ).then(data => {
        console.log(data)
        clear_grid()
        display_job_offers(data)
        skiped += 100
    })
}

function display_job_offers(data) {
    let columns = document.querySelectorAll('.content__column');
    let columns_count = 3;
    let column = 0;
    let counter = 1;
    if (window.innerWidth < 1331 && window.innerWidth >= 1001) {
        columns_count = 2
    } else if (window.innerWidth < 1001 && window.innerWidth >= 651) {
        columns_count = 1
    } else if (window.innerWidth < 651) {
        columns_count = 0
    } else {
        columns_count = 3
    }
    data.forEach(el => {

        let html = '<div class="content__offer offer" id="--b'+counter+'">'
        + '<div class="offer__top top"><div class="top__name name"><div class="name__logo"></div><p class="name__text">'
        + el.host.name
        + '</p></div><div class="top__subway subway"><div class="subway_logo --'

        if(subways.red.includes(el.location.metro_station)) {html+='red'}
        else if (subways.blue.includes(el.location.metro_station)) {html+='blue'}
        else if (subways.orange.includes(el.location.metro_station)) {html+='orange'}
        else if (subways.green.includes(el.location.metro_station)) {html+='green'}
        else  {html+='purple'}

        html += '">М</div><p class="subway__station">'
        + el.location.metro_station
        +'</p></div></div><h1 class="offer__name">'
        + el.title
        + '</h1>';

        if (el.scedule != null) {

            html+= '<div class="offer__schedule schedule --filled"><h3 class="schedule__label">График работы</h3><div class="schedule__days days">'

            for(let i=0; i < el.scedule.work_days; i++) {
                html+= '<div class="days__block --picked"></div>'
            }

            for(let i=0; i < el.scedule.non_working_days; i++) {
                if (el.scedule.non_working_days - i == 1) {
                    html+= '<div class="days__block --last"></div>'
                } else {
                    html+= '<div class="days__block"></div>'
                }
            }

            html += '</div></div>'
            //el.style.width = 236/(el.scedule.work_days+el.scedule.non_working_days)- 10*(el.scedule.work_days+el.scedule.non_working_days);
        }

        if (el.time != null) {

            html+= '<div class="offer__time time"><div class="time__label label --start"><div class="label__name">начало</div><div class="label__text">'
            +el.time.start
            +'</div></div>'
            +'<div class="time__picture">'
            +'<div class="picture__oval"></div>'
            +'<div class="picture__oval --dark"></div>'
            +'<div class="picture__triangle"></div><div class="picture__oval --dark"></div><div class="picture__oval"></div></div>'
            +'<div class="time__label label --end">'+'<div class="label__name">окончание</div>'+'<div class="label__text">'
            +el.time.end
            +'</div></div></div>'

        }

        html += '<div class="offer__bottom bottom"><div class="bottom__separator"></div><div class="bottom__price price"><p class="price__count">'
        + el.price.summ
        + '</p>₽ -&nbsp <p class="price__period">'
        + el.price.period
        + '</p></div></div></div>';

        counter++
        
        columns[column].innerHTML+=html;
        column++;
        if (column > columns_count) {
            column = 0;
        }
    })

    document.querySelectorAll('.offer').forEach(el => {
        let block = el.querySelector('.schedule')
        if (block != null) {
            block.querySelectorAll('.days__block').forEach(e => {
                e.style.width = 100;
            })
        }
    })
}

function clear_grid() {
    document.querySelector('.--1').innerHTML = ''
    document.querySelector('.--2').innerHTML = ''
    document.querySelector('.--3').innerHTML = ''
    document.querySelector('.--4').innerHTML = ''
}

function add_elem() {
    get_job_offers(skiped,'')
}