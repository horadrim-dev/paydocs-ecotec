import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss'
})
export class SidebarMenuComponent implements OnInit{

  menuItems: MenuItem[] = [];
  currentUser: User | null = null;

  constructor(
    private _authService: AuthService,
    private router: Router
  ){
    this._authService.currentUser.subscribe(x => this.currentUser = x)
  }

  ngOnInit(): void {
    // material icons
    this.menuItems = [
      {
        label: 'Документы',
        expanded: true,
        items: [
          {
            label: 'Карточки должника',
            icon: 'contact_page',
            command:(click)=>{this.router.navigate(['/debts']);}
          },
          {
            label: 'Платежные документы',
            icon: 'article',
            command:(click)=>{this.router.navigate(['/paydocs']);}
          },
        ]
      },
    ];
  }

}
