// WSService.js
import {Alert} from 'react-native';
import io from 'socket.io-client';

const socket_url = 'http://192.168.1.5:3000';
// const socket_url = 'http://localhost:3000';

class WSService {
  socket;
  constructor() {
    this.socket = io(socket_url, {
      auth: {
        auth: false,
      },
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
      Alert.alert('Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      Alert.alert('Socket disconnected');
    });

    this.socket.on('error', error => {
      console.log('Socket error:', error);
      Alert.alert('Socket error', error.message || 'Unknown error');
    });
  }

  on(eventName: string, cb: (data: any) => void) {
    this.socket.on(eventName, cb);
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  removeListener(event: string, cb: (data: any) => void) {
    this.socket.removeListener(event, cb);
  }
}

const socketService = new WSService();
export default socketService;
