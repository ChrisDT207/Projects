# FitForge Wellness Centre App

## Overview
The **FitForge Wellness Centre App** is a C# console application developed as part of the **PRG1782 Programming Project** at **Belgium Campus iTversity**.

The purpose of the application is to determine which FitForge members qualify for a **monthly wellness reward credit** based on specific eligibility criteria provided in the project brief.

---

## Project Objectives
- Capture and store member details using collections
- Apply logical decision-making to assess reward eligibility
- Implement modular programming using methods
- Display clear qualification statistics
- Follow structured planning using a flowchart

---

## Member Information Captured
Each member record includes:
- Name  
- Age  
- Membership rank  
- Join date as a loyal member  
- Number of smoothies purchased  
- Personal best treadmill distance (km)  
- Employment status  
- Favourite smoothie flavour  
- Number of smoothies consumed since joining  

---

## Functional Requirements Implemented
- Capture member details via a dedicated method
- Allow unlimited data entry until the user chooses to stop
- Validate and format user input before storing
- Assess reward eligibility based on defined rules
- Store qualified members in a separate collection
- Count and display:
  - Qualified members
  - Non-qualified members
  - Total members
- Provide a menu-driven interface using an Enum

---

##  Qualification Criteria
Members **qualify** if they:
- Are employed (or their guardian is, if under 18)
- Have been members for at least 2 years
- Meet at least one performance requirement:
  - Membership rank above 2000  
  - Treadmill distance above 20 km  
  - Or a combined average
- Consume an average of at least 4 smoothies per month

Members **do not qualify** if they:
- Consume more than 20 smoothies per month
- Have “ChocoChurned Chaos” as their favourite smoothie flavour

---

## Technologies Used
- C#
- .NET (Console Application)
- Visual Studio

---

## Key Concepts Applied
- Methods and modular programming
- Collections (Lists)
- Conditional logic
- Enums for menu navigation
- Input validation
- Console-based user interaction

---

## Project Type
- Academic group project  
- Belgium Campus coursework  
- No classes used, as per project requirements

---

## Project Status
Completed

---

## Notes
This project was developed strictly according to the provided project documentation and academic guidelines.  
It reflects my understanding and skill level at the time of completion.
