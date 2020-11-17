import React from 'react';
import Weather from '../components/weather';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            location: null
        }
    }

    render(){

        return(
            <>
                <Weather />
            </>
        )
    }
}

export default Main;