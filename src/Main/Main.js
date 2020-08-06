import React from 'react';
import logo from '../logo.svg';
import history from "../history";
import './Main.css';
import {Button, Icon} from "semantic-ui-react";

const API ={
    key: 'WEATHER_API_KEY',
    base: 'http://api.openweathermap.org/data/2.5/'
}

class Main extends React.Component {
    render() {
        return (
            <div className="abc">
                <h1>How's the weather</h1>
                <div className="icon sun-shower">
                    <div className="cloud1"></div>
                    <div className="sun">
                        <div className="rays"></div>
                    </div>
                    <div className="rain"></div>
                </div>

                <div className="icon thunder-storm">
                    <div className="cloud1"></div>
                    <div className="lightning">
                        <div className="bolt"></div>
                        <div className="bolt"></div>
                    </div>
                </div>

                <div className="icon cloudy">
                    <div className="cloud1"></div>
                    <div className="cloud1"></div>
                </div>

                <div className="icon flurries">
                    <div className="cloud1"></div>
                    <div className="snow">
                        <div className="flake"></div>
                        <div className="flake"></div>
                    </div>
                </div>

                <div className="icon sunny">
                    <div className="sun">
                        <div className="rays"></div>
                    </div>
                </div>

                <div className="icon rainy">
                    <div className="cloud1"></div>
                    <div className="rain"></div>
                </div>
                <Button inverted color='teal'
                        onClick={() => history.push('/About')}><Icon name='mouse pointer' size='big'/>
                    Touch to see more
                </Button>
            </div>

        );
    }
}

export default Main;
