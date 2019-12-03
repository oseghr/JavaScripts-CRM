// Xrm.WebApi.retrieveMultipleRecords('opportunity', "?$select=name, ni_dateopps, ni_expectedmonthtogettheorder, opportunityid").then(
//     function success(result) {
//         // perform operations on on retrieved records
//         for (var record of result.entities){
//             if (record.ni_expectedmonthtogettheorder){
//                 var ide = record.opportunityid;
//                 var oldDate = record['ni_expectedmonthtogettheorder@OData.Community.Display.V1.FormattedValue'];
//                 var transDate = oldDate.substr(0,7) + "-01";
//                 var dataPass = { "ni_dateopps": transDate };
//                 Xrm.WebApi.updateRecord('opportunity', ide, dataPass).then(
//                     function success(result) {
//                         // perform operations on record update
//                         console.log("Baby shark");
                    
//                     },
//                     function (error) {
//                         console.log(error.message);
//                         // handle error conditions
//                     }
//                 );
//             }


//         }
//     },
//     function (error) {
//         console.log(error.message);
//         // handle error conditions
//     }
// );


function updateOppsRecord() {
    //Retrieve opportunities records
    Xrm.WebApi.retrieveMultipleRecords('opportunity', "?$select=name, ni_expecteddatetogetorder,ni_expectedmonthtogettheorder, opportunityid").then(
        function success(result) {
            // perform operations on on retrieved records
            (async function() {
            
            //iterate through each record
            for (var record of result.entities){

                //if ni_expected month field is valid
                if (typeof(record.ni_expectedmonthtogettheorder)){

                    var ide = record.opportunityid;
                    //Retrieve the option set field value
                    var oldDate = record['ni_expectedmonthtogettheorder@OData.Community.Display.V1.FormattedValue'];
                    
				    if (oldDate != undefined){

                        var testdate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
                        var transDate = oldDate.substr(0,7) + "-01";
                        //console.log("transDate is "+transDate);

                        //check if pattern match date format
                        var matchArray = transDate.match(testdate); // is the format ok?
                        
                        //check if pattern match is valid
                        if (matchArray) {
                            //set the field value    
                            var dataPass = { "ni_expecteddatetogetorder": transDate };
                            //update the record in CRM
                            await Xrm.WebApi.updateRecord('opportunity', ide, dataPass).then(
                                function success(result) {
                                    // perform operations on record update
                                    console.log("Baby Shark");                         
                                },
                                function (error) {
                                console.log(error.message);
                                // handle error conditions
                                }                

                            )
                        };
                    }
                }
            
            }
        })();

        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );

}





