import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiService } from 'src/app/services/api-service';
import { SandboxApiService } from 'src/app/services/sandbox-api-service';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CdkTreeModule } from '@angular/cdk/tree';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HelperService } from './services/helper.service';
import { NotificationService } from './services/notification.service';
import { UtilityService } from './services/utility.service';
import { DialogService } from './services/dialog.service';
import { DebugComponent } from './components/debug/debug.component';
import { SlickComponent } from './components/slick/slick.component';
import { ProcesssingModalComponent } from './components/processsing-modal/processsing-modal.component';
import { ConfigurationService } from './services/configuration.service';
import { LanguageModalComponent } from './components/language-modal/language-modal.component';
import { LostInstructionsModalComponent } from './components/lost-instructions-modal/lost-instructions-modal.component';
import { GenericModalComponent } from './components/generic-modal/generic-modal.component';
import { CustomActionLinkComponent } from './components/custom-action-link/custom-action-link.component';
import { SnackbarwrapperComponent } from './components/snackbarwrapper/snackbarwrapper.component';
import { FlatFileImportComponent } from './components/flat-file-import/flat-file-import.component';

export const MaterialModules = [
  CdkTableModule,
  CdkTreeModule,
  DragDropModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  ScrollingModule,
];

export function ConfigurationServiceFactory(provider: ConfigurationService) {
  return () => provider.load();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // WayfindComponent,
    // LaunchComponent,
    DebugComponent,
    // BrowseComponent,
    // NodeToNodeViewerComponent,
    // TestViewerComponent,
    // NodeToNodeViewerModalComponent,
    SlickComponent,
    ProcesssingModalComponent,
    // ValidateDestinationComponent,
    // DestinationSelectorModalComponent,
    // DestinationNamesViewerModalComponent,
    LanguageModalComponent,
    LostInstructionsModalComponent,
    GenericModalComponent,
    // VerticalRouteViewerComponent,
    // TestFillModalComponent,
    // QrCodeComponentComponent,
    // FullRouteViewerComponent,
    CustomActionLinkComponent,
    // EmailButtonComponent,
    // SharingOptionsComponent,
    // SmsButtonComponent,
    // WhatsappButtonComponent,
    // FacebookMessengerButtonComponent,
    // CopyLinkButtonComponent,
    // SearchComponent,
    // PreviewViewerComponent,
    // UiImgLoaderDirective,
    // EmailStaffModalComponent,
    SnackbarwrapperComponent,
    FlatFileImportComponent,
    // CategoryDestinationSelectorModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModules,
    // SlickCarouselModule,
    NgxQRCodeModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    ApiService,
    SandboxApiService,
    HelperService,
    NotificationService,
    DialogService,
    UtilityService,
    ConfigurationService,
    SnackbarwrapperComponent,
    { provide: APP_INITIALIZER, useFactory: ConfigurationServiceFactory, deps: [ConfigurationService], multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    // NodeToNodeViewerModalComponent,
    ProcesssingModalComponent,
    // ValidateDestinationComponent,
    // DestinationSelectorModalComponent,
    // DestinationNamesViewerModalComponent,
    LanguageModalComponent,
    LostInstructionsModalComponent,
    GenericModalComponent,
    // TestFillModalComponent,
    // EmailStaffModalComponent,
    // CategoryDestinationSelectorModalComponent
  ]
})
export class AppModule { }
