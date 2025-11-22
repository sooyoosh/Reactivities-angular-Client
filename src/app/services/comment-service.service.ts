import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {
 private hubConnection!: signalR.HubConnection;

  private commentsSource = new BehaviorSubject<any[]>([]);
  comments$ = this.commentsSource.asObservable();

  constructor() { }

  startConnection(activityId: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.apiComment+`?activityId=${activityId}`,{withCredentials:true})
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch(err => console.log("Error connecting:", err));

    this.registerHandlers();
  }

  stopConnection() {
    this.hubConnection?.stop();
  }

  private registerHandlers() {
   
    this.hubConnection.on("LoadComments", (comments) => {
      this.commentsSource.next(comments);
    });

   
    this.hubConnection.on("RecieveComment", (comment) => {
      this.commentsSource.next([...this.commentsSource.value, comment]);
    });
  }

  sendComment(comment: any) {
    return this.hubConnection.invoke("SendComment", comment)
      .catch(err => console.log(err));
  }
}
