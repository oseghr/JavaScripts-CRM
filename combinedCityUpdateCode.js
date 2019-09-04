//This function retrieves the account entity records
//Checks the 'cityTemp', 'cityBillingTemp', 'cityShippingTemp' fields for each record
//Calls the 'accountCityValidate' function to update the permanent 'City', 'CityBilling', 'CityShipping' fields if conditions are met
function accountsCityValidate() {
    alert('Success 0');
    Xrm.WebApi.retrieveMultipleRecords("account", "?$select=accountid,name,ni_citytemp,ni_citybillingtemp,ni_cityshippingtemp,ni_check").then(
        function success(result) {
            alert("Loading account records...");
            //Link to the next set of records (each set has a limit of 5000 records)
            console.log("Next page link: " + result.nextLink); 
            if (result != null) {
                var dataPass = { "ni_check": "Passed" };
                var dataFail = { "ni_check": "Failed" };
                alert("Entering Loop...");
                // Looping through the account records
                // Timeout function creates a delay before processing next record to avoid browser crash
                for (var accountRecordsIndex = 0; accountRecordsIndex < result.entities.length; accountRecordsIndex++) {
                   (function(accountRecordsIndex) {
                        setTimeout (function () {
                            
                            var id = result.entities[accountRecordsIndex].accountid;
                            var cityTemp = result.entities[accountRecordsIndex].ni_citytemp;
                            var cityBillingTemp = result.entities[accountRecordsIndex].ni_citybillingtemp;
                            var cityShippingTemp = result.entities[accountRecordsIndex].ni_cityshippingtemp;

                            // converts the cityTemp, cityBillingTemp, cityShippingTemp variables to string assigns it to cityTemp1, cityBillingTemp1 and cityShippingTemp1
                            var cityTemp1 = " \'"+ cityTemp + "\'";
                            var cityBillingTemp1 = " \'"+ cityBillingTemp + "\'";
                            var cityShippingTemp1 = " \'"+ cityShippingTemp + "\'";                         
                    
                            // checks if cityTemp, cityBillingTemp, cityShippingTemp variables have valid inputs
                            if (cityTemp != null) {
                                updateCityField(cityTemp1,id,dataFail);
                            } else {
                                // updates the account records
                                Xrm.WebApi.updateRecord("account", id, dataPass).then(
                                    function success(result) {},
                                    function(error) {alert(error.message);}
                                );
                            }

                            if (cityBillingTemp != null) {
                                updateCityBillingField(cityBillingTemp1,id,dataFail);
                            } else {
                                // updates the account records
                                Xrm.WebApi.updateRecord("account", id, dataPass).then(
                                    function success(result) {},
                                    function(error) {alert(error.message);}
                                );
                            }

                            if (cityShippingTemp != null) {
                                updateCityShippingField(cityShippingTemp1,id,dataFail);
                            } else {
                                // updates the account records
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


//This function filters the result from the cities entity using the citytemp value from accounts entity
function updateCityField(cityTemp1,id,dataFail) {

    var cityTempA = cityTemp1;
    var ide = id;
    var dataFailA = dataFail;

    //Retrieves the city entity records and filters the result using the 'city temp' field value
    Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq " + cityTempA).then(
        function success(result) {
            // Updates the 'City' and 'Check' fields if the function returns a valid result, else updates only the 'Check' field if result is not valid
            if (result.entities[0]) {
                var cityIde = result.entities[0].geo_cityid;
                //Setting the fields to update using the schema name and assigning to a variable
                var dataPasses = {"ni_City@odata.bind":"/geo_cities("+cityIde+")","ni_check":"Passed"};
                //Updating the 'City' and 'Check' fields in account entity
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

//This function filters the result from the cities entity using the city billing temp value from accounts entity
function updateCityBillingField(cityBillingTemp1,id,dataFail) {

    var cityBillingTempA = cityBillingTemp1;
    var ide = id;
    var dataFailA = dataFail;

    //Retrieves the city entity records and filters the result using the 'citybillingtemp' field value
    Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq " + cityBillingTempA).then(
        function success(result) {
            // Updates the 'City Billing' field if the function returns a valid result, else updates only the 'Check' field if result is not valid
            if (result.entities[0]) {
                var cityBillingIde = result.entities[0].geo_cityid;
                //Setting the fields to update using the schema name and assigning to a variable
                var dataPasses = {"ni_CityBilling@odata.bind":"/geo_cities("+cityBillingIde+")","ni_check":"Passed"};
                //Updating the 'City Billing' field in account entity 
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

//This function filters the result from the cities entity using the city shipping temp value from accounts entity
function updateCityShippingField(cityShippingTemp1,id,dataFail) {

    var cityShippingTempA = cityShippingTemp1;
    var ide = id;
    var dataFailA = dataFail;    

    //Retrieves the city entity records and filters the result using the 'cityshippingtemp' field value
    Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq " + cityShippingTempA).then(
        function success(result) {
            // Updates the 'City Shipping' field if the function returns a valid result, else updates only the 'Check' field if result is not valid
            if (result.entities[0]) {
                var cityShippingIde = result.entities[0].geo_cityid;
                //Setting the fields to update using the schema name and assigning to a variable
                var dataPasses = {"ni_Cityshipping@odata.bind":"/geo_cities("+cityShippingIde+")","ni_check":"Passed"};
                //Updating the 'City Shipping' field in account entity
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