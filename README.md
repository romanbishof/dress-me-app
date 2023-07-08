# React Web App - Dress Me App
The best app to help you build a sets from your messd up closet, and forget about spending time on "what to wear" question
<img width="1438" alt="image" src="https://github.com/romanbishof/dress-me-app/assets/76264579/6e690531-5001-492f-8d12-a5063bbe09e9">


## Features

### Build Outfits

The main feature of the Closet Builder application is the ability to build sets of outfits. In this app the user can select shirts, pants, and shoes, and build himself a set - that will be stored in a personal zone. 

The selection process is intuitive and user-friendly.

### My Space (The Closet)

This feature allows user to store his created outfit sets in the personal zone, here he can see the time he thought and decided what to wear, delete his choices, or just to check what the right set for today. The sets are persistent, so don't afraid to refresh or close the webpage. 

<img width="1014" alt="image" src="https://github.com/romanbishof/dress-me-app/assets/76264579/9dd3dbe9-39d1-4d1d-8ed1-7a9807d2583e">

### Responsive Design

Dress Me App is designed to be responsive, ensuring a seamless experience across various devices and screen sizes. 

### Technologies Used

- React: JavaScript library for building user interfaces.
- React-router-dom: library for page randering.
- axios: library for performing API calls
- uuid: library for generating uniq id
- Redux.js/toolkit: State management library for managing application state.
- CSS: Cascading Style Sheets for styling the application.
- HTML: Hypertext Markup Language for structuring the application

### Folder Structure

Here's an overview of the folder structure of the project:
```
dress-me-app/
  ├── public/
  │   ├── index.html
  │   └── ...
  ├── src/
  │   ├── components/
  │   │   ├── OutfitRecommendations.js
  │   │   ├── ClosetManagement.js
  │   │   ├── UserProfile.js
  │   │   └── ...
  │   ├── containers/
  │   │   ├── OutfitRecommendationsContainer.js
  │   │   ├── ClosetManagementContainer.js
  │   │   ├── UserProfileContainer.js
  │   │   └── ...
  │   ├── services/
  │   │   ├── firebase.js
  │   │   └── ...
  │   ├── App.js
  │   ├── index.js
  │   └── ...
  ├── .gitignore
  ├── package.json
  ├── README.md
  └── ...
```

### To be developed

- Giving  the ability for users to categorize their outfits (e.g., formal, casual, work, etc.).
- Setting up an uthantication and
- change the platform to multi-users platform
- Implement a search feature to quickly find specific items in the collection or closet.
- Allow users to upload and save their own images for shirts, pants, and shoes.
- Provide the option to share outfits on social media platforms.
- Implement a feature to suggest outfit combinations based on selected items and user preferences.


### Getting Started

To run the app locally, follow the steps below:

1. Clone the repository to your local machine using the following command:

   ```
   git clone https://github.com/romanbishof/dress-me-app.git
   ```

2. Navigate to the project directory:

   ```
   cd dress-me-app
   ```

3. Install the dependencies using your preferred package manager. If you're using npm, run:

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm start
   ```
   The app will be accessible at http://localhost:3000 in your web browser.


5. Open your web browser and visit `http://localhost:3000` to access the Closet Builder application.
