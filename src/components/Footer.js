import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    left: 0,
    bottom: 0,
    width: '100%'
  },
  footer: {
    padding: theme.spacing(2, 2),
    bottom: 0,
    marginTop: 'auto',
    backgroundColor: blue[900],
  },
});

class Footer extends React.Component {

    render() {
        const { classes } = this.props;

        return(
            <div className={classes.root}>

                <footer className={classes.footer}>
                    <Container maxWidth="sm">
                    <Typography variant="body1">This app was created by people borned in Kwarantanna.</Typography>
                    </Container>
                </footer>
            </div>
        )
    }

}

export default withStyles(styles)(Footer)