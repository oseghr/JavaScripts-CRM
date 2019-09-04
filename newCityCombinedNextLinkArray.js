function mainfunction () {
    var query = "?$select=accountid,name,ni_citytemp,ni_citybillingtemp,ni_cityshippingtemp,ni_check";
    window.cityArray = [];
    window.cityBillingArray = [];
    window.cityShippingArray = [];
    window.iteration = 0;
    accountsCityValidate(query);
}
//This function retrieves the account entity records
//Checks the 'cityTemp', 'cityBillingTemp', 'cityShippingTemp' fields for each record
//Calls the 'accountCityValidate' function to update the permanent 'City', 'CityBilling', 'CityShipping' fields if conditions are met
function accountsCityValidate(query) {
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
                            var cityTemp = result.entities[accountRecordsIndex].ni_citytemp;
                            var cityBillingTemp = result.entities[accountRecordsIndex].ni_citybillingtemp;
                            var cityShippingTemp = result.entities[accountRecordsIndex].ni_cityshippingtemp;
                            // converts the cityTemp, cityBillingTemp, cityShippingTemp variables to string assigns it to cityTemp1, cityBillingTemp1 and cityShippingTemp1
                            var cityTemp1 = " \'"+ cityTemp + "\'";
                            var cityBillingTemp1 = " \'"+ cityBillingTemp + "\'";
                            var cityShippingTemp1 = " \'"+ cityShippingTemp + "\'";      
                            // Assigns default value of "Passed" to array elements   
                            window.cityArray[accountRecordsIndex + (window.iteration*5000)] = "Passed";    
                            window.cityBillingArray[accountRecordsIndex + (window.iteration*5000)] = "Passed";           
                            window.cityShippingArray[accountRecordsIndex + (window.iteration*5000)] = "Passed";
                            // checks if cityTemp, cityBillingTemp, cityShippingTemp variables have valid inputs
                            if (cityTemp != null) {
                                updateCityField(cityTemp1,id,accountRecordsIndex);
                            }
                            if (cityBillingTemp != null) {
                                updateCityBillingField(cityBillingTemp1,id,accountRecordsIndex);
                            }
                            if (cityShippingTemp != null) {
                                updateCityShippingField(cityShippingTemp1,id,accountRecordsIndex);
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
            query = window.nextPageLink.substr(71); // for production use query = window.nextPageLink.substr(67)
            window.iteration=window.iteration +1;
            accountsCityValidate(query);
            } else
               console.log("All accounts updated");
            }, 2100000);
}


//This function filters the result from the cities entity using the citytemp value from accounts entity
function updateCityField(cityTemp1,id,accountRecordsIndex) {
    var cityTempA = cityTemp1;
    var ide = id;
    var accountRecordsIndex = accountRecordsIndex;
    //Retrieves the city entity records and filters the result using the 'city temp' field value
    Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq " + cityTempA).then(
        function success(result) {
            // Updates the 'City' and 'Check' fields if the function returns a valid result, else updates only the corresponding City array element to "Failed" if result is not valid
            if (result.entities[0]) {
                var cityIde = result.entities[0].geo_cityid;
                //Setting the city field to update using the schema name and assigning to a variable
                var dataPasses = {"ni_City@odata.bind":"/geo_cities("+cityIde+")"};
                //Updating the 'City' field in account entity
                Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                    function success(result) {},
                    function(error) {alert(error.message);}
                );
            } else {
                window.cityArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
            } 
        },
        function(error) {
            window.cityArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
        }
    );
}

//This function filters the result from the cities entity using the city billing temp value from accounts entity
function updateCityBillingField(cityBillingTemp1,id,accountRecordsIndex) {
    var cityBillingTempA = cityBillingTemp1;
    var ide = id;
    var accountRecordsIndex = accountRecordsIndex;
    //Retrieves the city entity records and filters the result using the 'citybillingtemp' field value
    Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq " + cityBillingTempA).then(
        function success(result) {
            // Updates the 'City Billing' field if the function returns a valid result, else updates only the array element to "Failed" if result is not valid
            if (result.entities[0]) {
                var cityBillingIde = result.entities[0].geo_cityid;
                //Setting the citybilling field to update using the schema name and assigning to a variable
                var dataPasses = {"ni_CityBilling@odata.bind":"/geo_cities("+cityBillingIde+")"};
                //Updating the 'City Billing' field in account entity 
                Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                    function success(result) {},
                    function(error) {alert(error.message);}
                );
            } else {
                window.cityBillingArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
            }        
        },
        function(error) {
            window.cityBillingArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
        }
    );     
}

//This function filters the result from the cities entity using the city shipping temp value from accounts entity
function updateCityShippingField(cityShippingTemp1,id,accountRecordsIndex) {
    var cityShippingTempA = cityShippingTemp1;
    var ide = id;
    var accountRecordsIndex = accountRecordsIndex;
    //Retrieves the city entity records and filters the result using the 'cityshippingtemp' field value
    Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq " + cityShippingTempA).then(
        function success(result) {
            // Updates the 'City Shipping' field if the function returns a valid result, else updates only the array element if result is not valid
            if (result.entities[0]) {
                //updatecheck(ide,accountRecordsIndex);
                var cityShippingIde = result.entities[0].geo_cityid;
                //Setting the field to update using the schema name and assigning to a variable
                var dataPasses = {"ni_Cityshipping@odata.bind":"/geo_cities("+cityShippingIde+")"};
                //Updating the 'City Shipping' field in account entity
                Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                    function success(result) {},
                    function(error) {//alert(error.
                    }
                    );
                }  else {
                    window.cityShippingArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
                }              
            },
            function(error) {
                window.cityShippingArray[accountRecordsIndex + (window.iteration*5000)] = "Failed";
            }
        );     
    }
//function to update the check field
function updatecheck(id,accountRecordsIndex) {
    var ide = id;
    var accountRecordsIndex = accountRecordsIndex;
    if((window.cityArray[accountRecordsIndex + (window.iteration*5000)] == "Passed")&&( window.cityBillingArray[accountRecordsIndex + (window.iteration*5000)] == "Passed")&&(window.cityShippingArray[accountRecordsIndex + (window.iteration*5000)] == "Passed")){
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