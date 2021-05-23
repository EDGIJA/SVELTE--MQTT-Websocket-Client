
import {writable} from 'svelte/store';

export const broker             = writable ({'url':''});
export const conStatus          = writable ({'status':false});
export const connectionMsg      = writable ({'msg':'Connected to MQTT-WebSocket'});
export const newMsg             = writable ({'msg':''});
export const messageTopic       = writable ({'topic':''});
export const subscribedTopic    = writable ({'topic':''});