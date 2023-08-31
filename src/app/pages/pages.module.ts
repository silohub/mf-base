import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class PagesModule {

}
