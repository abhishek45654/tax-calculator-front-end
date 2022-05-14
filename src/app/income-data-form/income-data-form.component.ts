import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaxTable } from '../model/tax-table';
import { default as taxRate } from '../../assets/taxRate.json';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-income-data-form',
  templateUrl: './income-data-form.component.html',
  styleUrls: ['./income-data-form.component.css']
})
export class IncomeDataFormComponent implements OnInit {

  currentUser = JSON.parse(localStorage.getItem('currentUser')||"");

  incomeDataForm: FormGroup;


  constructor(private fb: FormBuilder, private alertService: AlertService, private authService: AuthService,
    private userService: UserService) {
    this.incomeDataForm = fb.group({
      filingStatus: [null,Validators.required],
      grossAnnualIncome: [0, [Validators.required]],
      age: [0, Validators.required],
      deduction: [null, Validators.required],
      taxCredits: [0],
      contribution401: [0],
      iraContribution: [0],
      witheld: [0],
      propertyTaxesPaid: [0],
      earnedInterests: [0],
      charity: [0],
      stateTaxesPaid: [0],
      educationalExpenses: [0],
      medicalBills: [0],
      previousTaxReturns: [0],
      other: [0]
    })
  }

  taxTable: any;
  federalTax = 0;
  ficaTax = 0;
  status = ["Single", "Married filing jointly / qualifying widow", "Married filing separately", "Head of the household"];
  deductions = ["STANDARD", "ITEMISED"]
  calculatorActive = true;
  taxRate = 0;
  standardDeduction=0;
  itemisedDeduction=0;
  totalIncomeTaxes=0;
  incomeAfterTaxes=0;
  taxCredits=0;
  refundAmount=0;


  calculate() {
    this.federalTax = 0;
    this.userService.getTaxBracketsByStatus(this.incomeDataForm.value.filingStatus).subscribe(res => {
      const taxBrackets = res;
      this.standardDeduction = taxBrackets[0].standardDeduction;
      let grossIncome: number = this.incomeDataForm.value.grossAnnualIncome;
      let deduction: number = ((this.incomeDataForm.value.iraContribution || 0) + (this.incomeDataForm.value.contribution401 || 0));
      if (this.incomeDataForm.value.deduction == 'ITEMISED') {
        deduction += this.totalItemisedDeduction();
        this.itemisedDeduction = this.totalItemisedDeduction();
        if(this.incomeDataForm.value.age>65) {
          deduction+=1350;
        }
      }
      else {
        deduction += taxBrackets[0].standardDeduction;
      }
      let adjustedGrossIncome: number =0;
      if(deduction<=grossIncome) {
        adjustedGrossIncome = grossIncome - deduction;
        this.federalTax=this.calculateTax(adjustedGrossIncome,taxBrackets);
      }
      if(deduction>grossIncome) {
        this.taxRate=0;
      }
      this.federalTax=Math.round(this.federalTax);

      this.ficaTax = grossIncome * 0.0765;
      this.ficaTax=Math.round(this.ficaTax);
      this.incomeAfterTaxes-=this.ficaTax;
      this.refundAmount =  this.ficaTax+this.federalTax-(this.incomeDataForm.value.witheld||0)-(this.incomeDataForm.value.taxCredits||0);
    });

  }
  
  calculateTax(agi:number,taxBrackets:any): number {
    let tax=0;
    for (var val of taxBrackets) {
      if (val.incomeUpperLimit != 0 && val.incomeRange <= agi) {
        tax += val.maxTax;
        agi -= val.incomeRange;
        this.taxRate = val.taxRate;
      }
      else {
        tax += (agi * val.taxRate) / 100;
        agi = 0;
        this.taxRate = val.taxRate;
      }
      if (agi <= 0) break;
    }
    return tax;
  }

  totalItemisedDeduction(): number {
    let totalItemisedDeduction = ((this.incomeDataForm.value.propertyTaxesPaid|| 0)  + (this.incomeDataForm.value.earnedInterests|| 0)  +
      (this.incomeDataForm.value.charity|| 0)  + (this.incomeDataForm.value.stateTaxesPaid|| 0)  + (this.incomeDataForm.value.educationalExpenses|| 0)  +
      (this.incomeDataForm.value.medicalBills|| 0)  + (this.incomeDataForm.value.previousTaxReturns|| 0)  + (this.incomeDataForm.value.other || 0));

    return totalItemisedDeduction;
  }

  saveTaxDetails() {
    let data = {
      userId : this.currentUser.user_id,
      fillerStatus: this.incomeDataForm.value.filingStatus,
      age: this.incomeDataForm.value.age,
      grossAnnualIncome: this.incomeDataForm.value.grossAnnualIncome,
      deductionType: this.incomeDataForm.value.deduction,
      iraContribution: this.incomeDataForm.value.iraContribution,
      contribution_401: this.incomeDataForm.value.contribution401,
      withheld: this.incomeDataForm.value.witheld,
      taxCredit: this.incomeDataForm.value.taxCredits,
    }
    this.userService.saveTaxFormDetails(data).subscribe(res=>{
      this.alertService.showAlert("Tax Details Saved Successfully");
      if(this.incomeDataForm.value.deduction=="ITEMISED"){
        let data = {
          formId: res,
          userId:this.currentUser.user_id,
          propertyTaxes:this.incomeDataForm.value.propertyTaxesPaid,
          earnedInterests:this.incomeDataForm.value.earnedInterests,
          charity:this.incomeDataForm.value.charity,
          stateLocalTaxes  :this.incomeDataForm.value.stateTaxesPaid,
          educationalExpenses:this.incomeDataForm.value.educationalExpenses,
          unreimbursedMedicalBills:this.incomeDataForm.value.medicalBills,
          previousTaxReturns:this.incomeDataForm.value.previousTaxReturns,
          others:this.incomeDataForm.value.other
        }
        this.userService.saveItemisedDeductionDetails(data).subscribe(res=>{
          this.alertService.showAlert(res);
        })
      }
    })
  }

  ngOnInit(): void {

  }

}
