import React from 'react'
import Typography from '@material-ui/core/Typography';

export default function ResultComponent(props) {
    return (
      <div >     
        <Typography variant="h1" component="h2">
            <p>Caluculated value : {props.outputValue} </p>
        </Typography>
      </div>
    );

  }