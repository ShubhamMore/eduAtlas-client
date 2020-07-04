import { ApiService } from './../../services/api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// import { ZoomMtg } from '@zoomus/websdk';

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();

@Component({
  selector: 'ngx-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss'],
})
export class StudentHomeComponent implements OnInit {
  signatureEndpoint = '';
  apiKey = '-e4wJMiURO-i3gr436TgsQ';
  apiSecret = '6QqeDEM10eYQCV5gpdpPN06QsIWV04mmyzzz';
  meetingNumber: number;
  role = 0;
  leaveUrl = 'http://localhost:4200';
  userName = 'Angular';
  userEmail = 'angular@gmail.com';
  passWord = '';

  meetings: any[] = [];

  constructor(private api: ApiService, @Inject(DOCUMENT) document) {}
  ngOnInit() {
    this.getMeetings();
    // this.getSignature('73736782741', 'Abcd@123');
  }

  getMeetings() {
    this.api.getAllMeetings().subscribe((res: any[]) => {
      this.meetings = res;
    });
  }

  close() {
    this.meetingNumber = null;
  }

  joinMeeting(url: any, meetingNumber: any, passWord: any) {
    this.meetingNumber = meetingNumber;
    this.passWord = passWord;
    // this.meeting = true;
    window.open(
      url,
      'Zoom',
      'scrollbars=yes,resizable=yes,status=no,location=no,toolbar=no,menubar=no',
    );
  }

  // getSignature(meetingNumber: any, passWord: any) {
  //   this.meetingNumber = meetingNumber;
  //   this.passWord = passWord;

  //   const meetConfig = {
  //     apiKey: this.apiKey,
  //     apiSecret: this.apiSecret,
  //     meetingNumber: meetingNumber,
  //     userName: this.userName,
  //     passWord: passWord,
  //     leaveUrl: 'http://localhost:4200/',
  //     role: 0,
  //   };
  //   const signature = ZoomMtg.generateSignature({
  //     meetingNumber: meetConfig.meetingNumber,
  //     apiKey: meetConfig.apiKey,
  //     apiSecret: meetConfig.apiSecret,
  //     role: meetConfig.role,
  //     success: function (res) {
  //       console.log(res.result);
  //     },
  //   });
  //   this.startMeeting(signature);
  // }
  // startMeeting(signature) {
  //   document.getElementById('zmmtg-root').style.display = 'block';
  //   ZoomMtg.init({
  //     leaveUrl: this.leaveUrl,
  //     isSupportAV: true,
  //     success: (success) => {
  //       console.log(success);
  //       ZoomMtg.join({
  //         signature: signature,
  //         meetingNumber: this.meetingNumber,
  //         userName: this.userName,
  //         apiKey: this.apiKey,
  //         userEmail: this.userEmail,
  //         passWord: this.passWord,
  //         success: (success) => {
  //           console.log(success);
  //         },
  //         error: (error) => {
  //           console.log(error);
  //         },
  //       });
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }
}
