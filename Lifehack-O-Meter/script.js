function showjuggad(){
    //getting user input
    const inputText=document.getElementById("probleminput").value.toLowerCase();
     const tips = [
    "Use your phone flashlight + jug of water = instant lamp, desi jugaad level: expert!",
     "Arey beta, restart kar ke dekh le ek baar.",
    "Restart it—90% of Indian tech problems solved with this trick.",
    "Fan not working? Use a newspaper as a hand fan – instant AC!",
    "No charger? Rub the charger pin and pray to Lord Charginganand.",
    "Broken slippers? Use a safety pin – desi engineering at its best!",
   
  ];
  let answer = "";
  if (inputText.includes("power") || inputText.includes("night")) {
    answer = tips[0];
  } else if (inputText.includes("slow") || inputText.includes("laptop")) {
    answer = tips[1];
  } else {
    answer = tips[Math.floor(Math.random() * tips.length)];
  }
  document.getElementById("jugadanswer").innerText = answer;
  //cool idea converting text to audio
  const selectvoice = document.getElementById("voiceselect-juggad").value;
speakText(answer, selectvoice);

}
function codejuggad(){
    //getting user input
    const code=document.getElementById("codeinput").value.toLowerCase();
  const excuse = [
  "Is bug ko toh maine 'Karma ka funda' samajh ke chhod diya hai. 🕉️🐞",
  "Actually, that bug is an undocumented feature. 🐛✨",
  "Internet waalon ne aaj bhi chhutti le li hai, isliye slow hai. 📶😴",
  "Blame the compiler or the internet gods. 🧞‍♂️🖥️",
  "It worked on my machine, par yeh toh mera bhai ka laptop hai! 🖥️😅",
  "Google bhi confuse hai, samjha nahi. 😵‍💫🔍",
  "Server ne bhi chhutti le li hai aaj. ☁️😴",
  "Code toh theek tha, system hi negative ho gaya. 📉😔",
  "Code ki toh baat mat karo, vo toh mast hai, problem tumhare system mein hai! 🧑‍🔧",
  "Syntax error? Nahi yaar, yeh toh creative art hai! 🎨💻",
  "Looks like the code needs a cutting chai break. 🍵💤",
  "Mera code emotions se chalta hai, not logic. ❤️🧠",
  "Bug nikal gaya ghar se, pata nahi kab wapas aayega. 🐞🚪"
];

     //random excuse
       const randomExcuse = excuse[Math.floor(Math.random() * excuse.length)]
       //show ans in output div
  document.getElementById("codeanswer").innerText=randomExcuse;
  //
  const selectvoice = document.getElementById("voiceselect-code").value;
speakText(randomExcuse, selectvoice);

}

function examjuggad() {
    const inputText = document.getElementById("examinput").value.toLowerCase();
    let tip = "";

    if (inputText.includes("physics")) {
        tip = "Revise formulas + pray that no derivation comes. Law of panic is real.📘💀";
    } else if (inputText.includes("chemistry") || inputText.includes("organic")) {
        tip = "Organic? Just draw hexagons and hope for the best! 🧪😵‍💫";
    } else if (inputText.includes("computer") || inputText.includes("code")) {
        tip = "Ctrl + C, Ctrl + V, but don't get caught 💻🫣";
    } else if (inputText.includes("math")) {
        tip = "Math hack: Write big steps, act confident, confuse the teacher 🤓📐";}
        else if (inputText.includes("viva")|| inputText.includes("internal")) {
        tip = "Repeat professor’s words = 5 bonus marks 🧏‍♂️✅";
    } else {
        const tips = [
            "Last-minute? Focus on diagrams, they give sympathy marks 😭📊",
            
            "Say 'Sir I was almost there!'– works in vivas 🔍🤥",
           "Sleep 6 hours, study 2 hours, and pray 24 hours!",
        "Exam strategy: MCQs = Mini Coin Questions. Toss a coin!",
         "Draw margin lines and diagrams, teachers love art"
        ];
        tip = tips[Math.floor(Math.random() * tips.length)];
    }
    //
    document.getElementById("examanswer").innerText=tip;
   const selectvoice = document.getElementById("voiceselect-exam").value;
speakText(tip, selectvoice);

  }

function foodjuggad() {
    const mood = document.getElementById("foodinput").value.toLowerCase();
    let food = "";

    if (mood.includes("sad")) {
        food = "Feeling low?Garam chai + samosa, the ultimate comfort combo 😌🟢🟡";
    } else if (mood.includes("excited")) {
        food = "Celebration = jalebi-fafda combo 🎉🧡";
    } else if (mood.includes("lazy")) {
        food = "Lazy day? Khakra + masala chai = chill vibes ☕😴";
    }
    else if (mood.includes("stressed")) {
    food = "Dhokla for coding stress – Jain approved 😎";}
     else {
        const foods = [
            "Mood off? Dhokla lelo bhai, Jain power ON! 😌🟡",
            "Steamed idli + nariyal chutney = calm mind 😇",
            "Sabudana khichdi FTW! 🥄",
            "Bhel puri without onion + chill movie = ultimate feel 🤌📺",
             "Biryani solves everything. Yes, everything. 🍛",
        "When confused, eat aloo paratha with butter. 🫓🧈",
         "Desi ice cream = Rasgulla from the fridge. 🍥",
          
        ];
        food = foods[Math.floor(Math.random() * foods.length)];
    }
    //
    document.getElementById("foodanswer").innerText=food;
    //
     const selectvoice = document.getElementById("voiceselect-food").value;
speakText(food, selectvoice);

  }
function startjuggad(){
    //getting user input
    const up=document.getElementById("startinput").value.toLowerCase();
 const ideas = [
    "Swiggy for Pandits—order pooja items on-demand.",
    "AI matchmaker based on zodiac compatibility. Kundli + Code!",
    "Uber for lost pens in classrooms—find your missing stationery fast!",
    "Startup to rent relatives for shaadi functions!",
    "AI bot that gives you excuses for not attending family events.",
    "College canteen finder app – because food is life.",
      "Rent-a-Charger: Never run out of battery in college again.",
        "Virtual hostel roommate simulator – practice patience. 😂"
  ];
  const randomidea=ideas[Math.floor(Math.random()*ideas.length)];

  //show ans in output div
  document.getElementById("startanswer").innerText=randomidea;
  //converting speech to audio
    const selectvoice = document.getElementById("voiceselect-startup").value;
speakText(randomidea, selectvoice);

}
//helper function
function speakText(text, voiceMode) {
    const speech = new SpeechSynthesisUtterance(text);
    const mode = voiceMode.toLowerCase();

    if (mode === "nani") {
        speech.rate = 0.2;
        speech.pitch = 1.2;
    } else if (mode === "bhaiya") {
        speech.rate = 3.5;
        speech.pitch = 0.9;
    } else {
        speech.rate = 1;
        speech.pitch = 1;
    }
    window.speechSynthesis.speak(speech);
}
