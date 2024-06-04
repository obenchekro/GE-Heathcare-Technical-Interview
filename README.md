# GE Healthcare Technical Test - Watch Application

## Context

This project is a technical test for GE Healthcare. The goal is to create a client-side application that simulates a watch with a set of functionalities to implement.

## Instructions

### A - Basic Functionality
- Displays the current time
- A button “mode” allows changing the time
- When pressing the “mode” button, the time becomes editable: the “increase” button adds one hour
- When pressing the “mode” button again, the “increase” button adds one minute
- When pressing the “mode” button a third time, the time is no longer editable: the “increase” button does nothing
- The button “light” turns on the screen to be readable even at night

### B - Additional Features
- Display multiple clocks on the page
- Each clock displays a different time zone (e.g., GMT+1, GMT+2…)
- Add a reset button to reinitialize a clock after using the edit button
- Add a button that dynamically creates and displays a new clock (extra bonus if you can choose the time zone before creating it)
- Add a button to change the display between 24h and AM/PM format
- Extend the class diagram

### C - Watch Animation
- Implement a set of classes to provide:
  - 2D vector/point coordinates
  - 3x3 matrix and associated functions:
    - Inverse
    - Multiply
    - Transform point/vector
    - Functions to create translation/rotation/scaling matrices
- Leverage this library to animate the watch position by combining a set of matrices:
  - The watch shall rotate on itself, scale up and down, and rotate around an arbitrary point (randomly defined at page load or from a user input field)
- Extend the class diagram

## Project Details

This project is entirely implemented in vanilla TS. Usage of frameworks is prohibited (but we'll try as much as possible to reproduce some instinctive behavior used in framework codes especially when it comes to design pattern). The project is supported by an OOP approach and strong typing. It also illustrates practical usages of some design patterns.

## Launching the project

Webpack is used as a module bundler to compile and bundle our TS code.

To transpile/build the project from TS to JS and launch it with Webpack, run:

```bash
npm run all
```
## Class Diagram
![Alt text](https://i.ibb.co/t20nTL7/Watch-Application-Class-Diagram.png)

## Design Pattern
This is an attempt to apply some design pattern in the use cases of this application. Some design pattern used there might be arguable and small improvements on that part are welcomed.

- Factory Design Pattern: Used in the **Watch** class for creating the watch and its components such as buttons, display, and clock.
- Dependency Injection: Performed mainly by injecting the needed classes in the **Watch** class for example as services (I tried to replicate what frameworks like Angular or NestJs do)
- Singleton: Applied to the **ClockManager** class since only one instance of this class is needed to manage the entire process.