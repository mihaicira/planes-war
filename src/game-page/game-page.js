import React, {Component} from 'react';
import firebase from "firebase/app";
import "firebase/database";

import WaitingPage from "./waiting-page";
import NotAvailable from "./not-available";
import './game.css';

/*Game status
        * 101 - room created. No players joined yet.
        * 202 - Player 1 has joined.
        * 303 - Player 2 has joined. Room becomes unavailable
        *
*/

/*Pages id
        * 1 - waiting room
        * 2 - not available
        * 3 - place airplanes
        *
*/

class GamePage extends Component{
    roomId = window.location.hash.split("gameroom")[1];
    roomConfig = null
    whoAmI = "N/A"
    database = firebase.database()
    messages = []

    constructor(props) {
        super(props);
        this.state = {
            currentPage:1,
            toggleChat: true,
            reactMessages: []
        }
    }

    raiseUnavailablePage(){
        //In situatiile in care nu se mai primesc jucatori,pagina "Unavailable" va aparea.
        var State = this.state
        State.currentPage = 2
        this.setState(State)
    }

    getGameStatus(){
        //Cand componenta se incarca, se verifica statusul jocului, pentru a vedea daca se mai primesc jucatori sau nu
        this.database.ref(`rooms/${this.roomId}/game/gameStatus`).once('value')
            .then((snapshot)=>{
                switch(snapshot.val()){
                    case 101:
                        this.firstPlayerHasEntered()
                        break;
                    case 202:
                        this.secondPlayerHasEntered()
                        break;
                    case 303:
                        // this.raiseUnavailablePage()

                        var State = this.state
                        State.currentPage = 3
                        this.setState(State)
                        break;
                    default:
                        console.log("unknown case")
                }
            })
    }

    getRoomConfig(){
        // Cand componenta se incarca pe pagina, se apeleaza functia, pentru a avea acces rapid, in memorie la configuratiile camerei
        this.database.ref(`rooms/${this.roomId}/config`).once('value')
            .then((snapshot)=>{
                this.roomConfig = snapshot.val()
            })
    }

    firstPlayerHasEntered(){
        //Atunci cand primul jucator intra, se apeleaza functia
        var updates = {}
        updates[`rooms/${this.roomId}/game/gameStatus`] = 202
        this.database.ref().update(updates)

         this.whoAmI = 1

         //listener
         this.database.ref(`rooms/${this.roomId}/game/gameStatus`).on('value',(snapshot)=>{
             if(snapshot.val() === 303){
                 var State = this.state
                 State.currentPage = 3
                 this.setState(State)
             }
         })
    }

    secondPlayerHasEntered(){
        //Atunci cand cel de-al doilea jucator intra, se apeleaza functia. Se blocheaza camera, nu mai poate intra alt jucator
        var updates = {}
        updates[`rooms/${this.roomId}/game/gameStatus`] = 303
        this.database.ref().update(updates)
            .then(()=>{
                var State = this.state
                State.currentPage = 3
                this.setState(State)
            })

        this.whoAmI = 2
    }

    toggleChat(){
        //Se schimba disponibilitatea chatului (din inchis in deschis si vice-versa)
        var State = this.state
        State.toggleChat = !State.toggleChat
        this.setState(State)

        setTimeout(()=>{
            try{
                document.getElementById("game-chat-closed").addEventListener('click',()=>{this.toggleChat()})
            }
            catch{
                console.log("catched")
            }
        },100)
    }

    fetchMessages(){
        this.database.ref(`rooms/${this.roomId}/chat`).on('value',(snapshot)=>{
            var Messages = snapshot.val()
            console.log(Messages)
            if(Messages === "")
                this.messages = []
            else{
                var State = this.state
                State.reactMessages = []
                this.messages = Messages
                var index = 0;
                Messages.forEach((message)=>{
                    const player = message.from === this.whoAmI ? "Me" : "Enemy"
                    const color = message.from === this.whoAmI ? "game-chat-me" : "game-chat-enemy"
                    State.reactMessages.push(
                        <p key={"message-"+index}><span className={color}>{player}:</span>{message.text}</p>
                    )
                    index = index  + 1
                })
                this.setState(State)
            }

        })


    }

    sendMessage(){
        //Se apeleaza atunci cand se trimite un mesaj pe chat

        const value = document.getElementById("game-chat-input").value
        document.getElementById("game-chat-input").value = ""

        if(value === "")
            return;

        const newMessage = {
            from: this.whoAmI,
            text: value
        }
        this.messages.push(newMessage)


        var updates = {}

        updates[`rooms/${this.roomId}/chat`] = this.messages
        this.database.ref().update(updates)

    }

    componentDidMount() {
        this.getGameStatus();
        this.getRoomConfig();
        this.fetchMessages();
    }

    render(){
        return(<>
            <section id="page-3">
                {
                    this.state.currentPage === 1 &&
                    <WaitingPage/>
                }
                {
                    this.state.currentPage === 2 &&
                    <NotAvailable/>
                }
                {
                    this.state.currentPage === 3 &&
                        <div id="game">
                            <div id="game-header">
                                <svg viewBox="0 0 735 389" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M68.6003 136.551C75.2463 140.896 87.4941 146.029 101.848 151.192C140.874 165.237 195.479 179.594 195.479 179.594C195.479 179.594 472.815 268.057 704.767 229.579C704.767 229.579 739.304 220.51 715.713 192.189C712.058 187.927 708.034 183.996 703.688 180.441L703.419 180.011C700.858 176.258 697.966 172.741 694.778 169.503C685.433 159.881 668.832 147.206 645.391 145.83L68.1561 107.857C68.1561 107.857 43.8795 120.357 68.6003 136.551Z" fill="#3F3D56"/>
                                    <path d="M188.868 121.257L91.3693 11.8081L37.9781 8.88109L68.1553 107.857C68.1553 107.857 184.181 135.516 188.868 121.257Z" fill="#3F3D56"/>
                                    <path d="M493.735 138.491L276.631 20.0434L237.427 19.2599L331.414 90.522L355.746 134.71L493.735 138.491Z" fill="#3F3D56"/>
                                    <path d="M101.847 151.192C140.874 165.237 195.479 179.594 195.479 179.594C195.479 179.594 472.814 268.057 704.767 229.579C704.767 229.579 739.304 220.51 715.713 192.189L715.524 192.568C715.524 192.568 662.695 212.956 438.301 188.515L101.847 151.192Z" fill="#278EA5"/>
                                    <path d="M139.559 157.986L26.0646 176.489L0.66471 167.604L73.4493 135.233C73.4493 135.233 152.197 136.479 139.559 157.986Z" fill="#3F3D56"/>
                                    <path d="M676.862 188.443C681.793 189.663 695.043 183.969 703.382 180.003C700.821 176.249 697.929 172.732 694.741 169.494C688.052 172.549 676.313 177.284 670.75 175.715C662.704 173.512 669.438 186.595 676.862 188.443Z" fill="#278EA5"/>
                                    <path d="M151.498 314.905L217.311 333.709L433.642 250.496L473.801 235.044L493.307 227.534C467.776 193.493 330.023 200.666 330.023 200.666C327.068 202.185 325.482 205.475 324.712 209.335C323.276 216.564 324.712 225.768 325.316 229.099C325.457 229.914 325.56 230.352 325.56 230.352L151.498 314.905Z" fill="#3F3D56"/>
                                </svg>

                                <p>status</p>

                                <svg viewBox="0 0 735 389" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M666.079 136.551C659.433 140.896 647.185 146.029 632.832 151.192C593.805 165.237 539.2 179.594 539.2 179.594C539.2 179.594 261.864 268.057 29.9118 229.579C29.9118 229.579 -4.62487 220.51 18.9661 192.189C22.6216 187.927 26.6457 183.996 30.9915 180.441L31.2605 180.011C33.8215 176.258 36.7133 172.741 39.9011 169.503C49.2463 159.881 65.8476 147.206 89.2884 145.83L666.523 107.857C666.523 107.857 690.8 120.357 666.079 136.551Z" fill="#3F3D56"/>
                                    <path d="M545.811 121.257L643.31 11.8081L696.701 8.88109L666.524 107.857C666.524 107.857 550.498 135.516 545.811 121.257Z" fill="#3F3D56"/>
                                    <path d="M240.944 138.491L458.048 20.0434L497.252 19.2599L403.265 90.522L378.933 134.71L240.944 138.491Z" fill="#3F3D56"/>
                                    <path d="M632.832 151.192C593.806 165.237 539.201 179.594 539.201 179.594C539.201 179.594 261.865 268.057 29.9122 229.579C29.9122 229.579 -4.6245 220.51 18.9665 192.189L19.1554 192.568C19.1554 192.568 71.9843 212.956 296.378 188.515L632.832 151.192Z" fill="#278EA5"/>
                                    <path d="M595.12 157.986L708.615 176.489L734.014 167.604L661.23 135.233C661.23 135.233 582.482 136.479 595.12 157.986Z" fill="#3F3D56"/>
                                    <path d="M57.8175 188.443C52.8865 189.663 39.636 183.969 31.2976 180.003C33.8587 176.249 36.7504 172.732 39.9382 169.494C46.627 172.549 58.3658 177.284 63.9287 175.715C71.9752 173.512 65.2412 186.595 57.8175 188.443Z" fill="#278EA5"/>
                                    <path d="M583.181 314.905L517.368 333.709L301.038 250.496L260.878 235.044L241.372 227.534C266.903 193.493 404.656 200.666 404.656 200.666C407.611 202.185 409.197 205.475 409.968 209.335C411.403 216.564 409.967 225.768 409.363 229.099C409.222 229.914 409.119 230.352 409.119 230.352L583.181 314.905Z" fill="#3F3D56"/>
                                </svg>
                            </div>

                            <div id="game-canvas-container"></div>

                            <div id="game-footer">
                                {
                                    this.state.toggleChat === true &&
                                    <div className="footerObj" id="game-chat">
                                    <div id="game-chat-header">
                                        <p>Chat</p>
                                        <button onClick={()=>{this.toggleChat()}}>
                                            <svg viewBox="0 0 51 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 43L25.5 23M48 3L25.5 23M25.5 23L3 3L48 43" stroke="#1F4287" strokeWidth="8"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div id="game-chat-texting">
                                        {this.state.reactMessages}
                                    </div>
                                    <div id="game-chat-textarea-container">
                                        <input placeholder="Write here" id="game-chat-input"/>
                                        <button onClick={()=>{this.sendMessage()}}>
                                            <svg viewBox="0 0 501 482" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M473 31.7201C461.462 16.1145 431.404 25.352 412 35.4999C325.833 58.8332 135.6 112.2 64 139C-7.60002 165.8 30.1666 183.167 58 188.5L246.657 249.5M473 31.7201C478.707 39.4382 479.883 53.233 473 75.9999C452.2 144.8 388 340.667 358.5 430C351.667 452 332.7 482.8 311.5 430C290.3 377.2 256.667 290.333 242.5 253.5L246.657 249.5M473 31.7201L246.657 249.5" stroke="#1F4287" strokeWidth="45"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                }
                                {
                                    this.state.toggleChat === false &&
                                    <div className="footerObj" id="game-chat-closed">
                                        <p>Chat</p>
                                        <button onClick={()=>{this.toggleChat()}}>
                                            <svg viewBox="0 0 341 335" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M105.5 130C81.1 80.7999 115.667 94.4999 136 107.5C195.5 126 315.7 163.3 320.5 164.5C325.3 165.7 282.5 196.333 260.5 211.5L325 275L276 320L210 257.5C197.833 279.833 172 323.6 166 320C158.5 315.5 136 191.5 105.5 130Z" stroke="#1F4287" strokeWidth="21"/>
                                                <rect x="16" y="163.945" width="54.0331" height="20.9166" rx="10.4583" transform="rotate(-43.1373 16 163.945)" fill="#1F4287"/>
                                                <rect x="128" y="53.9448" width="54.0331" height="20.9166" rx="10.4583" transform="rotate(-43.1373 128 53.9448)" fill="#1F4287"/>
                                                <rect x="0.350952" y="87.7593" width="54.0331" height="20.9166" rx="10.4583" transform="rotate(-0.828557 0.350952 87.7593)" fill="#1F4287"/>
                                                <rect x="111.401" y="0.187988" width="54.0331" height="20.9166" rx="10.4583" transform="rotate(90.515 111.401 0.187988)" fill="#1F4287"/>
                                                <rect x="34.1313" y="17.8169" width="54.0331" height="20.9166" rx="10.4583" transform="rotate(46.9917 34.1313 17.8169)" fill="#1F4287"/>
                                            </svg>


                                        </button>
                                    </div>
                                }
                                <div className="footerObj"></div>
                                <div className="footerObj"></div>
                            </div>
                        </div>
                }

            </section>
            </>)
    }
}

export default GamePage;