
//for updating OWNERS

function mainfunction() {
    var query = "?$select=accountid,name,_ni_nisalesrep_value,_ownerid_value,&$filter=_ownerid_value eq 'fa813fc6-10b8-e711-8128-480fcfeaa931'";
    CityUpDate(query);
} 

function CityUpDate(query){
    Xrm.WebApi.retrieveMultipleRecords('account', query).then(
        function success(result) {
            // perform operations on on retrieved records

            if (result != null) {
                Xrm.WebApi.retrieveMultipleRecords("systemuser", "?$select=ownerid,fullname,&$filter=fullname eq 'Oseghr'").then(
                    function success(result1) {
                        // perform operations on on retrieved records
                        var cityIde = result1.entities[0].ownerid;
                        console.log(cityIde);
                        (async function(){
                            for await (var record of result.entities) {
                                       
                                // if (record._ni_country_value == null) {
            
                                    var datapass = {
                                        "ownerid@odata.bind" : "/systemusers("+cityIde+")",  //ownerid field uses the fieldname and has different datatype "owner"
                                        "ni_NISalesRep@odata.bind":"/systemusers("+cityIde+")"   //salesrep field uses schema name and its a look up field.
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

