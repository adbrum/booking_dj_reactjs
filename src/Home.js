import React from 'react'
import Login from "./Login"
import {connect} from "react-redux"
import {withStyles} from '@material-ui/core/styles'

import Booking from "./Booking"
import Grid from "@material-ui/core/es/Grid/Grid"
import Card from "@material-ui/core/es/Card/Card"
import CardContent from "@material-ui/core/es/CardContent/CardContent"
import Typography from "@material-ui/core/es/Typography/Typography"

const styles = {
    card: {
        width: 200,
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
}

const Home = (props) => {
    const {classes} = props
    return (
        <div>
            {!props.isLogged &&
            <Grid container justify="center" item xs={12}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            Entrar no sistema
                        </Typography>
                        <div><Login/></div>
                    </CardContent>
                </Card>
            </Grid>}
            {props.isLogged && <Booking/>}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        isLogged: state.loginReducer.isLogged,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Home))
