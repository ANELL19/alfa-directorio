import React, { Component } from 'react'

import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";

class Panel extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        inputFields: [{ 
          firstName: '',
          lastName: '' 
        }]
      }
    }

    componentWillMount(){
     
    }
      
     handleAddFields = () => {
      const values = [...this.state.inputFields];
      values.push({ firstName: '', lastName: '' });
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
      } else {
        values[index].lastName = event.target.value;
      }
  
      this.setState({inputFields:values});
    };
  
     handleSubmit = e => {
      e.preventDefault();
      console.log("inputFields", this.state.inputField);
    };

    
  
    
  
    render() {
      return (
        <>
        <h1>Dynamic Form Fields in React</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            {this.state.inputFields.map((inputField, index) => {
              console.log(inputField)
              return(
                <React.Fragment key={`${inputField}${index}`}>
                <div className="form-group col-sm-6">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={inputField.firstName}
                    onChange={event => this.handleInputChange(index, event)}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text" 
                    className="form-control" 
                    id="lastName"
                    name="lastName"
                    value={inputField.lastName}
                    onChange={event => this.handleInputChange(index, event)}
                  />
                </div>
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
              
            })}
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
            {JSON.stringify(this.state.inputFields, null, 2)}
          </pre>
        </form>
      </>
      );
    }
  }
  export default Panel