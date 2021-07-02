import ReactDom from 'react-dom';
import React,{Component} from 'react';
import {w3cwebsocket as W3CWebsocket} from "websocket";

const client=new W3CWebsocket('ws://127.0.0.1:8000');

export default class App extends Component{
    onButtonClicked=(value)=>{
        client.send(JSON.stringify({
            type:"message",
            msg:value
        }))
    }
    componentDidMount(){
        client.onopen=()=>{
            console.log('WebSocket Client Connected');
        };
        client.onmessage=(message)=>{
            const dataFromServer=JSON.parse(message.data);
            console.log('got reply! ', dataFromServer);
        }
    }
    render(){
        return (
            <div>
                <button onClick={()=>this.onButtonClicked("Hello!")}>
                Send Message
                </button>
            </div>
        );
    }
}
ReactDom.render(<App/>,document.getElementById('root'));