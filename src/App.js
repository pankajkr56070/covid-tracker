    import React, {useState, useEffect} from "react";
    import './App.css';
    import {Card, Select, FormControl, MenuItem, CardContent } from "@material-ui/core";
    import InfoBox from './InfoBox';
    import CoronaMap from './CoronaMap';
    import Table from './Table';
    import { sortData, prettyPrintStat } from "./util";
    import LineGraph from "./LineGraph";
    import "leaflet/dist/leaflet.css"

    function App() {

      const [countries, setCountries] = useState([]);
      const [country, setCountry] = useState("worldwide");
      const [countryInfo, setCountryInfo] = useState({});
      const [tableData, setTableData] = useState([]);
      const [centerMap, setCenterMap] = useState({ lat: 34.80746, lng: -40.4796 });
      const [zoomMap, setZoomMap] = useState(3);
      const [mapCountries, setMapCountries] = useState([]);
      const [casesType, setCasesType] = useState("cases");

      useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });
      }, [])
      /*The useEffect runs based on a given condition. It will run once */
      useEffect(() => {
       // async -> send a request , wait for it , do something
        const getCountriesData = async () => {
         await fetch("https://disease.sh/v3/covid-19/countries")
         .then((response) => response.json())
         .then((data) => {
           const countries = data.map((country) =>  (
             {
               name : country.country,
               value: country.countryInfo.iso2
             }
           ));
           
           const sortedData = sortData(data)
           setTableData(sortedData);
           setMapCountries(data);
           setCountries(countries);
         });
       };

       getCountriesData();
      }, []);

      const onCountryChange = async (event) => {
          const countryCode = event.target.value;

          const url = 
            countryCode === "worldwide"
            ? "https://disease.sh/v3/covid-19/all"
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

          await fetch(url)
          .then(response => response.json())
          .then((data) => {
            setCountry(countryCode);
            setCountryInfo(data);
            setCenterMap([data.countryInfo.lat, data.countryInfo.long]);
            setZoomMap(4);
          });
      };

      return (
        <div className="app">
          <div className = "app__left">
            <div className="app__header">
              <h1> COVID-19 Tracker</h1>
              <FormControl className = "app__dropdown">
                  <Select variant = "outlined" onChange = {onCountryChange} value={country}>
                  <MenuItem value = "worldwide">Worldwide</MenuItem>
                    {countries.map((country)  => (
                        <MenuItem value = {country.value}> {country.name}</MenuItem>
                      ))
                    }
                </Select>
              </FormControl>
            </div>
            
            <div className = "app__stats">
              <InfoBox 
                isYellow
                active={casesType === "cases"}
                onClick={e => setCasesType("cases")}
                title = "Coronavirus Cases"
                cases = {prettyPrintStat(countryInfo.todayCases)}
                total = {countryInfo.cases}/>  
              <InfoBox
                isGreen 
                active={casesType === "recovered"}
                onClick={e => setCasesType("recovered")}
                title = "Recovered" 
                cases = {prettyPrintStat(countryInfo.todayRecovered)} 
                total = {countryInfo.recovered}/>
              <InfoBox 
                isRed
                active={casesType === "deaths"}
                onClick={e => setCasesType("deaths")}
                title = "Deaths" 
                cases = {prettyPrintStat(countryInfo.todayDeaths)} 
                total = {countryInfo.deaths}/>
            </div>

            <CoronaMap 
              casesType={casesType}
              countries = {mapCountries}
              center = {centerMap}
              zoom = {zoomMap}
            />
          </div>
         
          
         <Card className="app__right">
           <CardContent>
            {/*Table*/}
            <h3>Live Cases By Country</h3>
            <Table countries = {tableData} />
            {/*Graph*/}
            <h3 className="app_graphTitle">New {casesType}</h3>
            <LineGraph className="app__graph" casesType={casesType} />
           </CardContent>          
           </Card>         
          
        </div>
      )
    }

    export default App;
