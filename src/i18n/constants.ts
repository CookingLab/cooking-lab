// Constants for introduction message
export const COOKING_LAB_TITLE = 'Welcome to CookingLab!';
export const COOKING_LAB_MOTTO = 'Experiment new flavors!';
export const COOKING_LAB_WELCOME = 'Welcome to CookingLab! Discover a recipe and new dishes to try. Let\'s make cooking fun and easy!';
export const COOKING_LAB_OBJECTIVE = 'Our objective is to help you find a recipe that suits your taste and dietary needs.';
export const HOME_GET_STARTED_BTN = 'Get started!';
export const RESTART = 'Restart';
export const CLEAR = 'Clear';
export const QUICK_RECIPE = 'Quick Recipe';

// Debug constants
export const DEBUG = 'Debug Tool';
export const STEP1 = 'Step 1';
export const STEP2 = 'Step 2';
export const STEP3 = 'Step 3';
export const STEP4 = 'Step 4';
export const SUMMARY = 'Summary Page';
export const RECIPE = 'Recipe Page';
export const ERROR_RECIPE = 'Error Recipe';
export const SORRY_MSG = 'Sorry for the delay';
export const FIRST_RECIPE_DELAY_MESSAGE = 'The first generated recipe may take more time than expected.';
export const ENDPOINT_SELECTOR = 'Backend endpoint';
export const LOCAL = 'Local';
export const PROD = 'Prod';

// NavBar constants
export const RECIPE_GENERATOR = 'Recipe generator';
export const PERSONAL_RECIPE = 'Our personal recipes';
export const SAVED_RECIPES = 'Saved Recipes';
export const GENERATE_TXT = 'Download recipes to a PDF file';

// Footer constants
export const COPYRIGHT = '© Copyright 2024 Cooking Lab - ALL RIGHTS RESERVED';
export const TML = 'The Minh Luong';
export const TML_LINK = 'https://tml-portfolio.netlify.app/';
export const TC = 'Tien Chung';
export const TC_LINK = 'https://tien-chung.netlify.app/Home';
export const PROVIDER = 'Edamam API';
export const POWERED_BY = 'Powered by: ';
export const POWERED_BY_LINK = 'https://www.edamam.com/';

// Step1 constants
export const STEP1_TITLE = 'Step 1: Choose the Cooking Cuisine';
export const STEP1_DESCRIPTION = 'Select a cuisine you would like to cook.';
export const STEP1_RANDOM = 'Choose for me!';
export const STEP1_CUISINES = ['american','asian','british','caribbean','central europe','chinese','eastern europe','french', 'greek', 'indian', 'italian', 'japanese', 'korean', 'kosher', 'mediterranean', 'mexican', 'middle eastern', 'nordic', 'south american', 'south east asian', 'world'];

// Step2 constants
export const STEP2_TITLE = 'Step 2: Select a meal to make';
export const STEP2_DESCRIPTION = 'What meal are you trying to make?';
export const STEP2_BREAKFAST = 'Breakfast';
export const STEP2_BRUNCH = 'Brunch';
export const STEP2_LUNCH = 'Lunch';
export const STEP2_DINNER = 'Dinner';
export const STEP2_SNACK = 'Snack';
export const STEP2_TEATIME = 'Teatime';
export const DESSERT = 'Desserts';
export const MEAL_TYPES = [
  { type: 'breakfast', label: STEP2_BREAKFAST },
  { type: 'brunch', label: STEP2_BRUNCH },
  { type: 'lunch', label: STEP2_LUNCH },
  { type: 'dinner', label: STEP2_DINNER },
  { type: 'snack', label: STEP2_SNACK },
  { type: 'teatime', label: STEP2_TEATIME },
  { type: 'desserts', label: DESSERT }
];
export const MEAT_DROPDOWN = 'Choose a protein (optional)';
export const MEAT_VALUES = ['Chicken', 'Pork', 'Beef', 'Fish'];

// Step3 constants
export const STEP3_TITLE = 'Step 3: Select Diet(s)';
export const STEP_OPTIONAL = '(This step is optional)';
export const STEP3_SELECT_LABEL = 'Choose one or many diets:';
export const STEP3_DROPDOWN = 'Diets';
export const STEP3_DIETS = ['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium'];

// Step4 constants
export const STEP4_TITLE = 'Step 4: Select Food Restrictions';
export const STEP4_DESCRIPTION = 'Do you have any food restrictions? (This step is optional)';
export const STEP4_DROPDOWN = 'Choose one or many allergies or restrictions:';
export const STEP4_DROPDOWN_ALLERGIES = 'Allergies';
export const STEP4_DROPDOWN_RESTRICTIONS = 'Restrictions';
export const STEP4_ALLERGIES = [
  'celery-free', 'crustacean-free', 'dairy-free', 'egg-free', 'fish-free',
  'gluten-free', 'lupine-free', 'mollusk-free', 'mustard-free', 'peanut-free',
  'sesame-free', 'shellfish-free', 'soy-free', 'sulfite-free', 'tree-nut-free', 
  'wheat-free'
];
export const STEP4_RESTRICTIONS = [
  'alcohol-cocktail', 'alcohol-free', 'DASH', 'fodmap-free', 'immuno-supportive', 
  'keto-friendly', 'kidney-friendly', 'kosher', 'low-fat-abs', 'low-potassium', 
  'low-sugar', 'Mediterranean', 'no-oil-added', 'paleo', 'pescatarian', 
  'pork-free', 'red-meat-free', 'sugar-conscious', 'vegan', 'vegetarian'
];

// SummaryPage constants
export const SUMMARY_TITLE = 'Summary';
export const SUMMARY_DESCRIPTION = 'You can still edit the information below.';
export const SUMMARY_STEP1 = 'Step 1';
export const SUMMARY_STEP2 = 'Step 2';
export const SUMMARY_STEP3 = 'Step 3';
export const SUMMARY_STEP4 = 'Step 4';
export const SUMMARY_GET_RECIPE = 'Get Recipe';
export const SUMMARY_STEP1_LABEL = 'Selected cuisine: ';
export const SUMMARY_STEP2_LABEL = 'Selected meal type: ';
export const SUMMARY_STEP2_LABEL_MEAT = 'Selected protein: ';
export const SUMMARY_STEP3_LABEL = 'Selected diets: ';
export const SUMMARY_STEP4_LABEL = 'Selected food restrictions: ';
export const SUMMARY_EDIT = 'Edit';
export const SUMMARY_NONE = 'Not selected';

// RecipePage constants
export const RECIPE_INGREDIENT = 'Ingredients';
export const RECIPE_LINK = 'Recipe here:';
export const RECIPE_LOADER = 'Loading Recipe';
export const RECIPE_LOADING = 'Loading...';
export const RECIPE_ERROR_TITLE = 'Error fetching recipe';
export const RECIPE_ERROR_MESSAGE = 'It looks like there was an error fetching the recipe. Please try again later.';
export const RECIPE_ERROR_SUB_MESSAGE = 'Click the back button to change your selections.';
export const RECIPE_GENERATE = 'Generate another recipe';
export const SAVE_RECIPE = 'Save this recipe';

// PersonalRecipes constants
export const PERSONAL_RECIPES_TITLE = 'Our Recipes';
export const PERSONAL_RECIPES_MSG = 'Check out our recipes below! Click on a recipe to view more details.';
export const TC_RECIPE = 'Tien\'s Recipes';
export const TM_RECIPE = 'The Minh\'s Recipes';
export const RECIPE_INSTRUCTIONS = 'Instructions';

// PersonalRecipePage constants
export const NO_RESPONSE_500 = 'No response received from server';
export const ERROR_500 = 'An error occurred';

// Saved Recipes
export const SAVED_RECIPES_TITLE = 'Saved Recipes';
export const SAVED_RECIPES_MSG = 'Click on a recipe to view it.';
export const NO_SAVED_RECIPES = 'No saved recipes yet.';

// Modal constants
export const MODAL_TITLE = 'No recipes saved';
export const MODAL_TEXT = 'Please save some recipes before generating a file.';
export const MODAL_CLOSE = 'Close';
export const SAVED_MODAL_TITLE = 'Recipe saved!';
export const SAVED_MODAL_TEXT = 'Your recipe has been saved successfully!';
export const ALREADY_SAVED_MODAL_TITLE = 'Recipe already saved!';
export const ALREADY_SAVED_MODAL_TEXT = 'This recipe is already saved.';
