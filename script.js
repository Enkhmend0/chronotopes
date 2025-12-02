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

    scenario: "You just bought Arabic cologne and now you're taking a taxi in Doha",

    chronotope: "Everyday service encounter",

    location: "Doha, Qatar",

    context:

      "You get into a taxi. The driver glances at you and seems to assume you might speak Arabic based on how you look and smell.",

    prompt: 'Driver: "Salam alaikum"',

    options: [

      {

        id: "taxi_1A",

        text: 'You: "Wa alaikum salam! I\'m good, how are you?"',

        npcReply: 'Driver: "Good, good. Where you going today, my friend?"',

        feedback:

          "You answer with the same greeting and a familiar phrase. Even though you're speaking English, these small details make the driver feel you're close to his world and background.",

        nextId: "taxi_2A",

        isAligned: true

      },

      {

        id: "taxi_1B",

        text:

          'You: "Hey! Sorry, I don\'t speak Arabic."',

        npcReply: 'Driver: "Ah, okay, no problem! Where do you want to go?"',

        feedback:

          "You politely explain that you don't speak Arabic and ask to stay in English. You gently step out of the role he guessed for you and reset the interaction in a way that works for you.",

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

          "You continue to answer like someone who belongs here. You confirm the driver's guess about you, so the conversation stays in a relaxed, friendly \"local\" mode.",

        nextId: null,

        isAligned: true

      },

      {

        id: "taxi_2A2",

        text:

          'You: "Actually, I don\'t really live here, I just know a few phrases. I\'m still figuring things out."',

        npcReply:

          'Driver: "Ah, okay, okay. No problem, I help you. Where you from?"',

        feedback:

          "You show that his first impression wasn't fully accurate. This reminds us how small signs, like a greeting or a few words, can change our perceived identity within that context.",

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

          "You treat his guess as understandable and use it to share a more complicated version of who you are. You show that people's quick judgments based on looks and small signals don't always match the real story.",

        nextId: null,

        isAligned: true

      },

      {

        id: "taxi_2B2",

        text: 'You: "Does it matter? I just want to get to my destination."',

        npcReply: 'Driver: "Okay, no problem."',

        feedback:

          "You shut down the personal question and keep the ride strictly practical. That's your choice, but it also makes the atmosphere more distant and less friendly.",

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

          "You use a short apology and keep moving. This matches how people usually act here: quick, simple, and without drama.",

        nextId: "ny_2A",

        isAligned: true

      },

      {

        id: "ny_1B",

        text:

          'You: "Oh my God, I\'m so sorry! I didn\'t see you there, what\'s your name?"',

        npcReply: 'Stranger: "Yeah… it\'s fine." *walks away*',

        feedback:

          "Your words are polite, but they feel too big for a tiny bump in a busy street. Asking for the person's name and making it emotional can feel strange and uncomfortable here.",

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

    prompt:

      "Another stranger hits your shoulder and keeps walking without looking back.",

    options: [

      {

        id: "ny_2A1",

        text:

          'You: *briefly glance, keep walking, mutter to yourself* "Whatever."',

        npcReply: "",

        feedback:

          "You decide not to react and just move on. In a place like this, people often ignore small collisions and focus on getting where they're going.",

        nextId: null,

        isAligned: true

      },

      {

        id: "ny_2A2",

        text: 'You: "Hey! You bumped into me!"',

        npcReply: "The stranger doesn't turn around.",

        feedback:

          "You try to call them out and fix the situation, but most people here don't stop for that. You end up more frustrated, while the street just keeps moving around you.",

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

      "You've just overreacted. You still feel awkward. A friend walking with you notices.",

    prompt: 'Friend: "You okay? That was… a bit weird."',

    options: [

      {

        id: "ny_2B1",

        text:

          'You: "Yeah, I guess I overreacted. People don\'t really stop here, do they?"',

        npcReply: 'Friend: "Exactly. Just a quick \'sorry\' and keep moving."',

        feedback:

          "You notice that your habits don't really match how people behave here and start adjusting. You're learning how this city expects people to act in public.",

        nextId: null,

        isAligned: true

      },

      {

        id: "ny_2B2",

        text:

          'You: "I just think it\'s basic respect to check if someone\'s okay."',

        npcReply:

          'Friend: "Yeah, but this is New York. People don\'t have time for that."',

        feedback:

          "You hold on to your own idea of what respect should look like. That belief isn't wrong, but it clashes with how most people around you behave in this setting.",

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

          "You use the fast city style and walk away. Here, that feels cold and rushed, because people usually stop and check in after even small accidents.",

        nextId: "slow_2A",

        isAligned: false

      },

      {

        id: "slow_1B",

        text: 'You: "Oh, sorry! Are you okay?" *you stop and look at them*',

        npcReply:

          'Local: "Yes, yes, I\'m fine. These streets are small, it happens."',

        feedback:

          "You slow down, make eye contact, and ask if they're okay. This fits the local rhythm, where people expect a little more time and friendliness.",

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

        npcReply: 'Friend: "Yeah, here we usually check in. People like to feel seen."',

        feedback:

          "You notice that what feels normal to you seems rude here. You show you're open to changing how you act to match local expectations.",

        nextId: null,

        isAligned: true

      },

      {

        id: "slow_2A2",

        text: 'You: "I said sorry, that should be enough anywhere."',

        npcReply: 'Friend: "I mean… people might think you\'re cold."',

        feedback:

          "You insist that your way should work in every place. That attitude makes it harder to understand why people around you might see you as distant.",

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

        npcReply: 'Local: "Welcome. Enjoy your stay."',

        feedback:

          "You share a small detail and respond warmly. Here, short friendly conversations with strangers are normal and appreciated.",

        nextId: null,

        isAligned: true

      },

      {

        id: "slow_2B2",

        text:

          'You: "Oh, just visiting. Anyway, have a good day." *you turn and leave quickly*',

        npcReply: 'Local: "Okay… you too."',

        feedback:

          "You end the chat quickly as soon as it becomes a bit personal. In this town, that can feel like you're not really interested in connecting with people.",

        nextId: null,

        isAligned: false

      }

    ]

  },



  // =========================

  // SCENARIO 4: PARIS CAFE

  // =========================



  "paris_1": {

    id: "paris_1",

    scenario: "Busy Paris Cafe",

    chronotope: "Ritualized public politeness",

    location: "Paris, France",

    context:

      "It's lunchtime in a crowded Paris cafe. People stand in a short line to order at the counter.",

    prompt:

      "You reach the counter. The barista looks at you, waiting for your order.",

    options: [

      {

        id: "paris_1A",

        text: 'You: "Hi, can I please have a macchiato frappuccino?"',

        npcReply: 'Barista: "Of course. Anything else for you?"',

        feedback:

          "You greet the barista and say \"please\" before asking for your drink. This matches the local habit of adding a bit of politeness before making a request.",

        nextId: "paris_2A",

        isAligned: true

      },

      {

        id: "paris_1B",

        text: 'You: "Coffee. Medium."',

        npcReply: 'Barista: "Okay." *tone is noticeably cooler*',

        feedback:

          "Your order is clear, but it sounds more like a command than a request. Skipping the greeting and \"please\" makes you seem blunt and less polite here.",

        nextId: "paris_2B",

        isAligned: false

      }

    ]

  },



  "paris_2A": {

    id: "paris_2A",

    scenario: "Busy Paris Cafe",

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

          "You give your name and thank them without creating any delay. You stay friendly and respectful while also keeping the line moving.",

        nextId: null,

        isAligned: true

      },

      {

        id: "paris_2A2",

        text:

          'You: "Why do you need my name? I\'ll just wait here." *you block the counter*',

        npcReply:

          'Barista: "It\'s easier for us. Please step to the side."',

        feedback:

          "You resist a simple system that helps the staff stay organized. It makes you stand out as difficult and slows things down for everyone behind you.",

        nextId: null,

        isAligned: false

      }

    ]

  },



  "paris_2B": {

    id: "paris_2B",

    scenario: "Busy Paris Cafe",

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

          "You admit you missed a small politeness step and adjust your tone. This can soften the tension and shows you're willing to learn how people here expect interactions to go.",

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

          "You judge the situation only by your own standards and ignore local expectations. This makes the distance between you and the barista even bigger.",

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

          "You pay quickly, say thank you, and keep things simple. This matches the usual style here: fast and polite without extra talking.",

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

          "Your small talk would feel friendly in many places, but here it interrupts a very short and routine kind of interaction.",

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

          "You move away from the counter so the next person can pay. You respect both the speed and the limited space in the shop.",

        nextId: null,

        isAligned: true

      },

      {

        id: "konbini_2A2",

        text:

          'You: *stay at the counter, slowly organizing your bag while others wait behind you*',

        npcReply: "",

        feedback:

          "You block the space while you sort your things. Even though you're not talking, your body still slows everyone else down.",

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

          "You notice the mismatch and change your behavior to keep things quick. You show that you can adjust when the situation calls for it.",

        nextId: null,

        isAligned: true

      },

      {

        id: "konbini_2B2",

        text:

          'You: "You seem busy. People here don\'t really talk much, huh?" *you linger at the counter*',

        npcReply: "",

        feedback:

          "You comment on how people act here while still standing in the way. This adds more pressure for the cashier and the people behind you.",

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
  "You just bought Arabic cologne and now you're taking a taxi in Doha": "taxi_1",
  "New York Sidewalk": "ny_1",
  "Slow Coastal Town Street": "slow_1",
  "Busy Paris Cafe": "paris_1",
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

  // ✅ Only use scenarios that actually have a defined start node
  Object.keys(START_NODES).forEach(scenarioName => {
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
