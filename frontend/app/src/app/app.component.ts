import { Component, OnInit } from '@angular/core';
import { User } from './shared/models/user.model';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from './login/login.component';
import { PrimeNGConfig } from 'primeng/api';
import { ToastService } from './shared/services/toast.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService, ToastService, DialogService]
})
export class AppComponent implements OnInit {
  title = 'Сервис формирования долговых документов'


  currentUser: User | null = null;
  userMenuItems: MenuItem[] = [];
  ref: DynamicDialogRef | undefined;
  breadcrumb: MenuItem[] = [];
  home: MenuItem;
  location: Location;
  locale_ru: any;

  constructor(
    private router: Router,
    private _authService: AuthService,
    public dialogService: DialogService,
    private primengConfig: PrimeNGConfig,
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,  // нужно для фикса ошибки ExpressionChangedAfterItHasBeenCheckedError
    private loc: Location
  ) {
    this._authService.currentUser.subscribe(x => this.currentUser = x)
    this.home = { 
      icon: "pi pi-home",
      command:(click)=>{this.router.navigate(['/']);}
    }; 
    this.location = loc;
  }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  handleSidenavClick() {
    if (this.sidenav.mode === 'over') {
      this.sidenav.toggle();
    }
  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.cdr.detectChanges(); // нужно для фикса ошибки ExpressionChangedAfterItHasBeenCheckedError
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.locale_ru = {
        firstDayOfWeek: 1,
        dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        dayNamesShort: ["Вск", "Пон", "Вт", "Ср", "Чт", "Пт", "Сб"],
        dayNamesMin: ["Вск", "Пон", "Вт", "Ср", "Чт", "Пт", "Сб"],
        monthNames: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
        monthNamesShort: ["Янв.","Фев.","Март","Апр.","Май","Июн.","Июл.","Авг.","Сен.","Окт.","Нояб.","Дек."],
        today: 'Сегодня',
        clear: 'Очистить'
    }
    this.primengConfig.setTranslation(this.locale_ru);

    this.userMenuItems = [
      {
        label: 'Выйти',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        }
      }
    ];
    if (this.currentUser === null) {
      this.loginDialog();
    }
  }

  isThisHomepage() : boolean {
    return this.loc.isCurrentPathEqualTo("");
  }

  loginDialog() {
    this.ref = this.dialogService.open(LoginComponent, { header: 'Вход', width: '400px', closable: false});
  }

  logout() {
    this._authService.logout();
    // this.router.navigate(['/']);
    this.loginDialog();
  }

}
