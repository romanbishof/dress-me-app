# React Web App - Dress Me App
The best app to help you build a sets from your messd up closet, and forget about spending time on "what to wear" question
<img width="1438" alt="image" src="https://github.com/romanbishof/dress-me-app/assets/76264579/6e690531-5001-492f-8d12-a5063bbe09e9">


## Features

### Build Outfits

The main feature of the application is the ability to build sets of outfits. In this app the user can select shirts, pants, and shoes, and build himself a set - that will be stored in a personal zone. 

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

## The Algorithm

### Match me the size

Based on the user decision the app compare the chosen item feature with sizing characteristics, the devision to different sizes was made using the sizing models at the market nowdays. 

<img width="638" alt="image" src="https://github.com/romanbishof/dress-me-app/assets/76264579/9bfaae50-a216-4b36-9ba0-b480b38a5f9d">
<img width="785" alt="image" src="https://github.com/romanbishof/dress-me-app/assets/76264579/ad2b08e4-7d32-4daf-9604-3fb4139ec110">


After the revision of the sizes in the market, and based on the fact that right now the app not basing it's suggestions on the gender of the person that builds the outfit - the division of the sizes has been done this way (based on the given data):
<img width="707" alt="image" src="https://github.com/romanbishof/dress-me-app/assets/76264579/9decc007-efdb-48f1-8d5b-d7817e5e4f36">

when the user chosing his first item: shoes, shirt or pants - the algorithm getting the item size and categorize the sizing group of the user - 
small, avarage or large. 
for example - as you understand from the image: small for shirts of size S, shoes smaller than 38 and pants smaller than 38.
each sizing catagory has it's sizing chart, and when users category defind, the algorithm filtering the items - so only relevant sizes will be displayed to this user. 

` example: `
The user choses a pents size 48 - in our algorithm the category of this size is "large",

<img width="442" alt="image" src="https://github.com/romanbishof/dress-me-app/assets/76264579/47f22a7b-fc6e-406e-97ae-980c22f85091">

` result ` 
At the next step, the algorithm suggest's him a shoues from the same category, in this case, size 45.
<img width="420" alt="image" src="https://github.com/romanbishof/dress-me-app/assets/76264579/912a065b-b9e3-433c-a6d2-7ff4cdb3331e">


### Match me the color



# To be developed

- Giving  the ability for users to categorize their outfits (e.g., formal, casual, work, etc.).
- Gendering
- Setting up an uthantication and
- change the platform to multi-users platform
- Implement a search feature to quickly find specific items in the collection or closet.
- Allow users to upload and save their own images for shirts, pants, and shoes.
- Provide the option to share outfits on social media platforms.
- Implement a feature to suggest outfit combinations based on selected items and user preferences.


## Getting Started

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
