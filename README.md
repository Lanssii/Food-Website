# Bistro Bliss

**Bistro Bliss** is a modern and responsive restaurant website built using **HTML, CSS, and JavaScript**, based on a Figma design.
The project focuses on clean UI, interactive elements, and dynamic content using external APIs.

---

## Features

- **Responsive Design** – adapts to mobile devices and desktops
- **Burger Menu** – interactive menu for the mobile version
- **Form Validation** – custom form validation (Name, Email, Subject)
- **Cookie Banner** – storing user consent via `localStorage`
- **Dynamic Menu (API Integration)**

  - Uses:

    - [TheMealDB](https://www.themealdb.com/)
    - [TheCocktailDB](https://www.thecocktaildb.com/)

  - Loads food & drinks dynamically
  - Category filtering (Breakfast, Main Dishes, Drinks, Desserts, All)

- **Loading & Error States** – handling loading and API errors
- **Reset CSS** – for uniform display across browsers

---

## 📂 Pages

- `index.html` – Home page
- `about.html` – About the restaurant
- `menu.html` – Dynamic menu with API
- `blog.html` – Blog page
- `contact.html` – Contact form

_(More pages will be added in the future)_

---

## 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox, Responsive Design)
- JavaScript (Vanilla JS)
- REST APIs
- LocalStorage

---

## JavaScript Functionality

### Form Validation

- Checks:

  - Required fields
  - Name format (letters only)
  - Email format
  - Minimum length

- Shows real-time error messages
- Displays success state after submission

---

### 🍪 Cookies Handling

- Cookie banner appears only once
- Uses `localStorage` to store user consent

---

### Burger Menu

- Responsive navigation
- Moves menu into sidebar on small screens
- Closes:

  - On overlay click
  - On outside click
  - On close button

---

### API Integration

- Fetches meals and drinks from free APIs
- Normalizes data (name, image, description, price)
- Combines and shuffles items for "All" category
- Renders dynamic product cards

---

## Installation & Usage

1. Clone the repository:

```bash
git clone https://github.com/your-username/bistro-bliss.git
```

2. Open the project folder:

```bash
cd bistro-bliss
```

3. Open `index.html` in your browser

---

## Future Improvements

- Backend integration
- User authentication
- Reviews system (API)
- Shopping cart / ordering system
- Multi-language support

---

## Design

- UI/UX design was taken from **Figma** and implemented manually

---

## 👩‍💻 Author

**Lana Shotashvili**

- IT student & frontend developer
- Interested in Web Development

---

## ⭐️ Notes

This project was created for learning and practice purposes, showing all my skills, focusing on:

- Clean code structure
- DOM manipulation
- Working with APIs
- Responsive layout
