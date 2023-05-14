import Spacer from "@/components/std/Spacer"
import style from "./pointform.module.css"
import Row from "@/components/std/Row"
import Input from "@/components/std/Inputs/Input"
import SubwayInput from "@/components/std/Inputs/SubwayInput"
import Button from "@/components/std/Button"

type form_data = {
    city: string,
    subway: string,
    address: string
}

type props = {
    add: () => void,
    data: form_data,
    errors: Array<string>
    onChange: (event: any) => void
}

const error_style = {
    border: "2px solid red",
};

export default function PointForm(props: props) {
    return(
        <>
            <h2 className={style.header}>Создание точки</h2>
            <Spacer top="1"/>
            <hr />
            <Spacer top="2"/>
            <div className={style.form}>
                <Row className={style.inputs}>
                    <div className={style.city}>
                        <Input
                            onChange={props.onChange}
                            name="city"
                            label="Город"
                            value={props.data.city}
                            style={
                                props.errors.includes("city")
                                    ? error_style
                                    : {}
                            }
                            disabled
                        />
                    </div>
                    <div className={style.subway}>
                        <SubwayInput
                            onChange={props.onChange}
                            label="Метро"
                            value={props.data.subway}
                            style={
                                props.errors.includes("subway")
                                    ? error_style
                                    : {}
                            }
                        />
                    </div>
                </Row>
                <div className={style.address}>
                    <Input
                        onChange={props.onChange}
                        name="address"
                        label="Адрес"
                        value={props.data.address}
                        style={
                            props.errors.includes("address")
                                ? error_style
                                : {}
                        }
                    />
                </div>
                <Spacer top="2"/>
                <Row>
                    <Button className={style.button} onClick={props.add}>Создать</Button>
                </Row>
                
            </div>
        </>
    )
}