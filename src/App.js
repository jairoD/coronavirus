import logo from './logo.svg';
import './App.css';
import coronavirusApi from 'coronavirus-api';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ncov2019 from './services/index';
import axios from 'axios';
import MapChart from "./MapChart";
import Grid from '@material-ui/core/Grid';
import ReactTooltip from "react-tooltip";
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
    maxWidth: 800
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#e4e2e0'
  },

}));

function createData(name, confirmed, deaths, cured) {
  return { name, confirmed, deaths, cured };
}


function App() {

  const [cities, setCities] = React.useState(null);
  const [overall, setOverall] = React.useState(null);
  const [deaths, setDeaths] = React.useState(0);
  const [confirmed, setConfirmed] = React.useState(0);
  const [cured, setCured] = React.useState(0);
  const [rows, setRows] = React.useState(null);
  const [content, setContent] = React.useState("");


  useEffect(() => {
    /*
    coronavirusApi.getСities().then(response => {
      var aux = 0;
      response.cities.forEach(element => {
        aux = aux + element.confirmed;
      });
      console.log(aux);
    });
    coronavirusApi.getСities().then(response => {
      console.log(response);
      setCities(response.cities);
    });
    */
    ncov2019.specific().then(response => {
      //console.log(response.data);
      setCities(response.data);
    }).catch(err => {
      console.log(err);
    })
    ncov2019.overall().then(response => {

      //console.log(response.data);
      setOverall(response.data);
    }).catch(err => {
      console.log(err);
    })


  }, []);

  useEffect(() => {
    var aux = 0;
    var aux1 = 0;
    var aux2 = 0;
    var aux3 = [];
    cities && cities.forEach(element => {
      aux3.push(createData(element.provinceState === '' ? element.countryRegion : element.countryRegion + '-' + element.provinceState, element.confirmed, element.deaths, element.recovered));
      aux1 = aux1 + element.confirmed;
      aux = aux + element.recovered;
      aux2 = aux2 + element.deaths;
    });
    setCured(aux);
    setConfirmed(aux1)
    setDeaths(aux2);
    setRows(aux3);
  }, [cities]);

  /*
  useEffect(() => {
    var aux = 0;
    var aux1 = 0;
    var aux2 = 0;
    var aux3 = [];
    cities && cities.forEach(element => {
      //aux3.push(createData(element.en, element.confirmed, element.deaths, element.cured));
      if (element.hasOwnProperty('recovered')) {
        aux = aux + element.cured;
      }
      if (element.hasOwnProperty('confirmed')) {
        aux1 = aux1 + element.confirmed;
      }
      if (element.hasOwnProperty('deaths')) {
        aux2 = aux2 + element.deaths;
      }
    });
    setCured(aux);
    setConfirmed(aux1)
    setDeaths(aux2);
    setRows(aux3);
  }, [cities])
  */

  const classes = useStyles();

  return (
    <div className={classes.root} style={{ margin: '20px' }}>
      <Grid container spacing={3} direction="row"
        justify="center"
        alignItems="center" style={{ paddingBottom: '10px' }}>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant="h2">
            Coronavirus nCoV 2019
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            {
              confirmed ?
                <p>Total Infectados: {confirmed}</p>
                :
                <CircularProgress />
            }
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            {
              deaths ?
                <p>Total Muertes: {deaths}</p>
                //console.log(deaths)
                :
                <CircularProgress />
            }
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            {
              cured ?
                <p>Total Recuperados: {cured}</p>
                :
                <CircularProgress />
            }
          </Paper>
        </Grid>
      </Grid>
      <MapChart setTooltipContent={setContent} overall={overall} />
      <ReactTooltip multiline={true} html={true}>{content}</ReactTooltip>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" style={{ paddingTop: '10px', margin: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell>Pais/Region - Provincia/Estado</TableCell>
              <TableCell align="right">No. Confirmados</TableCell>
              <TableCell align="right">No. Muertos</TableCell>
              <TableCell align="right">No. Recuperados</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.confirmed}</TableCell>
                <TableCell align="right">{row.deaths}</TableCell>
                <TableCell align="right">{row.cured}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}

export default App;
