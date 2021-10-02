import landline from './img/landline.png'
import addcontact from './img/addcontact.png'
import './App.css';
import React, { useState } from 'react';
import Popup from './AddContactFormPopout';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

function App() {
  const [isAddOpen, setAddOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);
  const toggleAddContact = () => {
    setAddOpen(!isAddOpen);
  }
  const toggleShowContact = () => {
    setContactOpen(!isContactOpen);
  }

  function handleSubmit() {
    let databody = {
        "name": this.state.nameIn,
        "quote": this.state.quoteIn
    }

    return fetch('http://localhost:5002/stored', {
        method: 'POST',
        body: JSON.stringify(databody),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => console.log(data)); 
  }

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-title"
        >
          Welcome to contacter-saver!
        </a>
        <div className="buttonDiv">
          <button className="Contact-button" onClick={toggleShowContact}>
            <img src={landline} className="App-contact-logo" alt="landline" />
          </button> 
          {isContactOpen && <form className="Form">
            <div className="CrossButton">
              <Button variant="close" onClick={toggleShowContact}></Button>
            </div>
            <div className="Formfield">
            <label className="Label">Name:<input className="FormInputField"></input></label>
            </div>
            <div className="Formfield">
            <label className="Label">Enter email:<input className="FormInputField"></input></label>
            </div>
            <div className="Formfield">
            <label className="Label">Enter contact gender:<input className="FormInputField"></input></label>
            </div>  
            <div className="Formfield">
            <label className="Label">Enter contact phone:<input className="FormInputField"></input></label>
            </div>
            <Button variant="dark" type="submit" className="btn-primary">Submit</Button>
          </form>
          }
          {isAddOpen && <form className="Form">
            <div className="CrossButton">
              <Button variant="close" onClick={toggleAddContact}></Button>
            </div>
            <div className="Formfield">
            <label className="Label">Enter contact name:<input className="FormInputField"></input></label>
            </div>
            <div className="Formfield">
            <label className="Label">Enter email:<input className="FormInputField"></input></label>
            </div>
            <div className="Formfield">
            <label className="Label">Enter contact gender:<input className="FormInputField"></input></label>
            </div>  
            <div className="Formfield">
            <label className="Label">Enter contact phone:<input className="FormInputField"></input></label>
            </div>
            <Button variant="dark" type="submit" className="btn-primary">Submit</Button>
          </form>
          }
          <button className="Contact-button" onClick={toggleAddContact}>
            <img src={addcontact} className="App-contact-logo" alt="addcontact"></img>
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
