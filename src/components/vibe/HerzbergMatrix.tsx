import { motion } from "framer-motion";
import type { HerzbergProfile } from "@/lib/vibeQuestions";

interface HerzbergMatrixProps {
  profile: HerzbergProfile;
  hygieneScore: number;
  motivatorScore: number;
}

const quadrantInfo = {
  "low-low": {
    title: "Kritiek Gebied",
    subtitle: "Klachten én geen motivatie",
    emoji: "⚠️",
    bgClass: "bg-red-100 dark:bg-red-950",
    borderClass: "border-red-500",
    position: { row: 1, col: 0 },
  },
  "low-high": {
    title: "Gemotiveerd maar Gehinderd",
    subtitle: "Motivatie ondanks obstakels",
    emoji: "🔥",
    bgClass: "bg-amber-100 dark:bg-amber-950",
    borderClass: "border-amber-500",
    position: { row: 0, col: 0 },
  },
  "high-low": {
    title: "Comfortzone",
    subtitle: "Stabiel maar geen drive",
    emoji: "😐",
    bgClass: "bg-blue-100 dark:bg-blue-950",
    borderClass: "border-blue-500",
    position: { row: 1, col: 1 },
  },
  "high-high": {
    title: "Optimale Zone",
    subtitle: "Ideale combinatie",
    emoji: "🌟",
    bgClass: "bg-emerald-100 dark:bg-emerald-950",
    borderClass: "border-emerald-500",
    position: { row: 0, col: 1 },
  },
};

const HerzbergMatrix = ({ profile, hygieneScore, motivatorScore }: HerzbergMatrixProps) => {
  const activeQuadrant = quadrantInfo[profile];

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Axis Labels */}
      <div className="relative">
        {/* Y-axis label */}
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-medium text-muted-foreground whitespace-nowrap">
          Motivatie →
        </div>
        
        {/* Matrix Grid */}
        <div className="ml-4">
          <div className="grid grid-cols-2 gap-2">
            {/* Top Left: Low Hygiene, High Motivation */}
            <QuadrantCell
              profile="low-high"
              isActive={profile === "low-high"}
              info={quadrantInfo["low-high"]}
            />
            
            {/* Top Right: High Hygiene, High Motivation */}
            <QuadrantCell
              profile="high-high"
              isActive={profile === "high-high"}
              info={quadrantInfo["high-high"]}
            />
            
            {/* Bottom Left: Low Hygiene, Low Motivation */}
            <QuadrantCell
              profile="low-low"
              isActive={profile === "low-low"}
              info={quadrantInfo["low-low"]}
            />
            
            {/* Bottom Right: High Hygiene, Low Motivation */}
            <QuadrantCell
              profile="high-low"
              isActive={profile === "high-low"}
              info={quadrantInfo["high-low"]}
            />
          </div>
          
          {/* X-axis label */}
          <div className="text-center mt-3 text-sm font-medium text-muted-foreground">
            Hygiëne →
          </div>
        </div>
      </div>

      {/* Score Indicators */}
      <div className="mt-6 flex justify-center gap-8 text-sm">
        <div className="text-center">
          <div className="text-muted-foreground mb-1">Hygiëne Score</div>
          <div className="text-2xl font-bold text-primary">{hygieneScore.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">
            {hygieneScore >= 3 ? "Hoog" : "Laag"}
          </div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground mb-1">Motivator Score</div>
          <div className="text-2xl font-bold text-accent">{motivatorScore.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">
            {motivatorScore >= 3 ? "Hoog" : "Laag"}
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuadrantCellProps {
  profile: HerzbergProfile;
  isActive: boolean;
  info: typeof quadrantInfo[HerzbergProfile];
}

const QuadrantCell = ({ profile, isActive, info }: QuadrantCellProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={`
        relative p-4 rounded-lg border-2 transition-all duration-300
        ${isActive 
          ? `${info.bgClass} ${info.borderClass} shadow-lg scale-105` 
          : 'bg-muted/30 border-border/50 opacity-50'
        }
      `}
    >
      <div className="text-center">
        <span className="text-2xl mb-2 block">{info.emoji}</span>
        <h4 className={`font-semibold text-sm ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
          {info.title}
        </h4>
        <p className={`text-xs mt-1 ${isActive ? 'text-foreground/70' : 'text-muted-foreground/70'}`}>
          {info.subtitle}
        </p>
      </div>
      
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center"
        >
          <span className="text-accent-foreground text-xs font-bold">✓</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HerzbergMatrix;
