
// This function assigns a query string and calls the accountRecordsValidate function with input "query" 
function mainfunction() {
    var query = "?$select=accountid,name,_ni_city_value,_ni_citybilling_value,_ni_cityshipping_value,ni_citytemp,ni_citybillingtemp,ni_cityshippingtemp,ni_countrytemp,ni_countrybillingtemp,ni_countryshippingtemp,ni_provincetemp,ni_provincebillingtemp,ni_provinceshippingtemp,_ni_country_value,_ni_countrybilling_value,_ni_countryshipping_value,_ni_province_value,_ni_provincebilling_value,_ni_provinceshipping_value,ni_check&$top=50";
    accountsRecordsValidate(query);
} 

//This function retrieves the account entity records
//Checks all the required fields for each record
//Calls the 'accountRecordsValidate' function to update the permanent fields if conditions are met
function accountsRecordsValidate(query) {
    console.log('Success 0');
    //Retrieving multiple records from the account entity
    Xrm.WebApi.retrieveMultipleRecords("account", query).then(
        function success(result) {
            console.log("Loading account records...");
            //Link to the next set of records (each set has 5000 records)
            console.log("Next page link: " + result.nextLink);
            window.nextPageLink = result.nextLink;
            if (result != null) {
                // async function allows the result to be returned before processing next record to avoid browser crash
                (async function() {
                    for await (var record of result.entities) {
                        // setting all required field variables
                        var id = record.accountid;

                        var cityTemp = record.ni_citytemp;
                        var cityBillingTemp = record.ni_citybillingtemp;
                        var cityShippingTemp = record.ni_cityshippingtemp;

                        var countryTemp = record.ni_countrytemp;
                        var countryBillingTemp = record.ni_countrybillingtemp;
                        var countryShippingTemp = record.ni_countryshippingtemp;

                        var provinceTemp = record.ni_provincetemp;
                        var provinceBillingTemp = record.ni_provincebillingtemp;
                        var provinceShippingTemp = record.ni_provinceshippingtemp;

                        var mainCityPry = record._ni_city_value; 
                        var mainCityBilling = record._ni_citybilling_value;
                        var mainCityShipping = record._ni_cityshipping_value;

                        var mainCountryPry = record._ni_country_value;
                        var mainCountryBilling = record._ni_countrybilling_value;
                        var mainCountryShipping = record._ni_countryshipping_value;

                        var mainProvincePry = record._ni_province_value;
                        var mainProvinceBilling = record._ni_provincebilling_value;
                        var mainProvinceShipping = record._ni_provinceshipping_value;

                        // converts the field variables to string assigns it to a new variable
                        var cityTemp1 = " \'" + cityTemp + "\'";
                        var cityBillingTemp1 = " \'" + cityBillingTemp + "\'";
                        var cityShippingTemp1 = " \'" + cityShippingTemp + "\'";

                        var countryTemp1 = " \'"+ countryTemp + "\'";
                        var countryBillingTemp1 = " \'"+ countryBillingTemp + "\'";
                        var countryShippingTemp1 = " \'"+ countryShippingTemp + "\'";

                        var provinceTemp1 = " \'"+ provinceTemp + "\'";
                        var provinceBillingTemp1 = " \'"+ provinceBillingTemp + "\'";
                        var provinceShippingTemp1 = " \'"+ provinceShippingTemp + "\'";

                        // the field state functions checks if field variables have valid inputs and returns "Passed"
                        var cityState = await function() {
                            if (mainCityPry != null) {
                                return 'Passed';
                            } else if (cityTemp != null) {
                                return updateCityField(cityTemp1, id);
                            }
                            else {
                                return "Passed";
                            }
                        };
                        var cityBillingState = await function() {

                            if (mainCityBilling != null) {
                                return 'Passed';
                            } else if (cityBillingTemp != null) {
                                return updateCityBillingField(cityBillingTemp1, id);
                             }else {
                                return "Passed";
                             }
                        };
                        var cityShippingState = await function() {
                            
                            if (mainCityShipping != null) {
                                return 'Passed';
                            } else if (cityShippingTemp != null) {
                            return updateCityShippingField(cityShippingTemp1, id);
                            }else {
                            return "Passed";
                            }
                        };

                        var countryState = await function() {
                            if (mainCountryPry != null) {
                                return 'Passed';
                            } else if (countryTemp != null) {
                                return updateCountryField(countryTemp1,id);
                            }
                            else {
                                return "Passed";
                            }
                        };
                        var countryBillingState = await function() {
                            if (mainCountryBilling != null) {
                                return 'Passed';
                            } else if (countryBillingTemp != null) {
                                return updateCountryBillingField(countryBillingTemp1,id);
                            }
                            else {
                                return "Passed";
                            }
                        };
                        var countryShippingState = await function() {
                            if (mainCountryShipping != null) {
                                return 'Passed';
                            } else if (countryShippingTemp != null) {
                                return updateCountryShippingField(countryShippingTemp1,id);
                            }
                            else {
                                return "Passed";
                            }
                        };
                        
                        var provinceState = await function() {
                            if (mainProvincePry  != null) {
                                return 'Passed';
                            } else if (provinceTemp != null) {
                                return updateProvinceField(provinceTemp1,id);
                            }
                            else {
                                return "Passed";
                            }
                        };
                        var provinceBillingState = await function() {
                            if (mainProvinceBilling != null) {
                                return 'Passed';
                            } else if (provinceBillingTemp != null) {
                                return updateProvinceBillingField(provinceBillingTemp1,id);
                            }
                            else {
                                return "Passed";
                            }
                        };
                        var provinceShippingState = await function() {
                            if (mainProvinceShipping != null) {
                                return 'Passed';
                            } else if (provinceShippingTemp != null) {
                                return updateProvinceShippingField(provinceShippingTemp1,id);
                            }
                            else {
                                return "Passed";
                            }
                        };

                        //Assigns resolved requests to field status variables
                        var [cityStatus,cityBillingStatus,cityShippingStatus,countryStatus,countryBillingStatus,countryShippingStatus,provinceStatus,provinceBillingStatus,provinceShippingStatus] = await Promise.all ([cityState(),cityBillingState(),cityShippingState(),countryState(),countryBillingState(),countryShippingState(),provinceState(),provinceBillingState(),provinceShippingState()]);
                        await updatecheck(id,cityStatus,cityBillingStatus,cityShippingStatus,countryStatus,countryBillingStatus,countryShippingStatus,provinceStatus,provinceBillingStatus,provinceShippingStatus);
                        console.log("completed");
                    }

                    // checks if the nextlink has a valid string value and assigns it to "query" for next set of records
                    if(window.nextPageLink){
                        // assigns a substring of the nextlink to "query"
                        query = window.nextPageLink.substr(67);  // for production use query = window.nextPageLink.substr(67)
                        accountsRecordsValidate(query);
                    } else {
                       alert("All accounts updated");
                    }
                })();
  
            }
        },
        function(error) { alert(error.message); }
    );
}
  
//This function filters the result from the city entity using the citytemp value from accounts entity
function updateCityField(cityTemp1, id) {
    return new Promise(function(resolve, reject) {
        var cityTempA = cityTemp1;
        var ide = id;
        var cityState;
        //Retrieves the city entity records and filters the result using the 'city temp' field value
        Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq " + cityTempA).then(
            function success(result) {
                // Updates the 'City' and 'Check' fields if the function returns a valid result, else updates only the corresponding its State variable to "Failed" if result is not valid
                if (result.entities[0]) {
                    var cityIde = result.entities[0].geo_cityid;
                    //Setting the city field to update using the schema name and assigning to a variable
                    var dataPasses = { "ni_City@odata.bind": "/geo_cities(" + cityIde + ")" };
                    //Updating the 'City' field in account entity
                    Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                        function success(result) {
                            cityState = "Passed";
                            resolve(cityState);
                        },
                        function(error) { alert(error.message); }
                    );
                } else {
                    cityState = "Failed";
                    resolve(cityState);
                }
            },
            function(error) {
                citystate = "Failed";
                resolve(cityState);
            }
        );
    });
}
  
//This function filters the result from the city entity using the citybillingtemp value from accounts entity
function updateCityBillingField(cityBillingTemp1, id) {
    return new Promise(function(resolve, reject) {
        var cityBillingTempA = cityBillingTemp1;
        var ide = id;
        var cityBillingState;
        //Retrieves the city entity records and filters the result using the 'citybillingtemp' field value
        Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq " + cityBillingTempA).then(
            function success(result) {
                // Updates the 'City Billing' field if the function returns a valid result, else updates only its State variable to "Failed" if result is not valid
                if (result.entities[0]) {
                    var cityBillingIde = result.entities[0].geo_cityid;
                    //Setting the citybilling field to update using the schema name and assigning to a variable
                    var dataPasses = { "ni_CityBilling@odata.bind": "/geo_cities(" + cityBillingIde + ")" };
                    //Updating the 'City Billing' field in account entity 
                    Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                        function success(result) {
                            cityBillingState = "Passed";
                            resolve(cityBillingState);
                        },
                        function(error) { alert(error.message); }
                    );
                } else {
                    cityBillingArray = "Failed";
                    resolve(cityBillingState);
                }
            },
            function(error) {
                cityBillingArray = "Failed";
                resolve(cityBillingState);
            }
        );
    });
}
  
//This function filters the result from the city entity using the cityshippingtemp value from accounts entity
function updateCityShippingField(cityShippingTemp1, id) {
    return new Promise(function(resolve, reject) {
        var cityShippingTempA = cityShippingTemp1;
        var ide = id;
        var cityShippingState;
        //Retrieves the city entity records and filters the result using the 'cityshippingtemp' field value
        Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq " + cityShippingTempA).then(
            function success(result) {
                // Updates the 'City Shipping' field if the function returns a valid result, else updates only its State variable if result is not valid
                if (result.entities[0]) {
                    //updatecheck(ide,accountRecordsIndex);
                    var cityShippingIde = result.entities[0].geo_cityid;
                    //Setting the field to update using the schema name and assigning to a variable
                    var dataPasses = { "ni_Cityshipping@odata.bind": "/geo_cities(" + cityShippingIde + ")" };
                    //Updating the 'City Shipping' field in account entity
                    Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                        function success(result) {
                            cityShippingState = "Passed";
                            resolve(cityShippingState);
                        },
                        function(error) { alert(error.message); }
                    );
                } else {
                    cityShippingArray = "Failed";
                    resolve(cityShippingState);
                }
            },
            function(error) {
                cityShippingArray = "Failed";
                resolve(cityShippingState);
            }
        );
    });
}

//This function filters the result from the country entity using the countrytemp value from accounts entity
function updateCountryField(countryTemp1,id) {
    return new Promise(function(resolve, reject) {
        var countryTempA = countryTemp1;
        var ide = id;
        var countryState;
        //Retrieves the Country entity records and filters the result using the 'country temp' field value
        Xrm.WebApi.retrieveMultipleRecords("geo_country", "?$select=geo_name,geo_countryid&$filter=geo_name eq " + countryTempA).then(
            function success(result) {
                // Updates the 'Country' and 'Check' fields if the function returns a valid result, else updates only its State variable to "Failed" if result is not valid
                if (result.entities[0]) {
                    var countryIde = result.entities[0].geo_countryid;
                    //Setting the fields to update using the schema name and assigning to a variable
                    var dataPasses = {"ni_Country@odata.bind":"/geo_countries("+countryIde+")"}; 
                    //Updating the 'Country' field in account entity
                    Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                        function success(result) {
                            countryState = "Passed";
                            resolve(countryState);
                        },
                        function(error) {alert(error.message);}
                    );
                } else {
                    countryState = "Failed";
                    resolve(countryState);
                } 
            },
            function(error) {
                countryState = "Failed";
                resolve(countryState);
            }
        );
    });
}

//This function filters the result from the country entity using the countrybillingtemp value from accounts entity
function updateCountryBillingField(countryBillingTemp1,id) {
    return new Promise(function(resolve, reject) {
        var countryBillingTempA = countryBillingTemp1;
        var ide = id;
        var countryBillingState;
        //Retrieves the Country entity records and filters the result using the 'countrybillingtemp' field value
        Xrm.WebApi.retrieveMultipleRecords("geo_country", "?$select=geo_name,geo_countryid&$filter=geo_name eq " + countryBillingTempA).then(
            function success(result) {
                // Updates the 'Country Billing' field if the function returns a valid result, else updates only its State variable to "Failed" if result is not valid
                if (result.entities[0]) {
                    var countryIde = result.entities[0].geo_countryid;
                    //Setting the fields to update using the schema name and assigning to a variable
                    var dataPasses = {"ni_CountryBilling@odata.bind":"/geo_countries("+countryIde+")"}; 
                    //Updating the 'Country Billing' field in account entity
                    Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                        function success(result) {
                            countryBillingState = "Passed";
                            resolve(countryBillingState);
                        },
                        function(error) {alert(error.message);}
                    );
                } else {
                    countryBillingState = "Failed";
                    resolve(countryBillingState);
                }        
            },
            function(error) {
                countryBillingState = "Failed";
                resolve(countryBillingState);
            }
        );
    });     
}

//This function filters the result from the country entity using the countryshippingtemp value from accounts entity
function updateCountryShippingField(countryShippingTemp1,id) {
    return new Promise(function(resolve, reject) {
        var countryShippingTempA = countryShippingTemp1;
        var ide = id;
        var countryShippingState;
        //Retrieves the Country entity records and filters the result using the 'countryshippingtemp' field value
        Xrm.WebApi.retrieveMultipleRecords("geo_country", "?$select=geo_name,geo_countryid&$filter=geo_name eq " + countryShippingTempA).then(
            function success(result) {
                // Updates the 'Country Shipping' field if the function returns a valid result, else updates only its State variable if result is not valid
                if (result.entities[0]) {
                    //updatecheck(ide,accountRecordsIndex);
                    var countryIde = result.entities[0].geo_countryid;
                    //Setting the fields to update using the schema name and assigning to a variable
                    var dataPasses = {"ni_Countryshipping@odata.bind":"/geo_countries("+countryIde+")"};
                    //Updating the 'Country Shipping' and 'Check' fields in account entity
                    Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                        function success(result) {
                            countryShippingState = "Passed";
                            resolve(countryShippingState);
                        },
                        function(error) {alert(error.message);}
                    );
                }  else {
                    countryShippingState = "Failed";
                    resolve(countryShippingState);
                }              
            },
            function(error) {
                countryShippingState = "Failed";
                resolve(countryShippingState);
            }
        );
    });      
}

//This function filters the result from the province entity using the provincetemp value from accounts entity
function updateProvinceField(provinceTemp1,id) {
    return new Promise(function(resolve, reject) {
        var provincetempA = provinceTemp1;
        var ide = id;
        var provinceState;
        //Retrieves the Province entity records and filters the result using the 'provincetemp' field value
        Xrm.WebApi.retrieveMultipleRecords("geo_province", "?$select=geo_name,geo_provinceid&$filter=geo_name eq " + provincetempA).then(
            function success(result) {
                // Updates the 'Province' field if the function returns a valid result, else updates only its State variable to "Failed" if result is not valid
                if (result.entities[0]) {
                    var provinceIde = result.entities[0].geo_provinceid;
                    //Setting the fields to update using the schema name and assigning to a variable
                    var dataPasses = {"ni_Province@odata.bind":"/geo_provinces("+provinceIde+")"};
                    //Updating the 'Province' field in account entity
                    Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                        function success(result) {
                            provinceState = "Passed";
                            resolve(provinceState);
                        },
                        function(error) {alert(error.message);}
                    );
                } else {
                    provinceState = "Failed";
                    resolve(provinceState);
                } 
            },
            function(error) {
                provinceState = "Failed";
                resolve(provinceState);
            }
        );
    });
}

//This function filters the result from the province entity using the provincebillingtemp value from accounts entity
function updateProvinceBillingField(provinceBillingTemp1,id) {
    return new Promise(function(resolve, reject) {
        var provinceBillingTempA = provinceBillingTemp1;
        var ide = id;
        var provinceBillingState;
        //Retrieves the Province entity records and filters the result using the 'provincebillingtemp' field value
        Xrm.WebApi.retrieveMultipleRecords("geo_province", "?$select=geo_name,geo_provinceid&$filter=geo_name eq " + provinceBillingTempA).then(
            function success(result) {
                // Updates the 'Province Billing' field if the function returns a valid result, else updates only its State variable to "Failed" if result is not valid
                if (result.entities[0]) {
                    var provinceIde = result.entities[0].geo_provinceid;
                    //Setting the fields to update using the schema name and assigning to a variable
                    var dataPasses = {"ni_ProvinceBilling@odata.bind":"/geo_provinces("+provinceIde+")"}; 
                    //Updating the 'Province Billing' field in account entity 
                    Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                        function success(result) {
                            provinceBillingState = "Passed";
                            resolve(provinceBillingState);
                        },
                        function(error) {alert(error.message);}
                    );
                } else {
                    provinceBillingState = "Failed";
                    resolve(provinceBillingState);
                }        
            },
            function(error) {
                provinceBillingState = "Failed";
                resolve(provinceBillingState);
            }
        ); 
    });    
}

//This function filters the result from the province entity using the provinceshippingtemp value from accounts entity
function updateProvinceShippingField(provinceShippingTemp1,id) {
    return new Promise(function(resolve, reject) {

        var provinceShippingTempA = provinceShippingTemp1;
        var ide = id;
        var provinceShippingState;
        //Retrieves the Province entity records and filters the result using the 'provinceshippingtemp' field value
        Xrm.WebApi.retrieveMultipleRecords("geo_province", "?$select=geo_name,geo_provinceid&$filter=geo_name eq " + provinceShippingTempA).then(
            function success(result) {
                // Updates the 'Province Shipping' field if the function returns a valid result, else updates only its State variable if result is not valid
                if (result.entities[0]) {
                    //updatecheck(ide,accountRecordsIndex);
                    var provinceIde = result.entities[0].geo_provinceid;
                    //Setting the fields to update using the schema name and assigning to a variable
                    var dataPasses = {"ni_Provinceshipping@odata.bind":"/geo_provinces("+provinceIde+")"};
                    //Updating the 'Province Shipping' field in account entity
                    Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                        function success(result) {
                            provinceShippingState = "Passed";
                            resolve(provinceShippingState);
                        },
                        function(error) {alert(error.message);}
                    );
                }  else {
                    provinceShippingState = "Failed";
                    resolve(provinceShippingState);
                }              
            },
            function(error) {
                provinceShippingState = "Failed";
                resolve(provinceShippingState);
            }
        );   
    });   
}

//function to update the check field
function updatecheck(id,cityStatus,cityBillingStatus,cityShippingStatus,countryStatus,countryBillingStatus,countryShippingStatus,provinceStatus,provinceBillingStatus,provinceShippingStatus) {
    // setting the variables
    var ide = id;

    var cityStatus = cityStatus;
    var cityBillingStatus = cityBillingStatus;
    var cityShippingStatus = cityShippingStatus;

    var countryStatus = countryStatus;
    var countryBillingStatus = countryBillingStatus;
    var countryShippingStatus = countryShippingStatus;

    var provinceStatus = provinceStatus;
    var provinceBillingStatus = provinceBillingStatus;
    var provinceShippingStatus = provinceShippingStatus;

    // checks if the Status variables are "Passed" and updates the check field
    if ((cityStatus == "Passed") && (cityBillingStatus == "Passed") && (cityShippingStatus == "Passed")&& (countryStatus == "Passed")&& (countryBillingStatus == "Passed")&& (countryShippingStatus == "Passed")&& (provinceStatus == "Passed")&& (provinceBillingStatus == "Passed")&& (provinceShippingStatus == "Passed")) {
        var dataPass = { "ni_check": "Passed" };
        // Updating the check field
        return Xrm.WebApi.updateRecord("account", ide, dataPass).then(
            function success(result) {},
            function(error) { alert(error.message); }
        );
    } else {
        var dataFail = { "ni_check": "Failed" };
        return Xrm.WebApi.updateRecord("account", ide, dataFail).then(
            function success(result) {},
            function(error) { alert(error.message); }
        );
    }
}