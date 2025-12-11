export const managerCategories = {
  "Voice & Autonomy": {
    short: "Voice",
    color: "#3b82f6",
  },
  "Impact & Purpose": {
    short: "Impact",
    color: "#10b981",
  },
  "Bold Leadership": {
    short: "Leadership",
    color: "#f59e0b",
  },
  "Empathy & Recognition": {
    short: "Recognition",
    color: "#ef4444",
  },
  "Reflectie": {
    short: "Reflectie",
    color: "#8b5cf6",
  },
};

export interface ManagerQuestion {
  id: number;
  text: string;
  category: string;
}

export const managerVibeQuestions: ManagerQuestion[] = [
  // Voice & Autonomy (1-7)
  { id: 1, text: "Ik geef mijn team voldoende vrijheid om hun werk op hun manier te organiseren.", category: "Voice & Autonomy" },
  { id: 2, text: "Ik vermijd micromanagement en laat ruimte voor eigen beslissingen.", category: "Voice & Autonomy" },
  { id: 3, text: "Ik betrek mijn teamleden actief bij relevante beslissingen.", category: "Voice & Autonomy" },
  { id: 4, text: "Ik vertrouw erop dat mijn mensen hun werk zelfstandig kunnen uitvoeren.", category: "Voice & Autonomy" },
  { id: 5, text: "Ik moedig experimenteren aan, ook als dat fouten kan opleveren.", category: "Voice & Autonomy" },
  { id: 6, text: "Mijn team heeft voldoende invloed op werkverdeling en planning.", category: "Voice & Autonomy" },
  { id: 7, text: "Ik stel vragen voordat ik stuur of corrigeer.", category: "Voice & Autonomy" },

  // Impact & Purpose (8-14)
  { id: 8, text: "Ik koppel de teamdoelen regelmatig aan het bredere organisatiedoel.", category: "Impact & Purpose" },
  { id: 9, text: "Ik communiceer helder waarom het werk dat we doen ertoe doet.", category: "Impact & Purpose" },
  { id: 10, text: "Ik bespreek niet alleen het \"wat\" maar ook het \"waarom\" van ons werk.", category: "Impact & Purpose" },
  { id: 11, text: "Ik toon trots in wat mijn team bereikt – ook bij kleine successen.", category: "Impact & Purpose" },
  { id: 12, text: "Ik herinner mensen regelmatig aan de positieve impact van hun werk.", category: "Impact & Purpose" },
  { id: 13, text: "Ik help teamleden hun persoonlijke waarden te koppelen aan hun job.", category: "Impact & Purpose" },
  { id: 14, text: "Mijn team weet wat het grotere doel is van ons werk.", category: "Impact & Purpose" },

  // Bold Leadership (15-21)
  { id: 15, text: "Ik geef richting, ook als er onzekerheid of weerstand is.", category: "Bold Leadership" },
  { id: 16, text: "Ik durf moeilijke gesprekken aan te gaan wanneer dat nodig is.", category: "Bold Leadership" },
  { id: 17, text: "Ik pak onderlinge spanningen tijdig en open aan.", category: "Bold Leadership" },
  { id: 18, text: "Ik ben aanspreekbaar en blijf kalm onder druk.", category: "Bold Leadership" },
  { id: 19, text: "Ik geef duidelijke verwachtingen zonder rigide controle.", category: "Bold Leadership" },
  { id: 20, text: "Ik stimuleer eigenaarschap in plaats van instructievolgen.", category: "Bold Leadership" },
  { id: 21, text: "Ik neem zelf verantwoordelijkheid voor fouten of miscommunicatie.", category: "Bold Leadership" },

  // Empathy & Recognition (22-28)
  { id: 22, text: "Ik toon oprechte interesse in het welzijn van mijn teamleden.", category: "Empathy & Recognition" },
  { id: 23, text: "Ik erken inzet, ook zonder formele beloning.", category: "Empathy & Recognition" },
  { id: 24, text: "Ik geef regelmatig positieve feedback – gericht en oprecht.", category: "Empathy & Recognition" },
  { id: 25, text: "Ik weet hoe elk teamlid het liefst erkenning ontvangt.", category: "Empathy & Recognition" },
  { id: 26, text: "Ik toon empathie in plaats van meteen oplossingen te pushen.", category: "Empathy & Recognition" },
  { id: 27, text: "Ik zorg dat waardering zichtbaar is, individueel én in groep.", category: "Empathy & Recognition" },
  { id: 28, text: "Ik vier successen – groot of klein – bewust met het team.", category: "Empathy & Recognition" },

  // Reflectie (29-30)
  { id: 29, text: "Ik weet hoe mijn leiderschap mijn team beïnvloedt, zowel inhoudelijk als mentaal.", category: "Reflectie" },
  { id: 30, text: "Ik ben actief bezig met het versterken van motivatie binnen mijn team.", category: "Reflectie" },
];

export function getManagerAdvice(category: string, score: number): string {
  const adviceMap: Record<string, Record<string, string>> = {
    "Voice & Autonomy": {
      low: "Je geeft mogelijk te weinig ruimte aan je team. Onderzoek waar je meer vertrouwen kunt tonen. Vraag jezelf af waar je minder kunt controleren en meer kunt delegeren.",
      medium: "Je biedt enige autonomie, maar er is ruimte voor verbetering. Zoek naar momenten waar je meer eigenaarschap kunt geven. Vraag je team waar zij meer vrijheid willen.",
      high: "Je geeft je team veel vertrouwen en ruimte. Blijf dit behouden en zoek naar manieren om autonomie verder te versterken waar mogelijk.",
    },
    "Impact & Purpose": {
      low: "Je team mist mogelijk de verbinding met het grotere doel. Communiceer vaker het 'waarom' achter het werk. Deel succesverhalen en impact met je team.",
      medium: "Je deelt soms de betekenis van het werk, maar dit kan consistenter. Plan regelmatige momenten om doelen en impact te bespreken met je team.",
      high: "Je verbindt je team sterk met zingeving en impact. Blijf dit doen en zoek nieuwe manieren om de betekenis van het werk zichtbaar te maken.",
    },
    "Bold Leadership": {
      low: "Je vermijdt mogelijk moeilijke situaties. Oefen met het aangaan van lastige gesprekken. Zoek ondersteuning of coaching om je leiderschapsvaardigheden te versterken.",
      medium: "Je toont enig leiderschap, maar er zijn momenten waarop je duidelijker richting kunt geven. Werk aan het sneller aanpakken van spanningen.",
      high: "Je bent een daadkrachtige leider die richting geeft. Blijf open voor feedback en zorg dat je team zich veilig voelt om ook jou aan te spreken.",
    },
    "Empathy & Recognition": {
      low: "Je team voelt zich mogelijk onvoldoende gezien. Investeer in persoonlijke aandacht en erkenning. Vraag hoe elk teamlid waardering het liefst ontvangt.",
      medium: "Je erkent je team soms, maar dit kan frequenter en persoonlijker. Plan bewuste momenten voor waardering en vier successen vaker.",
      high: "Je toont sterke empathie en erkenning. Blijf dit doen en zoek naar manieren om waardering nog zichtbaarder te maken voor het hele team.",
    },
    "Reflectie": {
      low: "Neem tijd voor zelfreflectie over je leiderschapsimpact. Vraag actief feedback aan je team over hoe jouw stijl hen beïnvloedt.",
      medium: "Je reflecteert soms op je leiderschap. Maak dit een vaste gewoonte en vraag regelmatig om feedback van je team.",
      high: "Je bent bewust bezig met je leiderschap en de impact op je team. Blijf investeren in je ontwikkeling als leider.",
    },
  };

  const level = score < 2.5 ? "low" : score < 3.5 ? "medium" : "high";
  return adviceMap[category]?.[level] || "Blijf investeren in dit thema.";
}

export function calculateManagerCategoryScores(answers: Record<string, number>): Record<string, number> {
  const categoryTotals: Record<string, { total: number; count: number }> = {};

  Object.keys(managerCategories).forEach((cat) => {
    categoryTotals[cat] = { total: 0, count: 0 };
  });

  Object.entries(answers).forEach(([key, value]) => {
    const questionNum = parseInt(key.replace("mq", ""));
    const question = managerVibeQuestions.find((q) => q.id === questionNum);

    if (question) {
      categoryTotals[question.category].total += value;
      categoryTotals[question.category].count += 1;
    }
  });

  const scores: Record<string, number> = {};
  Object.entries(categoryTotals).forEach(([cat, data]) => {
    scores[cat] = data.count > 0 ? data.total / data.count : 0;
  });

  return scores;
}
