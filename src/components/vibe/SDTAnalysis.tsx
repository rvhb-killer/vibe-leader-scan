import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, Target, Users, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

interface SDTAnalysisProps {
  autonomyScore: number;
  competenceScore: number;
  relatednessScore: number;
}

interface SDTNeed {
  name: string;
  score: number;
  icon: React.ReactNode;
  color: string;
  description: string;
  tips: {
    low: string[];
    medium: string[];
    high: string[];
  };
}

const SDTAnalysis = ({ autonomyScore, competenceScore, relatednessScore }: SDTAnalysisProps) => {
  const needs: SDTNeed[] = [
    {
      name: "Autonomie",
      score: autonomyScore,
      icon: <Brain className="h-6 w-6" />,
      color: "#10B981", // Green
      description: "Je behoefte aan keuzevrijheid, zelfbeschikking en eigenaarschap over je werk.",
      tips: {
        low: [
          "Vraag om meer inspraak bij beslissingen die jouw werk raken",
          "Bespreek met je leidinggevende welke taken je zelfstandiger kunt uitvoeren",
          "Identificeer micro-momenten waar je wél keuzes kunt maken"
        ],
        medium: [
          "Zoek actief naar nieuwe verantwoordelijkheden",
          "Experimenteer met eigen aanpak binnen bestaande kaders",
          "Deel je ideeën proactief in teamoverleggen"
        ],
        high: [
          "Deel je werkwijze met collega's als inspiratie",
          "Help anderen om ook meer autonomie te ontwikkelen",
          "Zoek naar nieuwe uitdagingen om te groeien"
        ]
      }
    },
    {
      name: "Competentie",
      score: competenceScore,
      icon: <Target className="h-6 w-6" />,
      color: "#F59E0B", // Amber
      description: "Je behoefte om effectief te zijn, te groeien en impact te maken met je vaardigheden.",
      tips: {
        low: [
          "Vraag om duidelijkere feedback op je prestaties",
          "Identificeer één vaardigheid om de komende maand te ontwikkelen",
          "Zoek een mentor of buddy voor ondersteuning"
        ],
        medium: [
          "Stel concrete leerdoelen voor jezelf op",
          "Vraag om uitdagendere taken die je kunnen stretchen",
          "Vier je successen bewuster - houd een 'wins' lijstje bij"
        ],
        high: [
          "Deel je expertise door anderen te coachen",
          "Neem een stretch-project aan buiten je comfortzone",
          "Documenteer en deel je best practices"
        ]
      }
    },
    {
      name: "Verbondenheid",
      score: relatednessScore,
      icon: <Users className="h-6 w-6" />,
      color: "#8B5CF6", // Purple
      description: "Je behoefte aan betekenisvolle relaties, erbij horen en je gewaardeerd voelen.",
      tips: {
        low: [
          "Plan bewust informele momenten met collega's",
          "Deel ook persoonlijke successen of uitdagingen",
          "Vraag actief om feedback en waardering"
        ],
        medium: [
          "Neem initiatief voor team-activiteiten",
          "Bied hulp aan collega's die het druk hebben",
          "Geef vaker complimenten en erkenning"
        ],
        high: [
          "Wees een verbinder tussen verschillende teamleden",
          "Help nieuwe collega's zich thuis te voelen",
          "Organiseer kennisdeling of sociale momenten"
        ]
      }
    }
  ];

  const getLevel = (score: number): "low" | "medium" | "high" => {
    if (score < 2.5) return "low";
    if (score < 3.5) return "medium";
    return "high";
  };

  const getLevelLabel = (level: "low" | "medium" | "high"): string => {
    return {
      low: "Vraagt aandacht",
      medium: "In ontwikkeling",
      high: "Goed vervuld"
    }[level];
  };

  const getLevelIcon = (level: "low" | "medium" | "high") => {
    return {
      low: <AlertCircle className="h-4 w-4 text-destructive" />,
      medium: <TrendingUp className="h-4 w-4 text-secondary" />,
      high: <CheckCircle className="h-4 w-4 text-accent" />
    }[level];
  };

  // Determine strongest and weakest need
  const sortedNeeds = [...needs].sort((a, b) => b.score - a.score);
  const strongest = sortedNeeds[0];
  const weakest = sortedNeeds[sortedNeeds.length - 1];

  // Calculate overall SDT score
  const overallScore = (autonomyScore + competenceScore + relatednessScore) / 3;
  const overallLevel = getLevel(overallScore);

  // Determine motivation profile
  const getMotivationProfile = () => {
    if (overallScore >= 3.5) {
      return {
        title: "🌟 Intrinsiek Gemotiveerd",
        description: "Je basale psychologische behoeften zijn goed vervuld. Je ervaart veel innerlijke motivatie en bevlogenheid.",
        advice: "Focus op het behouden van deze positieve staat en help anderen om ook te groeien."
      };
    } else if (overallScore >= 2.5) {
      return {
        title: "⚡ Groeiende Motivatie",
        description: "Er is een solide basis, maar er liggen kansen om je motivatie te versterken.",
        advice: "Richt je vooral op je zwakste behoefte om een beter evenwicht te creëren."
      };
    } else {
      return {
        title: "🔋 Motivatie onder Druk",
        description: "Meerdere basisbehoeften vragen aandacht. Dit kan leiden tot verminderde energie en betrokkenheid.",
        advice: "Bespreek dit met je leidinggevende en kies één concrete actie om mee te starten."
      };
    }
  };

  const profile = getMotivationProfile();

  return (
    <Card className="p-8 shadow-lg mb-8 border-2 border-primary/20">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-semibold text-primary mb-2">
          Self-Determination Theory Analyse
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Volgens de Self-Determination Theory (Deci & Ryan) zijn er drie universele psychologische 
          basisbehoeften die essentieel zijn voor welzijn en intrinsieke motivatie.
        </p>
      </div>

      {/* Three Gauges */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {needs.map((need, index) => {
          const level = getLevel(need.score);
          const percentage = (need.score / 5) * 100;
          
          return (
            <motion.div
              key={need.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <Card className="p-6 text-center h-full border-2" style={{ borderColor: `${need.color}40` }}>
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${need.color}20`, color: need.color }}
                >
                  {need.icon}
                </div>
                
                {/* Name */}
                <h3 className="text-lg font-display font-semibold text-primary mb-2">
                  {need.name}
                </h3>
                
                {/* Circular Gauge */}
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke={need.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${percentage * 2.64} 264`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold" style={{ color: need.color }}>
                      {need.score.toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">/ 5.0</span>
                  </div>
                </div>
                
                {/* Level Badge */}
                <div className="flex items-center justify-center gap-1 mb-3">
                  {getLevelIcon(level)}
                  <span className={`text-sm font-medium ${
                    level === 'low' ? 'text-destructive' : 
                    level === 'medium' ? 'text-secondary' : 'text-accent'
                  }`}>
                    {getLevelLabel(level)}
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {need.description}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Motivation Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className={`p-6 mb-6 ${
          overallLevel === 'high' ? 'bg-accent/10 border-accent/30' :
          overallLevel === 'medium' ? 'bg-secondary/10 border-secondary/30' :
          'bg-destructive/10 border-destructive/30'
        } border-2`}>
          <div className="text-center mb-4">
            <h3 className="text-xl font-display font-semibold text-primary">
              {profile.title}
            </h3>
            <p className="text-muted-foreground mt-2">{profile.description}</p>
            <p className="text-sm font-medium mt-3 text-primary">{profile.advice}</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-background/50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-primary mb-1">💪 Sterkste behoefte</p>
              <p className="font-medium" style={{ color: strongest.color }}>{strongest.name}</p>
              <p className="text-xs text-muted-foreground mt-1">Score: {strongest.score.toFixed(2)}</p>
            </div>
            <div className="bg-background/50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-primary mb-1">🎯 Focus punt</p>
              <p className="font-medium" style={{ color: weakest.color }}>{weakest.name}</p>
              <p className="text-xs text-muted-foreground mt-1">Score: {weakest.score.toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Personalized Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h3 className="text-lg font-display font-semibold text-primary mb-4 text-center">
          📚 Gepersonaliseerde Groeitips
        </h3>
        <div className="space-y-4">
          {needs.map((need) => {
            const level = getLevel(need.score);
            const tips = need.tips[level];
            
            return (
              <Card key={need.name} className="p-4" style={{ borderLeft: `4px solid ${need.color}` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ color: need.color }}>{need.icon}</span>
                  <h4 className="font-semibold text-primary">{need.name}</h4>
                </div>
                <ul className="space-y-1">
                  {tips.map((tip, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-xs mt-1" style={{ color: need.color }}>•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </Card>
  );
};

export default SDTAnalysis;
