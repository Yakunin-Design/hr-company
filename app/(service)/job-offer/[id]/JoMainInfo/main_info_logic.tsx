export default function main_info_logic({jo_data}: {jo_data: any}) {
    
    function get_citizenship () {
        const citizenships = []
        if (jo_data.citizenship) {
            if (jo_data.citizenship === 'ru') {
                citizenships.push(<div className="info-block__citizenships-block">🇷🇺</div>)
            }

            if (jo_data.citizenship === 'bu/ua') {
                citizenships.push(<div className="info-block__citizenships-block">🇷🇺</div>)
                citizenships.push(<div className="info-block__citizenships-block">🇧🇾/🇺🇦</div>)
            }

            if (jo_data.citizenship === 'sng') {
                citizenships.push(<div className="info-block__citizenships-block">СНГ</div>)
            }

            if (jo_data.citizenship === 'other') {
                citizenships.push(<h3>Любое</h3>)
            }
        }
        return citizenships
    }
    

    return { get_citizenship }
}