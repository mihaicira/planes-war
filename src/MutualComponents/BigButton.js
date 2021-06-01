import React, {Component} from 'react';
import './bigButton.css';

class BigButton extends Component{
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {
        return(<>
            <button className="bigButton" onClick={this.props.event}>{this.props.text}</button>
        </>)
    }
}

export default BigButton;