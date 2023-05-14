type props = { 
    count: number,
    className?: string,
}

export default function Indicator(props: props){

    let background = 'var(--accent3)'
    let color = '#000'

    if (props.count > 3) {
        color = '#fff'
        background = 'var(--accent2)'
    } 

    if (props.count > 6) {
        background = 'var(--accent)'
    }

    const style = {
        backgroundColor: background,
        color: color
    }

    return (
        <h3 className={props.className} title="Кандидаты" style={style}>{props.count}</h3>
    )
}