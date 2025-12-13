export const categories = {
  "Voice & Autonomy": {
    short: "Voice",
    color: "#3b82f6",
  },
  "Impact & Purpose": {
    short: "Impact",
    color: "#10b981",
  },
  "Bold Leadership": {
    short: "Bold Leadership",
    color: "#f59e0b",
  },
  "Recognition & Reward": {
    short: "Empathy & Recognition",
    color: "#ef4444",
  },
  "Reflectie": {
    short: "Reflectie",
    color: "#8b5cf6",
  },
};

export type HerzbergType = "motivator" | "hygiene";

export interface Question {
  id: number;
  text: string;
  category: string;
  herzberg: HerzbergType;
}

export const questions: Question[] = [
  // Voice & Autonomy (1-7) - Mix of motivator and hygiene
  { id: 1, text: "Ik heb de vrijheid om mijn werk op mijn eigen manier te organiseren.", category: "Voice & Autonomy", herzberg: "motivator" },
  { id: 2, text: "Mijn leidinggevende laat mij zelfstandig beslissingen nemen.", category: "Voice & Autonomy", herzberg: "motivator" },
  { id: 3, text: "Ik voel dat mijn organisatie vertrouwen heeft in mijn vaardigheden.", category: "Voice & Autonomy", herzberg: "motivator" },
  { id: 4, text: "Ik krijg ruimte om te experimenteren of fouten te maken.", category: "Voice & Autonomy", herzberg: "motivator" },
  { id: 5, text: "Ik word niet onnodig gecontroleerd op kleine details.", category: "Voice & Autonomy", herzberg: "hygiene" },
  { id: 6, text: "Ik kan zelf mijn werktijden (deels) bepalen.", category: "Voice & Autonomy", herzberg: "hygiene" },
  { id: 7, text: "Mijn mening wordt serieus genomen in beslissingen die mij raken.", category: "Voice & Autonomy", herzberg: "motivator" },
  
  // Impact & Purpose (8-14) - Mostly motivators
  { id: 8, text: "Ik begrijp hoe mijn werk bijdraagt aan de bredere missie.", category: "Impact & Purpose", herzberg: "motivator" },
  { id: 9, text: "Mijn werk betekent iets voor klanten, collega's of de samenleving.", category: "Impact & Purpose", herzberg: "motivator" },
  { id: 10, text: "We bespreken regelmatig waarom we doen wat we doen.", category: "Impact & Purpose", herzberg: "hygiene" },
  { id: 11, text: "De doelen van mijn team zijn helder en betekenisvol.", category: "Impact & Purpose", herzberg: "motivator" },
  { id: 12, text: "Ik krijg te horen welke impact mijn werk heeft gehad.", category: "Impact & Purpose", herzberg: "motivator" },
  { id: 13, text: "Ik voel trots bij wat mijn team of organisatie bereikt.", category: "Impact & Purpose", herzberg: "motivator" },
  { id: 14, text: "Ik kan mijn persoonlijke waarden verbinden aan mijn werk.", category: "Impact & Purpose", herzberg: "motivator" },
  
  // Bold Leadership (15-21) - Mix of hygiene and motivator
  { id: 15, text: "Mijn leidinggevende toont interesse in mij als persoon.", category: "Bold Leadership", herzberg: "hygiene" },
  { id: 16, text: "Ik kan bij mijn leidinggevende terecht met zorgen.", category: "Bold Leadership", herzberg: "hygiene" },
  { id: 17, text: "We hebben regelmatig 1-op-1 gesprekken over mijn werk of ontwikkeling.", category: "Bold Leadership", herzberg: "hygiene" },
  { id: 18, text: "Mijn leidinggevende luistert actief en neemt mijn feedback mee.", category: "Bold Leadership", herzberg: "hygiene" },
  { id: 19, text: "Ik krijg duidelijke verwachtingen en doelstellingen.", category: "Bold Leadership", herzberg: "hygiene" },
  { id: 20, text: "Mijn manager helpt mij groeien, niet enkel presteren.", category: "Bold Leadership", herzberg: "motivator" },
  { id: 21, text: "Problemen of conflicten worden snel en eerlijk aangepakt.", category: "Bold Leadership", herzberg: "hygiene" },
  
  // Recognition & Reward (22-28) - Mix of motivator and hygiene
  { id: 22, text: "Ik krijg waardering los van formele beloningen.", category: "Recognition & Reward", herzberg: "motivator" },
  { id: 23, text: "Successen worden gevierd, individueel of in team.", category: "Recognition & Reward", herzberg: "motivator" },
  { id: 24, text: "Ik ontvang voldoende positieve feedback.", category: "Recognition & Reward", herzberg: "motivator" },
  { id: 25, text: "Ik voel me eerlijk beloond voor mijn werk.", category: "Recognition & Reward", herzberg: "hygiene" },
  { id: 26, text: "Beloningen zijn transparant en eerlijk geregeld.", category: "Recognition & Reward", herzberg: "hygiene" },
  { id: 27, text: "Doorgroeimogelijkheden zijn duidelijk voor iedereen.", category: "Recognition & Reward", herzberg: "hygiene" },
  { id: 28, text: "Ik krijg waardering op een manier die bij mij past.", category: "Recognition & Reward", herzberg: "motivator" },
  
  // Reflectie (29)
  { id: 29, text: "Ik zou opnieuw voor deze organisatie kiezen.", category: "Reflectie", herzberg: "motivator" },
];

export function getAdvice(category: string, score: number): string {
  const adviceMap: Record<string, Record<string, string>> = {
    "Voice & Autonomy": {
      low: "Je ervaart weinig ruimte om je werk zelf te sturen. Verken waar je meer keuzevrijheid nodig hebt. Spreek uit hoe jij je taken graag organiseert. Vraag om duidelijke kaders die je autonomie ondersteunen.",
      medium: "Je hebt enige autonomie, maar niet genoeg. Benoem waar je meer regie wil. Zoek flexibiliteit in planning, aanpak en werkvormen. Kaart concrete hindernissen aan die je groei beperken.",
      high: "Je voelt veel vertrouwen en zelfstandigheid. Blijf actief aangeven wat je nodig hebt om dit niveau te behouden. Deel ideeën, neem initiatief en bewaak je eigen ruimte en focus.",
    },
    "Impact & Purpose": {
      low: "Je mist een duidelijke link tussen je werk en het grotere doel. Onderzoek wat jou drijft. Vraag hoe jouw taken bijdragen. Zoek verhalen, feedback of doelen die betekenis geven aan je werkdag.",
      medium: "Je hebt enig zicht op je impact, maar het kan sterker. Reflecteer op wat jouw bijdrage waardevol maakt. Vraag om voorbeelden van impact. Leg bewust de koppeling tussen je dagelijkse taken en het grotere geheel.",
      high: "Je voelt duidelijk dat je werk ertoe doet. Blijf actief zoeken naar kansen om je waarden te verbinden aan je rol. Deel successen en benoem de impact die jij ziet of voelt.",
    },
    "Bold Leadership": {
      low: "Je ervaart weinig verbinding met je leidinggevende. Dit kan je vertrouwen of motivatie verlagen. Vraag om helderheid, verwachtingen en tijd voor 1-op-1 gesprekken. Zet zelf ook stappen om je noden uit te spreken.",
      medium: "Je ervaart steun, maar niet consequent. Vraag regelmaat in feedback. Zoek duidelijkheid wanneer iets onduidelijk voelt. Benoem wanneer coaching je helpt en waar je meer begeleiding wil.",
      high: "Je voelt je gesteund en gehoord. Blijf dit onderhouden door open te communiceren. Vraag om coaching wanneer je wil groeien en geef aan wat goed werkt in jullie samenwerking.",
    },
    "Recognition & Reward": {
      low: "Je voelt je weinig erkend. Benoem welke vormen van waardering jou motiveren. Vraag om feedback op je werk. Maak doorgroeikansen en verwachtingen bespreekbaar.",
      medium: "Je ervaart erkenning, maar niet altijd op de juiste manier. Geef aan hoe jij waardering graag ontvangt. Vraag om specifieke feedback. Verken hoe beloning en groei voor jou kunnen passen.",
      high: "Je voelt je gewaardeerd en eerlijk behandeld. Houd dit levend door actief feedback te vragen en je successen te delen. Geef ook aan welke vormen van erkenning voor jou het best werken.",
    },
    "Reflectie": {
      low: "Je motivatie voelt laag. Sta stil bij wat je belemmert. Kaart dit aan in een gesprek. Formuleer één concrete stap die je motivatie kan verbeteren.",
      medium: "Je zit in een gemiddelde flow. Er is ruimte om te groeien. Volg je energieniveau op en benoem wat je nodig hebt in de andere VIBE-thema's.",
      high: "Je zit goed in je vel en voelt je betrokken. Blijf bewust investeren in je werkervaring. Houd aandacht voor balans, groei en energie om deze lijn vast te houden.",
    },
  };

  const level = score < 2.5 ? "low" : score < 3.5 ? "medium" : "high";
  return adviceMap[category]?.[level] || "Blijf investeren in dit thema.";
}

// Herzberg profile types
export type HerzbergProfile = "low-low" | "low-high" | "high-low" | "high-high";

export interface HerzbergAdviceDetail {
  title: string;
  subtitle: string;
  interpretation: string[];
  meaning: string[];
  priorities: string[];
  steps: string[];
}

export interface HerzbergAnalysis {
  hygieneScore: number;
  motivatorScore: number;
  profile: HerzbergProfile;
  adviceDetail: HerzbergAdviceDetail;
  illustrationQuadrant: HerzbergProfile;
}

export function calculateHerzbergAnalysis(answers: Record<string, number>): HerzbergAnalysis {
  let totalHygiene = 0;
  let countHygiene = 0;
  let totalMotivator = 0;
  let countMotivator = 0;

  Object.entries(answers).forEach(([key, value]) => {
    const questionNum = parseInt(key.replace('q', ''));
    const question = questions.find(q => q.id === questionNum);
    
    if (question) {
      if (question.herzberg === "hygiene") {
        totalHygiene += value;
        countHygiene++;
      } else {
        totalMotivator += value;
        countMotivator++;
      }
    }
  });

  const hygieneScore = countHygiene > 0 ? totalHygiene / countHygiene : 0;
  const motivatorScore = countMotivator > 0 ? totalMotivator / countMotivator : 0;

  const hygieneLevel = hygieneScore >= 3 ? "high" : "low";
  const motivatorLevel = motivatorScore >= 3 ? "high" : "low";

  const profile: HerzbergProfile = `${hygieneLevel}-${motivatorLevel}` as HerzbergProfile;

  const adviceMap: Record<HerzbergProfile, HerzbergAdviceDetail> = {
    "low-low": {
      title: "Lage hygiëne & lage motivatie",
      subtitle: "Slechtste situatie. Je ervaart klachten én weinig motivatie.",
      interpretation: [
        "Je werkcontext voelt onduidelijk, instabiel of vermoeiend.",
        "Tegelijk geeft je werk weinig energie of voldoening.",
        "Je mist zowel basisvoorwaarden als motiverende elementen."
      ],
      meaning: [
        "Je ervaart hindernissen in samenwerking, leiding of werkdruk.",
        "Je voelt weinig erkenning, groei of betekenis.",
        "De kans op frustratie of uitval is groter."
      ],
      priorities: [
        "Herstel basis: duidelijkheid, werkdruk en afspraken.",
        "Versterk veiligheid en betrouwbaarheid in leiding en team.",
        "Bouw daarna aan motivatie: groei, erkenning en autonomie."
      ],
      steps: [
        "Vraag om duidelijkere verwachtingen.",
        "Maak afspraken over werkdruk en prioriteiten.",
        "Zoek één taak die energie kan geven en vergroot die.",
        "Plan een gesprek met je leidinggevende over wat je nodig hebt."
      ]
    },
    "low-high": {
      title: "Lage hygiëne & hoge motivatie",
      subtitle: "Je bent gemotiveerd, maar je werkcontext belemmert je.",
      interpretation: [
        "Je voelt interne drive en betrokkenheid.",
        "Maar er zijn hinderlijke omstandigheden: werkdruk, processen, leiding, beloning of samenwerking."
      ],
      meaning: [
        "Je motivatie is echt, maar staat onder druk.",
        "De kans op teleurstelling of demotivatie stijgt als problemen blijven.",
        "Je prestaties kunnen hoger liggen dan wat de omgeving toelaat."
      ],
      priorities: [
        "Versterk basisvoorwaarden snel.",
        "Bescherm je motivatie tegen frustratie.",
        "Verwijder ruis: onduidelijkheid, werkdruk, botsingen, procedures."
      ],
      steps: [
        "Benoem duidelijke bottlenecks die energie kosten.",
        "Vraag om betere werkafspraken of minder frictie.",
        "Bewaak je grenzen zodat je drive niet uitdooft.",
        "Vraag om ondersteuning of stabiliteit in processen."
      ]
    },
    "high-low": {
      title: "Hoge hygiëne & lage motivatie",
      subtitle: "Je ervaart weinig klachten, maar je voelt geen echte drive.",
      interpretation: [
        "De basis zit goed: samenwerking, leiding, structuur en beloning zijn voldoende.",
        "Maar je voelt te weinig uitdaging, betekenis of erkenning."
      ],
      meaning: [
        "Je hebt comfort, maar weinig voldoening.",
        "De kans op verveling, stilstand of routine is hoog.",
        "Je benut je potentieel niet volledig."
      ],
      priorities: [
        "Verhoog uitdaging en eigenaarschap.",
        "Zoek betekenis in werk en resultaten.",
        "Laat je talenten meer wegen op je rol."
      ],
      steps: [
        "Vraag een project dat meer verantwoordelijkheid vraagt.",
        "Zoek taken die aansluiten bij je talenten of ambities.",
        "Vraag om ontwikkelings- of groeikansen.",
        "Deel je ideeën en vraag om ruimte om ze uit te voeren."
      ]
    },
    "high-high": {
      title: "Hoge hygiëne & hoge motivatie",
      subtitle: "Ideale combinatie. Je ervaart stabiliteit én drive.",
      interpretation: [
        "Je werk is goed georganiseerd.",
        "Je voelt energie, erkenning, groei of betekenis.",
        "Je zit in een sterke omgeving."
      ],
      meaning: [
        "Je presteert waarschijnlijk goed.",
        "Je ervaart balans tussen comfort en uitdaging.",
        "Je bent waardevol voor het team en de organisatie."
      ],
      priorities: [
        "Verdiep expertise en houd je groei gaande.",
        "Blijf bewaken wat je nodig hebt.",
        "Gebruik je positie om impact te vergroten."
      ],
      steps: [
        "Neem uitdagende of innovatieve projecten op.",
        "Deel successen en best practices in je team.",
        "Bouw actief aan je lange-termijnontwikkeling.",
        "Zoek kansen om anderen te ondersteunen of coachen."
      ]
    }
  };

  return {
    hygieneScore,
    motivatorScore,
    profile,
    adviceDetail: adviceMap[profile],
    illustrationQuadrant: profile,
  };
}
