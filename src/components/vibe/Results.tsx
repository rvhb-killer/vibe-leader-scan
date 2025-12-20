import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip 
} from "recharts";
import { categories, getAdvice, calculateHerzbergAnalysis, questions } from "@/lib/vibeQuestions";
import type { QuestionnaireAnswers } from "@/pages/Index";
import jsPDF from "jspdf";
import HerzbergMatrix from "./HerzbergMatrix";
import VibeHighlight from "./VibeHighlight";
import SDTAnalysis from "./SDTAnalysis";

interface ResultsProps {
  answers: QuestionnaireAnswers;
  onRestart: () => void;
}

const Results = ({ answers, onRestart }: ResultsProps) => {
  // Calculate VIBE scores per category
  const scores: Record<string, { score: number; count: number }> = {};
  
  Object.entries(answers).forEach(([key, value]) => {
    const questionNum = parseInt(key.replace('q', ''));
    const question = questions.find(q => q.id === questionNum);
    
    if (question) {
      const category = question.category;
      
      if (!scores[category]) {
        scores[category] = { score: 0, count: 0 };
      }
      
      scores[category].score += value;
      scores[category].count += 1;
    }
  });

  // Calculate averages
  const averages: Record<string, number> = {};
  Object.keys(scores).forEach(cat => {
    averages[cat] = scores[cat].score / scores[cat].count;
  });

  // Calculate Herzberg analysis
  const herzberg = calculateHerzbergAnalysis(answers);

  // Calculate SDT scores based on VIBE mapping
  // Autonomie = Voice & Autonomy
  // Competentie = (Impact & Purpose + Bold Leadership) / 2
  // Verbondenheid = Empathy & Recognition
  const autonomyScore = averages["Voice & Autonomy"] || 0;
  const competenceScore = ((averages["Impact & Purpose"] || 0) + (averages["Bold Leadership"] || 0)) / 2;
  const relatednessScore = averages["Empathy & Recognition"] || 0;

  // Prepare chart data
  const chartData = Object.keys(categories).map(cat => ({
    category: categories[cat as keyof typeof categories].short,
    score: averages[cat] || 0,
    fullMark: 5,
  }));

  // SDT needs for PDF
  const sdtNeeds = [
    {
      name: "Autonomie",
      score: autonomyScore,
      color: "#10B981",
      description: "Je behoefte aan keuzevrijheid, zelfbeschikking en eigenaarschap over je werk."
    },
    {
      name: "Competentie",
      score: competenceScore,
      color: "#F59E0B",
      description: "Je behoefte om effectief te zijn, te groeien en impact te maken met je vaardigheden."
    },
    {
      name: "Verbondenheid",
      score: relatednessScore,
      color: "#8B5CF6",
      description: "Je behoefte aan betekenisvolle relaties, erbij horen en je gewaardeerd voelen."
    }
  ];

  const getSDTLevel = (score: number): "low" | "medium" | "high" => {
    if (score < 2.5) return "low";
    if (score < 3.5) return "medium";
    return "high";
  };

  const getSDTLevelLabel = (level: "low" | "medium" | "high"): string => {
    return {
      low: "Vraagt aandacht",
      medium: "In ontwikkeling",
      high: "Goed vervuld"
    }[level];
  };

  const getSDTMotivationProfile = () => {
    const overallScore = (autonomyScore + competenceScore + relatednessScore) / 3;
    if (overallScore >= 3.5) {
      return {
        title: "Intrinsiek Gemotiveerd",
        description: "Je basale psychologische behoeften zijn goed vervuld. Je ervaart veel innerlijke motivatie en bevlogenheid.",
        advice: "Focus op het behouden van deze positieve staat en help anderen om ook te groeien."
      };
    } else if (overallScore >= 2.5) {
      return {
        title: "Groeiende Motivatie",
        description: "Er is een solide basis, maar er liggen kansen om je motivatie te versterken.",
        advice: "Richt je vooral op je zwakste behoefte om een beter evenwicht te creëren."
      };
    } else {
      return {
        title: "Motivatie onder Druk",
        description: "Meerdere basisbehoeften vragen aandacht. Dit kan leiden tot verminderde energie en betrokkenheid.",
        advice: "Bespreek dit met je leidinggevende en kies één concrete actie om mee te starten."
      };
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = margin;

    // Helper function to check page break
    const checkPageBreak = (neededHeight: number) => {
      if (yPos + neededHeight > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
        return true;
      }
      return false;
    };

    // Helper to draw a colored card background
    const drawCard = (x: number, y: number, width: number, height: number, borderColor?: string) => {
      doc.setFillColor(248, 250, 252); // Light gray background
      doc.setDrawColor(borderColor ? borderColor : '#e2e8f0');
      doc.roundedRect(x, y, width, height, 3, 3, 'FD');
    };

    // Helper to draw section header
    const drawSectionHeader = (title: string, emoji?: string) => {
      checkPageBreak(20);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59); // slate-800
      const displayTitle = emoji ? `${emoji} ${title}` : title;
      doc.text(displayTitle, pageWidth / 2, yPos, { align: 'center' });
      yPos += 12;
    };

    // ==================== HEADER ====================
    doc.setFillColor(59, 130, 246); // Blue header
    doc.rect(0, 0, pageWidth, 45, 'F');
    
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text("VIBE Leiderschap Rapport", pageWidth / 2, 25, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Gegenereerd op ${new Date().toLocaleDateString('nl-NL')}`, pageWidth / 2, 37, { align: 'center' });
    
    yPos = 55;

    // ==================== INTRO TEXT ====================
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139); // slate-500
    const introText = "Je beantwoordde 29 stellingen over hoe jij jouw werkcontext en motivatie beleeft. Op basis daarvan krijg je een score per bouwsteen van het VIBE-model, gekoppeld aan de Herzberg Motivatie-Analyse.";
    const splitIntro = doc.splitTextToSize(introText, contentWidth);
    doc.text(splitIntro, margin, yPos);
    yPos += splitIntro.length * 5 + 10;

    // ==================== VIBE SCORES SECTION ====================
    drawSectionHeader("Gedetailleerde VIBE Scores");
    
    Object.keys(categories).forEach((cat) => {
      const avg = averages[cat] || 0;
      const interpretation = getInterpretation(avg);
      const advice = getAdvice(cat, avg);
      const categoryInfo = categories[cat as keyof typeof categories];
      
      // Calculate card height
      const adviceLines = doc.splitTextToSize(advice, contentWidth - 30);
      const cardHeight = 45 + (adviceLines.length * 4);
      
      checkPageBreak(cardHeight + 10);
      
      // Draw card with colored left border
      drawCard(margin, yPos, contentWidth, cardHeight, categoryInfo.color);
      
      // Colored left border
      doc.setFillColor(categoryInfo.color);
      doc.rect(margin, yPos, 4, cardHeight, 'F');
      
      // Category name
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text(cat, margin + 10, yPos + 10);
      
      // Score
      doc.setFontSize(18);
      doc.setTextColor(categoryInfo.color);
      doc.text(avg.toFixed(2), pageWidth - margin - 15, yPos + 12, { align: 'right' });
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text("/ 5.00", pageWidth - margin - 5, yPos + 12, { align: 'right' });
      
      // Interpretation badge
      doc.setFontSize(9);
      doc.setTextColor(categoryInfo.color);
      doc.text(interpretation, margin + 10, yPos + 20);
      
      // Advice
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text("Advies:", margin + 10, yPos + 30);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text(adviceLines, margin + 10, yPos + 36);
      
      yPos += cardHeight + 8;
    });

    // ==================== HERZBERG SECTION ====================
    checkPageBreak(100);
    yPos += 5;
    drawSectionHeader("Herzberg Motivatie-Analyse");
    
    // Herzberg explanation
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    const herzbergExplain = "Herzberg's Two-Factor Theory: Onderscheidt hygiënefactoren (voorkomen ontevredenheid) van motivatoren (stimuleren tevredenheid).";
    doc.text(herzbergExplain, pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;

    // Scores card
    const herzbergCardHeight = 30;
    drawCard(margin, yPos, contentWidth, herzbergCardHeight);
    
    // Hygiene score
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text("Hygiëne Score", margin + 30, yPos + 10, { align: 'center' });
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(herzberg.hygieneScore.toFixed(2), margin + 30, yPos + 22, { align: 'center' });
    
    // Motivator score
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text("Motivator Score", pageWidth - margin - 30, yPos + 10, { align: 'center' });
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(239, 68, 68); // accent color
    doc.text(herzberg.motivatorScore.toFixed(2), pageWidth - margin - 30, yPos + 22, { align: 'center' });
    
    // Profile
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text("Profiel", pageWidth / 2, yPos + 10, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(59, 130, 246);
    doc.text(getProfileLabel(herzberg.profile), pageWidth / 2, yPos + 22, { align: 'center' });
    
    yPos += herzbergCardHeight + 10;

    // Herzberg advice detail
    checkPageBreak(80);
    
    // Title and subtitle
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(herzberg.adviceDetail.title, margin, yPos);
    yPos += 6;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(239, 68, 68);
    doc.text(herzberg.adviceDetail.subtitle, margin, yPos);
    yPos += 10;

    // Interpretation
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text("Interpretatie", margin, yPos);
    yPos += 6;
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    herzberg.adviceDetail.interpretation.forEach(item => {
      checkPageBreak(10);
      const lines = doc.splitTextToSize(`• ${item}`, contentWidth - 5);
      doc.text(lines, margin + 5, yPos);
      yPos += lines.length * 4 + 2;
    });
    yPos += 4;

    // Meaning
    checkPageBreak(20);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text("Wat dit betekent", margin, yPos);
    yPos += 6;
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    herzberg.adviceDetail.meaning.forEach(item => {
      checkPageBreak(10);
      const lines = doc.splitTextToSize(`• ${item}`, contentWidth - 5);
      doc.text(lines, margin + 5, yPos);
      yPos += lines.length * 4 + 2;
    });
    yPos += 4;

    // Priorities
    checkPageBreak(20);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text("Prioriteiten", margin, yPos);
    yPos += 6;
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    herzberg.adviceDetail.priorities.forEach(item => {
      checkPageBreak(10);
      const lines = doc.splitTextToSize(`• ${item}`, contentWidth - 5);
      doc.text(lines, margin + 5, yPos);
      yPos += lines.length * 4 + 2;
    });
    yPos += 4;

    // Steps
    checkPageBreak(20);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text("Concrete stappen", margin, yPos);
    yPos += 6;
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    herzberg.adviceDetail.steps.forEach(item => {
      checkPageBreak(10);
      const lines = doc.splitTextToSize(`• ${item}`, contentWidth - 5);
      doc.text(lines, margin + 5, yPos);
      yPos += lines.length * 4 + 2;
    });

    // ==================== SDT SECTION ====================
    doc.addPage();
    yPos = margin;
    
    drawSectionHeader("Self-Determination Theory Analyse");
    
    // SDT explanation
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    const sdtExplain = "Volgens de Self-Determination Theory (Deci & Ryan) zijn er drie universele psychologische basisbehoeften die essentieel zijn voor welzijn en intrinsieke motivatie.";
    const splitSDT = doc.splitTextToSize(sdtExplain, contentWidth);
    doc.text(splitSDT, pageWidth / 2, yPos, { align: 'center' });
    yPos += splitSDT.length * 4 + 10;

    // Three SDT cards
    const sdtCardWidth = (contentWidth - 10) / 3;
    const sdtCardHeight = 60;
    
    sdtNeeds.forEach((need, index) => {
      const cardX = margin + (index * (sdtCardWidth + 5));
      const level = getSDTLevel(need.score);
      
      // Card background
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(need.color);
      doc.setLineWidth(1);
      doc.roundedRect(cardX, yPos, sdtCardWidth, sdtCardHeight, 2, 2, 'FD');
      
      // Name
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text(need.name, cardX + sdtCardWidth / 2, yPos + 12, { align: 'center' });
      
      // Score
      doc.setFontSize(20);
      doc.setTextColor(need.color);
      doc.text(need.score.toFixed(1), cardX + sdtCardWidth / 2, yPos + 32, { align: 'center' });
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text("/ 5.0", cardX + sdtCardWidth / 2 + 12, yPos + 32, { align: 'left' });
      
      // Level
      doc.setFontSize(8);
      doc.setTextColor(need.color);
      doc.text(getSDTLevelLabel(level), cardX + sdtCardWidth / 2, yPos + 45, { align: 'center' });
      
      // Description (truncated)
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      const descLines = doc.splitTextToSize(need.description, sdtCardWidth - 6);
      doc.text(descLines.slice(0, 2), cardX + 3, yPos + 52);
    });
    
    yPos += sdtCardHeight + 15;

    // Motivation Profile
    const profile = getSDTMotivationProfile();
    const profileCardHeight = 45;
    
    doc.setFillColor(236, 253, 245); // Light green
    doc.setDrawColor(16, 185, 129);
    doc.roundedRect(margin, yPos, contentWidth, profileCardHeight, 3, 3, 'FD');
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(profile.title, pageWidth / 2, yPos + 12, { align: 'center' });
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const profileDescLines = doc.splitTextToSize(profile.description, contentWidth - 20);
    doc.text(profileDescLines, pageWidth / 2, yPos + 22, { align: 'center' });
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    const adviceLines = doc.splitTextToSize(profile.advice, contentWidth - 20);
    doc.text(adviceLines, pageWidth / 2, yPos + 35, { align: 'center' });
    
    yPos += profileCardHeight + 15;

    // Strongest and Weakest needs
    const sortedNeeds = [...sdtNeeds].sort((a, b) => b.score - a.score);
    const strongest = sortedNeeds[0];
    const weakest = sortedNeeds[sortedNeeds.length - 1];
    
    const halfWidth = (contentWidth - 5) / 2;
    
    // Strongest
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor('#e2e8f0');
    doc.roundedRect(margin, yPos, halfWidth, 30, 2, 2, 'FD');
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text("Sterkste behoefte", margin + 5, yPos + 10);
    doc.setFontSize(11);
    doc.setTextColor(strongest.color);
    doc.text(strongest.name, margin + 5, yPos + 20);
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Score: ${strongest.score.toFixed(2)}`, margin + 5, yPos + 27);
    
    // Weakest
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin + halfWidth + 5, yPos, halfWidth, 30, 2, 2, 'FD');
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text("Focus punt", margin + halfWidth + 10, yPos + 10);
    doc.setFontSize(11);
    doc.setTextColor(weakest.color);
    doc.text(weakest.name, margin + halfWidth + 10, yPos + 20);
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Score: ${weakest.score.toFixed(2)}`, margin + halfWidth + 10, yPos + 27);

    // ==================== FOOTER ====================
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(150, 150, 150);
      doc.text(`Pagina ${i} van ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      doc.text("VIBE Leiderschap Scan", margin, pageHeight - 10);
    }
    
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
              Ontdek je bedrijfsomgeving en motivatie
            </p>
          </div>
          <div>
           <p className="text-lg text-muted-foreground">
              Je beantwoordde 29 stellingen over hoe jij jouw werkcontext en motivatie beleeft. Op basis daarvan krijg je een score per bouwsteen van het VIBE-model, gekoppeld aan de Herzberg Motivatie-Analyse. De combinatie van die scores toont hoe sterk je motivatie is opgebouwd uit autonomie, competentie en verbondenheid en welke gebieden aandacht vragen.        
           </p> 
          </div>

          {/* VIBE Radar Chart */}
          <Card className="p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-display font-semibold mb-6 text-center text-primary">
              Je leider zijn/haar profiel
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
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-semibold text-popover-foreground">{data.category}</p>
                          <p className="text-accent font-bold text-lg">{data.score.toFixed(2)} / 5</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Detailed VIBE Results - Moved up */}
          <h2 className="text-2xl font-display font-semibold mb-6 text-center text-primary">
            Gedetailleerde VIBE Scores
          </h2>
          
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
                        <VibeHighlight text={cat} />
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

          {/* Herzberg Analysis */}
          <Card className="p-8 shadow-lg mb-8 border-2 border-accent/20">
            <div className="flex items-center justify-center gap-2 mb-6">
              <h2 className="text-2xl font-display font-semibold text-center text-primary">
                Herzberg Motivatie-Analyse
              </h2>
              <div className="group relative">
                <Info className="h-5 w-5 text-muted-foreground cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-3 bg-popover border rounded-lg shadow-lg text-sm z-10">
                  <p className="text-popover-foreground">
                    <strong>Herzberg's Two-Factor Theory:</strong> Onderscheidt hygiënefactoren (voorkomen ontevredenheid) van motivatoren (stimuleren tevredenheid).
                  </p>
                </div>
              </div>
            </div>

            <HerzbergMatrix 
              profile={herzberg.profile}
              hygieneScore={herzberg.hygieneScore}
              motivatorScore={herzberg.motivatorScore}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-muted/50 p-6 rounded-lg space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-primary mb-1">{herzberg.adviceDetail.title}</h3>
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

          {/* SDT Analysis */}
          <SDTAnalysis 
            autonomyScore={autonomyScore}
            competenceScore={competenceScore}
            relatednessScore={relatednessScore}
          />


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
function getInterpretation(score: number): string {
  if (score < 2.5) return "Laag - Directe aandacht nodig";
  if (score < 3.5) return "Gemiddeld - Ruimte voor verbetering";
  return "Sterk - Goed bezig!";
}

function getProfileLabel(profile: string): string {
  const labels: Record<string, string> = {
    "low-low": "Kritiek Gebied",
    "low-high": "Gemotiveerd maar Gehinderd",
    "high-low": "Comfortzone",
    "high-high": "Optimale Zone",
  };
  return labels[profile] || profile;
}

export default Results;
