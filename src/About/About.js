import React from 'react';
import './About.css';
import _ from 'lodash';
import {Button, Card, CardContent, CardDescription, CardGroup, Grid, Icon, Search} from "semantic-ui-react";
import {WEATHER_API_KEY} from "../secrets";
import citiesList from "../city.list.clean.json";
import history from "../history";

const API = {
    key: WEATHER_API_KEY,
    base: 'http://api.openweathermap.org/data/2.5/'
}

function Cloud(props) {
    let speedClass;
    let sizeClass;
    let delayClass;

    switch (props.speed) {
        case 2:
            speedClass = "fast";
            break;
        case 1:
            speedClass = "medium";
            break;
        default:
            speedClass = "slow";
            break;
    }

    switch (props.size) {
        case 2:
            sizeClass = "is-large";
            break;
        case 1:
            sizeClass = "is-medium";
            break;
        default:
            sizeClass = "is-small";
            break;
    }
    delayClass = "delay-" + Math.min(props.delay, 6);
    let cloudClasses = [speedClass, sizeClass, delayClass];

    return <div className={'cloud ' + cloudClasses.join(" ").trimRight()}><span className="shadow"></span></div>;

}

const date = (d) => {
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

    return `${day}, ${date} ${month} ${year}`
}
const searchKey = (city) =>{
    return city.title.toLowerCase().replace(" ", "")
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
            humidity: "",
            feels_like: "",
            country: "",
            cities: []
        };
    }

    componentDidMount() {
        this.getWeather();
    }

    getWeather = (e) => {
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

                if (json.main === undefined) {
                    this.setState({
                        city: json.name,
                        temperature: '--',
                        weather: '',
                        feels_like: '',
                        humidity: '',
                        country: '',
                        cities: []
                    });
                    return;
                }
                let isF = this.state.unit === 'F';
                this.setState({
                    city: json.name,
                    temperature: json.main.temp,
                    weather: json.weather[0].main,
                    humidity: json.main.humidity,
                    feels_like: json.main.feels_like,
                    unit: 'C',
                    country: json.sys.country
                });
                if (isF) {
                    this.handleToggle();
                }
            })
        // .then(() => this.resetState());
    };

    // Search bar
    handleResultSelect = (e, {result}) => {
        this.setState({q: result.title}, () => this.getWeather(e));
    }
    handleSearchChange = (e, {value}) => {
        this.setState({q: value}, () => this.getWeather(e));
    }

    // a toggle button that converts temperature
    handleToggle = () => {
        if (this.state.unit === 'C') {
            let feel = this.state.feels_like;
            let newfeel = Math.round(feel * 1.8 + 32)
            let temp = this.state.temperature;
            let newtemp = Math.round(temp * 1.8 + 32);
            this.setState({
                unit: 'F',
                temperature: newtemp,
                feels_like: newfeel
            })
        } else {
            let feel = this.state.feels_like;
            let newfeel = Math.round((feel - 32) * (5 / 9));
            let temp = this.state.temperature;
            let newtemp = Math.round((temp - 32) * (5 / 9));
            this.setState({
                unit: 'C',
                temperature: newtemp,
                feels_like: newfeel
            });
        }
    }

    render() {
        // Filter search
        const cities = [];
        for (const cityIndex in citiesList) {
            if(this.state.q.length < 2){
                break;
            }
            let city = citiesList[cityIndex];
            if(searchKey(city).includes(this.state.q.toLowerCase())) {
                cities.push(city);
            }
            if(cities.length >= 10){
                break;
            }

        }

        //Cloud
        const cloudCount = 15;
        let clouds = [];
        for (let i = 0; i < cloudCount; i++) {
            let speed = Math.floor(Math.random() * 3);
            let size = Math.floor(Math.random() * 3);
            let delay = Math.floor(Math.random() * 7);
            clouds.push(<Cloud speed={speed} key={i} size={size} delay={delay}/>);
        }
        return (
            <div className="App">
                <div className="sticky-top clouds" key = {2}>{clouds}</div>
                <Search className="search-box"
                        placeholder="Search..."
                        loading={false}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, {
                            leading: true,
                        })}
                        results={cities}
                        value={this.state.q}
                />
                <div className='location'>{this.state.city}, {this.state.country}</div>
                <div className='date'>{this.state.date}</div>
                <div className="temp">{this.state.temperature}°{this.state.unit}</div>
                <div>
                <Button inverted color='teal' toggle onClick={this.handleToggle} className="temp-button">
                    °C/°F
                </Button>
                </div>
                <div className='weather'>{this.state.weather}</div>
                <div className='card-group'>
                    <CardGroup centered itemsPerRow={2}>
                    <Card fluid>
                        <CardContent>
                            <Card.Header>Humidity</Card.Header>
                            <CardDescription>
                                {this.state.humidity} %
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card fluid>
                        <CardContent>
                            <Card.Header>Feels Like</Card.Header>
                            <CardDescription>
                                {this.state.feels_like}
                            </CardDescription>
                        </CardContent>
                    </Card>
                </CardGroup>
                </div>
                <div className='back-button'>
                    <Button inverted color='teal' onClick={() => history.push('/')} >
                        <Icon name='arrow circle down' size='big'/>
                        Back
                    </Button>
                </div>
            </div>

        );
    }
}

export default About;
