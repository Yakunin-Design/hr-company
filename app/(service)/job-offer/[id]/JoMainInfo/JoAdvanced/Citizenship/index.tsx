import style from "../advanced.module.css"

export default function Citizenship({citizenship}: {citizenship: string}) {
    if (citizenship === 'ru') {
        return <div className={style.block}>🇷🇺</div>
    }

    if (citizenship === 'bu/ua') {
        return (
            <>
                <div className={style.block}>🇷🇺</div>
                <div className={style.block}>🇧🇾/🇺🇦</div>
            </>
        )
    }

    if (citizenship === 'sng') {
        return <div className={style.block}>СНГ</div>
    }

    
    return <h3>Любое</h3>
}