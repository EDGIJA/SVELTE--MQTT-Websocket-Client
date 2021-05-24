
import {broker, conStatus, newMsg, subscribedTopic} from './mqttStore'

let client;
let clientId;

  // Subscribe topic
  export function subscribeTopic(topic){
    if (conStatus.status === false || conStatus.status === undefined){
      console.log('There is no connection');
    } else if (topic === '') {
      console.log('There is no topic');
    } else{
      subscribedTopic.set({topic});
      client.subscribe(topic);
    }
  }

  // Send new message
  export function sendMsg(topic, msg){
    if (conStatus.status === false || conStatus.status === undefined){
        console.log('There is no connection');
    } else if (topic === '') {
        console.log('There is no topic');
    } else if (msg === '') {
        console.log('There is no message');
    } else {
        let message = new Paho.MQTT.Message(msg);
        message.destinationName = topic
        client.send(message);
        // newMsg.set({msg});
    }
  };
 
  // connect the client
  export function connectClient(url) {
    // calculate client id
    clientId = "ws" + Math.random();
    // Create a client instance
    client = new Paho.MQTT.Client(url, 8083, clientId);
    client.connect({onSuccess:onConnect});
    broker.set({url})
  }

    // called when the client connects
  function onConnect() {
    // Once a connection has been made
    conStatus.status = true;    
    conStatus.set({status});
    console.log('Connection: ' + conStatus.status);
    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
  }

  // Called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("Lost connection: " + responseObject.errorMessage);
    }
  }

  // Update newMsg Store (Message) when new message arrives
  function updateMessage(topic, msg) {
    subscribedTopic.set({topic});
    newMsg.set({msg});
  }

  // Called when a message arrives
  function onMessageArrived(message) {
    updateMessage(message.destinationName,message.payloadString);
  }
