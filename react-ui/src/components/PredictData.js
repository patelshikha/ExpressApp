import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function UserData() {

  const [userValues, setValues] = useState({ sLength: '', sWidth: '', pLength: '', pWidth: '', epochs: '', learningRate: '' });
  const [showLoading, setShowLoading] = useState(false);
  const [data, setData] = useState({});
  const [output, setOutput] = useState(false);
  const apiUrl = "http://localhost:3000/manualData"
  
  const runUserModel = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { sLength: userValues.sLength, sWidth: userValues.sWidth, pLength: userValues.pLength, pWidth: userValues.pWidth, epochs: userValues.epochs, learningRate: userValues.learningRate };
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        
        setData(result.data);
        setOutput(true);
      }).catch((error) => setShowLoading(false));
  };
  const onChange = (e) => {
    e.persist();
    setValues({ ...userValues, [e.target.name]: e.target.value });
  }

  return (
    <div>
      {showLoading &&
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }
      <center><b><h1 style={{marginTop:"20px",marginLeft:"20px"}}> Please Enter the following data:</h1></b></center>
      <center><Jumbotron style={{ padding: 0,width:"50%", marginTop:"23px",background: "white" }}>
      <div style={{backgroundColor:"#6CAED9"}}>
        <Form onSubmit={runUserModel}>
        <Form.Group>
                <b><Form.Label> Sepal Length </Form.Label></b>
                <Form.Control style={{width:"50%"}} type="text" name="sLength" id="sLength" placeholder="Please Enter Sepal Length" value={userValues.sLength} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <b><Form.Label> Sepal Width</Form.Label></b>
                <Form.Control style={{width:"50%"}} type="text" name="sWidth" id="sWidth" placeholder="Please enter sepal width" value={userValues.sWidth} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <b><Form.Label> Petal Length</Form.Label></b>
                <Form.Control style={{width:"50%"}} type="text" name="pLength" id="pLength" placeholder="Please enter petal Length" value={userValues.pLength} onChange={onChange} />
              </Form.Group>

              <Form.Group>
               <b> <Form.Label> Petal Width</Form.Label> </b>
                <Form.Control style={{width:"50%"}} type="text" name="pWidth" id="pWidth" placeholder="Please enter petal Width" value={userValues.pWidth} onChange={onChange} />
              </Form.Group>

              <Form.Group>
               <b> <Form.Label> Epoch</Form.Label> </b>
                <Form.Control style={{width:"50%"}} type="text" name="epochs" id="epochs" placeholder="Please enter epochs" value={userValues.epochs} onChange={onChange} />
              </Form.Group>

              <Form.Group>
               <b> <Form.Label> Learning Rate</Form.Label> </b>
                <Form.Control style={{width:"50%"}} type="text" name="learningRate" id="learningRate" placeholder="Please enter learning rate" value={userValues.learningRate} onChange={onChange} />
              </Form.Group>   
             
          <Button style={{backgroundColor:"black",width:"20%",color:"white"}} variant="primary" type="submit">
            Predict
              </Button>
        </Form>
        </div>
      </Jumbotron></center>

      <center>
      {output && !showLoading &&
       <Table style={{paddingLeft:"50px",width:"80%", marginTop:30}} striped bordered variant="dark" responsive="lg">
          <thead>
            <tr>
              <th>Types</th>
              <th>Prediction Values</th>
            </tr>
          </thead>
         <tbody>
            <tr>
              <td>
                Setosa
              </td>
              <td>
                {data.row1[0]}
              </td>
            </tr>
            <tr>
              <td>
                virginica
              </td>
              <td>
                {data.row1[1]}
              </td>
            </tr>
            <tr>
              <td>
                Versicolor
              </td>
              <td>
                {data.row1[2]}
              </td>
            </tr>
          </tbody>
        </Table>
      }
      </center>
    </div>
  );
}
export default UserData;