import React, {Component} from 'react';
import Top from "./top";
import './config-page.css';


class ConfigPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            canvasSize: 10,
            numberOfAirplanes:3
        }
    }

    lowerCanvasSize(){
        const min = 1
        var State = this.state;
        if(State.canvasSize >= min) {
            State.canvasSize = State.canvasSize - 1;
            this.setState(State);
            document.getElementById("config-canvas-size-canvas").style.width = (1.5 * State.canvasSize) + "vw";
            document.getElementById("config-canvas-size-text").innerText = State.canvasSize + " x " + State.canvasSize;
        }
    }

    upperCanvasSize(){
        const max = 25
        var State = this.state;
        if(State.canvasSize < max) {
            State.canvasSize = State.canvasSize + 1;
            this.setState(State);
            document.getElementById("config-canvas-size-canvas").style.width = (1.5 * State.canvasSize) + "vw";
            document.getElementById("config-canvas-size-text").innerText = State.canvasSize + " x " + State.canvasSize;
        }
    }

    lowerNumberOfAirplanes(){
        const min = 1
        var State = this.state
        if(State.numberOfAirplanes > min){
            State.numberOfAirplanes = State.numberOfAirplanes - 1
            this.setState(State)
            document.getElementById("config-number-of-airplanes-text").innerText = State.numberOfAirplanes;
        }
    }

    upperNumberOfAirplanes(){
        const max = 6
        var State = this.state
        if(State.numberOfAirplanes < max){
            State.numberOfAirplanes = State.numberOfAirplanes + 1
            this.setState(State)
            document.getElementById("config-number-of-airplanes-text").innerText = State.numberOfAirplanes;
        }
    }


    render() {
        const canvasSizeSquares = []
        for(let i=0 ; i<this.state.canvasSize*this.state.canvasSize ; i++)
            canvasSizeSquares.push(<div className="config-canvas-size-canvas-square" key={"config-canvas-size-canvas-square-id-"+i}></div>)

        const numberOfAirplanesPlanes = []
        for(let i=0 ; i<this.state.numberOfAirplanes ; i++)
            numberOfAirplanesPlanes.push(<div className="config-number-of-airplanes-planes-plane" key={"config-number-of-airplanes-planes-plane-id-"+i}><svg viewBox="0 0 241 197"><path d="M145.336 5H100.439V54.7194H4.8252V102.781H100.439V143.386H54.7107V192H188.293V143.386H145.336V102.781H235.684V54.7194H145.336V5Z" fill="#21E6C1" stroke="#278EA5" strokeWidth="9"/></svg></div>)

        return(<>
            <section id="page-2">

                <Top/>

                <div id="configs-container">
                    {/*Canvas size*/}
                    <div className="config">
                        <h3>Canvas size</h3>
                        <div className="config-content" id="config-canvas-size">
                            <div id="config-canvas-size-buttons">
                                <button onClick={()=>{this.upperCanvasSize()}}>
                                    <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.0607 0.93934C12.4749 0.353553 11.5251 0.353553 10.9393 0.93934L1.3934 10.4853C0.807612 11.0711 0.807612 12.0208 1.3934 12.6066C1.97918 13.1924 2.92893 13.1924 3.51472 12.6066L12 4.12132L20.4853 12.6066C21.0711 13.1924 22.0208 13.1924 22.6066 12.6066C23.1924 12.0208 23.1924 11.0711 22.6066 10.4853L13.0607 0.93934ZM13.5 20L13.5 2H10.5L10.5 20H13.5Z" fill="black"/>
                                    </svg>
                                </button>
                                <button onClick={()=>{this.lowerCanvasSize()}}>
                                    <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.0045 20.0674C11.594 20.6494 12.5437 20.6432 13.1257 20.0537L22.6098 10.4462C23.1918 9.85665 23.1856 8.90692 22.5961 8.32493C22.0065 7.74294 21.0568 7.74908 20.4748 8.33864L12.0445 16.8786L3.50458 8.44833C2.91502 7.86635 1.96529 7.87248 1.3833 8.46205C0.801314 9.05161 0.807453 10.0013 1.39701 10.5833L11.0045 20.0674ZM10.4419 1.00994L10.5583 19.0096L13.5582 18.9902L13.4419 0.990549L10.4419 1.00994Z" fill="black"/>
                                    </svg>
                                </button>
                            </div>
                            <p id="config-canvas-size-text">10 x 10</p>
                            <div id="config-canvas-size-canvas">
                                {canvasSizeSquares}
                            </div>
                        </div>
                    </div>

                    {/*Number of airplanes*/}
                    <div className="config">
                        <h3>Number of airplanes</h3>
                        <div className="config-content" id="config-number-of-airplanes">
                            <div id="config-number-of-airplanes-buttons">
                                <button onClick={()=>{this.upperNumberOfAirplanes()}}>
                                    <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.0607 0.93934C12.4749 0.353553 11.5251 0.353553 10.9393 0.93934L1.3934 10.4853C0.807612 11.0711 0.807612 12.0208 1.3934 12.6066C1.97918 13.1924 2.92893 13.1924 3.51472 12.6066L12 4.12132L20.4853 12.6066C21.0711 13.1924 22.0208 13.1924 22.6066 12.6066C23.1924 12.0208 23.1924 11.0711 22.6066 10.4853L13.0607 0.93934ZM13.5 20L13.5 2H10.5L10.5 20H13.5Z" fill="black"/>
                                    </svg>
                                </button>
                                <button onClick={()=>{this.lowerNumberOfAirplanes()}}>
                                    <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.0045 20.0674C11.594 20.6494 12.5437 20.6432 13.1257 20.0537L22.6098 10.4462C23.1918 9.85665 23.1856 8.90692 22.5961 8.32493C22.0065 7.74294 21.0568 7.74908 20.4748 8.33864L12.0445 16.8786L3.50458 8.44833C2.91502 7.86635 1.96529 7.87248 1.3833 8.46205C0.801314 9.05161 0.807453 10.0013 1.39701 10.5833L11.0045 20.0674ZM10.4419 1.00994L10.5583 19.0096L13.5582 18.9902L13.4419 0.990549L10.4419 1.00994Z" fill="black"/>
                                    </svg>
                                </button>
                            </div>

                            <p id="config-number-of-airplanes-text">3</p>

                            <div id="config-number-of-airplanes-planes">
                                {numberOfAirplanesPlanes}
                            </div>
                        </div>
                    </div>

                    {/*{Configure the fleet}*/}
                    <div className="config">
                        <h3>Configure the fleet</h3>
                        <div className="config-content" id="configure-the-fleet-container">
                            <div className="configure-the-fleet-plane">
                                <h3>#1</h3>
                                <div className="configure-the-fleet-plane-buttons">
                                    <button onClick={()=>{console.log("hello!")}}>
                                        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.0607 0.93934C12.4749 0.353553 11.5251 0.353553 10.9393 0.93934L1.3934 10.4853C0.807612 11.0711 0.807612 12.0208 1.3934 12.6066C1.97918 13.1924 2.92893 13.1924 3.51472 12.6066L12 4.12132L20.4853 12.6066C21.0711 13.1924 22.0208 13.1924 22.6066 12.6066C23.1924 12.0208 23.1924 11.0711 22.6066 10.4853L13.0607 0.93934ZM13.5 20L13.5 2H10.5L10.5 20H13.5Z" fill="black"/>
                                        </svg>
                                    </button>
                                    <button onClick={()=>{console.log("hello!")}}>
                                        <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.0045 20.0674C11.594 20.6494 12.5437 20.6432 13.1257 20.0537L22.6098 10.4462C23.1918 9.85665 23.1856 8.90692 22.5961 8.32493C22.0065 7.74294 21.0568 7.74908 20.4748 8.33864L12.0445 16.8786L3.50458 8.44833C2.91502 7.86635 1.96529 7.87248 1.3833 8.46205C0.801314 9.05161 0.807453 10.0013 1.39701 10.5833L11.0045 20.0674ZM10.4419 1.00994L10.5583 19.0096L13.5582 18.9902L13.4419 0.990549L10.4419 1.00994Z" fill="black"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="configure-the-fleet-plane-svg">
                                    <svg viewBox="0 0 990 630" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.85" width="990" height="630" fill="white"/>
                                        <rect opacity="0.85" x="1.5" y="1.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="91.5" y="1.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="181.5" y="1.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="271.5" y="1.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="361.5" y="1.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="451.5" y="1.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="541.5" y="1.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="631.5" y="1.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="721.5" y="1.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="811.5" y="1.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="901.5" y="1.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="1.5" y="91.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="91.5" y="91.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="181.5" y="91.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="271.5" y="91.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="361.5" y="91.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="451.5" y="91.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="541.5" y="91.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="631.5" y="91.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="721.5" y="91.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="811.5" y="91.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="901.5" y="91.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="1.5" y="181.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="91.5" y="181.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="181.5" y="181.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="271.5" y="181.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="361.5" y="181.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="451.5" y="181.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="541.5" y="181.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="631.5" y="181.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="721.5" y="181.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="811.5" y="181.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="901.5" y="181.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="1.5" y="271.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="91.5" y="271.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="181.5" y="271.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="271.5" y="271.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="361.5" y="271.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="451.5" y="271.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="541.5" y="271.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="631.5" y="271.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="721.5" y="271.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="811.5" y="271.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="901.5" y="271.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="1.5" y="361.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="91.5" y="361.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="181.5" y="361.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="271.5" y="361.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="361.5" y="361.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="451.5" y="361.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="541.5" y="361.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="631.5" y="361.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="721.5" y="361.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="811.5" y="361.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="901.5" y="361.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="1.5" y="451.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="91.5" y="451.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="181.5" y="451.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="271.5" y="451.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="361.5" y="451.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="451.5" y="451.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="541.5" y="451.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="631.5" y="451.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="721.5" y="451.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="811.5" y="451.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="901.5" y="451.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="1.5" y="541.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="91.5" y="541.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="181.5" y="541.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="271.5" y="541.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="361.5" y="541.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="451.5" y="541.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="541.5" y="541.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="631.5" y="541.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="721.5" y="541.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="811.5" y="541.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect opacity="0.85" x="901.5" y="541.5" width="87" height="87" stroke="#757070" stroke-width="3"/>
                                        <rect x="454" y="93" width="84" height="84" fill="#FF800B" stroke="#10FFE2" stroke-width="6"/>
                                        <rect x="454" y="183" width="84" height="84" fill="#FF800B" stroke="#10FFE2" stroke-width="6"/>
                                        <rect x="544" y="183" width="84" height="84" fill="#FF800B" stroke="#10FFE2" stroke-width="6"/>
                                        <rect x="633" y="183" width="84" height="84" fill="#FF800B" stroke="#10FFE2" stroke-width="6"/>
                                        <rect x="364" y="183" width="84" height="84" fill="#FF800B" stroke="#10FFE2" stroke-width="6"/>
                                        <rect x="273" y="183" width="84" height="84" fill="#FF800B" stroke="#10FFE2" stroke-width="6"/>
                                        <rect x="454" y="273" width="84" height="84" fill="#FF800B" stroke="#10FFE2" stroke-width="6"/>
                                        <rect x="453" y="363" width="84" height="84" fill="#FF800B" stroke="#10FFE2" stroke-width="6"/>
                                        <rect x="544" y="363" width="84" height="84" fill="#FF800B" stroke="#10FFE2" stroke-width="6"/>
                                        <rect x="363" y="363" width="84" height="84" fill="#FF800B" stroke="#10FFE2" stroke-width="6"/>
                                    </svg>
                                </div>
                            </div>

                            <div className="configure-the-fleet-plane">
                                <h2>3</h2>
                                <h2>3</h2>
                                <h2>3</h2>
                            </div>

                            <div className="configure-the-fleet-plane">
                                <h2>3</h2>
                                <h2>3</h2>
                                <h2>3</h2>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>)
    }
}

export default ConfigPage;