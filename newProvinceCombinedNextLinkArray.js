function mainfunction() {
    var query = "?$select=accountid,ni_check,ni_provincetemp,ni_provincebillingtemp,ni_provinceshippingtemp";
    window.provinceArray = [];
    window.provinceBillingArray = [];
    window.provinceShippingArray = [];
    window.iteration = 0;
    accountsProvinceValidate(query);
}
//This function retrieves the account entity records
//Checks the 'provinceTemp', 'provinceBillingTemp', 'provinceShippingTemp' fields for each record
//Calls the 'accountProvinceValidate' function to update the permanent 'Province', 'ProvinceBilling', 'ProvinceShipping' fields if conditions are met
function accountsProvinceValidate(query) {
    console.log('Success 0');
    Xrm.WebApi.retrieveMultipleRecords("account", query).then(
        function success(result) {
            console.log("Loading account records...");
            //Link to the next set of records (each set has a limit of 5000 records)
            console.log("Next page link: " + result.nextLink);
            window.nextPageLink = result.nextLink; 
            if (result != null) {
                // Timeout function creates a delay before processing next record to avoid browser crash
                for (var accountRecordsIndex = 0; accountRecordsIndex < result.entities.length; accountRecordsIndex++) {
                   (function(accountRecordsIndex) {
                        setTimeout (function () {
                            var id = result.entities[accountRecordsIndex].accountid;

                            var provinceTemp = result.entities[accountRecordsIndex].ni_provincetemp;
                            var provinceBillingTemp = result.entities[accountRecordsIndex].ni_provincebillingtemp;
                            var provinceShippingTemp = result.entities[accountRecordsIndex].ni_provinceshippingtemp;

                            // converts the provinceTemp, provinceBillingTemp, provinceShippingTemp variables to string assigns it to provinceTemp1, provinceBillingTemp1 and provinceShippingTemp1
                            var provinceTemp1 = " \'"+ provinceTemp + "\'";
                            var provinceBillingTemp1 = " \'"+ provinceBillingTemp + "\'";
                            var provinceShippingTemp1 = " \'"+ provinceShippingTemp + "\'";

                            // Assigns default value of "Passed" to array elements   
                            window.provinceArray[accountRecordsIndex + (window.iteration*5000)] = "Passed";    
                            window.provinceBillingArray[accountRecordsIndex + (window.iteration*5000)] = "Passed";           
                            window.provinceShippingArray[accountRecordsIndex + (window.iteration*5000)] = "Passed";
                            // checks if cityTemp, cityBillingTemp, cityShippingTemp variables have valid inputs
                            if (provinceTemp != null) {
                                updateProvinceField(provinceTemp1,id,accountRecordsIndex);
                            }
                            if (provinceBillingTemp != null) {
                                updateProvinceBillingField(provinceBillingTemp1,id,accountRecordsIndex);
                            }
                            if (provinceShippingTemp != null) {
                                updateProvinceShippingField(provinceShippingTemp1,id,accountRecordsIndex);
                            }
                            //waits 200ms before starting the setting the Check fields to ensure that all array elements have been assigned the right values
                            setTimeout(function(){ updatecheck(id,accountRecordsIndex);},200);
                        }, 400*accountRecordsIndex);
                    })(accountRecordsIndex);
                }
            }  
        },
        function(error) {alert(error.message);}
    );
    setTimeout(function(){
        if(window.nextPageLink){
            query = window.nextPageLink.substr(71);   // for production use query = window.nextPageLink.substr(67)
            window.iteration=window.iteration +1;
            accountsProvinceValidate(query);
            } else
               console.log("All accounts updated");
            }, 2100000);
}


//This function filters the result from the cities entity using the citytemp value from accounts entity
function updateProvinceField(provinceTemp1,id,accountRecordsIndex) {
    var provincetempA = provinceTemp1;
    var ide = id;
    var accountRecordsIndex = accountRecordsIndex;
    //Retrieves the province entity records and filters the result using the 'provincetemp' field value
    Xrm.WebApi.retrieveMultipleRecords("geo_province", "?$select=geo_name,geo_provinceid&$filter=geo_name eq " + provincetempA).then(
        function success(result) {
            // Updates the 'Province' field if the function returns a valid result, else updates only the corresponding City array element to "Failed" if result is not valid
            if (result.entities[0]) {
                var provinceIde = result.entities[0].geo_provinceid;
                //Setting the fields to update using the schema name and assigning to a variable
                var dataPasses = {"ni_Province@odata.bind":"/geo_provinces("+provinceIde+")"};
                //Updating the 'Province' field in account entity
                Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                    function success(result) {},
                    function(error) {alert(error.message);}
                );
            } else {
                window.provinceArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
            } 
        },
        function(error) {
            window.provinceArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
        }
    );
}

//This function filters the result from the cities entity using the city billing temp value from accounts entity
function updateProvinceBillingField(provinceBillingTemp1,id,accountRecordsIndex) {
    var provinceBillingTempA = provinceBillingTemp1;
    var ide = id;
    var accountRecordsIndex = accountRecordsIndex;
    //Retrieves the city entity records and filters the result using the 'citybillingtemp' field value
    Xrm.WebApi.retrieveMultipleRecords("geo_province", "?$select=geo_name,geo_provinceid&$filter=geo_name eq " + provinceBillingTempA).then(
        function success(result) {
            // Updates the 'Province Billing' field if the function returns a valid result, else updates only the array element to "Failed" if result is not valid
            if (result.entities[0]) {
                var provinceIde = result.entities[0].geo_provinceid;
                //Setting the fields to update using the schema name and assigning to a variable
                var dataPasses = {"ni_ProvinceBilling@odata.bind":"/geo_provinces("+provinceIde+")"}; 
                //Updating the 'Province Billing' field in account entity 
                Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                    function success(result) {},
                    function(error) {alert(error.message);}
                );
            } else {
                window.provinceBillingArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
            }        
        },
        function(error) {
            window.provinceBillingArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
        }
    );     
}

//This function filters the result from the cities entity using the city shipping temp value from accounts entity
function updateProvinceShippingField(provinceShippingTemp1,id,accountRecordsIndex) {
    var provinceShippingTempA = provinceShippingTemp1;
    var ide = id;
    var accountRecordsIndex = accountRecordsIndex;
    //Retrieves the city entity records and filters the result using the 'cityshippingtemp' field value
    Xrm.WebApi.retrieveMultipleRecords("geo_province", "?$select=geo_name,geo_provinceid&$filter=geo_name eq " + provinceShippingTempA).then(
        function success(result) {
            // Updates the 'City Shipping' field if the function returns a valid result, else updates only the array element if result is not valid
            if (result.entities[0]) {
                //updatecheck(ide,accountRecordsIndex);
                var provinceIde = result.entities[0].geo_provinceid;
                //Setting the fields to update using the schema name and assigning to a variable
                var dataPasses = {"ni_Provinceshipping@odata.bind":"/geo_provinces("+provinceIde+")"};
                //Updating the 'Province Shipping' field in account entity
                Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                    function success(result) {},
                    function(error) {alert(error.message);}
                );
            }  else {
                window.provinceShippingArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
            }              
        },
        function(error) {
            window.provinceShippingArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
        }
    );     
}
//function to update the check field
function updatecheck(id,accountRecordsIndex) {
    var ide = id;
    var accountRecordsIndex = accountRecordsIndex;
    if((window.provinceArray[accountRecordsIndex + (window.iteration*5000)] == "Passed")&&( window.provinceBillingArray[accountRecordsIndex + (window.iteration*5000)] == "Passed")&&(window.provinceShippingArray[accountRecordsIndex + (window.iteration*5000)] == "Passed")) {
        var dataPass = { "ni_check": "Passed" };
        Xrm.WebApi.updateRecord("account", ide,dataPass).then(
            function success(result) {},
            function(error) {alert(error.message);}
        );
    }else {
        var dataFail = { "ni_check": "Failed" };
        Xrm.WebApi.updateRecord("account", ide,dataFail).then(
            function success(result) {},
            function(error) {alert(error.message);}
        );
    }
}