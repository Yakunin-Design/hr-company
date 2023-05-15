import Row from "@/components/std/Row"
import Citizenship from "./Citizenship"
import style from "./advanced.module.css"
import man from "@/assets/svg/man.svg"
import woman from "@/assets/svg/woman.svg"
import Image from "next/image"
import Spacer from "@/components/std/Spacer"

export default function JoAdvanced({jo_data}: {jo_data: any}) {
    return(
        <>
            {
                (jo_data.experience != '')
                &&
                <>
                    <Spacer top="1"/>
                    <Row className={style.row}>
                        <div className={style.block}><h3>{jo_data.experience}</h3></div>
                        <h4>Опыт работы, лет</h4>
                    </Row>
                </>
            }
        
            {
                jo_data.citizenship
                &&
                <>
                    <Spacer top="1"/>
                    <Row className={style.row}>
                        <Citizenship citizenship={jo_data.citizenship}/>
                        <h4>Гражданство</h4>
                    </Row>
                </>
                
                
            }
            {
                (jo_data.sex != 'any')
                &&
                <>
                    <Spacer top="1"/>
                    <Row className={style.row}>
                        {
                            jo_data.sex === 'male' 
                            ?
                            <>
                                <div className={style.block}><Image src={man} alt="man"/></div>
                                <h4>Только мужчины</h4>
                            </>
                            :
                            <>
                                <div className={style.block}><Image src={woman} alt ="women"/></div>
                                <h4>Только девушки</h4>
                            </>
                        }
                    </Row>
                </>
            }
        </>
    )
}