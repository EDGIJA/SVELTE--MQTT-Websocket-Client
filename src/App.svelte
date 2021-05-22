<script>
 import {interaction, sendMsg} from '../scripts/mqtt.js'
 let topicX = 'elTopicEDGI';
 let msgX = 'Hola Edgi';

 $: console.log('Test from app.svelte: ' + interaction.msg);
</script>

<div>
	<h2>Test MQTT</h2>
</div>
	<div>
		<p>Topic: {$interaction.topic}</p>

	</div>
<div>
	<div>
		<p>Message: {$interaction.msg}</p>
	</div>
</div>

<button type='button' on:click={() => sendMsg(topicX,msgX)}>SEND MESSAGE</button>

