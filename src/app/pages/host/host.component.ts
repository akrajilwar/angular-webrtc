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
  videoUrl = '';

  constructor() { }

  ngOnInit(): void {
    this.videoUrl = `https://amtag-streaming.herokuapp.com/broadcast?id=123`;
  }

}
