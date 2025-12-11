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
  herzbergType?: "hygiene" | "motivator";
}

export const managerVibeQuestions: ManagerQuestion[] = [
  // Voice & Autonomy (1-7) - Motivator
  { id: 1, text: "Ik geef mijn team voldoende vrijheid om hun werk op hun manier te organiseren.", category: "Voice & Autonomy", herzbergType: "motivator" },
  { id: 2, text: "Ik vermijd micromanagement en laat ruimte voor eigen beslissingen.", category: "Voice & Autonomy", herzbergType: "motivator" },
  { id: 3, text: "Ik betrek mijn teamleden actief bij relevante beslissingen.", category: "Voice & Autonomy", herzbergType: "motivator" },
  { id: 4, text: "Ik vertrouw erop dat mijn mensen hun werk zelfstandig kunnen uitvoeren.", category: "Voice & Autonomy", herzbergType: "motivator" },
  { id: 5, text: "Ik moedig experimenteren aan, ook als dat fouten kan opleveren.", category: "Voice & Autonomy", herzbergType: "motivator" },
  { id: 6, text: "Mijn team heeft voldoende invloed op werkverdeling en planning.", category: "Voice & Autonomy", herzbergType: "hygiene" },
  { id: 7, text: "Ik stel vragen voordat ik stuur of corrigeer.", category: "Voice & Autonomy", herzbergType: "motivator" },

  // Impact & Purpose (8-14) - Motivator
  { id: 8, text: "Ik koppel de teamdoelen regelmatig aan het bredere organisatiedoel.", category: "Impact & Purpose", herzbergType: "motivator" },
  { id: 9, text: "Ik communiceer helder waarom het werk dat we doen ertoe doet.", category: "Impact & Purpose", herzbergType: "motivator" },
  { id: 10, text: "Ik bespreek niet alleen het \"wat\" maar ook het \"waarom\" van ons werk.", category: "Impact & Purpose", herzbergType: "motivator" },
  { id: 11, text: "Ik toon trots in wat mijn team bereikt – ook bij kleine successen.", category: "Impact & Purpose", herzbergType: "motivator" },
  { id: 12, text: "Ik herinner mensen regelmatig aan de positieve impact van hun werk.", category: "Impact & Purpose", herzbergType: "motivator" },
  { id: 13, text: "Ik help teamleden hun persoonlijke waarden te koppelen aan hun job.", category: "Impact & Purpose", herzbergType: "motivator" },
  { id: 14, text: "Mijn team weet wat het grotere doel is van ons werk.", category: "Impact & Purpose", herzbergType: "motivator" },

  // Bold Leadership (15-21) - Mix
  { id: 15, text: "Ik geef richting, ook als er onzekerheid of weerstand is.", category: "Bold Leadership", herzbergType: "hygiene" },
  { id: 16, text: "Ik durf moeilijke gesprekken aan te gaan wanneer dat nodig is.", category: "Bold Leadership", herzbergType: "hygiene" },
  { id: 17, text: "Ik pak onderlinge spanningen tijdig en open aan.", category: "Bold Leadership", herzbergType: "hygiene" },
  { id: 18, text: "Ik ben aanspreekbaar en blijf kalm onder druk.", category: "Bold Leadership", herzbergType: "hygiene" },
  { id: 19, text: "Ik geef duidelijke verwachtingen zonder rigide controle.", category: "Bold Leadership", herzbergType: "hygiene" },
  { id: 20, text: "Ik stimuleer eigenaarschap in plaats van instructievolgen.", category: "Bold Leadership", herzbergType: "motivator" },
  { id: 21, text: "Ik neem zelf verantwoordelijkheid voor fouten of miscommunicatie.", category: "Bold Leadership", herzbergType: "hygiene" },

  // Empathy & Recognition (22-28) - Mix
  { id: 22, text: "Ik toon oprechte interesse in het welzijn van mijn teamleden.", category: "Empathy & Recognition", herzbergType: "hygiene" },
  { id: 23, text: "Ik erken inzet, ook zonder formele beloning.", category: "Empathy & Recognition", herzbergType: "motivator" },
  { id: 24, text: "Ik geef regelmatig positieve feedback – gericht en oprecht.", category: "Empathy & Recognition", herzbergType: "motivator" },
  { id: 25, text: "Ik weet hoe elk teamlid het liefst erkenning ontvangt.", category: "Empathy & Recognition", herzbergType: "motivator" },
  { id: 26, text: "Ik toon empathie in plaats van meteen oplossingen te pushen.", category: "Empathy & Recognition", herzbergType: "hygiene" },
  { id: 27, text: "Ik zorg dat waardering zichtbaar is, individueel én in groep.", category: "Empathy & Recognition", herzbergType: "motivator" },
  { id: 28, text: "Ik vier successen – groot of klein – bewust met het team.", category: "Empathy & Recognition", herzbergType: "motivator" },

  // Reflectie (29-30) - Mix
  { id: 29, text: "Ik weet hoe mijn leiderschap mijn team beïnvloedt, zowel inhoudelijk als mentaal.", category: "Reflectie", herzbergType: "hygiene" },
  { id: 30, text: "Ik ben actief bezig met het versterken van motivatie binnen mijn team.", category: "Reflectie", herzbergType: "motivator" },
];

export interface HerzbergAdviceDetail {
  title: string;
  subtitle: string;
  interpretation: string[];
  meaning: string[];
  priorities: string[];
  steps: string[];
}

export const managerHerzbergAdviceMap: Record<string, HerzbergAdviceDetail> = {
  "low-low": {
    title: "Laag leiderschapseffect & lage motivatie-impact",
    subtitle: "Je ervaart weinig grip én weinig positieve impact.",
    interpretation: [
      "Je leiderschap voelt reactief of onzeker.",
      "Je team krijgt weinig richting, erkenning of ruimte.",
      "Je weet niet goed waar je energie weglekt of wint."
    ],
    meaning: [
      "Je loopt risico op demotivatie – bij jezelf én je team.",
      "Je team mist stabiliteit, veiligheid of richting.",
      "Zowel prestatie als vertrouwen staan onder druk."
    ],
    priorities: [
      "Herstel basis: structuur, richting en aanwezigheid.",
      "Vergroot luisterbereidheid en aanspreekbaarheid.",
      "Breng focus aan in communicatie en keuzes."
    ],
    steps: [
      "Plan 1-op-1-gesprekken zonder agenda.",
      "Vraag hoe je teamleden motivatie ervaren.",
      "Kies één focusgebied en pak dit bewust aan.",
      "Vraag actief feedback op je leiderschapsstijl."
    ]
  },
  "low-high": {
    title: "Laag leiderschapseffect & hoge motivatie-impact",
    subtitle: "Je hebt goede intenties, maar je gedrag remt je impact.",
    interpretation: [
      "Je team voelt je drive, maar mist structuur of veiligheid.",
      "Je inspireert, maar biedt onvoldoende houvast."
    ],
    meaning: [
      "Je impact fluctueert sterk.",
      "Teamleden kunnen afhaken bij onduidelijkheid of gebrek aan steun."
    ],
    priorities: [
      "Maak je leiderschap zichtbaarder en consistenter.",
      "Zorg dat autonomie gepaard gaat met kaders en opvolging.",
      "Laat drive niet verwateren door chaos of afstand."
    ],
    steps: [
      "Geef helder aan wat je verwacht én wat je biedt.",
      "Gebruik vaste momenten voor erkenning en feedback.",
      "Koppel autonomie aan vertrouwen én opvolging.",
      "Vraag expliciet waar je kunt ondersteunen."
    ]
  },
  "high-low": {
    title: "Hoog leiderschapseffect & lage motivatie-impact",
    subtitle: "Je bent aanwezig en betrokken, maar inspireert onvoldoende.",
    interpretation: [
      "Je team voelt je nabijheid en steun.",
      "Maar mist richting, visie of inspiratie."
    ],
    meaning: [
      "Je team heeft comfort, maar weinig energie.",
      "De motivatie blijft oppervlakkig of afhankelijk van externe druk."
    ],
    priorities: [
      "Communiceer waarom jullie werk ertoe doet.",
      "Koppel dagelijkse taken aan impact en betekenis.",
      "Wees explicieter in erkenning en groei."
    ],
    steps: [
      "Formuleer en deel een heldere teamvisie.",
      "Bespreek impact: wat heeft resultaat opgeleverd voor anderen?",
      "Vraag wat mensen energie geeft, en bouw daarop verder.",
      "Laat waardering explicieter en persoonlijker blijken."
    ]
  },
  "high-high": {
    title: "Hoog leiderschapseffect & hoge motivatie-impact",
    subtitle: "Je bent een motiverende, bewuste leider.",
    interpretation: [
      "Je combineert richting met vertrouwen en empathie.",
      "Je team voelt zich erkend, betrokken en zelfstandig."
    ],
    meaning: [
      "Je zorgt voor sterke prestaties én groei.",
      "Je creëert duurzame motivatie in je team."
    ],
    priorities: [
      "Blijf reflecteren op je effect en groeipunten.",
      "Deel je aanpak met andere leiders.",
      "Veranker dit in de cultuur van je team of organisatie."
    ],
    steps: [
      "Vraag je team waar jij nog in kan groeien.",
      "Neem een coachende rol op naar collega-leiders.",
      "Bouw actieve feedback en erkenning structureel in.",
      "Gebruik je positie om positieve dynamiek te versterken."
    ]
  }
};

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

export interface ManagerHerzbergAnalysis {
  hygieneScore: number;
  motivatorScore: number;
  profile: string;
  adviceDetail: HerzbergAdviceDetail;
}

export function calculateManagerHerzbergAnalysis(answers: Record<string, number>): ManagerHerzbergAnalysis {
  let hygieneTotal = 0;
  let hygieneCount = 0;
  let motivatorTotal = 0;
  let motivatorCount = 0;

  Object.entries(answers).forEach(([key, value]) => {
    const questionNum = parseInt(key.replace("mq", ""));
    const question = managerVibeQuestions.find((q) => q.id === questionNum);

    if (question?.herzbergType === "hygiene") {
      hygieneTotal += value;
      hygieneCount++;
    } else if (question?.herzbergType === "motivator") {
      motivatorTotal += value;
      motivatorCount++;
    }
  });

  const hygieneScore = hygieneCount > 0 ? hygieneTotal / hygieneCount : 0;
  const motivatorScore = motivatorCount > 0 ? motivatorTotal / motivatorCount : 0;

  const hygieneLevel = hygieneScore >= 3.5 ? "high" : "low";
  const motivatorLevel = motivatorScore >= 3.5 ? "high" : "low";
  const profile = `${hygieneLevel}-${motivatorLevel}`;

  return {
    hygieneScore,
    motivatorScore,
    profile,
    adviceDetail: managerHerzbergAdviceMap[profile],
  };
}
