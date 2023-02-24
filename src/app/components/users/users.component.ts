import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { User } from 'models/user';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User = new User();
  readData: any;

  displayedColumns: string[] = ['id', 'username', 'role', 'email', 'password', 'createdAt', 'updatedAt', 'action'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private userserv: UserService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('token')) {
      this.router.navigate(['user']);
      return;
    }
    this.getallusers();
  }

  getallusers(){
    this.userserv.GetUsers()
    .subscribe( (res) => {
      this.readData = res.data;
      this.dataSource = new MatTableDataSource(this.readData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: any): void {
    this.userserv.DeleteUser(id)
      .subscribe( (res) => {
        this.getallusers();
      })
  };

}
