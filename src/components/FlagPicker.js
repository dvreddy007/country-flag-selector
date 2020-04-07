import React, { Component } from 'react';
import '../css/flagpicker.css';
import ReactCountryFlag from "react-country-flag"
import ShowImage from './ShowImage'
// import Flag from 'react-world-flags'


let ALLDATA = require('./continents.json');
let CONTINENTS = ALLDATA.map(element => element['continent']);
let COUNTRIES = [];
let contArr = [];
let flag="";
let appendFlag = [];
let continent_to_be_set;
let continentArr = [];
let initialflag = "";
let showCStep = false;
let showCCodeStep = false;



class CountryFlagPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      continent: "",
      continent_dropdown: null,
      final_continent: "",
      country: "",
      currflag:[],
      country_dropdown: null,
      final_countries: [],
      showCStep: false,
      showCCodeStep: false
    }
  }

  generateContinentDropDown(value) {
    let all_continents = CONTINENTS.filter(element => (element.toLowerCase().includes(value.toLowerCase())));
    let elements = all_continents.map((element) => {
      return (<div className="continent" key={Math.random()}>
        <div  onClick={this.setContinent.bind(this)} continent_val={element}>{element}</div>
      </div>);
    }); 
    this.setState({
      continent_dropdown: elements      
    });
  }
  setContinent(event) {
    let continent_to_be_set = event.target.getAttribute("continent_val");
    contArr = []
    for(let i in ALLDATA){
      //console.log(obj)
      if(ALLDATA[i].continent === continent_to_be_set){
        continentArr.push(continent_to_be_set)
        COUNTRIES = ALLDATA[i].countries;
        console.log(COUNTRIES)
        for(let j in COUNTRIES){        
         const name = COUNTRIES[j].name;
          contArr.push(name)
          console.log(contArr)
        }
      }
    }
    this.setState({
      final_continent: continent_to_be_set,
      showCStep: true
    });
  }
  handleContinentChange(event) {
    let curr_value = event.target.value;     
    this.setState({
      continent: curr_value
    }, ()=> {
      this.generateContinentDropDown(curr_value);
    })
  }
  handleCountryChange(event) {
    let curr_contr_value = event.target.value;
    this.setState({
      country: curr_contr_value
    }, () => {
      this.createCountryList(curr_contr_value);
      console.log(this.state.country);
    });
  }
  createCountryList(value) {
    let slected_countries = contArr.filter(element => (element.toLowerCase().includes(value.toLowerCase())));
    let elements = slected_countries.map((element) => {
      return (<div key={Math.random()}>
        <div className="country"><input type="checkbox" value={element} onClick={this.setCountry.bind(this)} country_val={element}/>
        {element}</div>
      </div>);
    });
    this.setState({
      country_dropdown: elements
    });
  }  
  setCountry(event) {
    let country_to_be_set = event.target.getAttribute("country_val");

    let continent = continentArr[0]
    
    for(let i in ALLDATA){
      //console.log(obj)
      if(ALLDATA[i].continent === continent){
        //COUNTRIES = ALLDATA[i].countries;
        //console.log(country_to_be_set)
        for(let j in COUNTRIES){
          if(COUNTRIES[j].name === country_to_be_set){                      
            appendFlag.push(COUNTRIES[j].flag) 
            appendFlag.reduce((unique, item) => {
            return unique.includes(item) ? unique : [...unique, item]}, [])
          }
        }
      }
    }
    this.setState({          
      currflag: appendFlag.map(item => item.toLowerCase()),
      showCCodeStep: true
  })  
   console.log(this.state.currflag)
}
resetForm = () => {
   this.setState({
     currflag:[]
   }
   );
 }


render() {
  return (
    <div className="wrapper">  
    <header className="header"><p className="title">Flag Picker</p><p className="subtitle">This app will help you to learn flags around the world in 3 steps</p></header>
      <section className="content">
        <div className="columns">
          <aside className="sidebar-first">
           <div className="iofuncdiv">   
            <div className="Step1">
              <h1> Step 1 </h1>
              <h4> Select a continent. </h4>
            </div>
            <input className = "continentinput" type="text" placeholder = {"Continent"} value = {this.state.continent} onKeyDown = {this.handleContinentChange.bind(this)} onChange = {this.handleContinentChange.bind(this)} />
            <div className= "dropdowncontinent">{this.state.continent_dropdown}</div>
            <div className = "continentText">You selected: </div>
            <div className ="continentSelected" >{this.state.final_continent}</div>
          </div> 
        </aside>      
        <aside className="sidebar-second" style={this.state.showCStep ? {visibility:'visible'}:{visibility:'hidden'}}>
          <div className="iofuncdiv">
            <div className="Step2">
              <h1> Step 2 </h1>
              <h4> Now, select a country. </h4>
            </div>
            <input className = "countryinput" type="text" placeholder = {"Country"} value = {this.state.country} onKeyDown={this.handleCountryChange.bind(this)} onChange = {this.handleCountryChange.bind(this)} />
            <div className = "dropdowncountry">{this.state.country_dropdown}</div>
          </div>
        </aside>
        <aside className="sidebar-three" style={this.state.showCCodeStep ? {visibility:'visible'}:{visibility:'hidden'}}>
          <div className = "flagText">
              <h1> Selected Flags: </h1>
              <div className="flag">{this.state.currflag.map(code => <ShowImage ccode={code.toLowerCase()}/>)} {this.state.currflag}</div>
              <button className ="button" onClick={this.resetForm}>Clear flags</button>
            </div>
        </aside>
      </div>
      </section>
    </div>      
    );
  }
}

export default CountryFlagPicker;