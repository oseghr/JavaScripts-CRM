//This function retrieves the account entity records
//Checks the 'countryTemp', 'countryBillingTemp', 'countryShippingTemp' fields for each record
//Calls the 'updateCountryField' function to update the permanent 'Country', 'countryBilling', 'countryShipping' field if conditions are met
function accountsCountryValidate() {
    alert('Success 0');
    Xrm.WebApi.retrieveMultipleRecords("account", "?$select=accountid,ni_check,ni_countrytemp,ni_countrybillingtemp,ni_countryshippingtemp").then(
        function success(result) {
            alert("Loading account records...");
            //Link to the next set of records (each set has a limit of 5000 records)
            console.log("Next page link: " + result.nextLink);
            if (result != null) {
                var dataPass = { "ni_check": "Passed Country" };
                var dataFail = { "ni_check": "Failed Country" };
                alert("Entering Loop...");
                // Looping through the account records
                // Timeout function creates a delay before processing next record to avoid browser crash
                for (var accountRecordsIndex =0; accountRecordsIndex < result.entities.length; accountRecordsIndex++) {
                    (function(accountRecordsIndex) {
                        setTimeout (function () {

                            var id = result.entities[accountRecordsIndex].accountid;

                            var countryTemp = result.entities[accountRecordsIndex].ni_countrytemp;
                            var countryBillingTemp = result.entities[accountRecordsIndex].ni_countrybillingtemp;
                            var countryShippingTemp = result.entities[accountRecordsIndex].ni_countryshippingtemp;

                            // converts the countryTemp, countryBillingTemp, countryShippingTemp variables to string assigns it to countryTemp1, countryBillingTemp1 and countryShippingTemp1
                            var countryTemp1 = " \'"+ countryTemp + "\'";
                            var countryBillingTemp1 = " \'"+ countryBillingTemp + "\'";
                            var countryShippingTemp1 = " \'"+ countryShippingTemp + "\'";

                            // checks if countryTemp, countryBillingTemp, countryShippingTemp variables have valid inputs
                            if (countryTemp != null) {
                                retrieveUpdate(countryTemp1,id,dataFail);
                            } else {
                                Xrm.WebApi.updateRecord("account", id, dataPass).then(
                                    function success(result) {},
                                    function(error) {alert(error.message);}
                                );
                            }
                            
                            if (countryBillingTemp != null) {
                                retrieveUpdate(countryBillingTemp1,id,dataFail);
                            } else {
                                Xrm.WebApi.updateRecord("account", id, dataPass).then(
                                    function success(result) {},
                                    function(error) {alert(error.message);}
                                );
                            }
                            
                            if (countryShippingTemp != null) {
                                retrieveUpdate(countryShippingTemp1,id,dataFail);
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




//This function filters the result from the country entity using the country temp value from accounts entity
function retrieveUpdate(countryTemp1,id,dataFail) {
    var countrytempA = countryTemp1;
    var ide = id;
    var dataFailA = dataFail;
    Xrm.WebApi.retrieveMultipleRecords("geo_country", "?$select=geo_name,geo_countryid&$filter=geo_name eq " + countrytempA).then(
        function success(result) {
            if (result.entities[0]) {
                var countryIde = result.entities[0].geo_countryid;
                //Setting the fields to update using the schema name and assigning to a variable
                var dataPasses = {"ni_Country@odata.bind":"/geo_countries("+countryIde+")","ni_check":"Passed Country"}; 
                //Updating the 'Country' and 'Check' fields in account entity
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

//This function filters the result from the country entity using the country billing temp value from accounts entity
function retrieveUpdate(countryBillingTemp1,id,dataFail) {
    var countryBillingTempA = countryBillingTemp1;
    var ide = id;
    var dataFailA = dataFail;
    Xrm.WebApi.retrieveMultipleRecords("geo_country", "?$select=geo_name,geo_countryid&$filter=geo_name eq " + countryBillingTempA).then(
        function success(result) {
            if (result.entities[0]) {
                var countryIde = result.entities[0].geo_countryid;
                //Setting the fields to update using the schema name and assigning to a variable
                var dataPasses = {"ni_CountryBilling@odata.bind":"/geo_countries("+countryIde+")","ni_check":"Passed Country"}; 
                //Updating the 'Country Billing' and 'Check' fields in account entity
                Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                    function success(result) {},
                    function(error) {alert(error.message);}
                );
            } else {
                Xrm.WebApi.updateRecord("account", id, dataFailA).then(
                    function success(result) {},
                    function(error) {alert(error.message);}
                );
            }        
        },
        function(error) {
            Xrm.WebApi.updateRecord("account", id, dataFailA).then(
                function success(result) {},
                function(error) {alert(error.message);}
            ); 
        }
    );
}

//This function filters the result from the country entity using the country shipping temp value from accounts entity
function retrieveUpdate(countryShippingTemp1,id,dataFail) {
    var countryShippingTempA = countryShippingTemp1;
    var ide = id;
    var dataFailA = dataFail;
    Xrm.WebApi.retrieveMultipleRecords("geo_country", "?$select=geo_name,geo_countryid&$filter=geo_name eq " + countryShippingTempA).then(
        function success(result) {
            if (result.entities[0]) {
                var countryIde = result.entities[0].geo_countryid;
                //Setting the fields to update using the schema name and assigning to a variable
                var dataPasses = {"ni_Countryshipping@odata.bind":"/geo_countries("+countryIde+")","ni_check":"Passed Country"};
                //Updating the 'Country Shipping' and 'Check' fields in account entity
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