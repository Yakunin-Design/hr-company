export default function description_dipslay(data_description) {
    let description = []
    if (data_description) {
        let description_without_tab = []

        let description_array = data_description.split("\t")
        description_array.forEach(string => {
            description_without_tab.push(string)
        })

        description_array = description_without_tab.join("\u3164 \u3164 ").split("\n")
        description_array.forEach(string => {
            description.push(<>{string}<br/></>)
        })

    } else {
        description = data_description
    }
    return description
}