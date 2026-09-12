// Server-side CAPTCHA challenge generator data pool

const IMAGE_ASSETS = [
  // Traffic lights
  { id: 'img_traffic_1', category: 'traffic', label: 'Traffic Light Intersection', url: '/captcha/traffic/tl1.svg' },
  { id: 'img_traffic_2', category: 'traffic', label: 'Red Traffic Light', url: '/captcha/traffic/tl2.svg' },
  { id: 'img_traffic_3', category: 'traffic', label: 'Pedestrian Signal', url: '/captcha/traffic/tl3.svg' },

  // Vehicles / Buses
  { id: 'img_bus_1', category: 'vehicle', label: 'Yellow School Bus', url: '/captcha/vehicles/bus1.svg' },
  { id: 'img_bus_2', category: 'vehicle', label: 'Double Decker Bus', url: '/captcha/vehicles/bus2.svg' },
  { id: 'img_bus_3', category: 'vehicle', label: 'City Transit Bus', url: '/captcha/vehicles/bus3.svg' },

  // Animals / Cats
  { id: 'img_cat_1', category: 'animal', label: 'Orange Tabby Cat', url: '/captcha/animals/cat1.svg' },
  { id: 'img_cat_2', category: 'animal', label: 'Fluffy White Cat', url: '/captcha/animals/cat2.svg' },
  { id: 'img_cat_3', category: 'animal', label: 'Sleeping Kitten', url: '/captcha/animals/cat3.svg' },

  // Objects / Chairs
  { id: 'img_chair_1', category: 'object', label: 'Wooden Dining Chair', url: '/captcha/objects/chair1.svg' },
  { id: 'img_chair_2', category: 'object', label: 'Office Swivel Chair', url: '/captcha/objects/chair2.svg' },
  { id: 'img_chair_3', category: 'object', label: 'Modern Armchair', url: '/captcha/objects/chair3.svg' },

  // Distractors
  { id: 'img_dist_1', category: 'distractor', label: 'Fire Hydrant', url: '/captcha/distractors/hydrant.svg' },
  { id: 'img_dist_2', category: 'distractor', label: 'Bicycle', url: '/captcha/distractors/bike.svg' },
  { id: 'img_dist_3', category: 'distractor', label: 'Crosswalk', url: '/captcha/distractors/crosswalk.svg' },
  { id: 'img_dist_4', category: 'distractor', label: 'Potted Plant', url: '/captcha/distractors/plant.svg' },
  { id: 'img_dist_5', category: 'distractor', label: 'Park Bench', url: '/captcha/distractors/bench.svg' },
  { id: 'img_dist_6', category: 'distractor', label: 'Street Lamp', url: '/captcha/distractors/lamp.svg' },

  // Ridiculous images
  { id: 'img_ridic_1', category: 'ridiculous_suspicious', label: 'Toaster wearing sunglasses', url: '/captcha/ridiculous/toaster.svg' },
  { id: 'img_ridic_2', category: 'ridiculous_wifi', label: 'Smart Microwave with Antennas', url: '/captcha/ridiculous/microwave.svg' },
  { id: 'img_ridic_3', category: 'ridiculous_mc', label: 'Cat wearing a golden crown', url: '/captcha/ridiculous/cattoking.svg' },
  { id: 'img_ridic_4', category: 'ridiculous_judging', label: 'Owl glaring disapprovingly', url: '/captcha/ridiculous/owl.svg' }
];

const MULTIPLE_CHOICE_QUESTIONS = [
  {
    question: "Which one is a fruit?",
    options: ["Apple", "Chair", "Smartphone", "Electric Car"],
    correctAnswer: "Apple"
  },
  {
    question: "How many sides does a triangle have?",
    options: ["4", "3", "3.14159", "It depends on your perspective"],
    correctAnswer: "3"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Orange Juice"],
    correctAnswer: "Oxygen"
  },
  {
    question: "What color is a banana when ripe?",
    options: ["Blue", "Yellow", "Infrared", "Invisible"],
    correctAnswer: "Yellow"
  }
];

const RIDICULOUS_CHALLENGES = [
  {
    type: 'ridiculous',
    question: 'Select the object that looks most suspicious.',
    targetCategory: 'ridiculous_suspicious',
    options: [
      { id: 'r1_1', url: '/captcha/ridiculous/toaster.svg', label: 'Toaster with sunglasses' },
      { id: 'r1_2', url: '/captcha/distractors/plant.svg', label: 'Normal House Plant' },
      { id: 'r1_3', url: '/captcha/distractors/bench.svg', label: 'Park Bench' },
      { id: 'r1_4', url: '/captcha/objects/chair1.svg', label: 'Wooden Chair' }
    ],
    correctAnswer: ['r1_1']
  },
  {
    type: 'ridiculous',
    question: 'Select the object that probably has Wi-Fi.',
    targetCategory: 'ridiculous_wifi',
    options: [
      { id: 'r2_1', url: '/captcha/distractors/hydrant.svg', label: 'Fire Hydrant' },
      { id: 'r2_2', url: '/captcha/ridiculous/microwave.svg', label: 'Smart Microwave with Antennas' },
      { id: 'r2_3', url: '/captcha/animals/cat1.svg', label: 'Sleeping Cat' },
      { id: 'r2_4', url: '/captcha/traffic/tl1.svg', label: 'Traffic Light' }
    ],
    correctAnswer: ['r2_2']
  },
  {
    type: 'ridiculous',
    question: 'Which image has the strongest main-character energy?',
    targetCategory: 'ridiculous_mc',
    options: [
      { id: 'r3_1', url: '/captcha/distractors/bike.svg', label: 'Old Bicycle' },
      { id: 'r3_2', url: '/captcha/objects/chair2.svg', label: 'Swivel Chair' },
      { id: 'r3_3', url: '/captcha/ridiculous/cattoking.svg', label: 'Cat in Golden Crown' },
      { id: 'r3_4', url: '/captcha/distractors/lamp.svg', label: 'Street Lamp' }
    ],
    correctAnswer: ['r3_3']
  },
  {
    type: 'ridiculous',
    question: 'Select all objects that appear to be judging you.',
    targetCategory: 'ridiculous_judging',
    options: [
      { id: 'r4_1', url: '/captcha/ridiculous/owl.svg', label: 'Glaring Owl' },
      { id: 'r4_2', url: '/captcha/vehicles/bus1.svg', label: 'School Bus' },
      { id: 'r4_3', url: '/captcha/distractors/crosswalk.svg', label: 'Crosswalk' },
      { id: 'r4_4', url: '/captcha/traffic/tl2.svg', label: 'Red Light' }
    ],
    correctAnswer: ['r4_1']
  }
];

module.exports = {
  IMAGE_ASSETS,
  MULTIPLE_CHOICE_QUESTIONS,
  RIDICULOUS_CHALLENGES
};
