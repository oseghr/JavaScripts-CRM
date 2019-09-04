//This function retrieves the account entity records
//Checks the 'provinceTemp', 'provinceBillingTemp', 'provinceShippingTemp' fields for each record
//Calls the 'updateProvinceField' function to update the permanent 'Province', 'provinceBilling', 'provinceShipping' field if conditions are met
function accountsProvinceValidate() {
    alert('Success 0');
    Xrm.WebApi.retrieveMultipleRecords("account", "?$select=accountid,ni_check,ni_provincetemp,ni_provincebillingtemp,ni_provinceshippingtemp").then(
        function success(result) {
            alert("Loading Account Records...");
            //Link to the next set of records (each set has a limit of 5000 records)
            console.log("Next page link: " + result.nextLink);
            if (result != null) {
                var dataPass = { "ni_check": "Pass Province" };
                var dataFail = { "ni_check": "Fail Province" };
                alert("Entering Loop...");
                // Looping through the account records
                // Timeout function creates a delay before processing next record to avoid browser crash
                for (var accountRecordsIndex =0; accountRecordsIndex < result.entities.length; accountRecordsIndex++) {
                    (function(accountRecordsIndex) {
                        setTimeout (function () {

                            var id = result.entities[accountRecordsIndex].accountid;
                            var provinceTemp = result.entities[accountRecordsIndex].ni_provincetemp;
                            var provinceBillingTemp = result.entities[accountRecordsIndex].ni_provincebillingtemp;
                            var provinceShippingTemp = result.entities[accountRecordsIndex].ni_provinceshippingtemp;

                            // converts the provinceTemp, provinceBillingTemp, provinceShippingTemp variables to string assigns it to provinceTemp1, provinceBillingTemp1 and provinceShippingTemp1
                            var provincetemp = " \'"+ provinceTemp + "\'";
                            var provinceBillingTemp1 = " \'"+ provinceBillingTemp + "\'";
                            var provinceShippingTemp1 = " \'"+ provinceShippingTemp + "\'";

                            // checks if provinceTemp, provinceBillingTemp, provinceShippingTemp variables have valid inputs
                            if (provinceTemp != null) {
                                updateProvinceField(provincetemp,id,dataFail);
                            } else {
                                Xrm.WebApi.updateRecord("account", id, dataPass).then(
                                    function success(result) {},
                                    function(error) {alert(error.message);}
                                );
                            } 
                            
                            if (provinceBillingTemp != null) {
                                updateProvinceBillingField(provinceBillingTemp1,id,dataFail);
                            } else {
                                Xrm.WebApi.updateRecord("account", id, dataPass).then(
                                    function success(result) {},
                                    function(error) {alert(error.message);}
                                );
                            }
                            
                            if (provinceShippingTemp != null) {
                                updateProvinceShippingField(provinceShippingTemp1,id,dataFail);
                            } else {
                                Xrm.WebApi.updateRecord("account", id, dataPass).then(
                                    function success(result) {},
                                    function(error) {alert(error.message);}
                                );
                            }
                        }, 350*accountRecordsIndex);
                    })(accountRecordsIndex);
                }
            }   
        },
        function(error) {alert(error.message);}
    );
}

//This function filters the result from the province entity using the citytemp value from accounts entity
function updateProvinceField(provincetemp,id,dataFail) {
    var provincetempA = provincetemp;
    var ide = id;
    var dataFailA = dataFail;
    //Retrieves the province entity records and filters the result using the 'provincetemp' field value
    Xrm.WebApi.retrieveMultipleRecords("geo_province", "?$select=geo_name,geo_provinceid&$filter=geo_name eq " + provincetempA).then(
        function success(result) {
            // Updates the 'Province' field if the function returns a valid result, else updates only the 'Check' field if result is not valid
            if (result.entities[0]) {
                var provinceIde = result.entities[0].geo_provinceid;
                //Setting the fields to update using the schema name and assigning to a variable
                var dataPasses = {"ni_Province@odata.bind":"/geo_provinces("+provinceIde+")","ni_check":"Pass Province"};
                //Updating the 'Province' and 'Check' fields in account entity
                Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                    function success(result) {},
                    function(error) {alert(error.message);}
                );
            } else {
                Xrm.WebApi.updateRecord("account", ide, dataFailA).then(
                    function success(result) {},
                    function(error) {alert(error.message);}
                 );
            }       
        },
        function(error) {
            Xrm.WebApi.updateRecord("account", ide, dataFailA).then(
                function success(result) {},
                    function(error) {alert(error.message);}
            ); 
        }
    );
}

//This function filters the result from the province entity using the provincebillingtemp value from accounts entity
function updateProvinceBillingField(provinceBillingTemp1,id,dataFail) {
    var provinceBillingTempA = provinceBillingTemp1;
    var ide = id;
    var dataFailA = dataFail;
    //Retrieves the province entity records and filters the result using the 'provincebillingtemp' field value
    Xrm.WebApi.retrieveMultipleRecords("geo_province", "?$select=geo_name,geo_provinceid&$filter=geo_name eq " + provinceBillingTempA).then(
        function success(result) {
            // Updates the 'Province Billing' field if the function returns a valid result, else updates only the 'Check' field if result is not valid
            if (result.entities[0]) {
                var provinceIde = result.entities[0].geo_provinceid;
                //Setting the fields to update using the schema name and assigning to a variable
                var dataPasses = {"ni_ProvinceBilling@odata.bind":"/geo_provinces("+provinceIde+")","ni_check":"Pass Province"}; 
                //Updating the 'Province Billing' and 'Check' fields in account entity
                Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                    function success(result) {},
                    function(error) {alert(error.message);}
                );
            } else {
                Xrm.WebApi.updateRecord("account", ide, dataFailA).then(
                    function success(result) {},
                    function(error) {alert(error.message);}
                );
            }
                
        },
        function(error) {
            Xrm.WebApi.updateRecord("account", ide, dataFailA).then(
                function success(result) { },
                    function(error) {alert(error.message);}
            ); 
        }
    );
}

//This function filters the result from the province entity using the provinceshippingtemp value from accounts entity
function updateProvinceShippingField(provinceShippingTemp1,id,dataFail) {
    var provinceShippingTempA = provinceShippingTemp1;
    var ide = id;
    var dataFailA = dataFail;
    //Retrieves the province entity records and filters the result using the 'provinceshippingtemp' field value
    Xrm.WebApi.retrieveMultipleRecords("geo_province", "?$select=geo_name,geo_provinceid&$filter=geo_name eq " + provinceShippingTempA).then(
        function success(result) {
            // Updates the 'Province Shipping' field if the function returns a valid result, else updates only the 'Check' field if result is not valid
            if (result.entities[0]) {
                var provinceIde = result.entities[0].geo_provinceid;
                //Setting the fields to update using the schema name and assigning to a variable
                var dataPasses = {"ni_Provinceshipping@odata.bind":"/geo_provinces("+provinceIde+")","ni_check":"Pass Province"};
                //Updating the 'Province Shipping' and 'Check' fields in account entity
                Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                    function success(result) {},
                    function(error) {alert(error.message);}
                );
            } else {
                Xrm.WebApi.updateRecord("account", ide, dataFailA).then(
                    function success(result) {},
                    function(error) {alert(error.message);}
                );
            }     
        },
        function(error) {
            Xrm.WebApi.updateRecord("account", ide, dataFailA).then(
                function success(result) {},
                function(error) {alert(error.message);}
            ); 
        }
    );
}