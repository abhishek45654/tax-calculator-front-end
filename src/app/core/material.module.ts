import { NgModule } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card"
import { MatInputModule } from "@angular/material/input"
import { MatTabsModule } from "@angular/material/tabs"
import { MatIconModule } from "@angular/material/icon"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatButtonModule } from "@angular/material/button"
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
    imports: [
        MatPaginatorModule,
        MatCardModule,
        MatInputModule,
        MatTabsModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatDialogModule,
        MatGridListModule
    ],
    exports: [
        MatPaginatorModule,
        MatCardModule,
        MatInputModule,
        MatTabsModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatDialogModule,
        MatGridListModule
    ]
})
export class CustomMaterialModule {}