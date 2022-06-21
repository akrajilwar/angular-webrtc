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
  videoUrl = '';

  constructor() { }

  ngOnInit(): void {
    this.videoUrl = `https://amtag-streaming.herokuapp.com/client?id=123`;

  }
}