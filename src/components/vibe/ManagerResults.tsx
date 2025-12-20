import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, RotateCcw, Info } from "lucide-react";
import type { HerzbergProfile } from "@/lib/vibeQuestions";
import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  managerCategories,
  calculateManagerCategoryScores,
  getManagerAdvice,
  calculateManagerHerzbergAnalysis,
} from "@/lib/managerVibeQuestions";
import HerzbergMatrix from "./HerzbergMatrix";
import SDTAnalysisManager from "./SDTAnalysisManager";
import jsPDF from "jspdf";

interface ManagerResultsProps {
  answers: Record<string, number>;
  onRestart: () => void;
}

const ManagerResults = ({ answers, onRestart }: ManagerResultsProps) => {
  const categoryScores = calculateManagerCategoryScores(answers);
  const herzberg = calculateManagerHerzbergAnalysis(answers);

  // Prepare chart data
  const chartData = Object.keys(managerCategories).map((cat) => ({
    category: managerCategories[cat as keyof typeof managerCategories].short,
    score: categoryScores[cat] || 0,
    fullMark: 5,
  }));

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("VIBE Leiderschaps Rapport", 20, 20);

    doc.setFontSize(12);
    let yPos = 40;

    // VIBE Scores
    doc.setFont(undefined, "bold");
    doc.text("VIBE Scores", 20, yPos);
    yPos += 10;

    Object.keys(managerCategories).forEach((cat) => {
      const score = categoryScores[cat]?.toFixed(2) || "0.00";
      const interpretation = getInterpretation(categoryScores[cat] || 0);
      const advice = getManagerAdvice(cat, categoryScores[cat] || 0);

      doc.setFont(undefined, "bold");
      doc.text(`${cat}: ${score}/5 (${interpretation})`, 20, yPos);
      yPos += 7;

      doc.setFont(undefined, "normal");
      const splitAdvice = doc.splitTextToSize(advice, 170);
      doc.text(splitAdvice, 20, yPos);
      yPos += splitAdvice.length * 7 + 5;

      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
    });

    // Herzberg Analysis
    yPos += 10;
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFont(undefined, "bold");
    doc.text("Herzberg Leiderschaps-Analyse", 20, yPos);
    yPos += 10;

    doc.setFont(undefined, "normal");
    doc.text(`Leiderschapseffect Score: ${herzberg.hygieneScore.toFixed(2)}`, 20, yPos);
    yPos += 7;
    doc.text(`Motivatie-impact Score: ${herzberg.motivatorScore.toFixed(2)}`, 20, yPos);
    yPos += 7;
    doc.text(`Profiel: ${getProfileLabel(herzberg.profile)}`, 20, yPos);
    yPos += 10;

    doc.setFont(undefined, "bold");
    doc.text("Analyse:", 20, yPos);
    yPos += 7;
    doc.setFont(undefined, "normal");
    doc.text(`${herzberg.adviceDetail.title}`, 20, yPos);
    yPos += 6;
    doc.text(`${herzberg.adviceDetail.subtitle}`, 20, yPos);
    yPos += 10;

    doc.text("Interpretatie:", 20, yPos);
    yPos += 6;
    herzberg.adviceDetail.interpretation.forEach((item) => {
      const split = doc.splitTextToSize(`• ${item}`, 170);
      doc.text(split, 25, yPos);
      yPos += split.length * 5;
    });
    yPos += 4;

    doc.text("Concrete stappen:", 20, yPos);
    yPos += 6;
    herzberg.adviceDetail.steps.forEach((item) => {
      const split = doc.splitTextToSize(`• ${item}`, 170);
      doc.text(split, 25, yPos);
      yPos += split.length * 5;
    });

    doc.save("VIBE_Leiderschaps_Rapport.pdf");
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-primary">
              🎉 Jouw Leiderschaps VIBE Resultaten
            </h1>
            <p className="text-lg text-muted-foreground">
              Ontdek je leiderschapsprofiel én motivatie-impact
            </p>
          </div>

          {/* VIBE Radar Chart */}
          <Card className="p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-display font-semibold mb-6 text-center text-primary">
              Jouw Leiderschapsprofiel
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={chartData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 14, fontWeight: 600 }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 5]} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="hsl(var(--accent))"
                  fill="hsl(var(--accent))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Detailed VIBE Results */}
          <h2 className="text-2xl font-display font-semibold mb-6 text-center text-primary">
            Gedetailleerde VIBE Scores
          </h2>

          <div className="space-y-6 mb-8">
            {Object.keys(managerCategories).map((cat, index) => {
              const score = categoryScores[cat] || 0;
              const interpretation = getInterpretation(score);
              const advice = getManagerAdvice(cat, score);
              const categoryInfo = managerCategories[cat as keyof typeof managerCategories];

              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    className="p-6 shadow-md border-l-4"
                    style={{ borderLeftColor: categoryInfo.color }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-display font-semibold text-primary">{cat}</h3>
                      <div className="text-right">
                        <div className="text-3xl font-bold" style={{ color: categoryInfo.color }}>
                          {score.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">/ 5.00</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: `${categoryInfo.color}20`,
                          color: categoryInfo.color,
                        }}
                      >
                        {interpretation}
                      </span>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2 text-primary">💡 Advies:</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{advice}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* SDT Analysis for Managers */}
          <SDTAnalysisManager
            autonomyScore={categoryScores["Voice & Autonomy"] || 0}
            competenceScore={
              ((categoryScores["Impact & Purpose"] || 0) + (categoryScores["Bold Leadership"] || 0)) / 2
            }
            relatednessScore={categoryScores["Empathy & Recognition"] || 0}
          />

          {/* Herzberg Analysis */}
          <Card className="p-8 shadow-lg mb-8 border-2 border-accent/20">
            <div className="flex items-center justify-center gap-2 mb-6">
              <h2 className="text-2xl font-display font-semibold text-center text-primary">
                Herzberg Leiderschaps-Analyse
              </h2>
              <div className="group relative">
                <Info className="h-5 w-5 text-muted-foreground cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-3 bg-popover border rounded-lg shadow-lg text-sm z-10">
                  <p className="text-popover-foreground">
                    <strong>Herzberg voor Leiders:</strong> Analyseert je leiderschapseffect
                    (structuur, richting) versus je motivatie-impact (inspiratie, erkenning).
                  </p>
                </div>
              </div>
            </div>

            <HerzbergMatrix
              profile={herzberg.profile as HerzbergProfile}
              hygieneScore={herzberg.hygieneScore}
              motivatorScore={herzberg.motivatorScore}
              isManager={true}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-muted/50 p-6 rounded-lg space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-primary mb-1">
                  {herzberg.adviceDetail.title}
                </h3>
                <p className="text-accent font-medium">{herzberg.adviceDetail.subtitle}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-primary mb-2">📋 Interpretatie</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {herzberg.adviceDetail.interpretation.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-primary mb-2">💡 Wat dit betekent</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {herzberg.adviceDetail.meaning.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-primary mb-2">🎯 Prioriteiten</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {herzberg.adviceDetail.priorities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-primary mb-2">✅ Concrete stappen</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {herzberg.adviceDetail.steps.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleDownloadPDF} size="lg" variant="outline" className="px-8">
              <Download className="mr-2 h-5 w-5" />
              Download als PDF
            </Button>

            <Button
              onClick={onRestart}
              size="lg"
              className="gradient-accent hover:opacity-90 transition-opacity px-8"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Opnieuw beginnen
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Helper functions
function getInterpretation(score: number): string {
  if (score < 2.5) return "Laag - Directe aandacht nodig";
  if (score < 3.5) return "Gemiddeld - Ruimte voor verbetering";
  return "Sterk - Goed bezig!";
}

function getProfileLabel(profile: string): string {
  const labels: Record<string, string> = {
    "low-low": "Kritiek Gebied",
    "low-high": "Goede intenties, beperkte grip",
    "high-low": "Aanwezig maar niet inspirerend",
    "high-high": "Optimale Leider",
  };
  return labels[profile] || profile;
}

export default ManagerResults;
