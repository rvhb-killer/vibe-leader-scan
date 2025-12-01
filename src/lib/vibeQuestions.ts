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
    short: "Leadership",
    color: "#f59e0b",
  },
  "Recognition & Reward": {
    short: "Recognition",
    color: "#ef4444",
  },
  "Reflectie": {
    short: "Reflectie",
    color: "#8b5cf6",
  },
};

export const questions = [
  // Voice & Autonomy (1-7)
  { id: 1, text: "Ik heb de vrijheid om mijn werk op mijn eigen manier te organiseren.", category: "Voice & Autonomy" },
  { id: 2, text: "Mijn leidinggevende laat mij zelfstandig beslissingen nemen.", category: "Voice & Autonomy" },
  { id: 3, text: "Ik voel dat mijn organisatie vertrouwen heeft in mijn vaardigheden.", category: "Voice & Autonomy" },
  { id: 4, text: "Ik krijg ruimte om te experimenteren of fouten te maken.", category: "Voice & Autonomy" },
  { id: 5, text: "Ik word niet onnodig gecontroleerd op kleine details.", category: "Voice & Autonomy" },
  { id: 6, text: "Ik kan zelf mijn werktijden (deels) bepalen.", category: "Voice & Autonomy" },
  { id: 7, text: "Mijn mening wordt serieus genomen in beslissingen die mij raken.", category: "Voice & Autonomy" },
  
  // Impact & Purpose (8-14)
  { id: 8, text: "Ik begrijp hoe mijn werk bijdraagt aan de bredere missie.", category: "Impact & Purpose" },
  { id: 9, text: "Mijn werk betekent iets voor klanten, collega's of de samenleving.", category: "Impact & Purpose" },
  { id: 10, text: "We bespreken regelmatig waarom we doen wat we doen.", category: "Impact & Purpose" },
  { id: 11, text: "De doelen van mijn team zijn helder en betekenisvol.", category: "Impact & Purpose" },
  { id: 12, text: "Ik krijg te horen welke impact mijn werk heeft gehad.", category: "Impact & Purpose" },
  { id: 13, text: "Ik voel trots bij wat mijn team of organisatie bereikt.", category: "Impact & Purpose" },
  { id: 14, text: "Ik kan mijn persoonlijke waarden verbinden aan mijn werk.", category: "Impact & Purpose" },
  
  // Bold Leadership (15-21)
  { id: 15, text: "Mijn leidinggevende toont interesse in mij als persoon.", category: "Bold Leadership" },
  { id: 16, text: "Ik kan bij mijn leidinggevende terecht met zorgen.", category: "Bold Leadership" },
  { id: 17, text: "We hebben regelmatig 1-op-1 gesprekken over mijn werk of ontwikkeling.", category: "Bold Leadership" },
  { id: 18, text: "Mijn leidinggevende luistert actief en neemt mijn feedback mee.", category: "Bold Leadership" },
  { id: 19, text: "Ik krijg duidelijke verwachtingen en doelstellingen.", category: "Bold Leadership" },
  { id: 20, text: "Mijn manager helpt mij groeien, niet enkel presteren.", category: "Bold Leadership" },
  { id: 21, text: "Problemen of conflicten worden snel en eerlijk aangepakt.", category: "Bold Leadership" },
  
  // Recognition & Reward (22-28)
  { id: 22, text: "Ik krijg waardering los van formele beloningen.", category: "Recognition & Reward" },
  { id: 23, text: "Successen worden gevierd, individueel of in team.", category: "Recognition & Reward" },
  { id: 24, text: "Ik ontvang voldoende positieve feedback.", category: "Recognition & Reward" },
  { id: 25, text: "Ik voel me eerlijk beloond voor mijn werk.", category: "Recognition & Reward" },
  { id: 26, text: "Beloningen zijn transparant en eerlijk geregeld.", category: "Recognition & Reward" },
  { id: 27, text: "Doorgroeimogelijkheden zijn duidelijk voor iedereen.", category: "Recognition & Reward" },
  { id: 28, text: "Ik krijg waardering op een manier die bij mij past.", category: "Recognition & Reward" },
  
  // Reflectie (29)
  { id: 29, text: "Ik zou opnieuw voor deze organisatie kiezen.", category: "Reflectie" },
];

export function getAdvice(category: string, score: number): string {
  const adviceMap: Record<string, Record<string, string>> = {
    "Voice & Autonomy": {
      low: "Je medewerkers ervaren weinig ruimte om hun werk zelfstandig in te richten. Overweeg om verantwoordelijkheden te delegeren, ruimte te bieden voor experimenten, en strakkere controle los te laten. Creëer vertrouwen door beslissingen te laten nemen binnen hun rol.",
      medium: "Er is enige autonomie, maar het potentieel wordt nog niet volledig benut. Vraag hoe mensen hun werk graag organiseren, en stel kaders op die autonomie mogelijk maken. Denk ook aan flexibiliteit in werktijden en inspraak.",
      high: "Medewerkers ervaren veel vertrouwen en zelfstandigheid. Houd deze cultuur levend door open communicatie, vertrouwen in vakmanschap, en betrokkenheid bij beslissingen te blijven stimuleren.",
    },
    "Impact & Purpose": {
      low: "De verbinding met het 'waarom' ontbreekt. Medewerkers weten niet hoe hun werk bijdraagt aan iets groters. Zorg dat je regelmatig de missie en het grotere doel van het team of organisatie bespreekt. Deel impactverhalen en betrek medewerkers in doelen.",
      medium: "Er is enig besef van impact, maar het kan sterker. Stimuleer reflectie op het nut van ieders bijdrage. Deel klant- of teamfeedback en koppel dagelijkse taken aan het grotere plaatje.",
      high: "Je team voelt duidelijk hoe hun werk bijdraagt aan een groter doel. Blijf successen en impact zichtbaar maken. Geef ruimte om persoonlijke waarden te integreren in het werk.",
    },
    "Bold Leadership": {
      low: "Er is weinig persoonlijke connectie met leiderschap. Dit kan leiden tot wantrouwen of afstand. Investeer in individuele gesprekken, toon oprechte interesse en luister actief. Zorg dat verwachtingen helder zijn en dat er aandacht is voor groei.",
      medium: "Je doet al inspanningen om betrokken leiderschap te tonen, maar het is nog niet stabiel. Versterk je leiderschap met regelmatige feedbackgesprekken, en wees beschikbaar als coach, niet alleen als beoordelaar.",
      high: "Je leiding wordt als menselijk, steunend en duidelijk ervaren. Koester deze band. Blijf luisteren, ondersteunen en ruimte geven voor persoonlijke ontwikkeling en moeilijke gesprekken.",
    },
    "Recognition & Reward": {
      low: "Medewerkers voelen zich onvoldoende erkend of eerlijk beloond. Begin met kleine, oprechte waardering, zowel individueel als in team. Bespreek openlijk hoe beloning en doorgroeikansen werken.",
      medium: "Er is waardering, maar het voelt nog niet altijd eerlijk of passend. Geef frequente inhoudelijke feedback en check hoe teamleden graag erkenning ontvangen. Transparantie over beloningen helpt.",
      high: "Mensen voelen zich gewaardeerd en eerlijk behandeld. Fantastisch! Blijf feedback geven en successen vieren op manieren die aansluiten bij de persoon (privé/publiek/informeel).",
    },
    "Reflectie": {
      low: "De algehele motivatie en betrokkenheid lijkt laag. Neem dit serieus en ga in gesprek over wat er nodig is om het tij te keren. Luister zonder oordeel en pak concrete punten aan.",
      medium: "Er is ruimte voor verbetering in de algehele ervaring. Blijf investeren in de andere VIBE-thema's en monitor regelmatig hoe het gaat.",
      high: "Medewerkers zijn loyaal en tevreden. Blijf investeren in alle aspecten van VIBE om deze positieve spiraal te behouden.",
    },
  };

  const level = score < 2.5 ? "low" : score < 3.5 ? "medium" : "high";
  return adviceMap[category]?.[level] || "Blijf investeren in dit thema.";
}
