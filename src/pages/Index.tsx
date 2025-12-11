import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import LandingPage from "@/components/vibe/LandingPage";
import RegisterPage from "@/components/vibe/RegisterPage";
import TeamQuestionnaire from "@/components/vibe/TeamQuestionnaire";
import ManagerQuestionnaire from "@/components/vibe/ManagerQuestionnaire";
import Results from "@/components/vibe/Results";
import ManagerResults from "@/components/vibe/ManagerResults";
import TeamDashboard from "@/components/vibe/TeamDashboard";
import { TeamSession, submitResponse, clearTeamSession } from "@/lib/teamUtils";

export type QuestionnaireAnswers = Record<string, number>;

type ViewType = "landing" | "register" | "questionnaire" | "manager-questionnaire" | "results" | "manager-results" | "dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("landing");
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});
  const [managerAnswers, setManagerAnswers] = useState<Record<string, number>>({});
  const [session, setSession] = useState<TeamSession | null>(null);

  const handleStartRegistration = () => {
    setCurrentView("register");
  };

  const handleRegistrationComplete = (teamSession: TeamSession) => {
    setSession(teamSession);
    // Route managers to their specific questionnaire
    if (teamSession.role === "manager") {
      setCurrentView("manager-questionnaire");
    } else {
      setCurrentView("questionnaire");
    }
  };

  const handleCompleteQuestionnaire = async (
    completedAnswers: QuestionnaireAnswers,
    managerExpectations?: Record<string, number>
  ) => {
    setAnswers(completedAnswers);
    
    // Submit to database
    if (session) {
      try {
        await submitResponse(session, completedAnswers, managerExpectations);
        toast.success("Je antwoorden zijn opgeslagen!");
      } catch (error) {
        console.error("Error submitting response:", error);
        toast.error("Er ging iets mis bij het opslaan. Je resultaten worden lokaal getoond.");
      }
    }
    
    setCurrentView("results");
  };

  const handleCompleteManagerQuestionnaire = async (completedAnswers: Record<string, number>) => {
    setManagerAnswers(completedAnswers);
    
    // Submit manager answers to database
    if (session) {
      try {
        await submitResponse(session, {}, completedAnswers);
        toast.success("Je antwoorden zijn opgeslagen!");
      } catch (error) {
        console.error("Error submitting response:", error);
        toast.error("Er ging iets mis bij het opslaan. Je resultaten worden lokaal getoond.");
      }
    }
    
    setCurrentView("manager-results");
  };

  const handleRestart = () => {
    setAnswers({});
    setManagerAnswers({});
    setSession(null);
    clearTeamSession();
    setCurrentView("landing");
  };

  const handleViewDashboard = () => {
    setCurrentView("dashboard");
  };

  const handleBackToLanding = () => {
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
            <LandingPage 
              onStart={handleStartRegistration} 
              onViewDashboard={handleViewDashboard}
            />
          </motion.div>
        )}

        {currentView === "register" && (
          <motion.div
            key="register"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RegisterPage 
              onComplete={handleRegistrationComplete}
              onBack={handleBackToLanding}
            />
          </motion.div>
        )}
        
        {currentView === "questionnaire" && session && (
          <motion.div
            key="questionnaire"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TeamQuestionnaire 
              session={session}
              onComplete={handleCompleteQuestionnaire} 
            />
          </motion.div>
        )}

        {currentView === "manager-questionnaire" && session && (
          <motion.div
            key="manager-questionnaire"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ManagerQuestionnaire 
              session={session}
              onComplete={handleCompleteManagerQuestionnaire} 
            />
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

        {currentView === "manager-results" && (
          <motion.div
            key="manager-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ManagerResults answers={managerAnswers} onRestart={handleRestart} />
          </motion.div>
        )}

        {currentView === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TeamDashboard onBack={handleBackToLanding} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
