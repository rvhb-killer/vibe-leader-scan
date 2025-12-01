import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingPage from "@/components/vibe/LandingPage";
import Questionnaire from "@/components/vibe/Questionnaire";
import Results from "@/components/vibe/Results";

export type QuestionnaireAnswers = Record<string, number>;

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "questionnaire" | "results">("landing");
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});

  const handleStartQuestionnaire = () => {
    setCurrentView("questionnaire");
  };

  const handleCompleteQuestionnaire = (completedAnswers: QuestionnaireAnswers) => {
    setAnswers(completedAnswers);
    setCurrentView("results");
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentView("landing");
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {currentView === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingPage onStart={handleStartQuestionnaire} />
          </motion.div>
        )}
        
        {currentView === "questionnaire" && (
          <motion.div
            key="questionnaire"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Questionnaire onComplete={handleCompleteQuestionnaire} />
          </motion.div>
        )}
        
        {currentView === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Results answers={answers} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
