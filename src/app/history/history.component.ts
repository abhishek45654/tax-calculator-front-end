import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemisedDeductionHistoryComponent } from '../dialogs/itemised-deduction-history/itemised-deduction-history.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  currentUser = JSON.parse(localStorage.getItem('currentUser')||"")

  dataSource = new MatTableDataSource();



  displayColumns: string[] = [
    "fillerStatus",
    "age",
    "dependency",
    "grossAnnualIncome",
    "deductionType",
    "iraContribution",
    "contribution_401",
    "withheld",
    "taxCredit",
    "timeStamp"
  ]

  constructor( private userService:UserService, private dialogServie:MatDialog) { 
    this.getAllTaxDetails();
  }
  taxDetailsData:any;
  itemisedDeductionData:any;

  getAllTaxDetails() {
    this.taxDetailsData = this.userService.getAllTaxFormDetails(this.currentUser.user_id)
    .subscribe(res=>{
      this.dataSource = new MatTableDataSource(res);
    });
  }

  showItemisedDeductionDetail(id:any) {
    this.itemisedDeductionData = this.userService.getItemisedDeductionByformId(id).subscribe(res=>{
      const localDialogConfig = new MatDialogConfig();
      localDialogConfig.disableClose=false;
      localDialogConfig.autoFocus=true;
      localDialogConfig.data = res;
      const localDialogRef = this.dialogServie.open(ItemisedDeductionHistoryComponent,localDialogConfig);
    });
    
  }

  ngOnInit(): void {
  }

}
