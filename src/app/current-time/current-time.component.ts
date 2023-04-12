import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { faClock } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.css'],
  animations: [
    trigger('wrapper', [
      state('void', style({
        'opacity': '0',
        'height': '0'
      })),
      state('normal', style({
        'opacity': '1',
        'height': '300px'
      })),
      transition('normal <=> void', animate('300ms ease'))
    ])
  ]
})

export class CurrentTimeComponent {
  clockIcon = faClock;
  wrapperState: string = 'void';
  expanded: boolean = false;
  
  selectedTimezone = 'Etc/GMT+12';
  currentTime: string = new Date().toLocaleString('en-US', { timeZone: this.selectedTimezone });
  

  expandTimeZones() {
    this.expanded = !this.expanded
    this.wrapperState = this.wrapperState == 'void' ? 'normal' : 'void';
  }

  timezones = [
    { value: 'Etc/GMT+12', label: '(UTC-12:00) International Date Line West' },
    { value: 'Pacific/Honolulu', label: '(UTC-10:00) Hawaii' },
    { value: 'America/Los_Angeles', label: '(UTC-08:00) Pacific Time (US & Canada)' },
    { value: 'America/Denver', label: '(UTC-07:00) Mountain Time (US & Canada)' },
    { value: 'America/Chicago', label: '(UTC-06:00) Central Time (US & Canada)' },
    { value: 'America/New_York', label: '(UTC-05:00) Eastern Time (US & Canada)' },
    { value: 'Europe/London', label: '(UTC+00:00) London' },
    { value: 'Europe/Paris', label: '(UTC+01:00) Paris' },
    { value: 'Asia/Dubai', label: '(UTC+04:00) Abu Dhabi' },
    { value: 'Asia/Kolkata', label: '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi' },
    { value: 'Asia/Tokyo', label: '(UTC+09:00) Tokyo' },
    { value: 'Australia/Sydney', label: '(UTC+10:00) Sydney' }
  ];
  

  ngOnInit() {
    setInterval(() => {
      this.updateTimezone(this.selectedTimezone, true);
    }, 1000 * 60);
  }

  updateTimezone(timezone: any, auto?: boolean): void {
    if(!auto) {
      this.expandTimeZones()
    }
    this.selectedTimezone = timezone
    this.currentTime = new Date().toLocaleString('en-US', { timeZone: this.selectedTimezone });
  }
}
