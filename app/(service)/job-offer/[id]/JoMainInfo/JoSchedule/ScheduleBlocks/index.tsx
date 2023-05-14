import style from "./schedule_blocks.module.css"

export default function ScheduleBlocks({jo_data}: {jo_data: any}) {
    const schedule_blocks = []
    if (jo_data.schedule) {
        for (let i = 0; i < jo_data.schedule.weekdays; i++) {
            schedule_blocks.push(<div className={style.schedule_block + " " + style.weekdays}></div>)
        }

        for (let i = 0; i < jo_data.schedule.weekends; i++) {
            schedule_blocks.push(<div className={style.schedule_block + " " + style.weekends}></div>)
        }
    }
    return <>{schedule_blocks}</>
}