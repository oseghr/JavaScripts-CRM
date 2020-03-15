//Validation of phone number fields in CRM
function validatePhone() {
    var mobi = Xrm.Page.getAttribute("telephone1");
    var phoneCleaned = mobi.getValue();
    mobiRegex = new RegExp(/^\+(?:[0-9] ?){6,14}[0-9]$/);
    if (phoneCleaned != null && mobiRegex.test(phoneCleaned)) {
       if (phoneCleaned.length == 12){
          mobi.setValue(phoneCleaned); 
          return true;
       }
       return true;
    }
    
    else {
       Xrm.Page.getAttribute("telephone1").setValue('');
       alert(" Incorrect Phone Number Format!\n Please prefix the number with - \n '+<country code><area code><number>'.\n Only spaces are allowed between numbers.\n Do not include dashes, dots etc.");
       Xrm.Page.getControl("telephone1").setFocus();
       Event.returnValue = false;
       return false;      
    }
 }
 
 
 
 
 
 function validateMobilePhone() {
    var mobi = Xrm.Page.getAttribute("mobilephone");
    var phoneCleaned = mobi.getValue();
    mobiRegex = new RegExp(/^\+(?:[0-9] ?){6,14}[0-9]$/);
    if (phoneCleaned != null && mobiRegex.test(phoneCleaned)) {
       if (phoneCleaned.length == 12){
          mobi.setValue(phoneCleaned.substr(0, 2) + " " + phoneCleaned.substr(2, 3) + " " + phoneCleaned.substr(5, 3) + " " + phoneCleaned.substr(8, 4)); 
          return true;
       }
       return true;
    }
    
    else {
       Xrm.Page.getAttribute("mobilephone").setValue('');
       alert("Incorrect Mobile Phone Number Format!\n Please prefix the number with - \n '+<country code><area code><number>'.\n Only spaces are allowed between numbers.\n Do not include dashes, dots etc.");
       Xrm.Page.getControl("telephone1").setFocus();
       Event.returnValue = false;
       return false;      
    }
 }
