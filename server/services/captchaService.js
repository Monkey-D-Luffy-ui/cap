const { v4: uuidv4 } = require('crypto');
const { IMAGE_ASSETS, MULTIPLE_CHOICE_QUESTIONS, RIDICULOUS_CHALLENGES } = require('../utils/captchaPool');

// In-memory store for active generated challenges (captchaId -> challenge detail)
const activeCaptchas = new Map();

// Clean up challenges older than 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [id, data] of activeCaptchas.entries()) {
    if (now - data.createdAt > 30 * 60 * 1000) {
      activeCaptchas.delete(id);
    }
  }
}, 5 * 60 * 1000);

const CAPTCHA_TYPES = [
  'image_traffic',
  'image_vehicle',
  'image_animal',
  'image_object',
  'number',
  'math',
  'multiple_choice',
  'ridiculous'
];

/**
 * Generate a new random CAPTCHA challenge
 * @param {Object} options - { forceType, isDemoMode }
 */
function generateCaptcha(options = {}) {
  const captchaId = 'cap_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
  
  // Randomly select type, or use forced type
  let type = options.forceType;
  if (!type) {
    const randomIndex = Math.floor(Math.random() * CAPTCHA_TYPES.length);
    type = CAPTCHA_TYPES[randomIndex];
  }

  let challengeData = {};

  switch (type) {
    case 'image_traffic':
    case 'image_vehicle':
    case 'image_animal':
    case 'image_object': {
      const categoryMap = {
        image_traffic: { category: 'traffic', name: 'traffic lights', question: 'Select all images containing traffic lights' },
        image_vehicle: { category: 'vehicle', name: 'buses', question: 'Select all images containing buses' },
        image_animal: { category: 'animal', name: 'cats', question: 'Select all images containing cats' },
        image_object: { category: 'object', name: 'chairs', question: 'Select all images containing chairs' }
      };

      const meta = categoryMap[type];
      const targetImages = IMAGE_ASSETS.filter(img => img.category === meta.category);
      const distractors = IMAGE_ASSETS.filter(img => img.category !== meta.category && img.category !== 'ridiculous_suspicious' && img.category !== 'ridiculous_wifi' && img.category !== 'ridiculous_mc' && img.category !== 'ridiculous_judging');

      // Pick 2-3 target images
      const shuffledTargets = [...targetImages].sort(() => 0.5 - Math.random());
      const selectedTargets = shuffledTargets.slice(0, Math.min(shuffledTargets.length, 2 + Math.floor(Math.random() * 2)));
      const targetIds = selectedTargets.map(t => t.id);

      // Pick 6 - targets distractors to make a 6-tile grid (or 9-tile if specified)
      const gridSize = options.gridSize || 9;
      const neededDistractors = gridSize - selectedTargets.length;
      const shuffledDistractors = [...distractors].sort(() => 0.5 - Math.random());
      const selectedDistractors = shuffledDistractors.slice(0, neededDistractors);

      // Combine and shuffle grid tiles
      const allTiles = [...selectedTargets, ...selectedDistractors]
        .sort(() => 0.5 - Math.random())
        .map((img, idx) => ({
          tileId: `tile_${idx}_${img.id}`,
          id: img.id,
          url: img.url,
          label: img.label
        }));

      // Calculate correct tile IDs
      const correctTileIds = allTiles.filter(tile => targetIds.includes(tile.id)).map(tile => tile.tileId);

      challengeData = {
        captchaId,
        type: 'image',
        subType: type,
        question: meta.question,
        tiles: allTiles.map(t => ({ tileId: t.tileId, url: t.url, label: t.label })), // Do NOT send targetIds or correctness
        correctAnswer: correctTileIds,
        createdAt: Date.now()
      };
      break;
    }

    case 'number': {
      const num = Math.floor(10000 + Math.random() * 90000).toString();
      challengeData = {
        captchaId,
        type: 'number',
        question: 'Enter the exact numbers displayed in the image below',
        numberValue: num,
        correctAnswer: num,
        createdAt: Date.now()
      };
      break;
    }

    case 'math': {
      const a = Math.floor(10 + Math.random() * 40);
      const b = Math.floor(10 + Math.random() * 40);
      const sum = a + b;
      challengeData = {
        captchaId,
        type: 'math',
        question: `Solve the following mathematical verification equation: ${a} + ${b} = ?`,
        expression: `${a} + ${b}`,
        correctAnswer: sum.toString(),
        createdAt: Date.now()
      };
      break;
    }

    case 'multiple_choice': {
      const q = MULTIPLE_CHOICE_QUESTIONS[Math.floor(Math.random() * MULTIPLE_CHOICE_QUESTIONS.length)];
      // Shuffle options for client display
      const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());
      challengeData = {
        captchaId,
        type: 'multiple_choice',
        question: q.question,
        options: shuffledOptions,
        correctAnswer: q.correctAnswer,
        createdAt: Date.now()
      };
      break;
    }

    case 'ridiculous': {
      const r = RIDICULOUS_CHALLENGES[Math.floor(Math.random() * RIDICULOUS_CHALLENGES.length)];
      challengeData = {
        captchaId,
        type: 'ridiculous',
        question: r.question,
        options: r.options.map(opt => ({ id: opt.id, url: opt.url, label: opt.label })),
        correctAnswer: r.correctAnswer,
        createdAt: Date.now()
      };
      break;
    }
  }

  // Store in server memory
  activeCaptchas.set(captchaId, challengeData);

  // Return payload to client (STRIP correctAnswer)
  const clientPayload = { ...challengeData };
  delete clientPayload.correctAnswer;

  return clientPayload;
}

/**
 * Verify user answer against stored challenge
 * @param {string} captchaId 
 * @param {any} userAnswer 
 */
function verifyCaptcha(captchaId, userAnswer) {
  const challenge = activeCaptchas.get(captchaId);
  if (!challenge) {
    return {
      correct: false,
      message: 'CAPTCHA session expired or invalid. Please refresh verification.'
    };
  }

  let isCorrect = false;

  if (challenge.type === 'image' || challenge.type === 'ridiculous') {
    // userAnswer should be an array of selected tile IDs
    const userSelected = Array.isArray(userAnswer) ? userAnswer : [];
    const expected = challenge.correctAnswer;
    
    if (userSelected.length === expected.length) {
      const sortedUser = [...userSelected].sort();
      const sortedExpected = [...expected].sort();
      isCorrect = sortedUser.every((val, index) => val === sortedExpected[index]);
    }
  } else if (challenge.type === 'number' || challenge.type === 'math' || challenge.type === 'multiple_choice') {
    const userStr = String(userAnswer || '').trim().toLowerCase();
    const expectedStr = String(challenge.correctAnswer).trim().toLowerCase();
    isCorrect = (userStr === expectedStr);
  }

  // Remove used captchaId to prevent replay attacks
  activeCaptchas.delete(captchaId);

  return {
    correct: isCorrect,
    message: isCorrect ? 'Verification successful' : 'Verification failed. Incorrect response.'
  };
}

module.exports = {
  generateCaptcha,
  verifyCaptcha
};
