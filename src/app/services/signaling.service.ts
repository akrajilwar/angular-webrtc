import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalingService {

  constructor(private socket: Socket) {}

  getMessages(): Observable<any> {
    return this.socket.fromEvent('message').pipe(map((data:any) => data.message));;
  }

  sendMessage(payload:any): void {
    this.socket.emit('message', payload);
  }

  sendEvent(type: string, data: any): void {
    this.socket.emit(type, data);
  }
  
}
