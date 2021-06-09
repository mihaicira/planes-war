import React, {Component} from 'react';
import './not-available.css'
import BigButton from "../MutualComponents/BigButton";

class NotAvailable extends Component{

    goToConfigure(){
        window.location = "#config";
        window.location.reload()
    }

    render(){
        return(<div id="not-available">
                <h1>This room is unavailable</h1>
                <p>It seems like this room is full.</p>
                <p>Don't worry! Configure your own room and start playing!</p>
                <BigButton text="Configure room" event={this.goToConfigure}/>
            </div>)
    }
}

export default NotAvailable;