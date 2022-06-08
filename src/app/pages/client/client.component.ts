import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { SignalingService } from 'src/app/services/signaling.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  currentUserId: string = uuidv4();

  servers: any = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  remoteStream: MediaStream = new MediaStream();

  pc: RTCPeerConnection = new RTCPeerConnection(this.servers);

  constructor(
    private route: ActivatedRoute,
    private socket: Socket,
    private signalingService: SignalingService
  ) { }

  ngOnInit(): void {
    console.log(`Initialize Peer with id ${this.currentUserId}`);

    this.route.params.subscribe((params) => {
      console.log(params);

      this.socket.emit('join', params['roomId'], this.currentUserId);

      this.signalingService.sendEvent('join', {
        roomId: params['roomId'],
        userId: this.currentUserId
      })
    });

    this.loadStreaming();
  }

  async loadStreaming() {
    this.pc.ontrack = event => {
      event.streams[0].getTracks().forEach(track => {
        this.remoteStream.addTrack(track);
      });
    };
  }

}
