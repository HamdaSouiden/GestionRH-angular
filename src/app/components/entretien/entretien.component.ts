import { Component, OnInit, ViewChild } from '@angular/core';
import { entretien } from 'models/entretien';
import { EntretienService } from 'src/app/services/entretien.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.component.html',
  styleUrls: ['./entretien.component.css']
})
export class EntretienComponent implements OnInit {
  entretiens: entretien = new entretien();
  readData: any;

  displayedColumns: string[] = ['id', 'from', 'to', 'subject', 'message', 'createdAt', 'updatedAt', 'action'];
  dataSource!: MatTableDataSource<entretien>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private entretserv: EntretienService) { }

  ngOnInit(): void {
    this.getallEntretien();
  }


  getallEntretien(){
    this.entretserv.GetEntretiens()
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

  deleteEntretien(id: any): void {
    this.entretserv.DeleteEntretien(id)
      .subscribe( (res) => {
        this.getallEntretien();
      })
  }
}
