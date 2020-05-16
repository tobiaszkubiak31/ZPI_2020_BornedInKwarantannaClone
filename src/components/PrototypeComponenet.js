import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { taxstate } from "./fakeData.js";
import { validateNumber, validateProduct } from '../utils/ValidatingFunctions';
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
    flexWrap: 'wrap',

  },
  table: {
    minWidth: 550,
  }
});

class PrototypeComponent extends React.Component {
  state = {
    chosenProduct: "",
    customerPrice: 0.0,
    wholesalePrice: 0.0,
    margin: 0.0,
    errorMessage: "",
    answers: [],
    products: [
      { title: 'base'},
      { title: 'groceries'},
      { title: 'clothing'}
    ]
  };

  onChangeState = (e) => {
    this.setState({ chosenState: e.target.value });
  };

  onChangeCustomerPrize = (e) => {
    this.setState({ customerPrice: e.target.value });
  };

  onChangeWholesalePrice = (e) => {
    this.setState({ wholesalePrice: e.target.value });
  };

  formatColor = (number) => {
    if(number > 0) {
      return <p style={{color: 'green', margin: '0px'}}>{number}</p>
    } else {
      return <p style={{color: 'red', margin: '0px'}}>{number}</p>
    }
  }

  createData = (state, tax, margin) => {
    return { state, tax, margin };
  }

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
    if (validateNumber(this.state.customerPrice)
        && validateProduct(this.state.chosenProduct)) {

      const newAnswers = []

      for (var property of Object.entries(taxstate)) {
        let currentState = property[1].name;

        let taxCoefficient = this.getTaxCoef(currentState, this.state.chosenProduct) + 1;
        let prizeWithoutTax = (this.state.customerPrice / taxCoefficient).toFixed(2);
        let tax =(this.state.customerPrice - prizeWithoutTax).toFixed(2);
        let margin = ((this.state.customerPrice / taxCoefficient) - this.state.wholesalePrice).toFixed(2);

        newAnswers.push(this.createData(currentState,tax,margin))
      }

      newAnswers.sort((a, b) => a.margin < b.margin ? 1 : -1)

      this.setState({
        answers: newAnswers,
      })

      this.setState({ errorMessage: "" });

    } else {
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
              
              <Grid item xs={6} className={classes.grid}>
                <Paper elevation={3} className={classes.paper}>
                  <FormControl variant="outlined" className={classes.gridElement}>
                    <Autocomplete
                      id="selectProduct"
                      native
                      options={this.state.products} 

                      inputValue={this.state.chosenProduct}
                      onInputChange={(event, newInputValue) => {
                        console.log(newInputValue)
                        this.setState({chosenProduct: newInputValue})
                      }}

                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => 
                        <TextField {...params} 
                          label="Product" 
                          variant="outlined" 
                        />}
                    />
                  </FormControl>

                  <TextField
                    className={classes.gridElement}
                    data-testid='after-taxes-input'
                    variant="outlined"
                    id="customerPrice"
                    label="Customer price"
                    value={this.customerPrice}
                    onChange={this.onChangeCustomerPrize}
                  />
                
                  <TextField
                    className={classes.gridElement}
                    data-testid='buying-for-input'
                    variant="outlined"
                    id="wholesalePrice"
                    label="Wholesale price"
                    name="wholesalePrice"
                    value={this.wholesalePrice}
                    onChange={this.onChangeWholesalePrice}
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

              <Grid item xs={6} className={classes.grid}>

                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>State</TableCell>
                      <TableCell align="right">Tax</TableCell>
                      <TableCell align="right">Marign</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.answers.map((row) => (
                      <TableRow key={row.name + row.margin}>
                        <TableCell component="th" scope="row">
                          {row.state}
                        </TableCell>
                        <TableCell align="right">{row.tax}</TableCell>
                        <TableCell align="right">{this.formatColor(row.margin)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                  
              </Grid>

            </Grid>
          </form>
          
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(PrototypeComponent)