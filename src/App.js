import React, {Component} from 'react';
import MainPage from "./main-page/main-page";
import ConfigPage from "./config-page/config-page";
import GamePage from "./game-page/game-page";
import "./App.css";
import "./vars.css";


class App extends Component{
  // eslint-disable-next-line
  constructor() {
    super();
    this.state = {
      activePage: 2
    }
  }

  componentDidMount() {
    const href = window.location.href
    var State = this.state
    if(href.includes("#gameroom")){
      State.activePage = 3
    }
    else if(href.includes("#config")) {
      State.activePage = 2
    }
    else {
      State.activePage = 1
    }
    this.setState(State)
  }

  changePage = (id) =>{
    var State = this.state;
    const oldPage = State["activePage"];
    console.log("Old page:",oldPage,"| new page:",id)
    State.activePage = id;
    document.getElementById("page-"+oldPage).style.transform = "translateX(-100%)";

    setTimeout(()=>{
      this.setState(State);
      document.getElementById("page-"+id).style.opacity = 0;
      setTimeout(()=>{
        document.getElementById("page-"+id).style.opacity = 1;
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      },200);
    },600)

  }

  render(){
    return(<>
      {
        this.state.activePage === 1 &&
        <MainPage changePage={this.changePage} />
      }

      {
        this.state.activePage === 2 &&
        <ConfigPage changePage={this.changePage}/>
      }

      {
        this.state.activePage === 3 &&
        <GamePage/>
      }
      </>)
  }
}

export default App;
