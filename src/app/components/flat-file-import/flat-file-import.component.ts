import { Component, OnInit } from '@angular/core';
import FlatfileImporter from 'flatfile-csv-importer';
import { SandboxApiService } from 'src/app/services/sandbox-api-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-flat-file-import',
  templateUrl: './flat-file-import.component.html',
  styleUrls: ['./flat-file-import.component.css']
})
export class FlatFileImportComponent implements OnInit {
  /**
   * License key available from your app dashboard at flatfile.io
   */
  LICENSE_KEY = "4171f0b4-5f5c-4b32-a008-356ebb813e4e";

  /**
   * Result data from importer
   */
  results = "[Your raw data will appear here]";
 
  private importer: FlatfileImporter;

  //fileId: number = 114594;
  validRevCodes: any = [];
  validHCPCSCodes: any = [];
  delimiters = [',', '-'];
  hcpcsLookupValue: string = '';
  hcpcsLookupDesc: string = '';
  hcpcsFiles: string[];
   
  
  constructor(private apiService: SandboxApiService) {
   
  }
  ngOnInit() {


    
    
  //get the list of HCPCS file and populate drop-down
    this.apiService.getHCPCSFiles().subscribe(data => {
    this.hcpcsFiles = data as string[];
  }); 
  
    //get the list of valid rev codes from the SQL database
     this.apiService.getRevCodes().subscribe(data =>{
      this.validRevCodes = data;
    })

    
    FlatfileImporter.setVersion(2);
    this.initializeImporter();

    //intercept each row of data and perform validation/lookups
    //of both rev code and hcpcs codes
    this.importer.registerRecordHook((record, index) => {
      let out: any = {};

      //format and split the rev code column into 3 digit values 
      let userRevCodes = record.rev.split(new RegExp(this.delimiters.join('|'), 'g'));
      let validRevCodes =  this.validRevCodes;

      //format and split the hcpcs column into individual values
      let userHCPCSCodes = record.hcpcs.split(new RegExp(this.delimiters.join('|'), 'g'));
      let validHCPCSCodes = this.validHCPCSCodes;

      //grab any invalid rev codes to display to the user in the error message
      let invalidCodes = userRevCodes.filter(function(i){
        return this.indexOf(i) < 0;
      },
      validRevCodes
      );

      //grab any invalid hcpcs codes to display to the user in the error message
      let invalidHCPCSCodes = userHCPCSCodes.filter(function(i){
        return this.indexOf(i) < 0;
      },
      validHCPCSCodes
      );

      //show error if any of the rev codes don't match the valid codes from SQL
      if (!userRevCodes.every(i => validRevCodes.includes(i)) && !userRevCodes.includes('')){
        out.rev = {
          value: record.rev,
          info: [
            {
              message: "The following Revenue Codes were not found in the system: (" + invalidCodes + ") Please enter valid codes here and hit ENTER.",
              level: "error"
            }
          ]
        };
      }


      //show error if any of the rev codes don't match the valid codes from SQL
      if (!userHCPCSCodes.every(i => validHCPCSCodes.includes(i)) && !userHCPCSCodes.includes('')){
        out.hcpcs = {
          value: record.hcpcs,
          info: [
            {
              message: "The following HCPCS Codes were not found in the system: (" + invalidHCPCSCodes + ") Please enter valid codes here and hit ENTER.",
              level: "error"
            }
          ]
        };
      }

      //dump the errors out to the screen
      return out;
    }); //end of record hook listener
     

    this.importer.setCustomer({
      userId: "12345",
      name: "Jeff Rothamel"
    });

    
  }


  //event handler for the HCPCS lookup drop down 
  //this gets the selected value from the user to be used 
  //to pull a valid list of HCPCS codes to validate against later
  fileSelected(event: any){
    //grab the selected value
    this.hcpcsLookupValue = event.target.value;
  
  

    //get the list of HCPCS codes based on the selected value from the user
    if (this.hcpcsLookupValue != '0' ){

      //get the list of valid hcpcs codes from the SQL database
      this.apiService.getHCPCSCodes(this.hcpcsLookupValue).subscribe(data => {
        this.validHCPCSCodes = data;
      });
     
    }

  }

  async launchImporter() {

    //check for a valid FlatFile.IO license key
    if (!this.LICENSE_KEY) {
      return alert("Set LICENSE_KEY on Line 13 before continuing.");
    }

    //check that the user has selected a valid HCPS lookup file from the drop down list
    if (this.hcpcsLookupValue == '0'){
      return alert("Please select a HCPCS lookup file before continuing.");
    }

    try {
      let results = await this.importer.requestDataFromUser();
      this.importer.displayLoader();

      
       //download the original file and send raw data to the SQL database
       this.apiService.insertBatch(results.batchId, results.fileName, results.createdAt, results.submittedAt).subscribe(response => {
        this.apiService.insertBatchData(results.batchId, results.validData).subscribe( response => {
          this.importer.displaySuccess("Success!");
          this.results = JSON.stringify(results.validData, null, 2);
        });
      });


    } catch (e) {
      console.info(e || "window close");
    }
  }

  initializeImporter() {

    this.importer = new FlatfileImporter(this.LICENSE_KEY, {

      fields: [
        {
          label: "Contract ID",
          key: "contractid",
          validators: [
            {
              validate: "regex_matches",
              regex: "^[a-zA-Z .!@#$%^*_&()\\\"-]*$",
              error: "cannot contain numbers"
            },
            {
              validate: "required",
              error: "this is a required field"
            }
          ]
        },
        {
          label: "Product",
          key: "productid",
          validators: [
            {
             
              validate: "regex_matches",
              regex: "^[a-zA-Z .!@#$%^*_&()\\\"-]*$",
              error: "cannot contain numbers"
            }
          ]
        },
        {
          label: "Contract Category",
          key: "codedesc",
          validators: [
            {
              validate: "regex_matches",
              regex: "^[a-zA-Z0-9 ,/.!@#$%^*_&()\\\"-]*$",
              error: "must be a valid alphanumeric"
            }
          ]
        },
        {
          label: "Revenue Code",
          key: "rev",
          /* validators: [
            {
              //regex: "^[0-9]*$",
              validate: "required",
              error: "this is a required field"
            }
          ] */
        },
        {
          label: "Inpatient Rate",
          key: "ip_ind",
          validators: [
            {
              validate: "regex_matches",
              regex: "^0(\.[0-9]{1,4})?|1(\.0{1,4})?|-1$",
              //regex: "^(0(\.[0-9]{1,4})?|1(\.0{1,4})?)$",
              error: "must be a numeric value between 0 and 1 OR -1"
            }
          ]
        },
        {
          label: "EX Inpatient Rate",
          key: "ex_ip_ind",
          validators: [
            {
              validate: "regex_matches",
              regex: "^0(\.[0-9]{1,4})?|1(\.0{1,4})?|-1$",
              //regex: "^(0(\.[0-9]{1,4})?|1(\.0{1,4})?)$",
              error: "must be a numeric value between 0 and 1 OR -1"
            }
          ]
        },
        {
          label: "Outpatient Rate",
          key: "op_ind",
          validators: [
            {
              validate: "regex_matches",
              regex: "^0(\.[0-9]{1,4})?|1(\.0{1,4})?|-1$",
              error: "must be a numeric value between 0 and 1 OR -1"
            }
          ]
        },
        {
          label: "EX Outpatient Rate",
          key: "ex_op_ind",
          validators: [
            {
              validate: "regex_matches",
              regex: "^0(\.[0-9]{1,4})?|1(\.0{1,4})?|-1$",
              error: "must be a numeric value between 0 and 1 OR -1"
            }
          ]
        },
        {
          label: "Same Day Surgery Rate",
          key: "sds_ind",
          validators: [
            {
              validate: "regex_matches",
              //regex: "^[0-9]*$",
              regex: "^0(\.[0-9]{1,4})?|1(\.0{1,4})?|-1$",
              error: "must be a numeric value between 0 and 1 OR -1"
            }
            
          ]
        },
        {
          label: "EX Same Day Surgery Rate",
          key: "ex_sds_ind",
          validators: [
            {
              validate: "regex_matches",
              //regex: "^[0-9]*$",
              regex: "^0(\.[0-9]{1,4})?|1(\.0{1,4})?|-1$",
              error: "must be a numeric value between 0 and 1 OR -1"
            
            }
          ]
        },
        {
          label: "ER Rate",
          key: "er_ind",
          validators: [
            {
              validate: "regex_matches",
              //regex: "^[0-9]*$",
              regex: "^0(\.[0-9]{1,4})?|1(\.0{1,4})?|-1$",
              error: "must be a numeric value between 0 and 1 OR -1"
            
            }
          ]
        },
        {
          label: "EX ER Rate",
          key: "ex_er_ind",
          validators: [
            {
              validate: "regex_matches",
              //regex: "^[0-9]*$",
              regex: "^0(\.[0-9]{1,4})?|1(\.0{1,4})?|-1$",
              error: "must be a numeric value between 0 and 1 OR -1"
            
            }
          ]
        },
        {
          label: "CPT/HCPCS",
          key: "hcpcs",
          validators: [
            {
              validate: "regex_matches",
              //regex: "^[0-9]*$",
              regex: "^[a-zA-Z0-9 ,/.!@#$%^*_&()\\\"-]*$",
              error: "must be an alphanumeric value"
            }
          ]
        },
      ],
      type: "PPE Record",
      allowInvalidSubmit: true,
      managed: true,
      allowCustom: true,
      disableManualInput: true
    });
  }


  
     
 

 
   
}
