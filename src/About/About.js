import React from 'react';
import './About.css';
import _ from 'lodash';
import {Button, Search} from "semantic-ui-react";
import {WEATHER_API_KEY} from "../secrets";

const API ={
    key: WEATHER_API_KEY,
    base: 'http://api.openweathermap.org/data/2.5/'
}

const date = (d) =>{
        let months = [
            'January',
            'Febuary',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        let days = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
}


class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            city: "",
            date: date(new Date()),
            temperature: "",
            weather: "",
            unit: "C",
            q: "Charlotte",
        };
    }

    componentDidMount() {
        this.getWeather();
    }

    getWeather = (e) => {
        console.log(this.state.q);
        let data = {
            appid: API.key,
            q: this.state.q,
            units: "metric"
        }
        console.log('Get the weather information');
        let url = new URL(API.base + '/weather');
        Object.keys(data).forEach(key => url.searchParams.append(key, data[key]))
        // e.preventDefault();
        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if(json.main === undefined) {
                    this.setState({
                        city: json.name,
                        temperature: '--',
                        weather: '',
                        unit: 'C'
                    });
                    return;
                }

                this.setState({
                    city: json.name,
                    temperature: json.main.temp,
                    weather: json.weather[0].main,

                });
            })
            // .then(() => this.resetState());
    };

    // Search bar
    handleResultSelect = (e, { result }) => {
        this.setState({ q: result.title });
        this.getWeather(e);
    }
    handleSearchChange = (e, { value }) => {
        this.setState({ q: value })
        this.getWeather(e);
    }
    handleToggle =() => {
        if(this.state.unit === 'C'){
            let temp = this.state.temperature;
            let newtemp = Math.round(temp * 1.8 + 32);
            this.setState({unit: 'F', temperature: newtemp})
        }else{
            let temp = this.state.temperature;
            let newtemp = Math.round((temp - 32) * (5/9));
            this.setState({unit: 'C', temperature: newtemp});
        }
    }

    render() {
        return (
            <div className="App">
            <main>
                <Search
                    loading={false}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                        leading: true,
                    })}
                    results={[{title: 'Charlotte'}, {title: 'Hanoi, Vietnam'}]}
                    value={this.state.q}
                />
                <div className='location-box'>
                    <div className='location'>{this.state.city}</div>
                    <div className='date'>{this.state.date}</div>
                 <div className="temp">{this.state.temperature}°</div>
                </div>
                    <Button toggle onClick={this.handleToggle} >
                      °C/°F
                    </Button>
                <div className='weather'>{this.state.weather}</div>
            </main>
            </div>

        );
    }
}

export default About;
