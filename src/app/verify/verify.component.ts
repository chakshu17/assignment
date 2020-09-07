import { Component, OnInit, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit, DoCheck {
  constructor(private http: HttpClient) {}

  otp: boolean = false;
  mobile_no: number;
  resendotp = false;
  otpcount: number = 0;
  showform: boolean = true;
  showmessage: boolean = false;
  fullname: string;
  showerror: boolean = false;
  submitotp: boolean = false;

  ngDoCheck() {
    console.log(this.otpcount);

    if (this.otpcount >= 3) {
      if (this.submitotp === true) {
        console.log('Hello');
        this.resendotp = false;
        this.showerror = false;
      } else {
        console.log('Hello');
        this.resendotp = false;
        this.showerror = true;
      }
    }
  }

  ngOnInit(): void {}


  onclick(f: NgForm) {
    const data = {
      panNumber: f.value.panNumber,
      city: f.value.city,
      fullname: f.value.fullname,
      email: f.value.email,
      mobile: f.value.mobile,
    };

    this.http
      .post<{ status: string }>(
        'http://lab.thinkoverit.com/api/getOTP.php',
        data
      )
      .subscribe((re) => {
        if (re.status === 'Missing Params') {
          console.log('Sorry');
        } else {
          this.mobile_no = f.value.mobile;
          this.fullname = f.value.fullname;
          this.otp = true;
          this.showform = false;
          console.log(re);
          setTimeout(() => {
            this.resendotp = true;
          }, 180000);
        }
      });
  }


  otpsubmit(f: NgForm) {
    const data = {
      mobile: this.mobile_no,
      otp: f.value.otp,
    };
    this.http
      .post<{ status: string }>(
        'http://lab.thinkoverit.com/api/verifyOTP.php',
        data
      )
      .subscribe((re) => {
        if (re.status === 'Missing Params') {
          console.log('Sorry');
        } else {
          this.mobile_no = null;
          this.otp = false;
          this.showmessage = true;
          console.log(re);
          this.showerror = false;
          this.submitotp = true;
        }
      });
  }
  resend() {
    this.resendotp = false;
    this.otpcount = this.otpcount + 1;
    setTimeout(() => {
      this.resendotp = true;
    }, 3600000);
  }
}
