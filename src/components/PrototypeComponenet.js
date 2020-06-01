import React from "react";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { validateNumber, validateProduct } from "../utils/ValidatingFunctions";
import { withStyles } from "@material-ui/core/styles";
import "../utils/service.js";
import { getAllStates, getAllProducts } from "../utils/service.js";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const styles = (theme) => ({
  grid: {
    padding: theme.spacing(4),
  },
  gridElement: {
    margin: "2%",
    width: "90%",
  },
  paper: {
    padding: theme.spacing(5, 2, 2, 2),
    flexWrap: "wrap",
  },
  table: {
    minWidth: 550,
  },
  card: {
    minHeight: '20vh',
    minWidth: '10vw',
  },
  cardMedia: {
    paddingTop: "100.25%",
    height: 0,
  },
  buttonBase: {
    'text-align': 'center',
    width: "100%",
  },
  cardContainer: {
    margin: '1vh',
  }
});

class PrototypeComponent extends React.Component {
  state = {
    chosenProduct: "",
    customerPrice: 0.0,
    wholesalePrice: "",
    margin: 0.0,
    errorMessage: "",
    answers: [],
    states: [],
    products: [],
  };

  componentWillMount() {
    getAllStates().then((response) => {
      this.setState({
        states: response,
      });
    });
    getAllProducts().then((response) => {
      this.setState({
        products: response,
      });
    });
  }

  onChangeState = (e) => {
    this.setState({ chosenState: e.target.value });
  };

  onChangeCustomerPrize = (e) => {
    this.setState({ customerPrice: e.target.value });
  };

  onChangeWholesalePrice = (e) => {
    this.setState({ wholesalePrice: e.target.value });
  };

  onChangeChosenProduct = (newValue) => {
    this.setState({ chosenProduct: newValue }, function () {
      this.setDefaultWholeSalePrice();
    });
  };

  setDefaultWholeSalePrice = () => {
    let currentProduct = this.findProductByName(this.state.chosenProduct);
    this.setState({ wholesalePrice: currentProduct.wholesalePrice });
  };

  formatColor = (number) => {
    if (number > 0) {
      return <p style={{ color: "green", margin: "0px" }}>{number}</p>;
    } else {
      return <p style={{ color: "red", margin: "0px" }}>{number}</p>;
    }
  };

  createData = (state, tax, margin) => {
    return { state, tax, margin };
  };

  getTaxCoef = (state, product) => {
    for (var property of Object.entries(state)) {
      if (property[0] === product.category) {
        return property[1];
      }
    }
  };

  findProductByName(name) {
    for (let product of this.state.products) {
      if (product.product === name) {
        return product;
      }
    }
  }

  handleClick = () => {
    console.log("Click happened");
  };

  onButtonClick = (e) => {
    if (
      validateNumber(this.state.customerPrice) &&
      validateProduct(this.state.chosenProduct)
    ) {
      const newAnswers = [];

      for (let currentState of this.state.states) {
        let stateName = currentState.name;
        let currentProduct = this.findProductByName(this.state.chosenProduct);

        let taxCoefficient = this.getTaxCoef(currentState, currentProduct) + 1;
        let prizeWithoutTax = (
          this.state.customerPrice / taxCoefficient
        ).toFixed(2);
        let tax = (this.state.customerPrice - prizeWithoutTax).toFixed(2);
        let margin = (
          this.state.customerPrice / taxCoefficient -
          this.state.wholesalePrice
        ).toFixed(2);

        //Uwzgledniamy koszty logistyki
        margin = (margin - currentState.logistics).toFixed(2);

        newAnswers.push(this.createData(stateName, tax, margin));
      }

      newAnswers.sort((a, b) => (a.margin < b.margin ? 1 : -1));

      this.setState({
        answers: newAnswers,
      });

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
            <Grid container>
              <Grid item xs={6} className={classes.grid}>
                <Paper elevation={3} className={classes.paper}>
                  <FormControl
                    variant="outlined"
                    className={classes.gridElement}
                  >
                    <TextField
                      className={classes.gridElement}
                      data-testid="after-taxes-input"
                      variant="outlined"
                      id="customerPrice"
                      label="Customer price"
                      value={this.customerPrice}
                      onChange={this.onChangeCustomerPrize}
                    />

                    <TextField
                      className={classes.gridElement}
                      data-testid="buying-for-input"
                      variant="outlined"
                      id="wholesalePrice"
                      label="Wholesale price"
                      name="wholesalePrice"
                      value={this.state.wholesalePrice}
                      onChange={this.onChangeWholesalePrice}
                    />

                    <Button
                      className={classes.gridElement}
                      data-testid="submit"
                      variant="contained"
                      color="primary"
                      onClick={this.onButtonClick}
                    >
                      Oblicz
                    </Button>

                    {this.state.chosenProduct != null ? (
                      <Typography gutterBottom variant="h5" component="h3">
                        Chosen product: {this.state.chosenProduct}
                      </Typography>
                    ) : (
                      <Typography gutterBottom variant="h5" component="h3">
                        Choose product
                      </Typography>
                    )}
                  </FormControl>
                  <Container maxWidth="md">
                    <Grid className={classes.cardContainer} container spacing={4}>
                      {this.state.products.map((item) => (
                        <Grid item key={item.product} xs={12} sm={6} md={5}>
                          <ButtonBase
                            className={classes.buttonBase}
                            size="small"
                            background="primary"
                            onClick={(newValue) =>
                              this.onChangeChosenProduct(item.product)
                            }
                          >
                            <Card className={classes.card}>
                              <CardMedia
                                className={classes.cardMedia}
                                image={item.imagesrc}
                                title="Image title"
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h3"
                                >
                                  {item.product}
                                </Typography>
                              </CardContent>
                              <CardActions>
                              </CardActions>
                            </Card>
                          </ButtonBase>
                        </Grid>
                      ))}
                    </Grid>
                  </Container>
                </Paper>
              </Grid>

              <Grid item xs={6} className={classes.grid}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>State</TableCell>
                      <TableCell align="right">Tax</TableCell>
                      <TableCell align="right">Logistics</TableCell>
                      <TableCell align="right">Marign</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.answers.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.state}
                        </TableCell>
                        <TableCell align="right">{row.tax}</TableCell>
                        <TableCell align="right">{((this.state.customerPrice-row.tax-row.margin)-this.state.wholesalePrice).toFixed(2)}</TableCell>
                        <TableCell align="right">
                          {this.formatColor(row.margin)}
                        </TableCell>
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

export default withStyles(styles)(PrototypeComponent);
