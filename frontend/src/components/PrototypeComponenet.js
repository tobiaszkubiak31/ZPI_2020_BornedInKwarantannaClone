import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import { taxstate } from "./fakeData.js";
import { validateNumber, validateChosenOptions } from '../utils/ValidatingFunctions';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  grid: {
    padding: theme.spacing(5)
  },
  gridElement: {
    margin: '2%',
    width: '90%'
  },
  paper: {
    padding: theme.spacing(5,2,2,2),
    //display: 'flex',
    flexWrap: 'wrap',

  },
});

class PrototypeComponent extends React.Component {
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
      let margin = ((this.state.inputField / taxCoefficient) - this.state.buyingFor).toFixed(2);
      this.setState({
        answer:
          "Cena bez podatku: $" + prizeWithoutTax + "\nPodatek wynosi: $" + tax + "\nMarża: $"+ margin,
      });
    } else {
      //validacja sie nie powiodla
      //aktualizacja stanu zmiennej na informujaca o bledzie
      this.setState({ errorMessage: "Niepoprawne dane wejsciowe!" });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" fixed>
        <div>
          <Typography component="h1" variant="h4">
            Tax Calculator
          </Typography>

          {/*Nasz formularz*/}
          <form noValidate>
            <Grid container >
              
              <Grid element xs='5' className={classes.grid}>
                <Paper elevation={3} className={classes.paper}>
                  <FormControl variant="outlined" className={classes.gridElement}>
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
                
                  <FormControl variant="outlined" className={classes.gridElement}>
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

                  <TextField
                    className={classes.gridElement}
                    data-testid='after-taxes-input'
                    variant="outlined"
                    id="text"
                    label="Customer price"
                    name="text"
                    value={this.inputField}
                    onChange={this.onChangeInputField}
                  />
                
                  <TextField
                    className={classes.gridElement}
                    data-testid='buying-for-input'
                    variant="outlined"
                    id="buying_for"
                    label="Wholesale price"
                    name="buying_for"
                    value={this.buyingFor}
                    onChange={this.onChangeBuyingFor}
                  />

                  <Button
                    className={classes.gridElement}
                    data-testid='submit'
                    variant="contained"
                    color="primary"
                    onClick={this.onButtonClick}
                  >
                    Oblicz
                  </Button>
                </Paper>
              </Grid>

              <Grid element xs='5' className={classes.grid}>
                <Typography component="h1" variant="h5">
                  {/* pre zachowuje nowe linie, zmienia tez czcionke, 
                  trzeba to w przyszlosci wywalic*/}
                  <pre>
                    <p>{this.state.answer}</p>
                    <p>{this.state.errorMessage}</p>
                  </pre>
                </Typography>
              </Grid>

            </Grid>
          </form>
          
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(PrototypeComponent)