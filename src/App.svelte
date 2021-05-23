<script>
 import {connectClient, subscribeTopic, sendMsg} from '../scripts/mqtt.js'
 import {subscribedTopic, newMsg} from '../scripts/mqttStore'
 
 let brokerUrl = 'broker.emqx.io', topicSub = '', sendTopX = '', sendMsgX = '';
</script>

<div>
	<div class='form'>
		<div class='gapL'></div>
		<h2 class='title'>MQTT - SVELTE <span>Websocket Client</span></h2>
		<!-- Define Broker to establish connection  -->
		<div class='connection'>
			<input placeholder='Broker url' type='text' bind:value={brokerUrl}>
			<button type='button' on:click={() => connectClient(brokerUrl)}>CONNECT</button>
		</div>
		<!-- Subscription to topic registered on the defined broker -->
		<div class='subscribtion'>
			<input placeholder='Topic' type='text' bind:value={topicSub}>
			<button type='button' on:click={() => subscribeTopic(topicSub)}>SUBSCRIBE</button>
		</div>
		<!-- Definition of topic and message to be sent -->
		<div class='sendTopX'>
			<input placeholder='Topic' type='text' bind:value={sendTopX}>
		</div>
		<div class='sendMsgX'>
			<input placeholder='Message' type='text' bind:value={sendMsgX}>
		</div>
		<div class='btnMsg'>	
			<button type='button' style='width:100%;' on:click={() => sendMsg(sendTopX,sendMsgX)}>SEND MESSAGE</button>
		</div>
		<div class='validate'>
			<p>Subscription Topic &#8594; <span>{$subscribedTopic.topic}</span></p> 
			<p>Arrived Message &#8594; <span>{$newMsg.msg}</span></p>
			<p><span>This app makes use of "Eclipse Paho JavaScript Client" library. The connection is done through Websocket without SSL and through port 8083. If you want an SSL connection or through another port, you must do it in the mqtt.js file or improve the code.</span></p>
		</div>
		<div class='gapR'></div>
	</div>
</div>

<style>
	.form {
		display: grid;
		grid-template-areas: 'gL tl tl gR' 'gL cn tp gR' 'gL st sm gR' 'gL bt bt gR' 'gL vl vl gR';
		grid-template-columns: 1fr 300px 300px 1fr;
		grid-gap: 10px;
	}
	.gapL {grid-area: gL;}
	.title {grid-area: tl; text-align: center;}
	.connection {grid-area: cn; display:inline-grid;}
	.subscribtion {grid-area: tp; display:inline-grid;}
	.sendTopX {grid-area: st; display:inline-grid;}
	.sendMsgX  {grid-area: sm; display:inline-grid;}
	.btnMsg {grid-area: bt;}
	.validate {grid-area: vl;}
	.gapR {grid-area: gR;}
	
	.title span {font-style: italic;}
	.validate span {color:#0055d4;}
	.validate > p > span {font-style: italic;} 
</style>