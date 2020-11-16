import React from 'react';
import { TextField, Typography, Button } from "@material-ui/core";

class Weather extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            location: 'new delhi',
            data: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        this.handleSubmit();
    }

    handleChange = (prop) => {
        this.setState({
            location: prop
        })
    }

    handleSubmit = async () => {
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&mode=json&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
        await fetch(url)
        .then(res => res.json())
        .then(data => this.setState({
            data: data
        }));
        console.log(this.state.data)
    }
    render(){

        return(
            <div style={{
                textAlign: 'center',
                margin: 20,
                padding: 20,
                backgroundColor: 'pink'
            }}>
                <header >
                    <i class="fas fa-cloud-sun fa-5x"></i>
                </header>
                <div style={{
                    padding: 40,

                }}>
                    <TextField
                        id="city"
                        label="city"
                        value={this.state.location}
                        variant="outlined"
                        color="secondary"
                        onChange={(e) => this.handleChange(e.target.value)}
                    />
                    <Button 
                        type="submit"
                        variant="contained" 
                        color="secondary"
                        onClick={this.handleSubmit}
                        style={{height: '1.5cm', marginLeft: 5}}
                    >Get</Button>
                </div>


                <div style={{
                    textAlign: 'center'
                }}>
                {
                    (this.state.data !== null ) ? (
                        <div>
                            <Typography variant="h2">
                                {this.state.data.name}
                            </Typography>
                            <img src={`http://openweathermap.org/img/w/${this.state.data.weather[0].icon}.png`} />
                            <Typography variant="h4">
                                {this.state.data.weather[0].main}
                            </Typography>
                            <Typography variant="h3">
                                {this.state.data.main.temp}&#x2103;
                            </Typography>
                            <Typography variant="h6">
                                Min : {this.state.data.main.temp_min}&#x2103;,  Max : {this.state.data.main.temp_max}&#x2103;, Feels Like : {this.state.data.main.feels_like}&#x2103;
                            </Typography>
                            <Typography variant="h6">
                                Country : {this.state.data.sys.country}
                            </Typography>
                            
                        </div>
                    ) : (
                        <div>
                            <Typography>Check Your Internet Connection</Typography>
                        </div>
                    )
                }
                </div>
            </div>
        )
    }
}

export default Weather;