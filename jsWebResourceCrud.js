  
    function createRecord() {


        var accountName = Xrm.Page.getAttribute("name").getValue();

        var accountNumber = Xrm.Page.getAttribute("accountnumber").getValue();
    
        var city = Xrm.Page.getAttribute("ni_citytemp").getValue();
        var address = Xrm.Page.getAttribute("ni_address").getValue();
     
        var addressBilling = Xrm.Page.getAttribute("ni_addressbilling").getValue();
        var cityBilling = Xrm.Page.getAttribute("ni_citybillingtemp").getValue();





         


        // Javascript snippet

        var myHeaders = new Headers();
        myHeaders.append(
        "Authorization",
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjQzQ0F5ekJOQUotYVFVTHZTS2ltNW9XMktJSSIsImtpZCI6IjQzQ0F5ekJOQUotYVFVTHZTS2ltNW9XMktJSSJ9.eyJpc3MiOiJodHRwczovL2Rldi5zYXRjb21wYXNzLmNvbS9pZGVudGl0eSIsImF1ZCI6Imh0dHBzOi8vZGV2LnNhdGNvbXBhc3MuY29tL2lkZW50aXR5L3Jlc291cmNlcyIsImV4cCI6MTU4NDk4MDY2NywibmJmIjoxNTg0OTc3MDY3LCJjbGllbnRfaWQiOiJpYmlzV2ViQXBwVXNlciIsInNjb3BlIjoiaWJpc0FwaSIsInN1YiI6Im9zZWdoYWUub2Fpa2hlbmFAbmV0d29ya2ludi5jb20iLCJhdXRoX3RpbWUiOjE1ODQ5NzY1MzQsImlkcCI6Imlkc3J2IiwicHJlZmVycmVkX3VzZXJuYW1lIjoib3NlZ2hhZS5vYWlraGVuYUBuZXR3b3JraW52LmNvbSIsInJvbGUiOiJCaWxsaW5nQWRtaW4iLCJhbXIiOlsicGFzc3dvcmQiXX0.LkEUu4DK46I60BsXv3B4gH40_XBJvPB7QjAAQXysWpZrZhagTxEHnmExkU38VZt96B2ccQGJTR4WEWBwTTvRO7bUswiKA4s_Sw2iWGPt3BcbabXCnchmSxHjWIgYrM1t6DVA52MEBT5KOnLByUrDQX6dVKXxUyTm64Kqc7naO34GhkZV0PqnWkH02ftw4HxQtr8Kc-94D967WBVv82Rp0B-0Tp3E0CUfD5G43Y9hEijXgnHZIPADkXOy_P0Kv5j_odsm4zgDqsUzAxfhVwU7qfD7yKkoYzI-9c2UuGzWoe0wab9g-LTispe-7AYQIo1lCh9YjjYfq8QK48OF-XZRiw"
        );
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        ParentCustomerID: 0,
        CustomerCode: `${accountNumber}`,
        CustomerName: `${accountName}`,
        InvoiceLayoutCode: "Network Innovations",
        TaxExemptionCode: "",
        CurrencyCode: "USD",
        CreditTermsCode: "Net 30",
        InvoiceDeliveryMode: "Print",
        EmailGeneral: "SatCompass.Test@networkinv.com",
        EmailBilling: "SatCompass.Test@networkinv.com",
        EmailBillingCC: "",
        EmailAlertsAndNotifications: "SatCompass.Test@networkinv.com",
        EmailAlertsAndNotificationsCC: "",
        EmailProvNotificationsTo: "SatCompass.Test@networkinv.com",
        EmailProvNotificationsCc: "",
        InvoiceNote: "",
        BalanceAlert: null,
        AdminNotes: "",
        PONumber: "",
        ARCode: "",
        AccountBalance: 0,
        ShowZeroChargesOnInvoice: false,
        ShowPreviousBalanceOnInvoice: false,
        DeviceIdentifierOnInvoice: "ICCID",
        VatCode: null,
        TaxCombinationCode: "32038",
        InvoiceExportFormatCode: null,
        ShowCdrsOnInvoice: true,
        ZeroPrice: false,
        IsVisibleForDealer: false,
        ActivationRequestTemplateID: null,
        PricePlanVisible: false,
        CdrExportFormat: "",
        CdrExportSchedule: "Hourly",
        CustomerCategoryCode: null,
        RollupInvoiceToParentCustomer: false,
        InvoiceGroupedBy: "ProductCode",
        Description: null,
        OutageNotificationCategoryCodes: "",
        SendOutageNotificationsViaEmail: false,
        IndustryCode: null,
        InvoiceDiscountPercentage: null,
        BillerEntityCode: "11",
        AccountManagerCode: "SL",
        BillingProfile: null,
        ServiceManagerCode: null,
        ProvisioningNotificationsMode: "SuccessfulOnly",
        MainAddressSameAsParentMainAddress: false,
        BillingAddressSameAsMainAddress: false,
        MainAddress: {
            AddressID: 45555,
            AddressLine1: `${address}`,
            AddressLine2: `${address}`,
            AddressLine3: "",
            AddressLine4: "",
            PostCode: null,
            City: `${city}`,
            State: "AB",
            CountryCode: "CAN",
            AddressFormatCode: null,
            CustomerReference: "11000678"
        },
        BillingAddress: {
            AddressID: 6531792,
            AddressLine1: `${addressBilling}`,
            AddressLine2: `${addressBilling}`,
            AddressLine3: "",
            AddressLine4: "",
            PostCode: "T6E 1W6",
            City: `${cityBilling}`,
            State: "AB",
            CountryCode: "CAN",
            AddressFormatCode: null,
            CustomerReference: null
        },
        ContactPersons: [],
        Dealer: null
        });

        var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch("https://dev.satcompass.com/api/v1/CustomerDetails", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log("error", error));


    }
    
























// var myHeaders = new Headers();
// myHeaders.append(
//   "Authorization",
//   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjQzQ0F5ekJOQUotYVFVTHZTS2ltNW9XMktJSSIsImtpZCI6IjQzQ0F5ekJOQUotYVFVTHZTS2ltNW9XMktJSSJ9.eyJpc3MiOiJodHRwczovL2Rldi5zYXRjb21wYXNzLmNvbS9pZGVudGl0eSIsImF1ZCI6Imh0dHBzOi8vZGV2LnNhdGNvbXBhc3MuY29tL2lkZW50aXR5L3Jlc291cmNlcyIsImV4cCI6MTU4NDk4NDg4NCwibmJmIjoxNTg0OTgxMjg0LCJjbGllbnRfaWQiOiJpYmlzV2ViQXBwVXNlciIsInNjb3BlIjoiaWJpc0FwaSIsInN1YiI6Im9zZWdoYWUub2Fpa2hlbmFAbmV0d29ya2ludi5jb20iLCJhdXRoX3RpbWUiOjE1ODQ5NzY1MzQsImlkcCI6Imlkc3J2IiwicHJlZmVycmVkX3VzZXJuYW1lIjoib3NlZ2hhZS5vYWlraGVuYUBuZXR3b3JraW52LmNvbSIsInJvbGUiOiJCaWxsaW5nQWRtaW4iLCJhbXIiOlsicGFzc3dvcmQiXX0.hgThL9EcyhaU4c7VzhGLLwJNpFJ-wuOmtlP6kkMBLGlgutWedbMQF8I3TZKf44qUfx8LDDZeDaLbK3e-y3uHXMc4Pgvd0D0Y515-vgh-G8KbWLpdJKGBYbdBXy-A6PCYxtypZyW37E4IGzkuVWyuGf7umLhwUya3rDJOOuLqWQLZKcpBMmCIoDIPRnonpWrt6xW12YJsuZjkJJaPcgkID5NUPFdtKNEBCkX1Qt97hPHOblbpkSDVS7KI07cPWT1_18CuinGjrt8j0rilSlVtZyaOfE-sbNahBl-5ygwHCQW0ZbSS6QRhbmZSt_o0APnofwRB86Tdmze--L4c1Z7hBA"
// );
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   ParentCustomerID: 0,
//   CustomerCode: 989898,
//   CustomerName: "Sintra Updated Put Account",
//   InvoiceLayoutCode: "Generic",
//   TaxExemptionCode: null,
//   CurrencyCode: "USD",
//   CreditTermsCode: "Net 30",
//   InvoiceDeliveryMode: "E-Mail",
//   EmailGeneral: "ohisbenson@yahoo.com",
//   EmailBilling: "ohisbenson@yahoo.com",
//   EmailBillingCC: "ohisbenson@yahoo.com",
//   EmailAlertsAndNotifications: "ohisbenson@yahoo.com",
//   EmailAlertsAndNotificationsCC: null,
//   EmailProvNotificationsTo: null,
//   EmailProvNotificationsCc: null,
//   InvoiceNote: null,
//   BalanceAlert: null,
//   AdminNotes: null,
//   PONumber: null,
//   ARCode: null,
//   AccountBalance: 0,
//   ShowZeroChargesOnInvoice: false,
//   ShowPreviousBalanceOnInvoice: false,
//   DeviceIdentifierOnInvoice: "ICCID",
//   VatCode: null,
//   TaxCombinationCode: "32034B",
//   InvoiceExportFormatCode: "Generic",
//   ShowCdrsOnInvoice: true,
//   ZeroPrice: null,
//   IsVisibleForDealer: null,
//   ActivationRequestTemplateID: null,
//   PricePlanVisible: null,
//   CdrExportFormat: null,
//   CdrExportSchedule: null,
//   CustomerCategoryCode: null,
//   RollupInvoiceToParentCustomer: false,
//   InvoiceGroupedBy: "ProductCode",
//   Description: null,
//   OutageNotificationCategoryCodes: null,
//   SendOutageNotificationsViaEmail: null,
//   IndustryCode: null,
//   InvoiceDiscountPercentage: null,
//   BillerEntityCode: null,
//   AccountManagerCode: null,
//   BillingProfile: null,
//   ServiceManagerCode: null,
//   ProvisioningNotificationsMode: null,
//   MainAddressSameAsParentMainAddress: false,
//   BillingAddressSameAsMainAddress: false,
//   MainAddress: {
//     AddressID: 0,
//     AddressLine1: "Sintra Address Changes",
//     AddressLine2: "Sintra Address Changes",
//     AddressLine3: null,
//     AddressLine4: null,
//     PostCode: null,
//     City: null,
//     State: null,
//     CountryCode: "CAN",
//     CustomerReference: null
//   },
//   BillingAddress: {
//     AddressID: 0,
//     AddressLine1: "Sintra Wake FT",
//     AddressLine2: "Sintra Awake FT",
//     AddressLine3: null,
//     AddressLine4: null,
//     PostCode: null,
//     City: null,
//     State: null,
//     CountryCode: "CAN",
//     AddressFormatCode: "Postcode City",
//     CustomerReference: null
//   },
//   ContactPersons: [
//     {
//       ContactPersonID: 0,
//       ContactName: null,
//       Phone1: null,
//       Phone2: null,
//       Fax: null,
//       Email: null,
//       IsMainContact: true
//     }
//   ],
//   Dealer: null
// });

// var requestOptions = {
//   method: "PUT",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };

// fetch(
//   "https://dev.satcompass.com/api/v1/CustomerDetails/81517711",
//   requestOptions
// )
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log("error", error));






// var myHeaders = new Headers();
// myHeaders.append("Accept", "application/json");
// myHeaders.append(
//   "Authorization",
//   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjQzQ0F5ekJOQUotYVFVTHZTS2ltNW9XMktJSSIsImtpZCI6IjQzQ0F5ekJOQUotYVFVTHZTS2ltNW9XMktJSSJ9.eyJpc3MiOiJodHRwczovL2Rldi5zYXRjb21wYXNzLmNvbS9pZGVudGl0eSIsImF1ZCI6Imh0dHBzOi8vZGV2LnNhdGNvbXBhc3MuY29tL2lkZW50aXR5L3Jlc291cmNlcyIsImV4cCI6MTU4NDk4NDg4NCwibmJmIjoxNTg0OTgxMjg0LCJjbGllbnRfaWQiOiJpYmlzV2ViQXBwVXNlciIsInNjb3BlIjoiaWJpc0FwaSIsInN1YiI6Im9zZWdoYWUub2Fpa2hlbmFAbmV0d29ya2ludi5jb20iLCJhdXRoX3RpbWUiOjE1ODQ5NzY1MzQsImlkcCI6Imlkc3J2IiwicHJlZmVycmVkX3VzZXJuYW1lIjoib3NlZ2hhZS5vYWlraGVuYUBuZXR3b3JraW52LmNvbSIsInJvbGUiOiJCaWxsaW5nQWRtaW4iLCJhbXIiOlsicGFzc3dvcmQiXX0.hgThL9EcyhaU4c7VzhGLLwJNpFJ-wuOmtlP6kkMBLGlgutWedbMQF8I3TZKf44qUfx8LDDZeDaLbK3e-y3uHXMc4Pgvd0D0Y515-vgh-G8KbWLpdJKGBYbdBXy-A6PCYxtypZyW37E4IGzkuVWyuGf7umLhwUya3rDJOOuLqWQLZKcpBMmCIoDIPRnonpWrt6xW12YJsuZjkJJaPcgkID5NUPFdtKNEBCkX1Qt97hPHOblbpkSDVS7KI07cPWT1_18CuinGjrt8j0rilSlVtZyaOfE-sbNahBl-5ygwHCQW0ZbSS6QRhbmZSt_o0APnofwRB86Tdmze--L4c1Z7hBA"
// );

// var requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow"
// };

// fetch(
//   "https://dev.satcompass.com/api/v1/CustomerDetails/81494723",
//   requestOptions
// )
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log("error", error));

// {

//     "ParentCustomerID": 0,
//     "CustomerCode": 989898,
//     "CustomerName": "Sintra Updated Put Account",
//     "InvoiceLayoutCode": "Generic",
//     "TaxExemptionCode": null,
//     "CurrencyCode": "USD",
//     "CreditTermsCode": "Net 30",
//     "InvoiceDeliveryMode": "E-Mail",
//     "EmailGeneral": "ohisbenson@yahoo.com",
//     "EmailBilling": "ohisbenson@yahoo.com",
//     "EmailBillingCC": "ohisbenson@yahoo.com",
//     "EmailAlertsAndNotifications": "ohisbenson@yahoo.com",
//     "EmailAlertsAndNotificationsCC": null,
//     "EmailProvNotificationsTo": null,
//     "EmailProvNotificationsCc": null,
//     "InvoiceNote": null,
//     "BalanceAlert": null,
//     "AdminNotes": null,
//     "PONumber": null,
//     "ARCode": null,
//     "AccountBalance": 0,
//     "ShowZeroChargesOnInvoice": false,
//     "ShowPreviousBalanceOnInvoice": false,
//     "DeviceIdentifierOnInvoice": "ICCID",
//     "VatCode": null,
//     "TaxCombinationCode": "32034B",
//     "InvoiceExportFormatCode": "Generic",
//     "ShowCdrsOnInvoice": true,
//     "ZeroPrice": null,
//     "IsVisibleForDealer": null,
//     "ActivationRequestTemplateID": null,
//     "PricePlanVisible": null,
//     "CdrExportFormat": null,
//     "CdrExportSchedule": null,
//     "CustomerCategoryCode": null,
//     "RollupInvoiceToParentCustomer": false,
//     "InvoiceGroupedBy": "ProductCode",
//     "Description": null,
//     "OutageNotificationCategoryCodes": null,
//     "SendOutageNotificationsViaEmail": null,
//     "IndustryCode": null,
//     "InvoiceDiscountPercentage": null,
//     "BillerEntityCode": null,
//     "AccountManagerCode": null,
//     "BillingProfile": null,
//     "ServiceManagerCode": null,
//     "ProvisioningNotificationsMode": null,
//     "MainAddressSameAsParentMainAddress": false,
//     "BillingAddressSameAsMainAddress": false,
//     "MainAddress": {
//       "AddressID": 0,
//       "AddressLine1": "Sintra Address Changes",
//       "AddressLine2": "Sintra Address Changes",
//       "AddressLine3": null,
//       "AddressLine4": null,
//       "PostCode": null,
//       "City": null,
//       "State": null,
//       "CountryCode": "CAN",
//       "CustomerReference": null
//     },
//     "BillingAddress": {
//       "AddressID": 0,
//       "AddressLine1": "Sintra Wake FT",
//       "AddressLine2": "Sintra Awake FT",
//       "AddressLine3": null,
//       "AddressLine4": null,
//       "PostCode": null,
//       "City": null,
//       "State": null,
//       "CountryCode": "CAN",
//       "AddressFormatCode": "Postcode City",
//       "CustomerReference": null
//     },
//     "ContactPersons": [
//       {
//         "ContactPersonID": 0,
//         "ContactName": null,
//         "Phone1": null,
//         "Phone2": null,
//         "Fax": null,
//         "Email": null,
//         "IsMainContact": true
//       }
//     ],
//     "Dealer": null
//   }
