import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

export default class PrototypeComponent extends React.Component {

    state = {
        chosenState: "Alaska",
        chosenProduct: "Onion",
        inputField: 0.00,
        errorMessage: "",
        answer: ""
    }

    onChangeState = e => {
        this.setState({ chosenState: e.target.value})
    }

    onChangeProduct = e => {
        this.setState({ chosenProduct: e.target.value})
    }

    onChangeInputField = e => {
        this.setState({ inputField: e.target.value})
    }

    onButtonClick = e => {
        if(this.validate()) {
            // UZUPELNIC!!!
            // tutaj obliczenie wartosci w zaleznosci od wybranego stanu, produktu i ceny
            // i wpisanie wyniku do zmiennej answer, this.setState({answer: xD})
            this.setState({errorMessage: ""})
        } else {
            //validacja sie nie powiodla
            //aktualizacja stanu zmiennej na informujaca o bledzie
            this.setState({errorMessage: "Niepoprawne dane wejsciowe!"})
        }
    }

    validate() {
        let prize = parseFloat(this.state.inputField)
        let isValid = false

        if(!isNaN(prize) && prize > 0)
        {
            isValid = true
        }

        return isValid
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
                                <FormControl variant="outlined" >
                                    <InputLabel>State</InputLabel>
                                    <Select
                                        native
                                        value={this.chosenState}
                                        onChange={this.onChangeState}
                                    >
                                    <option aria-label="None" value="" />
                                    <option value={'Alaska'}>Alaska</option>
                                    <option value={'Kansas'}>Kansas</option>
                                    <option value={'Mississippi'}>Mississippi</option>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs>
                                <FormControl variant="outlined" >
                                    <InputLabel>State</InputLabel>
                                    <Select
                                        native
                                        value={this.chosenProduct}
                                        onChange={this.onChangeProduct}
                                    >
                                    <option aria-label="None" value="" />
                                    <option value={'Alaska'}>Alaska</option>
                                    <option value={'Kansas'}>Kansas</option>
                                    <option value={'Mississippi'}>Mississippi</option>
                                    </Select>
                                </FormControl>
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
                                    value={this.inputField}
                                    onChange={this.onChangeInputField}
                                />
                            </Grid>

                            <Grid item xs>
                                <Button
                                    variant="contained"   
                                    color="primary" 
                                    onClick={this.onButtonClick}
                                >
                                    Oblicz
                                </Button>
                            </Grid>

                        </Grid>
                    </form>

                    {/*Proponowane przeze mnie miejsce na odpowiedź.*/}
                    <p>Zmienna answer</p>
                    <p>{this.state.errorMessage}</p>
                </div>
            </Container>
        )
    }

}