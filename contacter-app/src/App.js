import landline from './img/landline.png'
import addcontact from './img/addcontact.png'
import './App.css';
import React, { useState } from 'react';
import Popup from './AddContactFormPopout';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';

//  function handleSubmit() {
//     let databody = {
//         "name": this.state.nameIn,
//         "quote": this.state.quoteIn
//     }

//     return fetch('http://localhost:5002/stored', {
//         method: 'POST',
//         body: JSON.stringify(databody),
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//     .then(res => res.json())
//     .then(data => console.log(data)); 
//   }

class App extends React.Component {

  state = {
    isAddOpen: false,
    isContactOpen: false,
    contacts: [],
    index: 0,
    nameToPost: '',
    emailToPost: '',
    genderToPost: '',
    numberToPost: '',  
  }

  toggleAddContact = () => {
    this.setState({isAddOpen: !this.state.isAddOpen});
  }
  toggleShowContact = () => {
    this.setState({isContactOpen: !this.state.isContactOpen});
  }

  increaseIndex = () => {
    if (this.state.index < this.state.contacts.length - 1) this.setState({index: this.state.index + 1});
  }

  decreaseIndex = () => {
    if (this.state.index > 0) this.setState({index: this.state.index - 1});
  }

  componentDidMount = () => {
    this.getContacts();
  }

  getContacts = () => {
    axios.get('https://contacter-saver.herokuapp.com/api/contacts')
      .then((response) => {
        const data = response.data.data;
        // var arr = []; 
        // for(var i in data)
        //     arr.push(data[i]);
        this.setState({contacts: data});
        console.log("Data recevived!");
        console.log(this.state.contacts);
      }).catch(() => {
        alert("Error receive data!");
      });
  }

  postContacts = () => {
    axios.post('https://contacter-saver.herokuapp.com/api/contacts', {
      name: this.state.nameToPost,
      email: this.state.emailToPost,
      gender: this.state.genderToPost,
      phone: this.state.numberToPost
    })
      .then((r) => {
        console.log(r);
        this.getContacts();
      }).catch(() => {
        alert("Error sending data!");
      });
  }

  // displayContacts = (contacts) => {
  //   // console.log("test: " + contacts[0].name);
  //   // console.log("test2: " + this.state.contacts);
  //   // if (!contacts.length) return null;
  //   // return contacts.map((contact, index) => {
  //   //   console.log("test4: " + contact.email);
  //   //   // <div key={index} className="Formfield">
  //   //   //   <p>hi</p>
  //   //   //   {/* <label className="Label">{contact.email}</label>
  //   //   //   <label className="Label">{contact.gender}</label>
  //   //   //   <label className="Label">{contact.phone}</label> */}
  //   //   // </div>
  //   // })

  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a
            className="App-title"
          >
            Welcome to contacter-saver!
          </a>
          <div className="buttonDiv">
            <button className="Contact-button" onClick={this.toggleShowContact}>
              <img src={landline} className="App-contact-logo" alt="landline" />
            </button> 
            {this.state.isContactOpen && <form className="Form">
              <div className="CrossButton">
                <Button variant="close" onClick={this.toggleShowContact}></Button>
              </div>
              <div className="Formfield">
              <label className="Label">Name: {this.state.contacts[this.state.index].name}</label>
              </div>
              <div className="Formfield">
              <label className="Label">Email: {this.state.contacts[this.state.index].email}</label>
              </div>
              <div className="Formfield">
              <label className="Label">Gender: {this.state.contacts[this.state.index].gender}</label>
              </div>
              <div className="Formfield">
              <label className="Label">Phone: {this.state.contacts[this.state.index].phone}</label>
              </div>
              <div className="NavigationButtons">
                <Button variant="secondary" className="NavigationButtonLeft" onClick={this.decreaseIndex}>Previous</Button>
                <Button variant="secondary" className="NavigationButtonRight" onClick={this.increaseIndex}>Next</Button>
              </div>
              
            </form> 
            }
            {this.state.isAddOpen && <form className="Form">
              <div className="CrossButton">
                <Button variant="close" onClick={this.toggleAddContact}></Button>
              </div>
              <div className="Formfield">
              <label className="Label">Enter contact name:<input placeholder="Alvin" className="FormInputField" onChange={event => this.setState({nameToPost: event.target.value})}></input></label>
              </div>
              <div className="Formfield">
              <label className="Label">Enter email:<input placeholder="alvin@gmail.com" className="FormInputField" onChange={event => this.setState({emailToPost: event.target.value})}></input></label>
              </div>
              <div className="Formfield">
              <label className="Label">Enter contact gender:<input placeholder="Male" className="FormInputField" onChange={event => this.setState({genderToPost: event.target.value})}></input></label>
              </div>  
              <div className="Formfield">
              <label className="Label">Enter contact phone:<input placeholder="94337633" className="FormInputField" onChange={event => this.setState({numberToPost: event.target.value})}></input></label>
              </div>
              <Button variant="dark" className="btn-primary" onClick={this.postContacts}>Submit</Button>
            </form>
            }
            <button className="Contact-button" onClick={this.toggleAddContact}>
              <img src={addcontact} className="App-contact-logo" alt="addcontact"></img>
            </button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
