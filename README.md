# dress-me-app
app to help you choose your outfit set
<img width="1415" alt="image" src="https://github.com/romanbishof/dress-me-app/assets/76264579/3806b93e-c281-4608-9d14-729ef3dd6c1b">
# React Web App - Closet Builder

This is a README file for a React web application called "Closet Builder". The purpose of this application is to allow users to build sets of outfits by selecting shirts, pants, and shoes, and store them in their personal zone, known as the closet. Users can then view, edit, and remove their created sets from the closet.

## Getting Started

To run the Closet Builder web application locally, follow the steps below:

1. Clone the repository to your local machine using the following command:

   ```
   git clone https://github.com/your-username/closet-builder.git
   ```

2. Navigate to the project directory:

   ```
   cd closet-builder
   ```

3. Install the dependencies using your preferred package manager. If you're using npm, run:

   ```
   npm install
   ```

   If you're using Yarn, run:

   ```
   yarn install
   ```

4. Start the development server:

   ```
   npm start
   ```

   or

   ```
   yarn start
   ```

5. Open your web browser and visit `http://localhost:3000` to access the Closet Builder application.

## Features

### 1. Build Outfits

The main feature of the Closet Builder application is the ability to build sets of outfits. Users can select shirts, pants, and shoes from a predefined collection or add their own items. The selection process is intuitive and user-friendly.

### 2. Personal Zone (Closet)

The Closet feature allows users to store their created outfit sets in their personal zone. Each user has their own closet where they can view, edit, and remove their outfits. The outfits in the closet are persistent, meaning they will be available even after refreshing the page or closing the browser.

### 3. User Authentication

The application includes a user authentication system that allows users to create an account or log in with their existing credentials. User authentication ensures that each user has their own personal closet and can only access their own outfits.

### 4. Responsive Design

The Closet Builder application is designed to be responsive, providing an optimal user experience on both desktop and mobile devices. The interface adapts to different screen sizes, making it easy to use and navigate on any device.

## Technologies Used

The Closet Builder application is built using the following technologies:

- React: JavaScript library for building user interfaces.
- React Router: Library for handling routing in the React application.
- Firebase: Backend-as-a-Service (BaaS) platform used for authentication and data storage.
- CSS: Cascading Style Sheets for styling the application.
- HTML: Hypertext Markup Language for structuring the application.

## Folder Structure

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

## Further Improvements

Here are some potential improvements that can be made to enhance the Closet Builder application:

- Add the ability for users to categorize their outfits (e.g., formal, casual, work, etc.).
- Implement a search feature to quickly find specific items in the collection or closet.
- Allow users to upload and save their own images for shirts, pants, and shoes.
- Provide the option to share outfits on social media platforms.
- Implement a feature to suggest outfit combinations based on selected items and user preferences.

## Contributing

Contributions to the Closet Builder application are welcome. If you encounter any issues or have ideas for improvements, feel free to open an issue or submit a pull request on the GitHub repository.

## License

The Closet Builder application is released under the [MIT License](https://opensource.org/licenses/MIT).
