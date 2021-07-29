
import React, { Component } from 'react'
import {  MDBRow, MDBCol } from 'mdbreact';
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";

class Check extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        inputFields: [{ 
          firstName: '',
          lastName: '',
          precio: '',
         
        }] ,
        Datos:[] 
      }      
    }

     handleAddFields = () => {
      const values = [...this.state.inputFields];
      values.push({ firstName: '', lastName: '' , precio:''});
      this.setState({inputFields:values})  
    };
  
     handleRemoveFields = index => {
      const values = [...this.state.inputFields];
      values.splice(index, 1);
      this.setState({inputFields:values});
    };
  
     handleInputChange = (index, event) => {
      const values = [...this.state.inputFields];
      if (event.target.name === "firstName") {
        values[index].firstName = event.target.value;
      }
       else if (event.target.name === "lastName") {
        values[index].lastName = event.target.value;
      }
      // if (event.target.name === "precio") {
      //   values[index].precio = event.target.value;
      // }
      else  {
        values[index].precio = event.target.value;
      }

      // values[index].precio = event.target.value;
  
      this.setState({inputFields:values});
    };
  
     handleSubmit = e => {
      e.preventDefault();
      console.log("inputFields",this.state.inputFields);
    };
    // this.state.inputField.map

    render() {
      return (
        <>       
        <MDBRow>
          <MDBCol>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            {this.state.inputFields.map((inputField, index) => {             
              // console.log("est es estado",({Datos:this.state.inputFields}))
              // console.log("esto es index",index)
              return( 
                <React.Fragment key={`${inputField}${index}`}>

                <div className="form-group col-sm-3">
                  <label htmlFor="firstName">Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={inputField.firstName}
                    onChange={event => this.handleInputChange(index, event)}
                  />
                </div>
                <div className="form-group col-sm-3">
                  <label htmlFor="lastName">precio</label>
                  <input
                    type="text" 
                    className="form-control" 
                    id="lastName"
                    name="lastName"
                    value={inputField.lastName}
                    onChange={event => this.handleInputChange(index, event)}
                  />
                </div>
                {/* <div className="form-group col-sm-3">
                  <label htmlFor="precio">precio</label>
                  <input
                    type="text" 
                    className="form-control" 
                    id="precio"
                    name="precio"
                    value={inputField.precio}
                    onChange={event => this.handleInputChange(index, event)}
                  />
                </div> */}
                <div className="form-group col-sm-2">
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => this.handleRemoveFields(index)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => this.handleAddFields()}
                  >
                    +
                  </button>
                </div>

            
              </React.Fragment>
              )
              }
               )} 
          </div>
          <div className="submit-button">
            <button
              className="btn btn-primary mr-2"
              type="submit"
              onSubmit={this.handleSubmit}
            >
              Save
            </button>
          </div>
          <br/>
          <pre>
            {/* {JSON.stringify(this.state.inputFields,null,2)}             */}
          </pre>
        </form>
        </MDBCol>
        </MDBRow>
      </>
      );
    }
  }
  export default Check