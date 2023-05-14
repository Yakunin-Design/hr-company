//@ts-nocheck
import cities from "@/data/cities"

type subway = {
    "line": number,
    "name": string
}

type district = {
    "label": string,
    "slug": string,
    "subway": Array<subway>,
}

type city_data = {
    "type": string,
    "slug": string,
    "label": string,
    "districts": Array<district>
}

export default function get_subways(city: string) {
    const subways: Array<String> = [];
    let city_data: city_data = {};

    let finded = false
    cities.forEach(obl => {
        if (finded) {
            return;
        }
        obl.localities.map(c => {
            if(c.label == city) {
                //@ts-ignore
                city_data = c;
                finded = true;
                return;
            }
        })
    })

    city_data.districts.map(d => {
        d.subway.map(sw => {
            subways.push(sw.name);
        })
    })

   return subways;
}