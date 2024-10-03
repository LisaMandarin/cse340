const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="/inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + ' details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

Util.buildInventoryDetails = async function(data) {
  let content
  
  if (data) {
    const usPrice = new Intl.NumberFormat('en-US').format(data.inv_price)
    const usMiles = new Intl.NumberFormat('en-US').format(data.inv_miles)
    content = `
      <div class="inventory-detail-card">
        <div class="image-box">
          <img src='${data.inv_image}' alt='photo of ${data.inv_year} ${data.inv_make} ${data.inv_model}'>
        </div>
        <div class="detail-box">
          <h3>${data.inv_make} ${data.inv_model} Details</h3>
          <div class="price"><strong>Price: </strong>$${usPrice}</div>
          <div class="description"><strong>Description: </strong>${data.inv_description}</div>
          <div class="color"><strong>Color: </strong>${data.inv_color}</div>
          <div class="miles"><strong>Miles: </strong>${usMiles}</div>
        </div>
      </div>
      `
  } else {
    content += "<p>Oops...the details of the vehicle is not available right now.  Please try again later.</p>"
  }
  
  return content
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util