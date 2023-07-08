# WalletWizard

### An expense management app where you can record your everyday transactions.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)

## Features

1. **Expense Tracking:** Easily record expenses, including amount, date, category, and description.
2. **Category Management:** Create and manage expense categories for better organization.
3. **Reports and Analytics:** Generate reports and visualize spending patterns with charts and graphs.
4. **Budget Management:** Set budgets for expense categories and track progress.
5. **User Authentication:** Secure authentication system for authorized access.

## Technologies

1. **Asp.Net Core:** Cross-platform, open-source framework for building web applications with .NET.
2. **C#:** General-purpose programming language used in ASP.NET Core development.
3. **Entity Framework Core:** Object-relational mapping (ORM) framework for working with databases in ASP.NET Core.
4. **MS SQL Server:** Relational database management system for storing and managing expense data.
5. **ReactJs:** Front-end JavaScript library for building user interfaces.
6. **NodeJs:** JavaScript runtime environment for the server-side.
7. **Chart.js:** JavaScript library for creating interactive charts and graphs.
8. **Bootstrap:** CSS framework for responsive design.

## Installation

Follow these steps to get the project up and running on your local machine:

**Prerequisites: Microsoft SQL Server must be installed and running.**
1. Clone the repository to your local machine using the following command: `git clone https://github.com/AishikPal22/WalletWizard`
2. Navigate to the project backend directory: `cd WalletWizard/Backend`
3. Install dependencies: `dotnet restore`
4. Set up the database connection by configuring the MS SQL Server connection string in `data/ApplicationDbContext.cs` file
   and run the following command: `dotnet ef database update`
5. Start the Swagger API server: `dotnet run`
6. Go back to WalletWizard directory and navigate to project frontend directory: `cd ../Frontend`
7. Install the node_modules using the commands provided in `npm.text` file.
8. Start the React server: `npm start`
9. Quit both server using `ctrl + c` command.
