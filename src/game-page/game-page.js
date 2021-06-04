import React, {Component} from 'react';
import firebase from "firebase/app";
import "firebase/database";

import WaitingPage from "./waiting-page";

class GamePage extends Component{
    render(){
        return(<>
            <section id="page-3">
                <WaitingPage/>
            </section>
            </>)
    }
}

export default GamePage;