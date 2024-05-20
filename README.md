# Employee List Management Application

This project is an Angular application for managing the employee list of an organization. It allows adding, deleting, and editing employee details. The server side is implemented using .NET 6 and above.

The server is running on port 7039.

## Getting Started

### Launching the Application

1. Make sure the server is running on port 7039.
2. Navigate to the project directory in the terminal.
3. Run `ng serve` to start the Angular application. Open [http://localhost:4200](http://localhost:4200) to view it in your browser.

### Available Scripts

In the project directory, you can run:

- `ng serve`: Runs the app in development mode.

The build is optimized for performance and ready for deployment.

## Project Features

1. Employee list management page including:
   - First name
   - Surname
   - Title
   - Date of Entry
   - Actions for adding, deleting, and editing employees

2. Employee form for adding/editing with the following fields:
   - First name
   - Surname
   - Identity
   - Gender
   - Date of Birth
   - Date of Commencement
   - Roles with dynamic addition:
     - Position name (from pre-defined list)
     - Management/Non-management position
     - Entry date (later than or equal to the start work date)
   
3. Search field to filter the displayed items in the list based on text input.
4. Export functionality to export the list to an Excel file for download.

## Server Side

- API implemented to save the data
- Data stored in a SQL database
- Project structure follows the layer model architecture

## Learn More

For more information, you can refer to the [Angular documentation](https://angular.io/docs).