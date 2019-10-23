// function AccountOnChange() {
//     console.log("==START==");
//     var account = Xrm.Page.getAttribute("parentaccountid").getValue();
//     console.log("==ONE Start==");

//     if (account == null) {
//         return;
//     }

//     var serverUrl = Xrm.Page.context.getClientUrl();
//     var oDataSelect = serverUrl + "/XRMServices/2011/OrganizationData.svc/AccountSet?$select=Name,new_user,new_user1&?$filter=ParentAccountId eq guid'" + account[0].id + "'";
//     console.log("==TWO Start==");
//     console.log("ODATA Link: "+oDataSelect);

//     var retrieveReq = new XMLHttpRequest();
//     retrieveReq.open("GET", oDataSelect, false);
//     retrieveReq.setRequestHeader("Accept", "application/json");
//     retrieveReq.setRequestHeader("Content-Type", "application/json;charset=utf-8");
//     retrieveReq.onreadystatechange = function () {
//         GetAccountData(this);
//     };
//     retrieveReq.send();
//     console.log("END");
// }

// function GetAccountData(retrieveReq) {
//     console.log("get data function ENTERED");
//     if (retrieveReq.readyState == 4) {
//         if (retrieveReq.status == 200) {
//             console.log("get RETRIEVE entered");
//             var retrieved = JSON.parse(retrieveReq.responseText).d;
// console.log(retrieved);
//             Xrm.Page.getAttribute("new_user").setValue(retrieved.results[0].new_user.Name);
//             Xrm.Page.getAttribute("new_user1").setValue(retrieved.results[0].new_user1.Name);
            
//             console.log("get retrieve END");

//         }
//     }
// }

//XRM WEBAPI function to set lookup fields - working function
// function AccountOnChange() {
//     console.log("==START==");
//     var account = Xrm.Page.getAttribute("parentaccountid").getValue();
//     console.log("==ONE Start==");

//     if (account != null) {
//         Xrm.WebApi.retrieveRecord('account', account[0].id, "?$select=_new_User_value,_new_User1_value").then(
//             function success(result) {
//                 if (result != null) {
//                     var lookup = new Array();
//                     lookup[0] = new Object();
//                     lookup[0].id = result._new_user_value;
//                     lookup[0].name = result["_new_user_value@OData.Community.Display.V1.FormattedValue"];
//                     lookup[0].entityType = result["_new_user_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

//                     var lookup1 = new Array();
//                     lookup1[0] = new Object();
//                     lookup1[0].id = result._new_user1_value;
//                     lookup1[0].name = result["_new_user1_value@OData.Community.Display.V1.FormattedValue"];
//                     lookup1[0].entityType = result["_new_user1_value@Microsoft.Dynamics.CRM.lookuplogicalname"];


//                     if (lookup1[0].entityType == null || lookup[0].entityType == null) {
//                         alert("Account Record has no Vertical or Sub Vertical");

//                     }

//                     Xrm.Page.getAttribute("new_user").setValue(lookup);

//                     Xrm.Page.getAttribute("new_user1").setValue(lookup1);  

//                     console.log("get retrieve END");
//                 }
//             },
//             function (error) {
//                 console.log(error.message);
//                 // handle error conditions
//             }
//         );
//     }
// }



//xrmwebapi test
function AccountOnChange() {
    console.log("==START==");
    var account = Xrm.Page.getAttribute("parentaccountid").getValue();
    console.log("==ONE Start==");

    if (account != null) {
        Xrm.WebApi.retrieveRecord('account', account[0].id, "?$select=_new_user_value,_new_user1_value").then(
            function success(result) {
                if (result != null) {
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = result._new_user_value;
                    lookup[0].name = result["_new_user_value@OData.Community.Display.V1.FormattedValue"];
                    lookup[0].entityType = result["_new_user_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                    var lookup1 = new Array();
                    lookup1[0] = new Object();
                    lookup1[0].id = result._new_user1_value;
                    lookup1[0].name = result["_new_user1_value@OData.Community.Display.V1.FormattedValue"];
                    lookup1[0].entityType = result["_new_user1_value@Microsoft.Dynamics.CRM.lookuplogicalname"];


                    if (lookup1[0].entityType == null || lookup[0].entityType == null) {
                        alert("Account Record has no Vertical or Sub Vertical");

                        var lookup2 = new Array();
                        lookup2[0] = new Object();
                        lookup2[0].id = result.clear();
                        lookup2[0].name = result.clear();
                        lookup2[0].entityType = result.clear();
                        
                        Xrm.Page.getAttribute("new_user").setValue(lookup2);

                        Xrm.Page.getAttribute("new_user1").setValue(lookup2); 

                    }

                    Xrm.Page.getAttribute("new_user").setValue(lookup);

                    Xrm.Page.getAttribute("new_user1").setValue(lookup1);  

                    console.log("get retrieve END");
                }
            },
            function (error) {
                //console.log(error.message);
                // handle error conditions
            }
        );
    }
}


//Odata test
function AccountOnChange() {
    console.log("==START==");
    var account = Xrm.Page.getAttribute("parentaccountid").getValue();
    console.log("==ONE Start==");

    if (account == null) {
        return;
    }

    var serverUrl = Xrm.Page.context.getClientUrl();
    var oDataSelect = serverUrl + "/XRMServices/2011/OrganizationData.svc/AccountSet?$select=Name,new_user,new_user1&?$filter=AccountId eq \'" + account[0].id + "\'";
    console.log("==TWO Start==");
    console.log("ODATA Link: "+oDataSelect);
    var retrieveReq = new XMLHttpRequest();
    retrieveReq.open("GET", oDataSelect, false);
    retrieveReq.setRequestHeader("Accept", "application/json");
    retrieveReq.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    retrieveReq.onreadystatechange = function () {
        GetAccountData(this);
    };
    retrieveReq.send();
    console.log("END");
}

function GetAccountData(retrieveReq) {
    console.log("get data function ENTERED");
    if (retrieveReq.readyState == 4) {
        if (retrieveReq.status == 200) {
            console.log("get RETRIEVE entered");
            var retrieved = JSON.parse(retrieveReq.responseText).d;

            console.log(lookup);

            console.log(retrieved);
            Xrm.Page.getAttribute("new_user").setValue(retrieved.new_user);
            Xrm.Page.getAttribute("new_user1").setValue(retrieved.new_user1);
            
            console.log("get retrieve END");

        }
    }
}




