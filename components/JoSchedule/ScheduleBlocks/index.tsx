import style from "./schedule_blocks.module.css"

export default function ScheduleBlocks({schedule}: {schedule: any}) {
    const schedule_blocks = []
    if (schedule) {
        for (let i = 0; i < schedule.weekdays; i++) {
            schedule_blocks.push(<div className={style.schedule_block + " " + style.weekdays}></div>)
        }

        for (let i = 0; i < schedule.weekends; i++) {
            schedule_blocks.push(<div className={style.schedule_block + " " + style.weekends}></div>)
        }
    }
    return <>{schedule_blocks}</>
}