import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { deparetment } from 'models/deparetment';
import { DeparetmentService } from 'src/app/services/deparetment.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-deparetment',
  templateUrl: './list-deparetment.component.html',
  styleUrls: ['./list-deparetment.component.css']
})
export class ListDeparetmentComponent implements OnInit {
  deparetments: deparetment = new deparetment();
  readData: any;
  formDeparetment!: FormGroup;
  showAdd!: boolean;
  showUpdate!: boolean;
  errormsg: any;
  successmsg: any;

  displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  dataSource!: MatTableDataSource<deparetment>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private formbuilder: FormBuilder, private departService: DeparetmentService) { }

  ngOnInit() {
    this.formDeparetment = this.formbuilder.group({
      name: [""],
    })
    this.getallDepart();
  }

  addDepart(): void {
    if (this.formDeparetment.valid) {
      this.departService.AddDeparetment(this.formDeparetment.value).subscribe(
        (res) => {
          this.formDeparetment.reset();
          this.getallDepart();
          this.successmsg = res.message;
        })
    }
    this.errormsg = 'field is required !';
  }

  getallDepart() {
    this.departService.GetDeparetments()
      .subscribe((res) => {
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

  deleteDepart(id: any): void {
    this.departService.DeleteDeparetment(id)
      .subscribe((res) => {
        this.getallDepart();
      })
  }

  onEdit(deparetment: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.deparetments.id = deparetment.id;
    this.formDeparetment.controls["name"].setValue(deparetment.name)
  }

  updateDepart() {
    if (this.formDeparetment.valid) {
      this.departService.UpdateDeparetment(this.formDeparetment.value, this.deparetments.id).subscribe((res) => {
        this.formDeparetment.reset();
        this.getallDepart();
        this.successmsg = res.message;
      });
    }else{
      this.errormsg = "field is required !";
    }
  }

  clickAddDepart() {
    this.formDeparetment.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
}
