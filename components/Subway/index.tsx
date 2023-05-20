import subway_icon from './subway-icon.svg';
import style from './subway.module.css';
import Row from '../std/Row';
import Image from 'next/image';

type props = {
    station: string | undefined,
    text_style?: string
}

export default function Subway(props: props) {

    let backgorund = 'black'

    if (props.station === 'Беговая' 
    || props.station === 'Зенит'
    || props.station === 'Приморская'
    || props.station === 'Василеостровская'
    || props.station === 'Гостиный Двор'
    || props.station === 'Маяковская'
    || props.station === 'Зенит'
    || props.station === 'Пл.Александра Невского 1' 
    || props.station === 'Елизаровская' 
    || props.station === 'Ломоносовская'
    || props.station === 'Пролетарская'
    || props.station === 'Обухово'
    || props.station === 'Рыбацкое') {backgorund = '#068200'}

    if (props.station === 'Дыбенко' 
    || props.station === 'Проспект Большевиков'
    || props.station === 'Ладожская'
    || props.station === 'Новочеркасская'
    || props.station === 'Пл.Александра Невского 2'
    || props.station === 'Лиговский проспект' 
    || props.station === 'Достоевская'
    || props.station === 'Спасская') {backgorund = '#cc8400'}

    if (props.station === 'Девяткино' 
    || props.station === 'Гражданский проспект'
    || props.station === 'Академическая'
    || props.station === 'Политехническая'
    || props.station === 'Площадь мужества'
    || props.station === 'Лесная'
    || props.station === 'Выборгская'
    || props.station === 'Площадь Ленина'
    || props.station === 'Чернышевская' 
    || props.station === 'Площадь Восстания'
    || props.station === 'Владимирская'
    || props.station === 'Пушкинская'
    || props.station === 'Технологический институт 1'
    || props.station === 'Балтийская'
    || props.station === 'Нарвская'
    || props.station === 'Кировский завод'
    || props.station === 'Автово'
    || props.station === 'Ленинский проспект'
    || props.station === 'Проспект Ветеранов') {backgorund = '#d10600'}

    if (props.station === 'Парнас' 
    || props.station === 'Проспект Просвещения'
    || props.station === 'Озерки'
    || props.station === 'Удельная'
    || props.station === 'Пионерская'
    || props.station === 'Черная речка' 
    || props.station === 'Петроградская'
    || props.station === 'Горьковская'
    || props.station === 'Невский проспект'
    || props.station === 'Сенная площадь'
    || props.station === 'Технологический институт 2'
    || props.station === 'Фрунзенская'
    || props.station === 'Московские ворота'
    || props.station === 'Электросила'
    || props.station === 'Парк Победы'
    || props.station === 'Московская'
    || props.station === 'Звездная'
    || props.station === 'Купчино') {backgorund = '#2722ff'}

    if (props.station === 'Комендантский проспект' 
    || props.station === 'Старая деревня'
    || props.station === 'Крестовский остров'
    || props.station === 'Чкаловская'
    || props.station === 'Спортивная'
    || props.station === 'Адмиралтейская' 
    || props.station === 'Садовая'
    || props.station === 'Звенигородская'
    || props.station === 'Обводной канал'
    || props.station === 'Волковская'
    || props.station === 'Бухаресткая'
    || props.station === 'Международная'
    || props.station === 'Проспект Славы'
    || props.station === 'Дунайская'
    || props.station === 'Шушары') { backgorund = '#6E0A78'}

    const bg_style = {
        backgroundColor: backgorund,
    }

    let text = <p>{props.station}</p>

    if (props.text_style) {
        if (props.text_style === 'h4')
            text = <h4>{props.station}</h4>
                
        if (props.text_style === 'h3')
            text = <h3>{props.station}</h3>
    }

    return (
        <Row className={style.subway_row}>
            <div className={style.subway__icon} style={bg_style}>
                <Image className={style.subway__img} src={subway_icon} alt="metro-icon" />
            </div>
            {text}
        </Row>
    )
}