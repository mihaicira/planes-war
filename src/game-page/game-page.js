import React, {Component} from 'react';
import firebase from "firebase/app";
import "firebase/database";

import WaitingPage from "./waiting-page";
import NotAvailable from "./not-available";
import GameMenuButton from "./game-menu-button";
import AreYouSure from "./are-you-sure";
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

function randomDegrees(){
    //Returneaza o valoare intreaga intre [-90,+90]. Folosit pentru a genera gradele in patratelele din avioane
    return (Math.floor(Math.random() * 180) - 90).toString();
}

function randomColor(){
    //Returneaza o pereche de culori, folosita pentru a genera culorile din patratelele din avioane
    var colors1 = [
        "#d98c3f",
        "#b0671e",
        "#d16c06",
        "#d4985b",
        "#fc7f00",
        "#a35507",
        "#b5824e",
        "#c49462"
    ]
    var colors2 = [
        "#c6c90e",
        "#dddeb3",
        "#dee03f",
        "#ebed64",
        "#eef202",
        "#c8ca76",
        "#eef09c"
    ]
    // const idx = Math.floor(Math.random() * colors.length)
    // const c1 = colors[idx];
    // colors.splice(idx,1)
    // const c2 = colors[Math.floor(Math.random() * colors.length)]

    const c1 = colors1[Math.floor(Math.random() * colors1.length)]
    const c2 = colors2[Math.floor(Math.random() * colors2.length)]
    return [c1,c2]
}

function datify(date){
    var dbDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`
    return dbDate;
}

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
            reactMessages: [],
            planePosition:[0,0],
            planeSize:"small",
            planeDirection: "T",
            remainingFleet:"temporary", //se populeaza cand se apeleaza getRoomConfig
            areYouSure :false,
            currentPlaneSquares:[], //pentru areYouSure - sa se tina minte patratelele colorate, ca sa se stie care trebuie recolorate
            setupCanvas: [], //matrice CanvasSize x CanvasSize, pentru disponibilitate. Se populeaza cand se apeleaza getRoomConfig
            setupPlanes: []
        }
    }

    componentDidMount() {
        this.getGameStatus();
        this.getRoomConfig();
        this.fetchMessages();

        document.body.style.paddingBottom = "0";

        setTimeout(()=>{
            try{


            }
            catch{
                //pass
            }

        },300)

    }

    componentWillUnmount() {
        document.body.style.paddingBottom = "25vh";
    }

    /*PAGES*/
    raiseUnavailablePage(){
        //In situatiile in care nu se mai primesc jucatori,pagina "Unavailable" va aparea.
        var State = this.state
        State.currentPage = 2
        this.setState(State)
    }
    /*PAGES*/

    /*GAME SETUP*/
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
                        this.prepareSetupCanvas()
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

                var State = this.state

                State.remainingFleet = snapshot.val().fleet

                //setupCanvas (disponibilitate)
                for(let i = 0 ; i < snapshot.val().canvasSize ; i++){
                    State.setupCanvas.push([])
                    for(let j = 0 ; j < snapshot.val().canvasSize ; j++){
                        State.setupCanvas[i].push(0)
                    }
                }

                this.setState(State)

                this.activateLogsListener();
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
                 this.prepareSetupCanvas();
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
                this.prepareSetupCanvas();
            })

        this.whoAmI = 2
    }
    /*GAME SETUP*/

    /*CHAT*/
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

                document.getElementById("game-chat-texting").scrollTop =  document.getElementById("game-chat-texting").scrollHeight
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

        setTimeout(()=>{
            document.getElementById("game-chat-texting").scrollTop =  document.getElementById("game-chat-texting").scrollHeight
        },100)
    }
    /*CHAT*/

    /*SETUP CANVAS*/
    prepareSetupCanvas(){
        //pregateste tabla de pregatire, unde se aleg locurile avioanelor
        const CANVAS_SIZE = 100//this.roomConfig.canvasSize * this.roomConfig.canvasSize
        document.getElementById("game-canvas-container").innerHTML = `<div class="game-canvas" id="setup-canvas">
                <div class="canvas-letters"></div>
                <div class="canvas-numbers"></div>
            </div>`

        document.querySelectorAll(".canvas-letters").forEach((obj)=>{
            const letters = "ABCDEFGHIJKLMNOPRSTUVWXYZ"
            for (let i = 0; i < 10; i++)
                obj.insertAdjacentHTML('beforeend', `<p>${letters[i]}</p>`)
        })

        document.querySelectorAll(".canvas-numbers").forEach((obj)=>{
            for (let i = 0; i < 10; i++)
                obj.insertAdjacentHTML('beforeend', `<p>${i+1}</p>`)
        })

        for (let i = 0; i < Math.sqrt(CANVAS_SIZE); i++)
            for(let j = 0 ; j < Math.sqrt(CANVAS_SIZE) ; j++)
            {
                document.getElementById("setup-canvas").insertAdjacentHTML('beforeend', `<div class="game-canvas-square" id="setup-square/${i}-${j}"></div>`)

                document.getElementById(`setup-square/${i}-${j}`).addEventListener('mouseover',()=>{
                    //if canIPlaceItHere
                    if(!this.state.areYouSure){
                        this.simulatePlane(this.simulatePlaneSquares(i,j,this.state.planeSize,this.state.planeDirection))
                    }
                })
                document.getElementById(`setup-square/${i}-${j}`).addEventListener('mouseout',()=>{
                    if(!this.state.areYouSure ){
                        this.deleteSimulation(this.simulatePlaneSquares(i,j,this.state.planeSize,this.state.planeDirection))
                    }

                })
                document.getElementById(`setup-square/${i}-${j}`).addEventListener('click',()=>{
                    if(!this.state.areYouSure)
                        this.placePlane(i,j)
                })
            }
    }

    simulatePlaneSquares(i,j,PLANE_SIZE,DIRECTION){
        const plane = PLANE_SIZE+"-"+DIRECTION
        var squares = []
        switch(plane){
            case "small-T":
                squares = [
                                         [i,j],
                    [i+1,j-2],[i+1,j-1],[i+1,j],[i+1,j+1],[i+1,j+2],
                                        [i+2,j],
                              [i+3,j-1],[i+3,j],[i+3,j+1]
                ]
                break;
            case "small-B":
                squares = [
                              [i-3,j-1],[i-3,j],[i-3,j+1],
                                        [i-2,j],
                    [i-1,j-2],[i-1,j-1],[i-1,j],[i-1,j+1],[i-1,j+2],
                                        [i,j]
                ]
                break;
            case "small-R":
                squares = [
                                        [i-2,j-1],
                    [i-1,j-3],          [i-1,j-1],
                    [i,j-3]  , [i,j-2] ,[i,j-1] , [i,j],
                    [i+1,j-3]     ,     [i+1,j-1],
                                        [i+2,j-1]
                ]
                break;
            case "small-L":
                squares = [
                            [i-2,j+1],
                            [i-1,j+1],      [i-1,j+3],
                    [i,j]  ,[i,j+1], [i,j+2],[i,j+3],
                            [i+1,j+1],       [i+1,j+3],
                            [i+2,j+1]
                    ]
                break;
            case "medium-T":
                squares = [
                                                 [i,j],
                   [i+1,j-3],[i+1,j-2],[i+1,j-1],[i+1,j],[i+1,j+1],[i+1,j+2],[i+1,j+3],
                                                [i+2,j],
                                                [i+3,j],
                                      [i+4,j-1],[i+4,j],[i+4,j+1]
                ]
                break;
            case "medium-B":
                squares = [
                                       [i-4,j-1],[i-4,j],[i-4,j+1],
                                                 [i-3,j],
                                                 [i-2,j],
                    [i-1,j-3],[i-1,j-2],[i-1,j-1],[i-1,j],[i-1,j+1],[i-1,j+2],[i-1,j+3],
                                                  [i,j]
                ]
                break;
            case "medium-R":
                squares = [
                                            [i-3,j-1],
                                            [i-2,j-1],
                    [i-1,j-4],              [i-1,j-1],
                    [i,j-4],[i,j-3],[i,j-2],[i,j-1], [i,j],
                    [i+1,j-4]  ,            [i+1,j-1],
                                            [i+2,j-1],
                                            [i+3,j-1]
                ]
                break;
            case "medium-L":
                squares = [
                        [i-3,j+1],
                        [i-2,j+1],
                        [i-1,j+1],              [i-1,j+3],
                    [i,j],[i,j+1],[i,j+2],[i,j+3],[i,j+3],
                        [i+1,j+1],              [i+1,j+3],
                        [i+2,j+1],
                        [i+3,j+1]
                ]
                break;
            case "big-T":
                squares = [
                                                             [i,j],
                    [i+1,j-4],[i+1,j-3],[i+1,j-2],[i+1,j-1],[i+1,j],[i+1,j+1],[i+1,j+2],[i+1,j+3],[i+1,j+4],
                                                            [i+2,j],
                                                            [i+3,j],
                                        [i+4,j-2],[i+4,j-1],[i+4,j],[i+4,j+1],[i+4,j+2]

                ]
                break;
            case "big-B":
                squares = [
                                        [i-4,j-2],[i-4,j-1],[i-4,j],[i-4,j+1],[i-4,j+2],
                                                            [i-3,j],
                                                            [i-2,j],
                    [i-1,j-4],[i-1,j-3],[i-1,j-2],[i-1,j-1],[i-1,j],[i-1,j+1],[i-1,j+2],[i-1,j+3],[i-1,j+4],
                                                             [i,j]
                ]
                break;
            case "big-R":
                squares = [
                                            [i-4,j-1],
                                            [i-3,j-1],
                    [i-2,j-4],              [i-2,j-1],
                    [i-1,j-4],              [i-1,j-1],
                    [i,j-4],[i,j-3],[i,j-2],[i,j-1], [i,j],
                    [i+1,j-4],              [i+1,j-1],
                    [i+2,j-4],              [i+2,j-1],
                                            [i+3,j-1],
                                            [i+4,j-1]
                ]
                break;
            case "big-L":
                squares =[
                        [i-4,j+1],
                        [i-3,j+1],
                        [i-2,j+1],              [i-2,j+4],
                        [i-1,j+1],              [i-1,j+4],
                [i,j],  [i,j+1],[i,j+2],[i,j+3],[i,j+4],
                        [i+1,j+1],              [i+1,j+4],
                        [i+2,j+1],              [i+2,j+4],
                        [i+3,j+1],
                        [i+4,j+1]
                ]
                break;
            default:
                break;
        }
        return squares;
    }

    simulatePlane(squares){
        var FAIL = false;
        squares.forEach((pair)=>{
            try{
                var Square = document.getElementById(`setup-square/${pair[0]}-${pair[1]}`)
                if(this.state.setupCanvas[pair[0]][pair[1]] === 0)
                    Square.style.background = "rgba(112, 202, 212,0.4)";

                if(Square === null || this.state.setupCanvas[pair[0]][pair[1]] === 1)
                    throw "err";
            }
            catch{
                FAIL = true;
                return;
            }
        })
        if(FAIL){
            squares.forEach((pair)=>{
                try{
                    if(this.state.setupCanvas[pair[0]][pair[1]] === 0)
                        document.getElementById(`setup-square/${pair[0]}-${pair[1]}`).style.background = "#910C0C";
                }
                catch{
                    //aia e...
                }
            })
        }
            // this.deleteSimulation(squares)
    }

    deleteSimulation(squares){
        squares.forEach((pair)=>{
            try{
                if(this.state.setupCanvas[pair[0]][pair[1]] === 0)
                    document.getElementById(`setup-square/${pair[0]}-${pair[1]}`).style.background = "transparent";
            }
            catch{
                //pass
            }
        })
    }

    canIPlaceItHere(x,y){
        //se verifica daca este posibila plasarea unui avion in pozitia X,Y. Dimensiunea si directia avionului sunt preluate (automat) din State.

        const squares = this.simulatePlaneSquares(x,y,this.state.planeSize,this.state.planeDirection)
        var FAIL = false

        //OUT OF BOUNDS verification
        squares.forEach((square)=>{
            if(square[0] < 0 || square[1] < 0 || square[0] >= this.roomConfig.canvasSize || square[1] >= this.roomConfig.canvasSize){
                FAIL = true;
            }


        })

        //OVERLAP verification
        var State = this.state
        if(!FAIL){
            squares.forEach((square)=>{
                    if(State.setupCanvas[square[0]][square[1]] > 0){
                        FAIL = true;
                        return;
                    }
            })
        }



        return (FAIL? false:true)


    }

    confirmPlacePlane(){
        var State = this.state
        const squares = this.simulatePlaneSquares(State.planePosition[0],State.planePosition[1],State.planeSize,State.planeDirection)

        const randomDegree = randomDegrees()
        const colors = randomColor()
        squares.forEach((square)=>{
            State.setupCanvas[square[0]][square[1]] += 1
            document.getElementById(`setup-square/${square[0]}-${square[1]}`).style.background = "linear-gradient("+randomDegree+"deg,"+colors[0]+" 0% 30%,"+colors[1]+" 70%)";
        })

        this.setState(State)

        this.closeAreYouSure(true)

        const plane = {
            x:State.planePosition[0],
            y:State.planePosition[1],
            size:State.planeSize,
            direction: State.planeDirection
        }

        const remainingFleet = this.state.remainingFleet

        const log = {
            type: "plane-set",
            log:[this.whoAmI,(remainingFleet[0] + remainingFleet[1] + remainingFleet[2])]
        }


        //send log
        var updates = {}
        this.database.ref(`rooms/${this.roomId}/game/logs`).once('value')
            .then((snapshot)=>{
                var logs = snapshot.val() === "" ? [] : snapshot.val()
                logs.push(log)

                updates[`rooms/${this.roomId}/game/logs`] = logs;
                this.database.ref().update(updates);
            })

        //send plane info
        updates = {}
        this.database.ref(`rooms/${this.roomId}/game/planePositions`).once('value')
            .then((snapshot)=>{
                var positions = snapshot.val() === "" ? {player1:"",player2:""} : snapshot.val()
                if(typeof positions["player"+this.whoAmI] === "string")
                    positions["player"+this.whoAmI] = [plane]
                else
                    positions["player"+this.whoAmI].push(plane)

                updates[`rooms/${this.roomId}/game/planePositions`] = positions;
                this.database.ref().update(updates);
            })
    }

    closeAreYouSure(proceed=false){
        document.getElementById("areYouSure").style.opacity = "0";
        document.getElementById("areYouSure").style.transform = "translateX(-50%) rotateX(90deg)"

        var State = this.state
        if(!proceed)
        State.currentPlaneSquares.forEach((square)=>{
            document.getElementById(`setup-square/${square[0]}-${square[1]}`).style.background="transparent";
        })


        State.areYouSure = false
        State.currentPlaneSquares = []
        this.setState(State)
    }

    raiseAreYouSure(){

        document.getElementById("areYouSure").style.opacity = "1";
        document.getElementById("areYouSure").style.transform = "translateX(-50%) rotateX(0deg)"

    }

    placePlane(i,j){
        //se apeleaza atunci cand se apasa pe un patrat din joc
        if(this.canIPlaceItHere(i,j)){
            const squares = this.simulatePlaneSquares(i,j,this.state.planeSize,this.state.planeDirection)
            squares.forEach((square)=>{
                document.getElementById(`setup-square/${square[0]}-${square[1]}`).style.background="#79bdb0"
            })

            var State = this.state
            State.areYouSure = true;
            State.planePosition[0] = i;
            State.planePosition[1] = j;
            State.currentPlaneSquares = this.simulatePlaneSquares(i,j,this.state.planeSize,this.state.planeDirection)
            this.setState(State)

            this.raiseAreYouSure()
        }
        else{
            console.log("nope")
        }


    }

    menuRotateLeft(){
         var State = this.state

        switch(State.planeDirection){
            case "T":
                State.planeDirection = "L"
                break;
            case "B":
                State.planeDirection = "R"
                break;
            case "R":
                State.planeDirection = "T"
                break;
            case "L":
                State.planeDirection = "B"
                break;
            default:
                console.log("Error. Plane direction unkown: ",State.planeDirection)
        }
        document.querySelector("#menu-rotate-left>button>svg").style.transform = "scale(.8)";
        document.querySelector("#menu-rotate-left>button>svg").style.boxShadow = "0 0 7px 3px white";
         setTimeout(()=>{
             document.querySelector("#menu-rotate-left>button>svg").style.transform = "scale(1)";
             document.querySelector("#menu-rotate-left>button>svg").style.boxShadow = "0 0 0 0 transparent";
         },300)

        this.setState(State)
    }

    menuRotateRight(){
        var State = this.state

        switch(State.planeDirection){
            case "T":
                State.planeDirection = "R"
                break;
            case "B":
                State.planeDirection = "L"
                break;
            case "R":
                State.planeDirection = "B"
                break;
            case "L":
                State.planeDirection = "T"
                break;
            default:
                console.log("Error. Plane direction unkown: ",State.planeDirection)
        }

        document.querySelector("#menu-rotate-right>button>svg").style.transform = "scale(.8)";
        document.querySelector("#menu-rotate-right>button>svg").style.boxShadow = "0 0 7px 3px white";
        setTimeout(()=>{
            document.querySelector("#menu-rotate-right>button>svg").style.transform = "scale(1)";
            document.querySelector("#menu-rotate-right>button>svg").style.boxShadow = "0 0 0 0 transparent";
        },300)

        this.setState(State)
    }

    changePlaneSize(newSize){
        document.querySelector("#menu-plane-1>button>svg:nth-of-type(2)").style.opacity="0";
        document.querySelector("#menu-plane-2>button>svg:nth-of-type(2)").style.opacity="0";
        document.querySelector("#menu-plane-3>button>svg:nth-of-type(2)").style.opacity="0";

        var State = this.state

        switch(newSize){
            case "small":
                document.querySelector("#menu-plane-1>button>svg:nth-of-type(2)").style.opacity="1";
                State.planeSize = "small"
                break;
            case "medium":
                document.querySelector("#menu-plane-2>button>svg:nth-of-type(2)").style.opacity="1";
                State.planeSize = "medium"
                break;
            case "big":
                document.querySelector("#menu-plane-3>button>svg:nth-of-type(2)").style.opacity="1";
                State.planeSize = "big"
                break;
            default:
                console.log("unknown size.")
        }

        this.setState(State)

    }
    /*SETUP CANVAS*/

    /*LOGS*/
    activateLogsListener(){
        this.database.ref(`rooms/${this.roomId}/game/logs`).on('value',(snapshot)=> {
            const logs = snapshot.val()
            const gameLogs = document.getElementById("game-logs")


            if(typeof logs !== "string")
            {
                const  log = logs[logs.length-1]
                switch (log.type) {
                    case "plane-set":
                        var message = `${log.log[0] === this.whoAmI ? "You " : "The enemy "} set up a plane. ${log.log[0] === this.whoAmI ? "You have" : "He has"} ${log.log[1]} more plane(s) to set up.`;
                        var id = "log"+datify(new Date()).split("-")[1].replaceAll(":","")
                        gameLogs.insertAdjacentHTML('beforeend',`<p id="${id}">${message}</p>`)
                        var HtmlLog = document.getElementById(id);
                        setTimeout(()=>{
                            HtmlLog.style.transform = "translateY(0)";
                        },100)
                        setTimeout(()=>{
                            HtmlLog.style.transform = "translateY(-150%)"
                            HtmlLog.style.opacity = "0";
                            setTimeout(()=>{
                                HtmlLog.remove()
                            },1100)
                        },8000)
                        break;
                    default:
                        console.log("Log type unknown:", log.type)


                }
            }

        })
    }
    /*LOGS*/

    /*AUX*/
    refreshDb(){

        var updates = {}

        updates[`rooms/${this.roomId}`] = {
            chat:"",
            config:{
                attacks: [0,1],
                canvasSize: 10,
                chat: true,
                fleet:[1,1,1],
                numberOfAirplanes: 3
            },
            game:{
                createdAt: "4/5/2021-14:20:148",
                gameStatus: 101,
                logs: "",
                planePositions:"",
            }
        };
        this.database.ref().update(updates);
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

                               <AreYouSure text="You are about to set a plane on the selected spot."
                               btn1Text="Proceed"
                               btn1Event={()=>{this.confirmPlacePlane()}}
                               btn2Text="Cancel"
                               btn2Event={()=>{this.closeAreYouSure()}}/>

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

                            <div id="game-canvas-container">
                                <div className="game-canvas" id="setup-canvas">
                                    <div className="canvas-letters"></div>
                                    <div className="canvas-numbers"></div>
                                </div>
                                {/*<div className="game-canvas" id="my-canvas"></div>*/}
                                {/*<div className="game-canvas" id="enemy-canvas"></div>*/}
                            </div>

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

                                <div className="footerObj" id="game-menu-container">
                                    <div id="game-logs">
                                    </div>
                                    <div id="game-menu">
                                        {
                                            this.state.remainingFleet[0] > 0 &&
                                            <GameMenuButton title="Small plane" info={this.state.remainingFleet[0] + " left"} icon="menu-plane-1" event={()=>{this.changePlaneSize("small")}}/>
                                        }
                                        {
                                            this.state.remainingFleet[1] > 0 &&
                                            <GameMenuButton title="Medium plane" info={this.state.remainingFleet[1] + " left"} icon="menu-plane-2" event={()=>{this.changePlaneSize("medium")}}/>
                                        }
                                        {
                                            this.state.remainingFleet[2] > 0 &&
                                            <GameMenuButton title="Big plane" info={this.state.remainingFleet[2] + " left"} icon="menu-plane-3" event={()=>{this.changePlaneSize("big")}}/>
                                        }



                                        <GameMenuButton title="" info="" icon="menu-rotate-right"  event={()=>{this.menuRotateRight()}}/>
                                        <GameMenuButton title="" info="" icon="menu-rotate-left" event={()=>{this.menuRotateLeft()}}/>
                                    </div>
                                </div>
                                <div className="footerObj">
                                    <button onClick={()=>{this.refreshDb()}}>REFRESH DATABASE</button>
                                </div>
                            </div>
                        </div>
                }

            </section>
            </>)
    }
}

export default GamePage;