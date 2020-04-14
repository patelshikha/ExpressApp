import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import TrainData from './components/TrainData';
import PredictData from './components/PredictData';
import img from './images/AI2.jpg';

function App() {

  return (
    <div style={{backgroundColor:"#6CAED9"}}>
    <Router>
      <Navbar bg="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav  variant="pills" className="mr-auto">
            
            <b><Nav.Link style={{color:"white"}} href="/prediction">Train Data</Nav.Link></b>
            <b><Nav.Link style={{color:"white"}} href="/userData">Predict Data</Nav.Link></b>
          </Nav>
          <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
        </Navbar.Collapse>
      </Navbar>
      <div style={{paddingTop:"30px"}}>
            <center><h2> Lab Assignment 4 - Shikha Patel</h2>
           <b> <h3> Data - IRIS.json</h3> </b> </center> 
        </div>
      <div>
      <center><img style={{ marginTop:50, resizeMode: "cover",
            height: 500,
            width: 900}} src={img} /></center>
      </div>
      

      
      <div>
          
          <Route render ={()=> < TrainData />} path="/prediction" />
          <Route render ={()=> < PredictData />} path="/userData" />
      </div>
      

    </Router>
    
    </div>
  );
}
export default App;
