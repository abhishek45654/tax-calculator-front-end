import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-itemised-deduction-history',
  templateUrl: './itemised-deduction-history.component.html',
  styleUrls: ['./itemised-deduction-history.component.css']
})
export class ItemisedDeductionHistoryComponent implements OnInit {

  currentUser = JSON.parse(localStorage.getItem('currentUser')||"")
  data:any;
  constructor(private userService:UserService, public dialogRef:MatDialogRef<ItemisedDeductionHistoryComponent>,
    @Inject(MAT_DIALOG_DATA)data:any) {
      this.data = data;
     }

  ngOnInit(): void {
  }

}
