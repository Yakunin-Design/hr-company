export default function get_created_time(created_time) {

    const unixTimeNow = Math.floor(Date.now() / 1000)
    
    const timer = unixTimeNow - created_time

    const min = Math.floor(timer /60);
    const hour = Math.floor(min / 60);

    let day_text, hour_text, minute_text, second_text

    if (Math.floor(hour / 24) === 0 | (Math.floor(hour / 24) >= 5 && Math.floor(hour / 24) <= 20 ) | (Math.floor(hour / 24) >= 25 && Math.floor(hour / 24) <= 30 )) day_text = ' Дней '
    if (Math.floor(hour / 24) === 1 | Math.floor(hour / 24) === 21 ) day_text = ' День '
    if ( (Math.floor(hour / 24) >= 2 && Math.floor(hour / 24) <= 4 ) | (Math.floor(hour / 24) >= 22 && Math.floor(hour / 24)<= 24) ) day_text = ' Дня '

    if (Math.floor(hour % 24) === 0 | (Math.floor(hour % 24) >= 5 && Math.floor(hour % 24) <= 20 ) ) hour_text = ' Часов '
    if (Math.floor(hour % 24) === 1 | Math.floor(hour % 24) === 21 ) hour_text = ' Час '
    if ( (Math.floor(hour % 24) >= 2 && Math.floor(hour % 24) <= 4 ) | (Math.floor(hour % 24) >= 22 && Math.floor(hour % 24)<= 24) ) hour_text = ' Часа '

    if (Math.floor(min % 60) === 0 | (Math.floor(min % 60) >= 5 && Math.floor(min % 60) <= 20 ) | (Math.floor(min % 60) >= 25 && Math.floor(min % 60) <= 30 ) | (Math.floor(min % 60) >= 35 && Math.floor(min % 60) <= 40 ) | (Math.floor(min % 60) >= 45 && Math.floor(min % 60) <= 50 ) | (Math.floor(min % 60) >= 45 && Math.floor(min % 60) <= 60 ) ) minute_text = ' Минут '
    if (Math.floor(min % 60) === 1 | Math.floor(min % 60) === 21 | Math.floor(min % 60) === 31 | Math.floor(min % 60) === 41 | Math.floor(min % 60) === 51 ) minute_text = ' Минута '
    if ( (Math.floor(min % 60) >= 2 && Math.floor(min % 60) <= 4 ) | (Math.floor(min % 60) >= 22 && Math.floor(min % 60)<= 24) | (Math.floor(min % 60) >= 32 && Math.floor(min % 60)<= 34) | (Math.floor(min % 60) >= 42 && Math.floor(min % 60)<= 44) | (Math.floor(min % 60) >= 52 && Math.floor(min % 60)<= 54) ) minute_text = ' Минуты '

    if (Math.floor(timer % 60) === 0 | (Math.floor(timer % 60) >= 5 && Math.floor(timer % 60) <= 20 ) | (Math.floor(timer % 60) >= 25 && Math.floor(timer % 60) <= 30 ) | (Math.floor(timer % 60) >= 35 && Math.floor(timer % 60) <= 40 ) | (Math.floor(timer % 60) >= 45 && Math.floor(timer % 60) <= 50 ) | (Math.floor(timer % 60) >= 45 && Math.floor(timer % 60) <= 60 ) ) second_text = ' Секунд '
    if (Math.floor(timer % 60) === 1 | Math.floor(timer % 60) === 21 | Math.floor(timer % 60) === 31 | Math.floor(timer % 60) === 41 | Math.floor(timer % 60) === 51 ) second_text = ' Секунда '
    if ( (Math.floor(timer % 60) >= 2 && Math.floor(timer % 60) <= 4 ) | (Math.floor(timer % 60) >= 22 && Math.floor(timer % 60)<= 24) | (Math.floor(timer % 60) >= 32 && Math.floor(timer % 60)<= 34) | (Math.floor(timer % 60) >= 42 && Math.floor(timer % 60)<= 44) | (Math.floor(timer % 60) >= 52 && Math.floor(timer % 60)<= 54) ) second_text = ' Секунды '

    let created
    if (Math.floor(hour /24) > 0) {

        created = 
            Math.floor(hour / 24) + day_text +
            Math.floor(hour % 24) + hour_text

    } else if (Math.floor(hour % 24) > 0) {

        created = 
            Math.floor(hour % 24) + hour_text +
            Math.floor(min % 60) + minute_text
        
    } else {

        created =
            Math.floor(min % 60) + minute_text +
            Math.floor(timer % 60) + second_text
    }

    return created += " Назад"
}