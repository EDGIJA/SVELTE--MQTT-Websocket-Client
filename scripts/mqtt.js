import {writable} from 'svelte/store';

export const  interaction = writable({'topic':'','msg':''});
// UPDATE INTERACTION STORE (TOPIC AND MESSAGE) WHEN NEW MESSAGES ARRIVES
function updateInteraction(topic, msg) {
    interaction.topic = topic;
    interaction.msg = msg;
    // Test
    console.log('updateIinteraction topic -> ' + interaction.topic)
    console.log('updateIinteraction msg -> ' + interaction.msg)
}

// SEND  NEW MESSAGES
export function sendMsg(topic, msg){
    let message = new Paho.MQTT.Message(msg);
    message.destinationName = topic
    client.send(message);
  };

// calculate client id
let clientId = "ws" + Math.random();
// Create a client instance
let client = new Paho.MQTT.Client('broker.emqx.io', 8083, clientId);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});

// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
   console.log('Connected to MQTT-WebSocket');
        // Una vez conectado se subscribe al los topicos
        client.subscribe('elTopicEDGI');
        sendMsg("elTopicEDGI","conectado")
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("Lost connection: "+responseObject.errorMessage);
      
    }
  }

// Called when a message arrives
 function onMessageArrived(message) {
    //console.log(message.destinationName + ": " + message.payloadString );
    updateInteraction(message.destinationName,message.payloadString);
    console.log('function onMessageArrived - ' + message.destinationName)
    console.log('function onMessageArrived - ' + message.payloadString)
}

