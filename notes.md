

protocol : a protocol is the set of rules for how two computers communicate.
    rules: message format,order,timing,error handling

    http is an req res protocol . its amazing for websites apis and loading pages.but its terrible for fast back and forth conversations

    for live data we need a permanat two way connection thats where the socket is coming.websocket connection stays open in both client and server can send the messages anytime . this is called a full duplex

    cheaper than polling. in polling every req send large http headers. in ws once the connection is established the messages are tiny.

in ws ws:// is unincrypted and wss:// in encrypted


architechture:

life cycle of a websocket connection:
it has stages
1. connect - setup the socket with a new websocket with an specific path
2. upgrade- upgrade req the connection upgraded to websocket if server accept it replies with 101 switching protocols.http ends tunnel open both sides can send messages.
3. state- or memmory. ws are stateful. the server holds a reference to your socket in memory. it create another problem ghost connection. like if someone lose wifi or internet connection or battery dies close laptops. now server thinks the server still alive it holding the socket in memory this called ghost connection.
4. to fix ghost connection. in production ws server use heartbeat or called pingpong. periodic ping pong messages ensure the conenction remains active and detect dropped connections. its not polling the ping pong is an tinu impulse but in othere hand the polling entire http requests. lighter , cheaper, far easier on the battery

with websocket mostly u send messages.
two type data transfers
1. text json
2. binary raw: audio stream, video streaming, mulit player games etch
when the user array buffer or blob

most realtime apps send jsons

websocket use opcode its a label thats say it says this frame is text,binary,pinpong etch

back pressure: if server send update ike craz y but user have slow internet connection . new messages start piling up memory thats called backpressuere. we monitor how much data is buffer if it become so high. they slowdown the sending rate so the server dont explode.

