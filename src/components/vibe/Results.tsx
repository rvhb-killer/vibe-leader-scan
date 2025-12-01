import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from "recharts";
import { categories, getAdvice } from "@/lib/vibeQuestions";
import type { QuestionnaireAnswers } from "@/pages/Index";
import jsPDF from "jspdf";

interface ResultsProps {
  answers: QuestionnaireAnswers;
  onRestart: () => void;
}

const Results = ({ answers, onRestart }: ResultsProps) => {
  // Calculate scores per category
  const scores: Record<string, { score: number; count: number }> = {};
  
  Object.entries(answers).forEach(([key, value]) => {
    const questionNum = parseInt(key.replace('q', ''));
    const category = getQuestionCategory(questionNum);
    
    if (!scores[category]) {
      scores[category] = { score: 0, count: 0 };
    }
    
    scores[category].score += value;
    scores[category].count += 1;
  });

  // Calculate averages
  const averages: Record<string, number> = {};
  Object.keys(scores).forEach(cat => {
    averages[cat] = scores[cat].score / scores[cat].count;
  });

  // Prepare chart data
  const chartData = Object.keys(categories).map(cat => ({
    category: categories[cat as keyof typeof categories].short,
    score: averages[cat] || 0,
    fullMark: 5,
  }));

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("VIBE Leiderschap Rapport", 20, 20);
    
    doc.setFontSize(12);
    let yPos = 40;
    
    Object.keys(categories).forEach(cat => {
      const avg = averages[cat]?.toFixed(2) || "0.00";
      const interpretation = getInterpretation(averages[cat] || 0);
      const advice = getAdvice(cat, averages[cat] || 0);
      
      doc.setFont(undefined, 'bold');
      doc.text(`${cat}: ${avg}/5 (${interpretation})`, 20, yPos);
      yPos += 7;
      
      doc.setFont(undefined, 'normal');
      const splitAdvice = doc.splitTextToSize(advice, 170);
      doc.text(splitAdvice, 20, yPos);
      yPos += (splitAdvice.length * 7) + 5;
      
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
    });
    
    doc.save("VIBE_Rapport.pdf");
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
              🎉 Jouw VIBE Resultaten
            </h1>
            <p className="text-lg text-muted-foreground">
              Ontdek je leiderschapsprofiel en concrete actiepunten
            </p>
          </div>

          {/* Chart */}
          <Card className="p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-display font-semibold mb-6 text-center text-primary">
              Jouw Leiderschapsprofiel
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={chartData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis 
                  dataKey="category" 
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 14, fontWeight: 600 }}
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

          {/* Detailed Results */}
          <div className="space-y-6 mb-8">
            {Object.keys(categories).map((cat, index) => {
              const avg = averages[cat] || 0;
              const interpretation = getInterpretation(avg);
              const advice = getAdvice(cat, avg);
              const categoryInfo = categories[cat as keyof typeof categories];
              
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="p-6 shadow-md border-l-4" style={{ borderLeftColor: categoryInfo.color }}>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-display font-semibold text-primary">
                        {cat}
                      </h3>
                      <div className="text-right">
                        <div className="text-3xl font-bold" style={{ color: categoryInfo.color }}>
                          {avg.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">/ 5.00</div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                        style={{ 
                          backgroundColor: `${categoryInfo.color}20`,
                          color: categoryInfo.color 
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

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleDownloadPDF}
              size="lg"
              variant="outline"
              className="px-8"
            >
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
function getQuestionCategory(questionNum: number): string {
  if (questionNum <= 7) return "Voice & Autonomy";
  if (questionNum <= 14) return "Impact & Purpose";
  if (questionNum <= 21) return "Bold Leadership";
  if (questionNum <= 28) return "Recognition & Reward";
  return "Reflectie";
}

function getInterpretation(score: number): string {
  if (score < 2.5) return "Laag - Directe aandacht nodig";
  if (score < 3.5) return "Gemiddeld - Ruimte voor verbetering";
  return "Sterk - Goed bezig!";
}

export default Results;
