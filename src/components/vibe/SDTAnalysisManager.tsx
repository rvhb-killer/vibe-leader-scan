import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, Target, Users, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

interface SDTAnalysisManagerProps {
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

const SDTAnalysisManager = ({ autonomyScore, competenceScore, relatednessScore }: SDTAnalysisManagerProps) => {
  const needs: SDTNeed[] = [
    {
      name: "Autonomie",
      score: autonomyScore,
      icon: <Brain className="h-6 w-6" />,
      color: "#10B981", // Green
      description: "Hoe goed je teamleden keuzevrijheid en eigenaarschap ervaren door jouw leiderschap.",
      tips: {
        low: [
          "Delegeer meer beslissingen naar je teamleden",
          "Vraag vaker 'Wat denk jij?' voordat je zelf richting geeft",
          "Geef kaders mee, maar laat de 'hoe' over aan je medewerkers"
        ],
        medium: [
          "Experimenteer met resultaatafspraken i.p.v. taakafspraken",
          "Check in team-overleggen wie meer verantwoordelijkheid wil",
          "Creëer ruimte voor eigen initiatieven binnen projecten"
        ],
        high: [
          "Deel je aanpak met andere leidinggevenden",
          "Bewaak dat autonomie niet omslaat in vrijblijvendheid",
          "Ondersteun teamleden om zelf ook leiderschap te tonen"
        ]
      }
    },
    {
      name: "Competentie",
      score: competenceScore,
      icon: <Target className="h-6 w-6" />,
      color: "#F59E0B", // Amber
      description: "Hoe effectief je teamleden ondersteunt in hun groei en het ervaren van impact.",
      tips: {
        low: [
          "Geef vaker concrete, specifieke feedback (positief én constructief)",
          "Maak successen zichtbaar - vier ook kleine overwinningen",
          "Investeer in coaching-gesprekken over ontwikkeling"
        ],
        medium: [
          "Koppel taken bewust aan leerdoelen van teamleden",
          "Vraag regelmatig: 'Waar wil je beter in worden?'",
          "Creëer mogelijkheden voor stretch-opdrachten"
        ],
        high: [
          "Help teamleden hun expertise te delen met anderen",
          "Daag uit om buiten de comfortzone te stappen",
          "Faciliteer peer-coaching en kennisdeling"
        ]
      }
    },
    {
      name: "Verbondenheid",
      score: relatednessScore,
      icon: <Users className="h-6 w-6" />,
      color: "#8B5CF6", // Purple
      description: "Hoe goed je team zich gewaardeerd, gezien en verbonden voelt door jouw aandacht.",
      tips: {
        low: [
          "Plan wekelijks kort 1-op-1 contact met elk teamlid",
          "Toon oprechte interesse in de persoon, niet alleen de functie",
          "Geef expliciete waardering - zeg wat je waardeert en waarom"
        ],
        medium: [
          "Organiseer regelmatig informele team-momenten",
          "Betrek het team bij beslissingen die hen raken",
          "Vraag actief naar ideeën en input van stillere teamleden"
        ],
        high: [
          "Wees een verbinder - stimuleer onderlinge samenwerking",
          "Creëer een cultuur waar fouten maken veilig is",
          "Help nieuwe teamleden zich snel thuis te voelen"
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
      high: "Sterk"
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

  // Determine leadership profile
  const getLeadershipProfile = () => {
    if (overallScore >= 3.5) {
      return {
        title: "🌟 Motiverende Leider",
        description: "Je creëert een omgeving waarin je team intrinsiek gemotiveerd is. Je vervult de basisbehoeften van je medewerkers goed.",
        advice: "Blijf dit vasthouden en help andere leidinggevenden om ook zo te groeien."
      };
    } else if (overallScore >= 2.5) {
      return {
        title: "⚡ Groeiende Leider",
        description: "Je legt een goede basis, maar er zijn kansen om je team nog meer te motiveren.",
        advice: "Focus vooral op je zwakste gebied om een beter evenwicht te creëren."
      };
    } else {
      return {
        title: "🔋 Leiderschap onder Druk",
        description: "Meerdere gebieden vragen aandacht. Dit kan leiden tot verminderde motivatie en betrokkenheid in je team.",
        advice: "Kies één concreet focuspunt om mee te starten en bouw van daaruit verder."
      };
    }
  };

  const profile = getLeadershipProfile();

  return (
    <Card className="p-8 shadow-lg mb-8 border-2 border-primary/20">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-semibold text-primary mb-2">
          Self-Determination Theory voor Leiders
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Volgens de Self-Determination Theory (Deci & Ryan) zijn er drie universele psychologische 
          basisbehoeften. Als leider beïnvloed je hoe goed je team deze ervaart.
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

      {/* Leadership Profile Card */}
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
              <p className="text-sm font-semibold text-primary mb-1">💪 Sterkste gebied</p>
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
          📚 Leiderschapstips per Behoefte
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

export default SDTAnalysisManager;
