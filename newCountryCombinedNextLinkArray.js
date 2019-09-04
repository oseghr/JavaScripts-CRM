function mainfunction () {
    var query = "?$select=accountid,ni_check,ni_countrytemp,ni_countrybillingtemp,ni_countryshippingtemp";
    window.countryArray = [];
    window.countryBillingArray = [];
    window.countryShippingArray = [];
    window.iteration = 0;
    accountsCountryValidate(query);
}
//This function retrieves the account entity records
//Checks the 'cityTemp', 'cityBillingTemp', 'cityShippingTemp' fields for each record
//Calls the 'accountCityValidate' function to update the permanent 'City', 'CityBilling', 'CityShipping' fields if conditions are met
function accountsCountryValidate(query) {
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

                            var countryTemp = result.entities[accountRecordsIndex].ni_countrytemp;
                            var countryBillingTemp = result.entities[accountRecordsIndex].ni_countrybillingtemp;
                            var countryShippingTemp = result.entities[accountRecordsIndex].ni_countryshippingtemp;

                            // converts the countryTemp, countryBillingTemp, countryShippingTemp variables to string assigns it to countryTemp1, countryBillingTemp1 and countryShippingTemp1
                            var countryTemp1 = " \'"+ countryTemp + "\'";
                            var countryBillingTemp1 = " \'"+ countryBillingTemp + "\'";
                            var countryShippingTemp1 = " \'"+ countryShippingTemp + "\'";

                            // Assigns default value of "Passed" to array elements   
                            window.countryArray[accountRecordsIndex + (window.iteration*5000)] = "Passed";    
                            window.countryBillingArray[accountRecordsIndex + (window.iteration*5000)] = "Passed";           
                            window.countryShippingArray[accountRecordsIndex + (window.iteration*5000)] = "Passed";
                            // checks if countryTemp, countryBillingTemp, countryShippingTemp variables have valid inputs
                            if (countryTemp != null) {
                                updateCountryField(countryTemp1,id,accountRecordsIndex);
                            }
                            if (countryBillingTemp != null) {
                                updateCountryBillingField(countryBillingTemp1,id,accountRecordsIndex);
                            }
                            if (countryShippingTemp != null) {
                                updateCountryShippingField(countryShippingTemp1,id,accountRecordsIndex);
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
            query = window.nextPageLink.substr(71);  // for production use query = window.nextPageLink.substr(67)
            window.iteration=window.iteration +1;
            accountsCountryValidate(query);
            } else
               console.log("All accounts updated");
            }, 2100000);
}


//This function filters the result from the cities entity using the citytemp value from accounts entity
function updateCountryField(countryTemp1,id,accountRecordsIndex) {
    var countryTempA = countryTemp1;
    var ide = id;
    var accountRecordsIndex = accountRecordsIndex;
    //Retrieves the city entity records and filters the result using the 'city temp' field value
    Xrm.WebApi.retrieveMultipleRecords("geo_country", "?$select=geo_name,geo_countryid&$filter=geo_name eq " + countryTempA).then(
        function success(result) {
            // Updates the 'City' and 'Check' fields if the function returns a valid result, else updates only the corresponding City array element to "Failed" if result is not valid
            if (result.entities[0]) {
                var countryIde = result.entities[0].geo_countryid;
                //Setting the fields to update using the schema name and assigning to a variable
                var dataPasses = {"ni_Country@odata.bind":"/geo_countries("+countryIde+")"}; 
                //Updating the 'Country' field in account entity
                Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                    function success(result) {},
                    function(error) {alert(error.message);}
                );
            } else {
                window.countryArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
            } 
        },
        function(error) {
            window.countryArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
        }
    );
}

//This function filters the result from the cities entity using the city billing temp value from accounts entity
function updateCountryBillingField(countryBillingTemp1,id,accountRecordsIndex) {
    var countryBillingTempA = countryBillingTemp1;
    var ide = id;
    var accountRecordsIndex = accountRecordsIndex;
    //Retrieves the city entity records and filters the result using the 'citybillingtemp' field value
    Xrm.WebApi.retrieveMultipleRecords("geo_country", "?$select=geo_name,geo_countryid&$filter=geo_name eq " + countryBillingTempA).then(
        function success(result) {
            // Updates the 'City Billing' field if the function returns a valid result, else updates only the array element to "Failed" if result is not valid
            if (result.entities[0]) {
                var countryIde = result.entities[0].geo_countryid;
                //Setting the fields to update using the schema name and assigning to a variable
                var dataPasses = {"ni_CountryBilling@odata.bind":"/geo_countries("+countryIde+")"}; 
                //Updating the 'Country Billing' field in account entity
                Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                    function success(result) {},
                    function(error) {alert(error.message);}
                );
            } else {
                window.countryBillingArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
            }        
        },
        function(error) {
            window.countryBillingArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
        }
    );     
}

//This function filters the result from the cities entity using the city shipping temp value from accounts entity
function updateCountryShippingField(countryShippingTemp1,id,accountRecordsIndex) {
    var countryShippingTempA = countryShippingTemp1;
    var ide = id;
    var accountRecordsIndex = accountRecordsIndex;
    //Retrieves the city entity records and filters the result using the 'cityshippingtemp' field value
    Xrm.WebApi.retrieveMultipleRecords("geo_country", "?$select=geo_name,geo_countryid&$filter=geo_name eq " + countryShippingTempA).then(
        function success(result) {
            // Updates the 'City Shipping' field if the function returns a valid result, else updates only the array element if result is not valid
            if (result.entities[0]) {
                //updatecheck(ide,accountRecordsIndex);
                var countryIde = result.entities[0].geo_countryid;
                //Setting the fields to update using the schema name and assigning to a variable
                var dataPasses = {"ni_Countryshipping@odata.bind":"/geo_countries("+countryIde+")"};
                //Updating the 'Country Shipping' and 'Check' fields in account entity
                Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                    function success(result) {},
                    function(error) {//alert(error
                    }
                );
            }  else {
                    window.countryShippingArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
            }              
        },
        function(error) {
            window.countryShippingArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
        }
    );     
}
//function to update the check field
function updatecheck(id,accountRecordsIndex) {
    var ide = id;
    var accountRecordsIndex = accountRecordsIndex;
    if((window.countryArray[accountRecordsIndex + (window.iteration*5000)] == "Passed")&&( window.countryBillingArray[accountRecordsIndex + (window.iteration*5000)] == "Passed")&&(window.countryShippingArray[accountRecordsIndex + (window.iteration*5000)] == "Passed")){
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