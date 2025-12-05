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
      medium: "Je zit in een gemiddelde flow. Er is ruimte om te groeien. Volg je energieniveau op en benoem wat je nodig hebt in de andere VIBE-thema’s.",
      high: "Je zit goed in je vel en voelt je betrokken. Blijf bewust investeren in je werkervaring. Houd aandacht voor balans, groei en energie om deze lijn vast te houden.",
    },
  };


  const level = score < 2.5 ? "low" : score < 3.5 ? "medium" : "high";
  return adviceMap[category]?.[level] || "Blijf investeren in dit thema.";
}
