import React, {Component} from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Polizas  from '../administradorAlfa/cotizaciones'


class check extends Component {
    constructor(props){
        super(props)
        this.state={

          
        }
    }

    render(){
        // let cotizaciones;
        // cotizaciones = <div></Polizas>< /div>
        
            
        
        
        return(
            <FormControl component="fieldset">
      <FormLabel component="legend">Servicios</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
        //   value="top"
          control={<Checkbox color="primary" />}
          label="Top"
          labelPlacement="top"
        />
        </FormGroup>
      <FormLabel component="legend">Polizas</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
        //   value="top"
          control={<Checkbox color="primary" />}
        //   label="Top"
          labelPlacement="top"
        >
            {/* {cotizaciones} */}
            </FormControlLabel>
         </FormGroup>
        </FormControl>
        )
    }
}export default check