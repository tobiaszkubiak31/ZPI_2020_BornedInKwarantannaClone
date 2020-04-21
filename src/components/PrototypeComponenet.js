import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import { taxstate } from "./fakeData.js";
import { validateNumber, validateChosenOptions } from '../utils/ValidatingFunctions';

export default class PrototypeComponent extends React.Component {
  state = {
    chosenState: "",
    chosenProduct: "",
    inputField: 0.0,
    buyingFor: 0.0,
    margin: 0.0,
    errorMessage: "",
    answer: ""
  };

  onChangeState = (e) => {
    this.setState({ chosenState: e.target.value });
  };

  onChangeProduct = (e) => {
    this.setState({ chosenProduct: e.target.value });
  };

  onChangeInputField = (e) => {
    this.setState({ inputField: e.target.value });
  };

  onChangeBuyingFor = (e) => {
    this.setState({ buyingFor: e.target.value });
  };

  getTaxCoef = (statee, product) => {
    var taxstates = taxstate;
    for (var property of Object.entries(taxstates)) {
      if (property[1].name === statee) {
        for (var element in property[1]) {
          if (element === product) {
            return property[1][element];
          }
        }
      }
    }

    this.setState({ errorMessage: "Blad podczas obliiczen podatku" });
  };

  onButtonClick = (e) => {
    if (validateNumber(this.state.inputField)
        && validateChosenOptions(this.state.chosenState,this.state.chosenProduct)) {
      let taxCoefficient =
        this.getTaxCoef(this.state.chosenState, this.state.chosenProduct) + 1;
      let prizeWithoutTax = (this.state.inputField / taxCoefficient).toFixed(2);
      let tax =(this.state.inputField - prizeWithoutTax).toFixed(2);
      let margin = (this.state.inputField / taxCoefficient).toFixed(2) - this.state.buyingFor;
      this.setState({
        answer:
          "Cena bez podatku: " + prizeWithoutTax + ", podatek wynosi: " + tax + "marża: "+ margin,
      });
    } else {
      //validacja sie nie powiodla
      //aktualizacja stanu zmiennej na informujaca o bledzie
      this.setState({ errorMessage: "Niepoprawne dane wejsciowe!" });
    }
  };

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
                <FormControl variant="outlined">
                  <InputLabel>State</InputLabel>
                  <Select
                    data-testid='select-state'
                    native
                    value={this.chosenState}
                    onChange={this.onChangeState}
                  >
                    <option aria-label="None" value="" />
                    <option value={taxstate[0].name}>{taxstate[0].name}</option>
                    <option value={taxstate[1].name}>{taxstate[1].name}</option>
                    <option value={taxstate[2].name}>{taxstate[2].name}</option>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs>
                <FormControl variant="outlined">
                  <InputLabel>Product </InputLabel>
                  <Select
                    data-testid='select-product'
                    native
                    value={this.chosenProduct}
                    onChange={this.onChangeProduct}
                  >
                    <option aria-label="None" value="" />
                    <option value={"base"}>Base</option>
                    <option value={"groceries"}>groceries</option>
                    <option value={"clothing"}>clothing</option>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs>
                {/*Proponowane przeze mnie miejsce na rozwijane menu wyboru produktu.*/}
              </Grid>

              <Grid item xs>
                {/*Proponowane przeze mnie miejsce do wpisywania ceny.*/}
                <TextField
                  data-testid='after-taxes-input'
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
                {/*Proponowane przeze mnie miejsce do wpisywania ceny.*/}
                <TextField
                  data-testid='buying-for-input'
                  variant="outlined"
                  margin="normal"
                  id="buying_for"
                  label="buying_for"
                  name="buying_for"
                  value={this.buyingFor}
                  onChange={this.onChangeBuyingFor}
                />
              </Grid>

              <Grid item xs>
                <Button
                  data-testid='submit'
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
          <p>{this.state.answer}</p>
          <p>{this.state.errorMessage}</p>
        </div>
      </Container>
    );
  }
}

