// Retro Sound Effects using Web Audio API
function playRetroSound(type = 'click') {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different sound types for different interactions
    switch(type) {
      case 'click':
        // Short beep for regular clicks
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
      case 'select':
        // Slightly higher beep for option selection
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
        break;
      case 'confirm':
        // Two-tone beep for confirmations
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.12, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.08);
        
        // Second tone
        setTimeout(() => {
          const osc2 = audioContext.createOscillator();
          const gain2 = audioContext.createGain();
          osc2.connect(gain2);
          gain2.connect(audioContext.destination);
          osc2.frequency.setValueAtTime(800, audioContext.currentTime);
          osc2.type = 'square';
          gain2.gain.setValueAtTime(0.12, audioContext.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
          osc2.start(audioContext.currentTime);
          osc2.stop(audioContext.currentTime + 0.08);
        }, 80);
        break;
      default:
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
  } catch (e) {
    // Silently fail if audio context is not available
    console.log('Audio not available');
  }
}

// Typing Animation Function
function typeText(element, text, speed = 30, callback = null) {
  element.textContent = '';
  element.classList.add('typing');
  let i = 0;
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.classList.remove('typing');
      if (callback) callback();
    }
  }
  
  type();
}

// NODES object - DO NOT MODIFY
const NODES = {
  // =========================
  // SCENARIO 1: TAXI IN DOHA
  // =========================

  "taxi_1": {
    id: "taxi_1",
    scenario: "You just went shopping for an arabic cologne and now you're taking a taxi in Doha ",
    chronotope: "Everyday service encounter",
    location: "Doha, Qatar",
    context:
      "You get into a taxi. The driver glances at you and seems to assume you might speak Arabic based on how you look.",
    prompt: 'Driver: "Salam alaikum"',
    options: [
      {
        id: "taxi_1A",
        text: 'You: "Wa alaikum salam! I\'m good, How are you?"',
        npcReply: 'Driver: "Good, good. Where you going today, my friend?"',
        feedback:
          "You echoed the greeting and used a familiar religious phrase. Even in English, those small cues are read as enoughness. The driver now treats you as someone who fits his expected interaction frame.",
        nextId: "taxi_2A",
        isAligned: true
      },
      {
        id: "taxi_1B",
        text:
          'You: "Hey! Sorry, I don\'t speak Arabic."',
        npcReply: 'Driver: "Ah, okay, no problem! Where do you want to go?"',
        feedback:
          "You gently refused the identity the driver projected onto you and renegotiated the chronotope into an English-speaking frame. This is still polite but pushes back on the initial categorization.",
        nextId: "taxi_2B",
        isAligned: true
      }
    ]
  },

  "taxi_2A": {
    id: "taxi_2A",
    scenario: "Taxi in Doha",
    chronotope: "Everyday service encounter",
    location: "Doha, Qatar",
    context: "You're driving along the highway.",
    prompt: 'Driver: "So, you live here or just visiting?"',
    options: [
      {
        id: "taxi_2A1",
        text: 'You: "I live here. Been here a while."',
        npcReply: 'Driver: "Mashallah, nice. You know the city very well then!"',
        feedback:
          "You keep feeding the same identity the driver assigned you. You show consistent signs that confirm his reading, which stabilizes the chronotope as local-ish and familiar.",
        nextId: null,
        isAligned: true
      },
      {
        id: "taxi_2A2",
        text:
          'You: "Actually, I don\'t really live here, I just know a few phrases. I\'m still figuring things out."',
        npcReply: 'Driver: "Ah, okay, okay. No problem, I help you. Where you from?"',
        feedback:
          "You reveal that the initial interpretation was partly wrong. This shows how thin identity signals can mislead, even though they were enough to trigger the first assumption.",
        nextId: null,
        isAligned: true
      }
    ]
  },

  "taxi_2B": {
    id: "taxi_2B",
    scenario: "Taxi in Doha",
    chronotope: "Everyday service encounter",
    location: "Doha, Qatar",
    context: "You're now speaking in English comfortably.",
    prompt: 'Driver: "Where are you from? You look like maybe from this region."',
    options: [
      {
        id: "taxi_2B1",
        text:
          'You: "Yeah, I get that a lot. My background is Turkish, but I grew up elsewhere."',
        npcReply:
          'Driver: "Ah, I see, I see. World is small now, many stories like this."',
        feedback:
          "You treat the assumption as understandable and use it to explain a more complex identity story. This highlights how chronotopes rely on quick stereotypes, but people are more layered.",
        nextId: null,
        isAligned: true
      },
      {
        id: "taxi_2B2",
        text: 'You: "Does it matter? I just want to get to my destination."',
        npcReply: 'Driver: "Okay, no problem."',
        feedback:
          "You reject the question and shut down small talk. That's your right, but within this chronotope, it is read as cold or hostile, shifting the ride to a distant, transactional mode.",
        nextId: null,
        isAligned: false
      }
    ]
  },

  // =========================
  // SCENARIO 2: NEW YORK STREET
  // =========================

  "ny_1": {
    id: "ny_1",
    scenario: "New York Sidewalk",
    chronotope: "Fast, low-context urban public space",
    location: "Manhattan, New York, USA",
    context:
      "You're walking down a crowded Manhattan sidewalk at rush hour. Everyone is moving quickly.",
    prompt:
      "You accidentally bump someone's shoulder. The person turns briefly toward you.",
    options: [
      {
        id: "ny_1A",
        text: 'You: "Sorry." *you keep walking without breaking stride*',
        npcReply: 'Stranger: *keeps going*',
        feedback:
          "You follow the compressed, efficient script: brief apology, no drama, no slowing traffic. Here, you read the chronotopic expecatiton is about being light and fast.",
        nextId: "ny_2A",
        isAligned: true
      },
      {
        id: "ny_1B",
        text:
          'You: "Oh my God, I\'m so sorry! I didn\'t see you there, what\'s your name?"',
        npcReply: 'Stranger: "Yeah… it\'s fine." *walks away*',
        feedback:
          "Your English is polite, but too big for this space. In this chronotope, over apology and unrelated question feel out of place.",
        nextId: "ny_2B",
        isAligned: false
      }
    ]
  },

  "ny_2A": {
    id: "ny_2A",
    scenario: "New York Sidewalk",
    chronotope: "Fast, low-context urban public space",
    location: "Manhattan, New York, USA",
    context: "A block later, someone bumps into you harder and says nothing.",
    prompt: "Another stranger hits your shoulder and keeps walking without looking back.",
    options: [
      {
        id: "ny_2A1",
        text:
          'You: *briefly glance, keep walking, mutter to yourself* "Whatever."',
        npcReply: "",
        feedback:
          "You fully adapt: you let the small aggression slide and prioritize flow. In this chronotope, not every contact deserves a scene.",
        nextId: null,
        isAligned: true
      },
      {
        id: "ny_2A2",
        text: 'You: "Hey! You bumped into me!"',
        npcReply: "The stranger doesn't turn around.",
        feedback:
          "You try to enforce a different norm (mutual repair, face-to-face resolution) in a space that often ignores that. You feel more wronged, but the environment does not respond.",
        nextId: null,
        isAligned: false
      }
    ]
  },

  "ny_2B": {
    id: "ny_2B",
    scenario: "New York Sidewalk",
    chronotope: "Fast, low-context urban public space",
    location: "Manhattan, New York, USA",
    context:
      "You've just over reacted. You still feel awkward. A friend walking with you notices.",
    prompt: 'Friend: "You okay? That was… a bit weird."',
    options: [
      {
        id: "ny_2B1",
        text:
          'You: "Yeah, I guess I overreacted. People don\'t really stop here, do they?"',
        npcReply: 'Friend: "Exactly. Just a quick \'sorry\' and keep moving."',
        feedback:
          "You explicitly recognize the chronotopic rule and start to recalibrate. You're learning the local enoughness level.",
        nextId: null,
        isAligned: true
      },
      {
        id: "ny_2B2",
        text:
          'You: "I just think it\'s basic respect to check if someone\'s okay."',
        npcReply: 'Friend: "Yeah, but this is New York. People don\'t have time for that."',
        feedback:
          "You hold onto your original norm. This creates a clash and shows how your idea of respect doesn't match this chronotope.",
        nextId: null,
        isAligned: false
      }
    ]
  },

  // =========================
  // SCENARIO 3: SLOW COASTAL TOWN
  // =========================

  "slow_1": {
    id: "slow_1",
    scenario: "Slow Coastal Town Street",
    chronotope: "Slow-paced, relational small town space",
    location: "Small coastal town",
    context:
      "You're walking through a narrow street in a quiet coastal town. People move more slowly and make eye contact.",
    prompt:
      "You bump into a local person while turning a corner. They stumble a little and look at you.",
    options: [
      {
        id: "slow_1A",
        text: 'You: "Sorry." *you keep walking without stopping*',
        npcReply: 'Local: "Okay…?" *watches you walk off*',
        feedback:
          "The same brief apology that works in New York feels cold here. In this chronotope, enoughness includes stopping, checking in, and maybe exchanging a few words.",
        nextId: "slow_2A",
        isAligned: false
      },
      {
        id: "slow_1B",
        text: 'You: "Oh, sorry! Are you okay?" *you stop and look at them*',
        npcReply:
          'Local: "Yes, yes, I\'m fine. These streets are small, it happens."',
        feedback:
          "You match the local rhythm: pause, eye contact, mild small talk. This is read as respectful and human, not overdramatic.",
        nextId: "slow_2B",
        isAligned: true
      }
    ]
  },

  "slow_2A": {
    id: "slow_2A",
    scenario: "Slow Coastal Town Street",
    chronotope: "Slow-paced, relational small town space",
    location: "Small coastal town",
    context:
      "You kept walking. A friend from the town is with you and saw the interaction.",
    prompt: 'Friend: "You didn\'t even stop. That looked a bit rude."',
    options: [
      {
        id: "slow_2A1",
        text:
          'You: "Oh, do people usually stop and talk more here? I\'m used to just saying sorry and moving on."',
        npcReply:
          'Friend: "Yeah, here we usually check in. People like to feel seen."',
        feedback:
          "You realize that your imported script from another chronotope doesn't fit. You show willingness to adapt, which is key to understanding chronotopes.",
        nextId: null,
        isAligned: true
      },
      {
        id: "slow_2A2",
        text: 'You: "I said sorry, that should be enough anywhere."',
        npcReply:
          'Friend: "I mean… people might think you\'re cold."',
        feedback:
          "You insist that one script should work everywhere, denying how context shapes norms. This is a kind of chronotope blindness.",
        nextId: null,
        isAligned: false
      }
    ]
  },

  "slow_2B": {
    id: "slow_2B",
    scenario: "Slow Coastal Town Street",
    chronotope: "Slow-paced, relational small town space",
    location: "Small coastal town",
    context:
      "You stopped and checked in. The local seems more relaxed and curious.",
    prompt: 'Local: "Where are you from? I don\'t think I\'ve seen you here before."',
    options: [
      {
        id: "slow_2B1",
        text:
          'You: "I\'m just visiting for a few days. It\'s really peaceful here."',
        npcReply:
          'Local: "Welcome. Enjoy your stay."',
        feedback:
          "You accept the invitation to relational small talk without going overboard. This fits a local norm where even small collisions can turn into short, friendly exchanges.",
        nextId: null,
        isAligned: true
      },
      {
        id: "slow_2B2",
        text:
          'You: "Oh, just visiting. Anyway, have a good day." *you turn and leave quickly*',
        npcReply:
          'Local: "Okay… you too."',
        feedback:
          "You stop the interaction as soon as it turns personal. In this chronotope, that choice can be read as disinterest, even though your words are polite.",
        nextId: null,
        isAligned: false
      }
    ]
  },

  // =========================
  // SCENARIO 4: PARIS CAFÉ
  // =========================

  "paris_1": {
    id: "paris_1",
    scenario: "Busy Paris Café",
    chronotope: "Ritualized public politeness",
    location: "Paris, France",
    context:
      "It's lunchtime in a crowded Paris cafe. People stand in a short line to order at the counter.",
    prompt:
      "You reach the counter. The barista looks at you, waiting for your order.",
    options: [
      {
        id: "paris_1A",
        text: 'You: "Hi, Can I please have a macchiato frappucino?"',
        npcReply: 'Barista: "Of course. Anything else for you?"',
        feedback:
          "You start with a greeting and use 'please,' which fits the local expectation that you acknowledge the other person before requesting something.",
        nextId: "paris_2A",
        isAligned: true
      },
      {
        id: "paris_1B",
        text: 'You: "Coffee. Medium."',
        npcReply: 'Barista: "Okay." *tone is noticeably cooler*',
        feedback:
          "Your order is grammatically fine, but you skip the politeness. In this chronotope, that's read as abrupt or mildly rude.",
        nextId: "paris_2B",
        isAligned: false
      }
    ]
  },

  "paris_2A": {
    id: "paris_2A",
    scenario: "Busy Paris Café",
    chronotope: "Ritualized public politeness",
    location: "Paris, France",
    context:
      "You've ordered politely. The barista is preparing your drink while others queue behind you.",
    prompt:
      'Barista: "You can sit, I will bring it to your table. Name for the order?"',
    options: [
      {
        id: "paris_2A1",
        text: 'You: "It\'s Enkhmend. Thank you so much."',
        npcReply: 'Barista: "Thanks. It will be just a moment."',
        feedback:
          "You keep the tone light and appreciative without slowing the line. You remain inside the polite, efficient script of this chronotope.",
        nextId: null,
        isAligned: true
      },
      {
        id: "paris_2A2",
        text:
          'You: "Why do you need my name? I\'ll just wait here." *you block the counter*',
        npcReply:
          'Barista: "It\'s easier for us. Please step to the side"',
        feedback:
          "You push against a small local norm meant to keep things organized. It makes you stand out as someone who resists the expected flow.",
        nextId: null,
        isAligned: false
      }
    ]
  },

  "paris_2B": {
    id: "paris_2B",
    scenario: "Busy Paris Café",
    chronotope: "Ritualized public politeness",
    location: "Paris, France",
    context:
      "You gave a very direct order. The barista is making your coffee in silence.",
    prompt:
      "You notice the barista seems distant. You're not sure if you did something wrong.",
    options: [
      {
        id: "paris_2B1",
        text:
          'You: "Sorry, I\'m not from here. I should have said hello first. Could I also get a croissant, please?"',
        npcReply:
          'Barista: *smiles a little* "No problem. One croissant. Anything else?"',
        feedback:
          "You repair the interaction by acknowledging the missed politeness move and adjusting. You show you're willing to learn the local script.",
        nextId: null,
        isAligned: true
      },
      {
        id: "paris_2B2",
        text:
          'You: "Why is everyone here so serious? I just ordered coffee."',
        npcReply:
          'Barista: "Your coffee will be ready soon." *tone remains cold*',
        feedback:
          "You interpret the situation only through your own norm and dismiss the local one. This widens the distance and reinforces the sense of cultural clash.",
        nextId: null,
        isAligned: false
      }
    ]
  },

  // =========================
  // SCENARIO 5: TOKYO KONBINI
  // =========================

  "konbini_1": {
    id: "konbini_1",
    scenario: "Tokyo Convenience Store",
    chronotope: "Hyper-efficient, scripted service interaction",
    location: "Tokyo, Japan",
    context:
      "You are at the counter of a small convenience store. There's a short line behind you.",
    prompt:
      "The cashier has scanned your items and told you the total. They look up, waiting for payment.",
    options: [
      {
        id: "konbini_1A",
        text:
          'You: "Okay." *you pay, then say* "Thank you."',
        npcReply: 'Cashier: "Thank you." *gives a small nod*',
        feedback:
          "You keep the interaction simple and efficient, matching the scripted, low-small-talk nature of this chronotope.",
        nextId: "konbini_2A",
        isAligned: true
      },
      {
        id: "konbini_1B",
        text:
          'You: "Hey, how\'s your day going? Has it been busy?"',
        npcReply:
          'Cashier: *looks slightly surprised* "It\'s okay. Do you need a bag?"',
        feedback:
          "Your attempt at small talk is friendly in some cultures, but here it disrupts a tightly scripted, fast-paced interaction.",
        nextId: "konbini_2B",
        isAligned: false
      }
    ]
  },

  "konbini_2A": {
    id: "konbini_2A",
    scenario: "Tokyo Convenience Store",
    chronotope: "Hyper-efficient, scripted service interaction",
    location: "Tokyo, Japan",
    context:
      "You've paid and received your items. The interaction has been smooth and quick.",
    prompt:
      "You're about to leave the counter.",
    options: [
      {
        id: "konbini_2A1",
        text:
          'You: *give a small nod* "Thanks." *you step aside to pack your things*',
        npcReply: "",
        feedback:
          "You exit the interaction cleanly and make space for the next customer. This respects both the pace and the physical space of the chronotope.",
        nextId: null,
        isAligned: true
      },
      {
        id: "konbini_2A2",
        text:
          'You: *stay at the counter, slowly organizing your bag while others wait behind you*',
        npcReply: "",
        feedback:
          "You hold the front of the line while organizing your things. Even without words, this clashes with the expectation of quick turnover.",
        nextId: null,
        isAligned: false
      }
    ]
  },

  "konbini_2B": {
    id: "konbini_2B",
    scenario: "Tokyo Convenience Store",
    chronotope: "Hyper-efficient, scripted service interaction",
    location: "Tokyo, Japan",
    context:
      "You tried to start small talk. The cashier responded briefly, but the interaction feels a bit awkward.",
    prompt:
      "You sense some awkwardness and notice people waiting behind you.",
    options: [
      {
        id: "konbini_2B1",
        text:
          'You: "Ah, sorry, I\'ll just pay. Thank you." *you pay quickly and step aside*',
        npcReply: "",
        feedback:
          "You adjust by prioritizing speed and efficiency. You show you're willing to fit into the local rhythm once you notice the mismatch.",
        nextId: null,
        isAligned: true
      },
      {
        id: "konbini_2B2",
        text:
          'You: "You seem busy. People here don\'t really talk much, huh?" *you linger at the counter*',
        npcReply: "",
        feedback:
          "You comment on the norm while still holding up the line. This not only keeps you out of sync with the chronotope, it also adds social pressure for everyone involved.",
        nextId: null,
        isAligned: false
      }
    ]
  }
};

// State management
let currentNodeId = null;
let selectedOption = null;
let choiceHistory = []; // Track choices to count aligned vs misaligned

// DOM Elements
const views = {
  landing: document.getElementById('landing'),
  node: document.getElementById('node'),
  feedback: document.getElementById('feedback'),
  end: document.getElementById('end')
};

// Starting node IDs for each scenario
const START_NODES = {
  "You just went shopping for an arabic cologne and now you're taking a taxi in Doha ": "taxi_1",
  "New York Sidewalk": "ny_1",
  "Slow Coastal Town Street": "slow_1",
  "Busy Paris Café": "paris_1",
  "Tokyo Convenience Store": "konbini_1"
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  // Add typing animation to landing page description
  const descriptionEl = document.querySelector('.description');
  if (descriptionEl) {
    const originalText = descriptionEl.textContent;
    descriptionEl.textContent = '';
    typeText(descriptionEl, originalText, 20);
  }
  
  initializeScenarioSelection();
  
  const continueBtn = document.getElementById('continueBtn');
  const restartBtn = document.getElementById('restartBtn');
  
  continueBtn.addEventListener('click', () => {
    playRetroSound('confirm');
    continueToNext();
  });
  restartBtn.addEventListener('click', () => {
    playRetroSound('click');
    restartSimulation();
  });
  
  // Add sound to all existing buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
      // Only play sound if it's not already handled above
      if (!e.target.classList.contains('btn-scenario') && 
          !e.target.classList.contains('btn-option') &&
          e.target.id !== 'continueBtn' &&
          e.target.id !== 'restartBtn') {
        playRetroSound('click');
      }
    }
  });
});

/**
 * Initialize the scenario selection screen
 */
function initializeScenarioSelection() {
  const scenarioButtons = document.getElementById('scenarioButtons');
  if (!scenarioButtons) {
    console.error('scenarioButtons element not found!');
    return;
  }
  
  scenarioButtons.innerHTML = '';
  
  // Get unique scenarios from NODES
  const scenarios = new Set();
  Object.values(NODES).forEach(node => {
    scenarios.add(node.scenario);
  });
  
  // Create buttons for each scenario
  Array.from(scenarios).forEach(scenarioName => {
    const button = document.createElement('button');
    button.className = 'btn btn-scenario';
    button.textContent = scenarioName;
    button.addEventListener('click', () => {
      playRetroSound('select');
      const startNodeId = START_NODES[scenarioName];
      if (startNodeId) {
        startScenario(startNodeId);
      } else {
        console.error('No start node found for scenario:', scenarioName);
      }
    });
    scenarioButtons.appendChild(button);
  });
}

/**
 * Start a scenario from a given node ID
 * @param {string} nodeId - The starting node ID
 */
function startScenario(nodeId) {
  currentNodeId = nodeId;
  selectedOption = null;
  choiceHistory = [];
  renderNode(nodeId);
}

/**
 * Render a node by ID
 * @param {string} nodeId - The node ID to render
 */
function renderNode(nodeId) {
  const node = NODES[nodeId];
  
  if (!node) {
    showEndScreen();
    return;
  }

  // Update header section with typing animation
  const scenarioNameEl = document.getElementById('scenarioName');
  const chronotopeEl = document.getElementById('chronotopeLabel');
  const locationEl = document.getElementById('locationLabel');
  const contextEl = document.getElementById('contextText');
  const promptEl = document.getElementById('promptText');
  
  typeText(scenarioNameEl, node.scenario, 20);
  setTimeout(() => typeText(chronotopeEl, node.chronotope, 20), 200);
  setTimeout(() => typeText(locationEl, node.location, 20), 400);
  setTimeout(() => typeText(contextEl, node.context, 15), 600);
  setTimeout(() => typeText(promptEl, node.prompt, 15), 1000);

  // Clear and populate options
  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';

  // Create option buttons
  node.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'btn btn-option';
    button.textContent = option.text;
    button.addEventListener('click', () => {
      playRetroSound('select');
      handleOptionSelect(option);
    });
    optionsContainer.appendChild(button);
  });

  // Show node view
  showView('node');
}

/**
 * Handle option selection
 * @param {object} option - The selected option object
 */
function handleOptionSelect(option) {
  // Track the choice (aligned or misaligned)
  choiceHistory.push({
    isAligned: option.isAligned,
    optionId: option.id
  });

  // Store the selected option and its nextId
  selectedOption = option;

  // Update feedback view header with typing animation
  const node = NODES[currentNodeId];
  const feedbackScenarioEl = document.getElementById('feedbackScenarioName');
  const feedbackChronotopeEl = document.getElementById('feedbackChronotopeLabel');
  const feedbackLocationEl = document.getElementById('feedbackLocationLabel');
  const npcReplyEl = document.getElementById('npcReply');
  const feedbackTextEl = document.getElementById('feedbackText');
  
  typeText(feedbackScenarioEl, node.scenario, 20);
  setTimeout(() => typeText(feedbackChronotopeEl, node.chronotope, 20), 200);
  setTimeout(() => typeText(feedbackLocationEl, node.location, 20), 400);
  
  // Show NPC reply and feedback with typing animation
  if (option.npcReply && option.npcReply.trim() !== '') {
    npcReplyEl.style.display = 'block';
    setTimeout(() => typeText(npcReplyEl, option.npcReply, 15), 600);
    setTimeout(() => typeText(feedbackTextEl, option.feedback, 15), 1200);
  } else {
    npcReplyEl.style.display = 'none';
    setTimeout(() => typeText(feedbackTextEl, option.feedback, 15), 600);
  }

  // Show feedback view
  showView('feedback');
}

/**
 * Continue to the next node or show end screen
 */
function continueToNext() {
  if (!selectedOption) {
    return;
  }

  if (selectedOption.nextId === null) {
    showEndScreen();
  } else {
    currentNodeId = selectedOption.nextId;
    selectedOption = null;
    renderNode(currentNodeId);
  }
}

/**
 * Show the end screen with summary and stats
 */
function showEndScreen() {
  // Count aligned vs misaligned choices
  let alignedCount = 0;
  let misalignedCount = 0;

  choiceHistory.forEach(choice => {
    if (choice.isAligned) {
      alignedCount++;
    } else {
      misalignedCount++;
    }
  });

  // Update summary stats
  const statsEl = document.getElementById('summaryStats');
  statsEl.innerHTML = `
    <ul>
      <li><strong>Aligned choices:</strong> ${alignedCount}</li>
      <li><strong>Misaligned choices:</strong> ${misalignedCount}</li>
    </ul>
  `;

  // Update summary message with typing animation
  const summaryEl = document.getElementById('summaryMessage');
  const node = NODES[currentNodeId];
  let summaryText = '';
  if (node) {
    summaryText = 
      `You completed the "${node.scenario}" scenario. ` +
      `Throughout this path, you made ${alignedCount} choice${alignedCount !== 1 ? 's' : ''} that aligned with the chronotope's norms ` +
      `and ${misalignedCount} choice${misalignedCount !== 1 ? 's' : ''} that did not. ` +
      `This illustrates how identity performances are evaluated differently across social contexts.`;
  } else {
    summaryText = 
      "You completed this scenario. " +
      `You made ${alignedCount} aligned choice${alignedCount !== 1 ? 's' : ''} and ${misalignedCount} misaligned choice${misalignedCount !== 1 ? 's' : ''} ` +
      "throughout your path.";
  }
  setTimeout(() => typeText(summaryEl, summaryText, 15), 500);

  // Show end view
  showView('end');
}

/**
 * Restart the simulation - go back to main menu
 */
function restartSimulation() {
  currentNodeId = null;
  selectedOption = null;
  choiceHistory = [];
  showView('landing');
}

/**
 * Show a specific view and hide all others
 * @param {string} viewName - The name of the view to show
 */
function showView(viewName) {
  // Hide all views
  Object.values(views).forEach(view => {
    view.classList.remove('active');
  });

  // Show the requested view with smooth transition
  if (views[viewName]) {
    setTimeout(() => {
      views[viewName].classList.add('active');
    }, 50);
  }
}
