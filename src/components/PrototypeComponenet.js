import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ResultComponent from './ResultComponent.js'

export default class PrototypeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {result : 0};
      }


    render() {
        return (
            //Container to nasz glowny pojemnik
            <Container component="main" fixed>
                <div>
                    {/*To jest jakiś tytuł.*/}
                    <Typography component="h1" variant="h5">
                        Prototyp aplikacji 1.0
                    </Typography>

                    {/*Nasz formularz*/}
                    <form noValidate>
                        {/*Grid pozwala umiescic elementy obok siebie.*/}
                        <Grid container>

                            <Grid item xs>
                                {/*Proponowane przeze mnie miejsce na rozwijane menu wyboru stanu.*/}
                            </Grid>

                            <Grid item xs>
                                {/*Proponowane przeze mnie miejsce na rozwijane menu wyboru produktu.*/}
                            </Grid>

                            <Grid item xs>
                                {/*Proponowane przeze mnie miejsce do wpisywania ceny.*/}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    id="text"
                                    label="input"
                                    name="text"
                                />
                            </Grid>

                            <Grid item xs>
                                <Button
                                    variant="contained"   
                                    color="primary" 
                                >
                                    Przycisk
                                </Button>
                            </Grid>

                        </Grid>
                    </form>

                    {/*Proponowane przeze mnie miejsce na odpowiedź.*/}
                    <ResultComponent outputValue={this.state.result}/>
                    
                </div>
            </Container>
        )
    }

}