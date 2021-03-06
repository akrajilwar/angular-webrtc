import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './pages/client/client.component';
import { HomeComponent } from './pages/home/home.component';
import { HostComponent } from './pages/host/host.component';
import { JanusComponent } from './pages/janus/janus.component';
import { RoomComponent } from './pages/room/room.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'host',
    component: HostComponent,
  },
  {
    path: 'stream',
    component: JanusComponent,
  },
  {
    path: 'client',
    component: ClientComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
