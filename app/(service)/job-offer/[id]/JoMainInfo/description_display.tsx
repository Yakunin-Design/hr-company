export default function description_dipslay(data_description: string) {
    let description: Array<any> = []
    if (data_description) {
        let description_without_tab: Array<any> = []

        let description_array = data_description.split("\t")
        description_array.forEach(string => {
            description_without_tab.push(string)
        })

        description_array = description_without_tab.join("\u3164 \u3164 ").split("\n")
        for(let i = 0; i < description_array.length; i++) {
            description.push(<span key={i}>{description_array[i]}<br/></span>)
        }
    }
    return description
}