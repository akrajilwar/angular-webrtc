import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { SignalingService } from 'src/app/services/signaling.service';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {
  currentUserId: string = uuidv4();
  makingOffer: boolean = false;

  servers: any = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  localStream?: MediaStream;
  remoteStream?: MediaStream;

  pc: RTCPeerConnection = new RTCPeerConnection(this.servers);

  constructor(
    private socket: Socket,
    private signalingService: SignalingService
  ) { }

  ngOnInit(): void {
    console.log(`Initialize Peer with id ${this.currentUserId}`);

    this.createStream();
  }

  async createStream() {
    this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true, });

    this.localStream.getTracks().forEach((track) => {
      this.pc.addTrack(track, this.localStream!);
    });

    let messages = this.signalingService.getMessages();

    this.pc.onnegotiationneeded = async () => {
      try {
        this.makingOffer = true;
        await this.pc.setLocalDescription();
        this.signalingService.sendEvent('offer', { description: this.pc.localDescription });
      } catch (err) {
        console.error(err);
      } finally {
        this.makingOffer = false;
      }
    }

  }

  onLoadedMetadata(event: Event) {
    (event.target as HTMLVideoElement).play();
  }
}
