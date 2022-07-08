import React from 'react'

import subway_icon from '../../assets/svg/subway-icon.svg'

import './Subway.css'

function Subway({ station }) {

    let backgorund = 'black'

    if (station === 'Беговая' 
    || station === 'Зенит'
    || station === 'Приморская'
    || station === 'Василеостровская'
    || station === 'Гостиный Двор'
    || station === 'Маяковская'
    || station === 'Зенит' || station === 'Пл.Александра Невского 1' || station === 'Елизаровская' 
    || station === 'Ломоносовская'
    || station === 'Пролетарская'
    || station === 'Обухово'
    || station === 'Рыбацкое') {backgorund = '#068200'}

    if (station === 'Дыбенко' 
    || station === 'Проспект Большевиков'
    || station === 'Ладожская'
    || station === 'Новочеркасская'
    || station === 'Пл.Александра Невского 2'
    || station === 'Лиговский проспект' 
    || station === 'Достоевская'
    || station === 'Спасская') {backgorund = '#cc8400'}

    if (station === 'Девяткино' 
    || station === 'Гражданский проспект'
    || station === 'Академическая'
    || station === 'Политехническая'
    || station === 'Площадь мужества'
    || station === 'Лесная'
    || station === 'Выборгская'
    || station === 'Площадь Ленина'
    || station === 'Чернышевская' 
    || station === 'Площадь Восстания'
    || station === 'Владимирская'
    || station === 'Пушкинская'
    || station === 'Технологический институт 1'
    || station === 'Балтийская'
    || station === 'Нарвская'
    || station === 'Кировский завод'
    || station === 'Автово'
    || station === 'Ленинский проспект'
    || station === 'Проспект Ветеранов') {backgorund = '#d10600'}

    if (station === 'Парнас' 
    || station === 'Проспект Просвещения'
    || station === 'Озерки'
    || station === 'Удельная'
    || station === 'Пионерская'
    || station === 'Черная речка' 
    || station === 'Петроградская'
    || station === 'Горьковская'
    || station === 'Невский проспект'
    || station === 'Сенная площадь'
    || station === 'Технологический институт 2'
    || station === 'Фрунзенская'
    || station === 'Московские ворота'
    || station === 'Электросила'
    || station === 'Парк Победы'
    || station === 'Московская'
    || station === 'Звездная'
    || station === 'Купчино') {backgorund = '#2722ff'}

    if (station === 'Комендантский проспект' 
    || station === 'Старая деревня'
    || station === 'Крестовский остров'
    || station === 'Чкаловская'
    || station === 'Спортивная'
    || station === 'Адмиралтейская' 
    || station === 'Садовая'
    || station === 'Звенигородская'
    || station === 'Обводной канал'
    || station === 'Волковская'
    || station === 'Бухаресткая'
    || station === 'Международная'
    || station === 'Проспект Славы'
    || station === 'Дунайская'
    || station === 'Шушары') { backgorund = '#6E0A78'}

    const style = {
        backgroundColor: backgorund,
    }

    return (
        <div className="subway">
            <div className="subway__icon" style={style}>
                <img className="subway__img" src={subway_icon} alt="metro-icon" />
            </div>
            <p>{station}</p>
        </div>
    )
}

export default Subway