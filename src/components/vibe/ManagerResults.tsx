import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import {
  managerCategories,
  calculateManagerCategoryScores,
  getManagerAdvice,
} from "@/lib/managerVibeQuestions";

interface ManagerResultsProps {
  answers: Record<string, number>;
  onRestart: () => void;
}

const ManagerResults = ({ answers, onRestart }: ManagerResultsProps) => {
  const categoryScores = calculateManagerCategoryScores(answers);

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-green-500";
    if (score >= 3) return "text-amber-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 4) return "bg-green-500";
    if (score >= 3) return "bg-amber-500";
    return "bg-red-500";
  };

  const overallScore =
    Object.values(categoryScores).reduce((a, b) => a + b, 0) /
    Object.values(categoryScores).length;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4">
              <BarChart3 className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl font-display font-bold text-primary mb-4">
              Jouw Leiderschaps VIBE-Score
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hieronder vind je een overzicht van je zelfevaluatie op de vier VIBE-dimensies.
            </p>
          </div>

          {/* Overall Score */}
          <Card className="p-8 mb-8 text-center bg-gradient-to-br from-accent/10 to-primary/10">
            <h2 className="text-2xl font-semibold mb-2">Totaalscore</h2>
            <div className={`text-6xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore.toFixed(1)}
            </div>
            <p className="text-muted-foreground mt-2">van 5.0</p>
          </Card>

          {/* Category Scores */}
          <div className="grid gap-6 mb-8">
            {Object.entries(managerCategories).map(([category, info], index) => {
              const score = categoryScores[category] || 0;
              const advice = getManagerAdvice(category, score);

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: info.color }}
                        />
                        <h3 className="text-xl font-semibold">{category}</h3>
                      </div>
                      <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                        {score.toFixed(1)}
                      </div>
                    </div>

                    <div className="mb-4">
                      <Progress
                        value={(score / 5) * 100}
                        className="h-3"
                        style={
                          {
                            "--progress-background": getProgressColor(score),
                          } as React.CSSProperties
                        }
                      />
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {advice}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Tips Section */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Algemene Tips</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Bespreek deze resultaten met je team en vraag om hun perspectief.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Focus op één of twee categorieën waar je de meeste groei wilt realiseren.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Plan regelmatige momenten voor zelfreflectie op je leiderschapsgedrag.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Vergelijk je eigen scores met de teamresultaten voor waardevolle inzichten.
              </li>
            </ul>
          </Card>

          {/* Actions */}
          <div className="flex justify-center">
            <Button onClick={onRestart} size="lg" variant="outline" className="px-8">
              <RotateCcw className="mr-2 h-5 w-5" />
              Opnieuw beginnen
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ManagerResults;
