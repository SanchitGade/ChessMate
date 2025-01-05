import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080});
// console.log('Server setup complete.');

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  console.log('Working on 3000');
  ws.send('something');
});

  wss.on('listening', () => {
    console.log('WebSocket server is listening on port 8080');
});