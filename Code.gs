// Code.gs (Google Apps Script)
function doGet() {
    return HtmlService.createHtmlOutputFromFile('index');
}

// Spreadsheet ID where you want to store the data
var SPREADSHEET_ID = '#';

function processSignup(formData) {
    var name = formData.name;
    var email = formData.email;
    var password = formData.password;

    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Check if any field is empty
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
        return { success: false, errorMessage: "Please fill in all the fields." };
    }

    // Append the form data to the next available row in the spreadsheet
    sheet.appendRow([name, email, password]);
    
    // Redirect URL after successful signup
    var redirectUrl = "https://www.google.com"; // Change this to your desired redirect URL
    
    // Return success along with the redirect URL
    return { success: true, redirectUrl: redirectUrl };
}
function checkLogin(email, password) {
    // Define valid emails, passwords, and their corresponding redirect URLs
    var validUsers = {
        "admin": { password: "password", redirectUrl: "https://sites.google.com/view/teamsiliconx" },
        
    };

    // Check if the provided email exists in the validUsers object
    if (validUsers.hasOwnProperty(email)) {
        // Retrieve the user's details
        var userDetails = validUsers[email];

        // Check if the provided password matches the stored password for the user
        if (password === userDetails.password) {
            // If credentials are correct, return success along with the redirect URL
            return { success: true, redirectUrl: userDetails.redirectUrl };
        } else {
            // If password is incorrect, return error message
            return { success: false, errorMessage: "Invalid password. Please try again." };
        }
    } else {
        // If email is not found, return error message
        return { success: false, errorMessage: "Email not found. Please try again." };
    }
}
