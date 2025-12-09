import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, categories } from "@/lib/vibeQuestions";
import { managerQuestions, TeamSession } from "@/lib/teamUtils";
import type { QuestionnaireAnswers } from "@/pages/Index";

interface TeamQuestionnaireProps {
  session: TeamSession;
  onComplete: (answers: QuestionnaireAnswers, managerExpectations?: Record<string, number>) => void;
}

const TeamQuestionnaire = ({ session, onComplete }: TeamQuestionnaireProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});
  const [managerExpectations, setManagerExpectations] = useState<Record<string, number>>({});
  
  const isManager = session.role === "manager";
  const allQuestions = [...questions];
  const totalQuestions = allQuestions.length + (isManager ? managerQuestions.length : 0);
  
  const isManagerQuestion = currentQuestion >= allQuestions.length;
  const currentManagerQuestionIndex = currentQuestion - allQuestions.length;
  
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  
  const getCurrentCategory = () => {
    if (isManagerQuestion) {
      return "Teamperceptie";
    }
    return allQuestions[currentQuestion].category;
  };
  
  const getCategoryColor = () => {
    if (isManagerQuestion) {
      return "#6366f1"; // Indigo for manager questions
    }
    const category = allQuestions[currentQuestion].category;
    return categories[category as keyof typeof categories].color;
  };

  const getCurrentQuestionText = () => {
    if (isManagerQuestion) {
      return managerQuestions[currentManagerQuestionIndex].text;
    }
    return allQuestions[currentQuestion].text;
  };

  const getAnswerKey = () => {
    if (isManagerQuestion) {
      return managerQuestions[currentManagerQuestionIndex].id;
    }
    return `q${currentQuestion + 1}`;
  };

  const getCurrentAnswer = () => {
    if (isManagerQuestion) {
      return managerExpectations[managerQuestions[currentManagerQuestionIndex].id];
    }
    return answers[`q${currentQuestion + 1}`];
  };

  const handleAnswer = (value: number) => {
    if (isManagerQuestion) {
      setManagerExpectations({ 
        ...managerExpectations, 
        [managerQuestions[currentManagerQuestionIndex].id]: value 
      });
    } else {
      setAnswers({ ...answers, [`q${currentQuestion + 1}`]: value });
    }
  };

  const handleNext = () => {
    const currentAnswer = getCurrentAnswer();
    if (!currentAnswer) {
      alert("⚠️ Kies een antwoord om verder te gaan.");
      return;
    }

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers, isManager ? managerExpectations : undefined);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Vraag {currentQuestion + 1} van {totalQuestions}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Category Badge */}
        <div className="mb-6 flex items-center gap-3">
          <div 
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
            style={{ 
              backgroundColor: `${getCategoryColor()}20`,
              color: getCategoryColor() 
            }}
          >
            {getCurrentCategory()}
          </div>
          {isManagerQuestion && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              Extra vraag voor leidinggevenden
            </div>
          )}
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 shadow-lg mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-semibold mb-8 text-primary leading-relaxed">
                {getCurrentQuestionText()}
              </h2>

              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleAnswer(value)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      getCurrentAnswer() === value
                        ? "border-accent bg-accent/10 shadow-md"
                        : "border-border hover:border-accent/50 hover:bg-accent/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {value === 1 && "Helemaal oneens"}
                        {value === 2 && "Oneens"}
                        {value === 3 && "Neutraal"}
                        {value === 4 && "Eens"}
                        {value === 5 && "Helemaal eens"}
                      </span>
                      <span className="text-xl font-bold text-accent">{value}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            size="lg"
            className="px-6"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Vorige
          </Button>

          <Button
            onClick={handleNext}
            size="lg"
            className="gradient-accent hover:opacity-90 transition-opacity px-8"
          >
            {currentQuestion === totalQuestions - 1 ? "Voltooien" : "Volgende"}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamQuestionnaire;
