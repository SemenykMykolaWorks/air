import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';

import { MainComponent } from './containers/main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './containers/home/home.component';
import { TableComponent } from './containers/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeService } from './services/home.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableService } from './services/table.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DropdownDirective } from './directives/dropdown.directive';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    TableComponent,
    HeaderComponent,
    DropdownDirective,
    FilterPipe
  ],
  exports: [],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgbCarouselModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    HomeService,
    TableService
  ]
})
export class MainModule {
}
