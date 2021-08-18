import { Circle, Popup} from "react-leaflet"
import numeral from "numeral"

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 400,
      },
      recovered: {
        hex: "#7dd71d",
        multiplier: 600,
      },
      deaths: {
        hex: "#fb4443",
        multiplier: 800,
      },
};

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
}

export const showDataOnMap = (data, casesType) => (
    data.map(country => (
        <Circle
            center = {[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType])* casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="info-container">
                    <div className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    />
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: <strong>{numeral(country.cases).format("0,0")}</strong></div>
                    <div className="info-recovered">Recovered: <strong> {numeral(country.recovered).format("0,0")}</strong></div>
                    <div className="info-deaths">Deaths: <strong>{numeral(country.deaths).format("0,0")}</strong></div>
               </div>
            </Popup>
        </Circle>
    ))

);

export const prettyPrintStat = (stat) => (
    stat ? `+${numeral(stat).format("0.0a")}` : "+0"
)
