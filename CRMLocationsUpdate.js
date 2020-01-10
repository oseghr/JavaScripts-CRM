
// Functions for updating the locations

// for updating the countries
function mainfunction() {
    var query = "?$select=accountid,name,ni_countrytemp,_ni_country_value,ni_countrybillingtemp,_ni_countrybilling_value,ni_countryshippingtemp,_ni_countryshipping_value,&$filter=ni_countrytemp eq 'United States'";
    CountryUpDate(query);
} 

function CountryUpDate(query){
    Xrm.WebApi.retrieveMultipleRecords('account', query).then(
        function success(result) {
            // perform operations on on retrieved records
            console.log("Next page link: " + result.nextLink);
            window.nextPageLink = result.nextLink;

            if (result != null) {
                Xrm.WebApi.retrieveMultipleRecords("geo_country", "?$select=geo_name,geo_countryid&$filter=geo_name eq 'United States of America'").then(
                    function success(result1) {
                        // perform operations on on retrieved records
                        var countryIde = result1.entities[0].geo_countryid;
    
                        (async function(){
                            for await (var record of result.entities) {
                                       
                                // if (record._ni_country_value == null) {
            
                                    var datapass = {
                                        "ni_Country@odata.bind" : "/geo_countries("+countryIde+")", 
                                        "ni_CountryBilling@odata.bind" : "/geo_countries("+countryIde+")", 
                                        "ni_Countryshipping@odata.bind" : "/geo_countries("+countryIde+")"
                                    };
            
                                    await Xrm.WebApi.updateRecord('account', record.accountid, datapass).then(
                                        function success(result) {
                                            // perform operations on record update
                                            console.log("Successful");
                                        },
                                        function (error) {
                                            console.log(error.message);
                                            // handle error conditions
                                        }
                                    );
                                    
                                // }
                                
                            }

                            if(window.nextPageLink){
                                // assigns a substring of the nextlink to "query"
                                query = window.nextPageLink.substr(71);  // for production use query = window.nextPageLink.substr(67)
                                CountryUpDate(query);
                            } else {
                                alert("All accounts updated");
                            }
            
                        })();
                        
                    },
                    function (error) {
                        console.log(error.message);
                        // handle error conditions
                    }
                );

            }

        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
}


//for updating the provinces

function mainfunction() {
    var query = "?$select=accountid,name,ni_provincetemp,_ni_province_value,ni_provincebillingtemp,_ni_provincebilling_value,ni_provinceshippingtemp,_ni_provinceshipping_value,&$filter=ni_provincetemp eq 'St. John's'";
    ProvinceUpDate(query);
} 

function ProvinceUpDate(query){
    Xrm.WebApi.retrieveMultipleRecords('account', query).then(
        function success(result) {
            // perform operations on on retrieved records
            console.log("Next page link: " + result.nextLink);
            window.nextPageLink = result.nextLink;

            if (result != null) {
                Xrm.WebApi.retrieveMultipleRecords("geo_province", "?$select=geo_name,geo_provinceid&$filter=geo_name eq 'Alberta'").then(
                    function success(result1) {
                        // perform operations on on retrieved records
                        var provinceIde = result1.entities[0].geo_provinceid;
    
                        (async function(){
                            for await (var record of result.entities) {
                                       
                                // if (record._ni_country_value == null) {
            
                                    var datapass = {
                                        "ni_Province@odata.bind" : "/geo_provinces("+provinceIde+")", 
                                        "ni_ProvinceBilling@odata.bind" : "/geo_provinces("+provinceIde+")",
                                        "ni_ProvinceShipping@odata.bind" : "/geo_provinces("+provinceIde+")"
                                    };
            
                                    await Xrm.WebApi.updateRecord('account', record.accountid, datapass).then(
                                        function success(result) {
                                            // perform operations on record update
                                            console.log("Successful");
                                        },
                                        function (error) {
                                            console.log(error.message);
                                            // handle error conditions
                                        }
                                    );
                                    
                                // }
                                
                            }

                            if(window.nextPageLink){
                                // assigns a substring of the nextlink to "query"
                                query = window.nextPageLink.substr(67);  // for production use query = window.nextPageLink.substr(67)
                                CountryUpDate(query);
                            } else {
                                alert("All accounts updated");
                            }
            
                        })();
                        
                    },
                    function (error) {
                        console.log(error.message);
                        // handle error conditions
                    }
                );

            }

        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
}



//for updating the cities

function mainfunction() {
    var query = "?$select=accountid,name,ni_citytemp,_ni_city_value,ni_citybillingtemp,_ni_citybilling_value,ni_cityshippingtemp,_ni_cityshipping_value,&$filter=ni_citytemp eq 'St. Johns'";
    CityUpDate(query);
} 

function CityUpDate(query){
    Xrm.WebApi.retrieveMultipleRecords('account', query).then(
        function success(result) {
            // perform operations on on retrieved records
            console.log("Next page link: " + result.nextLink);
            window.nextPageLink = result.nextLink;

            if (result != null) {
                Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq 'Fort Lauderdale'").then(
                    function success(result1) {
                        // perform operations on on retrieved records
                        var cityIde = result1.entities[0].geo_cityid;
    
                        (async function(){
                            for await (var record of result.entities) {
                                       
                                // if (record._ni_country_value == null) {
            
                                    var datapass = {
                                        "ni_City@odata.bind" : "/geo_cities("+cityIde+")", 
                                        "ni_CityBilling@odata.bind" : "/geo_cities("+cityIde+")",
                                        "ni_Cityshipping@odata.bind" : "/geo_cities("+cityIde+")",
                                    };
            
                                    await Xrm.WebApi.updateRecord('account', record.accountid, datapass).then(
                                        function success(result) {
                                            // perform operations on record update
                                            console.log("Successful");
                                        },
                                        function (error) {
                                            console.log(error.message);
                                            // handle error conditions
                                        }
                                    );
                                    
                                // }
                                
                            }

                            if(window.nextPageLink){
                                // assigns a substring of the nextlink to "query"
                                query = window.nextPageLink.substr(67);  // for production use query = window.nextPageLink.substr(67) ------ for test/UAT use query = window.nextPageLink.substr(71)
                                CountryUpDate(query);
                            } else {
                                alert("All accounts updated");
                            }
            
                        })();
                        
                    },
                    function (error) {
                        console.log(error.message);
                        // handle error conditions
                    }
                );

            }

        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
}

