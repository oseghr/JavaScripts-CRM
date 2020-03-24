function checkForm() {
  var freeze = Xrm.Page.getAttribute("ni_checkbox").getValue();
  var freezer = Xrm.Page.getAttribute("ni_checkbox1").getValue();

  if (freeze) {
    // Make the field read only
    Xrm.Page.getControl("ni_postalcodebilling").setDisabled(true);
    Xrm.Page.getControl("ni_addressbilling").setDisabled(true);

    Xrm.Page.getControl("ni_citybilling").setDisabled(true);
    Xrm.Page.getControl("ni_provincebilling").setDisabled(true);
    Xrm.Page.getControl("ni_countrybilling").setDisabled(true);

    Xrm.Page.getControl("ni_citybillingtemp").setDisabled(true);
    Xrm.Page.getControl("ni_provincebillingtemp").setDisabled(true);
    Xrm.Page.getControl("ni_countrybillingtemp").setDisabled(true);
  }

  if (freezer) {
    // Make the field read only
    Xrm.Page.getControl("ni_postalcodeshipping").setDisabled(true);
    Xrm.Page.getControl("ni_addressshipping").setDisabled(true);

    Xrm.Page.getControl("ni_cityshipping").setDisabled(true);
    Xrm.Page.getControl("ni_provinceshipping").setDisabled(true);
    Xrm.Page.getControl("ni_countryshipping").setDisabled(true);

    Xrm.Page.getControl("ni_cityshippingtemp").setDisabled(true);
    Xrm.Page.getControl("ni_provinceshippingtemp").setDisabled(true);
    Xrm.Page.getControl("ni_countryshippingtemp").setDisabled(true);
  }
}

function ReadOnlyBilling() {
  // target billing checkbox and get its value
  var freeze = Xrm.Page.getAttribute("ni_checkbox").getValue();

  if (freeze) {
    //getting values from primary address
    var postalcodebilling = Xrm.Page.getAttribute("ni_postalcode").getValue();

    var addressbilling = Xrm.Page.getAttribute("ni_address").getValue();

    var citybilling = Xrm.Page.getAttribute("ni_city").getValue();
    var provincebilling = Xrm.Page.getAttribute("ni_province").getValue();
    var countrybilling = Xrm.Page.getAttribute("ni_country").getValue();

    var citybillingtemp = Xrm.Page.getAttribute("ni_citytemp").getValue();
    var provincebillingtemp = Xrm.Page.getAttribute(
      "ni_provincetemp"
    ).getValue();
    var countrybillingtemp = Xrm.Page.getAttribute("ni_countrytemp").getValue();

    var clear = " ";

    // copy values from primary address fields
    Xrm.Page.getAttribute("ni_postalcodebilling").setValue(postalcodebilling);
    Xrm.Page.getAttribute("ni_addressbilling").setValue(addressbilling);

    Xrm.Page.getAttribute("ni_citybilling").setValue(citybilling);
    Xrm.Page.getAttribute("ni_provincebilling").setValue(provincebilling);
    Xrm.Page.getAttribute("ni_countrybilling").setValue(countrybilling);

    Xrm.Page.getAttribute("ni_citybillingtemp").setValue(citybillingtemp);
    Xrm.Page.getAttribute("ni_provincebillingtemp").setValue(
      provincebillingtemp
    );
    Xrm.Page.getAttribute("ni_countrybillingtemp").setValue(countrybillingtemp);

    // Make the field read only
    Xrm.Page.getControl("ni_postalcodebilling").setDisabled(true);

    Xrm.Page.getControl("ni_addressbilling").setDisabled(true);

    Xrm.Page.getControl("ni_citybilling").setDisabled(true);
    Xrm.Page.getControl("ni_provincebilling").setDisabled(true);
    Xrm.Page.getControl("ni_countrybilling").setDisabled(true);

    Xrm.Page.getControl("ni_citybillingtemp").setDisabled(true);
    Xrm.Page.getControl("ni_provincebillingtemp").setDisabled(true);
    Xrm.Page.getControl("ni_countrybillingtemp").setDisabled(true);

  } else {
      
    // clears values from billing address fields
    Xrm.Page.getAttribute("ni_postalcodebilling").setValue(clear);
    Xrm.Page.getAttribute("ni_addressbilling").setValue(clear);

    Xrm.Page.getAttribute("ni_citybilling").setValue(clear);
    Xrm.Page.getAttribute("ni_provincebilling").setValue(clear);
    Xrm.Page.getAttribute("ni_countrybilling").setValue(clear);

    Xrm.Page.getAttribute("ni_citybillingtemp").setValue(clear);
    Xrm.Page.getAttribute("ni_provincebillingtemp").setValue(clear);
    Xrm.Page.getAttribute("ni_countrybillingtemp").setValue(clear);

    // make the fields editable
    Xrm.Page.getControl("ni_postalcodebilling").setDisabled(false);
    Xrm.Page.getControl("ni_addressbilling").setDisabled(false);

    Xrm.Page.getControl("ni_citybilling").setDisabled(false);
    Xrm.Page.getControl("ni_provincebilling").setDisabled(false);
    Xrm.Page.getControl("ni_countrybilling").setDisabled(false);

    Xrm.Page.getControl("ni_citybillingtemp").setDisabled(false);
    Xrm.Page.getControl("ni_provincebillingtemp").setDisabled(false);
    Xrm.Page.getControl("ni_countrybillingtemp").setDisabled(false);
  }
}

function ReadOnlyShipping() {
  // target shipping checkbox and get its value
  var freezer = Xrm.Page.getAttribute("ni_checkbox1").getValue();

  if (freezer) {
    //getting values from primary address
    var postalcodeshipping = Xrm.Page.getAttribute("ni_postalcode").getValue();

    var addressshipping = Xrm.Page.getAttribute("ni_address").getValue();

    var cityshipping = Xrm.Page.getAttribute("ni_city").getValue();
    var provinceshipping = Xrm.Page.getAttribute("ni_province").getValue();
    var countryshipping = Xrm.Page.getAttribute("ni_country").getValue();

    var cityshippingtemp = Xrm.Page.getAttribute("ni_citytemp").getValue();
    var provinceshippingtemp = Xrm.Page.getAttribute(
      "ni_provincetemp"
    ).getValue();
    var countryshippingtemp = Xrm.Page.getAttribute(
      "ni_countrytemp"
    ).getValue();
    var clear = " ";

    // copy values from primary address fields
    Xrm.Page.getAttribute("ni_postalcodeshipping").setValue(postalcodeshipping);
    Xrm.Page.getAttribute("ni_addressshipping").setValue(addressshipping);

    Xrm.Page.getAttribute("ni_cityshipping").setValue(cityshipping);
    Xrm.Page.getAttribute("ni_provinceshipping").setValue(provinceshipping);
    Xrm.Page.getAttribute("ni_countryshipping").setValue(countryshipping);

    Xrm.Page.getAttribute("ni_cityshippingtemp").setValue(cityshippingtemp);
    Xrm.Page.getAttribute("ni_provinceshippingtemp").setValue(
      provinceshippingtemp
    );
    Xrm.Page.getAttribute("ni_countryshippingtemp").setValue(
      countryshippingtemp
    );

    // Make the field read only
    Xrm.Page.getControl("ni_postalcodeshipping").setDisabled(true);
    Xrm.Page.getControl("ni_addressshipping").setDisabled(true);

    Xrm.Page.getControl("ni_cityshipping").setDisabled(true);
    Xrm.Page.getControl("ni_provinceshipping").setDisabled(true);
    Xrm.Page.getControl("ni_countryshipping").setDisabled(true);

    Xrm.Page.getControl("ni_cityshippingtemp").setDisabled(true);
    Xrm.Page.getControl("ni_provinceshippingtemp").setDisabled(true);
    Xrm.Page.getControl("ni_countryshippingtemp").setDisabled(true);
  } else {
    // clears values from shipping address fields
    Xrm.Page.getAttribute("ni_postalcodeshipping").setValue(clear);
    Xrm.Page.getAttribute("ni_addressshipping").setValue(clear);

    Xrm.Page.getAttribute("ni_cityshipping").setValue(clear);
    Xrm.Page.getAttribute("ni_provinceshipping").setValue(clear);
    Xrm.Page.getAttribute("ni_countryshipping").setValue(clear);

    Xrm.Page.getAttribute("ni_cityshippingtemp").setValue(clear);
    Xrm.Page.getAttribute("ni_provinceshippingtemp").setValue(clear);
    Xrm.Page.getAttribute("ni_countryshippingtemp").setValue(clear);

    // make the fields editable
    Xrm.Page.getControl("ni_postalcodeshipping").setDisabled(false);
    Xrm.Page.getControl("ni_addressshipping").setDisabled(false);

    Xrm.Page.getControl("ni_cityshipping").setDisabled(false);
    Xrm.Page.getControl("ni_provinceshipping").setDisabled(false);
    Xrm.Page.getControl("ni_countryshipping").setDisabled(false);

    Xrm.Page.getControl("ni_cityshippingtemp").setDisabled(false);
    Xrm.Page.getControl("ni_provinceshippingtemp").setDisabled(false);
    Xrm.Page.getControl("ni_countryshippingtemp").setDisabled(false);
  }
}
