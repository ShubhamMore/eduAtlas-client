import { InstituteService } from './../../../services/institute.service';
import { AuthService } from './../../../services/auth-services/auth.service';
import { Component, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
  NbPopoverDirective,
} from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { RoleAssignService } from '../../../services/role/role-assign.service';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  messages: any[];
  
  @ViewChild('chatWindow',{static: false}) chatWindow: TemplateRef<any>;
  @ViewChild(NbPopoverDirective, { static: false }) chatPopup: NbPopoverDirective;

  users: { name: string, title: string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];  
  chats: any[] = [
    {
      title: 'Nebular Conversational UI Medium',
      messages: [
        {
          text: 'Medium!',
          date: new Date(),
          reply: true,
          user: {
            name: 'Bot',
            avatar: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/robot-face.png',
          },
        },
      ],
      size: 'large',
    },
  ];

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean;
  institutes: any[];
  institute: any;
  name: string;
  user: any;
  userMenu = [{ title: 'Edit Profile' }, { title: 'Change Password' }];

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  constructor(
    private authService: AuthService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private api: ApiService,
    private layoutService: LayoutService,
    private router: Router,
    private breakpointService: NbMediaBreakpointsService,
    private instituteService: InstituteService,
    private roleService: RoleAssignService,
    private windowService: NbWindowService
  ) {}

  ngOnInit() {
    this.userPictureOnly = false;
    this.institutes = [];
    this.institute = '';
    this.user = this.authService.getUser();
    this.name = `Welcome ${this.user.name}
      (${this.user.role})`;

    this.getInstitutes();
  }

  getInstitutes() {
    if (this.user.role === 'institute') {
      this.api.getInstitutes().subscribe((data: any[]) => {
        this.institutes = data;
      });
    } else if (this.user.role === 'employee') {
      this.api.getEmployeeInstitutes({ email: this.user.email }).subscribe((inst: any) => {
        this.instituteService.setInstitutes(inst);
      });
    }
  }

  setInstitutes() {
    this.institutes = [];
    this.institutes = this.instituteService.getInstitutes();
  }

  onSelect(event: any) {
    if (event !== 'undefined') {
      this.institute = event;
      if (this.user.role === 'institute') {
        this.router.navigate(['/pages/dashboard/', event]);
      } else if (this.user.role === 'employee') {
        const role = this.getEmployeeRole(event);
        this.roleService.assignRoles(role);
        this.router.navigate(['/pages/dashboard/', event]);
      } else if (this.user.role === 'student') {
        this.router.navigate(['/student/dashboard/', event]);
      }
    }
  }

  getEmployeeRole(instituteId: any) {
    const institiute = this.institutes.find((institute) => {
      return instituteId === institute._id;
    });
    if (institiute) {
      return institiute.role;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openChatBox(user:any){
    this.chatPopup.hide();
    const windowRef = this.windowService.open( this.chatWindow,
      { 
        title: user.name,
        context: { text: 'some text to pass into template' }
      });
      windowRef.maximize();
  }
  sendMessage(messages, event) {
    messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif',
      },
    });
  }
  
  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout() {
    this.authService.logout();
  }
}
