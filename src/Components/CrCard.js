import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import $ from 'jquery'; 
import Popper from 'popper.js'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import useWebSocket from 'react-use-websocket';
import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import data from '../DataFile/41res.json';


export default function CrCard() {

    const WS_URL = 'wss://stream.binance.com:9443/ws';//'wss://scorpion-solid-precisely.ngrok-free.app/stream';
    const{sendJsonMessage,lastJsonMessage} = useWebSocket(WS_URL)
    const [crypto, setCrypto] = React.useState('');
    const [book, setBook] = React.useState('');
    const [marketData, setMD] = useState('');
    const [resp, setData] = useState([]);
    const [ws, setWs] = useState(null);

    const handleChange = (event) => {
      setCrypto(event.target.value);
      if(lastJsonMessage != null)
      {
        setMD(lastJsonMessage[0]['E']);
      }
    };

    const handleBookChange = (event) => {
      setBook(event.target.value);
    };

    const THROTTLE = 50;
    //const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE))

    const SymbolData = data.data[0].Symbol;
    if(lastJsonMessage != null)
    {
      console.log(lastJsonMessage[0]);
    }

    useEffect(()=>{
      sendJsonMessage({
        // reqid: 1,
        // type: "subscribe",
        // streams: [
        //   {
        //     name: "Venue"
        //   }
        // ],
        // ts: "2019-02-13T05:17:32.000000Z"
        "method": "SUBSCRIBE",
        "params": ["!ticker@arr"],
        "id":1
      })
      // window.addEventListener('mousemove', e =>{
      //   sendJsonMessageThrottled.current({
      //     reqid: 1,
      //     type: "subscribe",
      //     streams: [
      //       {
      //         name: "Venue"
      //       }
      //     ],
      //     ts: "2019-02-13T05:17:32.000000Z"
      //   })
      // })
      setWs(lastJsonMessage);
      if(lastJsonMessage != null)
      {
        setMD(lastJsonMessage[0]['E']);
      }
      // setMD(lastJsonMessage[0]['c']);
      return () => {
        if (ws) {
            ws.close();
        }
    };
    },[ws, setData, setMD]);

  return (
    <div>
    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
      <input
        type="text"
        placeholder="Search Symbol..."
        style={{ marginBottom: '10px', fontSize:'12', width:'100%', color: 'black', backgroundColor: 'white'}}
      />
      <table>
        <thead>
          <tr>
          <th key='symbol' align='center' style={{width: '30%', fontSize:12}} >SYMBOL</th>=
          </tr>
        </thead>
        <tbody>
            <tr key="aa">
                <td >{marketData}</td>
            </tr>
        </tbody>
      </table>
    </div>
    
    {/* for cards */}
    <Card sx={{ maxWidth: 400 }}>
        <div >
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Fees"
                    name="radio-buttons-group"
                    size="small">
                    <FormControlLabel value="Fees" control={<Radio />} label="Fees" />
                    <FormControlLabel value="Liquidity" control={<Radio />} label="Liquidity" />
                </RadioGroup>
            </FormControl>
        </div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={crypto}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value=""> BTC USD</MenuItem>
          <MenuItem value={20}>BTC INR</MenuItem>
          <MenuItem value={30}>BTC NP</MenuItem>
        </Select>
      </FormControl>
      <br></br>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={book}
          onChange={handleBookChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">AGG Book</MenuItem>
          <MenuItem value={20}>L2 Book</MenuItem>
          <MenuItem value={30}>EXCHANGES</MenuItem>
        </Select>
      </FormControl>
      <Stack direction="row" spacing={2} margin={3}>
      <button type="button" class="btn btn-secondary btn-lg" disabled>70005.68</button>
      <button type="button" class="btn btn-secondary btn-lg" disabled>2.05 bps</button>
      <button type="button" class="btn btn-secondary btn-lg" disabled>70020.05</button>
      </Stack>
      <input min="1" max="100" type="number" id="typeNumber" class="form-control" />
      <Stack direction="row" spacing={3} margin={7}>
      <button type="button" class="btn btn-secondary btn-lg" disabled>Bids</button>
      <button type="button" class="btn btn-secondary btn-lg" disabled>RFQ</button>
      <button type="button" class="btn btn-secondary btn-lg" disabled>Asks</button>
      </Stack>
      <table class="table table-dark table-borderless">
        <thead>
          <tr>
            <th scope="col">QTY</th>
            <th scope="col">PRICE</th>
            <th scope="col">SPREAD (bps)</th>
            <th scope="col">PRICE</th>
            <th scope="col">QTY</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">0.1</th>
            <td>70009.51</td>
            <td>1.5</td>
            <td>70011.51</td>
            <td>0.1</td>
          </tr>
          <tr>
          <th scope="row">1</th>
            <td>70006.06</td>
            <td>1.8</td>
            <td>70016.06</td>
            <td>1</td>
          </tr>
          <tr>
          <th scope="row">10</th>
            <td>70001.23</td>
            <td>5.7</td>
            <td>70031.23</td>
            <td>10</td>
          </tr>
          <tr>
          <th scope="row">28</th>
            <td>69980.51</td>
            <td>40.5</td>
            <td>70050.51</td>
            <td>28</td>
          </tr>
          <tr>
          <th scope="row">100</th>
            <td>69780.11</td>
            <td>428.4</td>
            <td>70180.11</td>
            <td>100</td>
          </tr>
        </tbody>...
      </table>
    </Card>
    </div>
  );
}
