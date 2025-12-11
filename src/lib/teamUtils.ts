import { supabase } from "@/integrations/supabase/client";
import { questions, categories, calculateHerzbergAnalysis, HerzbergProfile } from "./vibeQuestions";
import { managerVibeQuestions, managerCategories } from "./managerVibeQuestions";

export interface TeamSession {
  company: string;
  team: string;
  role: "employee" | "manager";
}


// Create a hash for company name (simple hash for anonymization)
export function createCompanyHash(company: string): string {
  let hash = 0;
  for (let i = 0; i < company.length; i++) {
    const char = company.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `company_${Math.abs(hash).toString(36)}`;
}

export function saveTeamSession(session: TeamSession) {
  localStorage.setItem("vibe_company", session.company);
  localStorage.setItem("vibe_team", session.team);
  localStorage.setItem("vibe_role", session.role);
}

export function getTeamSession(): TeamSession | null {
  const company = localStorage.getItem("vibe_company");
  const role = localStorage.getItem("vibe_role") as "employee" | "manager" | null;
  
  if (!company || !role) return null;
  
  return {
    company,
    team: localStorage.getItem("vibe_team") || "",
    role,
  };
}

export function clearTeamSession() {
  localStorage.removeItem("vibe_company");
  localStorage.removeItem("vibe_team");
  localStorage.removeItem("vibe_role");
}

export async function submitResponse(
  session: TeamSession,
  answers: Record<string, number>,
  managerExpectations?: Record<string, number>
) {
  const companyHash = createCompanyHash(session.company.toLowerCase().trim());
  
  const { error } = await supabase.from("responses").insert({
    company_hash: companyHash,
    team: session.team || null,
    role: session.role,
    answers,
    manager_expectations: session.role === "manager" ? managerExpectations : null,
  });
  
  if (error) throw error;
}

export interface TeamResults {
  success: boolean;
  message?: string;
  employeeCount: number;
  managerCount: number;
  employeeAvg?: Record<string, number>;
  managerAvg?: Record<string, number>;
  employeeHerzberg?: { hygieneScore: number; motivatorScore: number; profile: HerzbergProfile };
  managerHerzberg?: { hygieneScore: number; motivatorScore: number; profile: HerzbergProfile };
}

export async function getTeamResults(company: string, team?: string): Promise<TeamResults> {
  const companyHash = createCompanyHash(company.toLowerCase().trim());
  
  const { data, error } = await supabase.rpc("get_team_results", {
    p_company_hash: companyHash,
    p_team: team || null,
  });
  
  if (error) throw error;
  
  const result = data as any;
  
  if (!result.success) {
    return {
      success: false,
      message: result.message,
      employeeCount: result.employeeCount || 0,
      managerCount: result.managerCount || 0,
    };
  }
  
  // Calculate averages per category
  const employeeAvg = calculateCategoryAverages(result.employeeAnswers || []);
  const managerAvg = calculateManagerAverages(result.managerExpectations || []);
  
  // Calculate Herzberg for employees (aggregate)
  const employeeHerzberg = calculateAggregateHerzberg(result.employeeAnswers || []);
  
  return {
    success: true,
    employeeCount: result.employeeCount,
    managerCount: result.managerCount,
    employeeAvg,
    managerAvg,
    employeeHerzberg,
  };
}

function calculateCategoryAverages(answersArray: Record<string, number>[]): Record<string, number> {
  const categoryTotals: Record<string, { total: number; count: number }> = {};
  
  Object.keys(categories).forEach((cat) => {
    categoryTotals[cat] = { total: 0, count: 0 };
  });
  
  answersArray.forEach((answers) => {
    Object.entries(answers).forEach(([key, value]) => {
      const questionNum = parseInt(key.replace("q", ""));
      const question = questions.find((q) => q.id === questionNum);
      
      if (question) {
        categoryTotals[question.category].total += value;
        categoryTotals[question.category].count += 1;
      }
    });
  });
  
  const averages: Record<string, number> = {};
  Object.entries(categoryTotals).forEach(([cat, data]) => {
    averages[cat] = data.count > 0 ? data.total / data.count : 0;
  });
  
  return averages;
}

function calculateManagerAverages(expectationsArray: Record<string, number>[]): Record<string, number> {
  if (!expectationsArray || expectationsArray.length === 0) return {};
  
  const totals: Record<string, { total: number; count: number }> = {};
  
  Object.keys(managerCategories).forEach((cat) => {
    totals[cat] = { total: 0, count: 0 };
  });
  
  expectationsArray.forEach((expectations) => {
    if (!expectations) return;
    
    Object.entries(expectations).forEach(([key, value]) => {
      const questionNum = parseInt(key.replace("mq", ""));
      const mq = managerVibeQuestions.find((q) => q.id === questionNum);
      if (mq) {
        totals[mq.category].total += value;
        totals[mq.category].count += 1;
      }
    });
  });
  
  const averages: Record<string, number> = {};
  Object.entries(totals).forEach(([cat, data]) => {
    if (data.count > 0) {
      averages[cat] = data.total / data.count;
    }
  });
  
  return averages;
}

function calculateAggregateHerzberg(answersArray: Record<string, number>[]): { hygieneScore: number; motivatorScore: number; profile: HerzbergProfile } {
  if (answersArray.length === 0) {
    return { hygieneScore: 0, motivatorScore: 0, profile: "low-low" };
  }
  
  let totalHygiene = 0;
  let countHygiene = 0;
  let totalMotivator = 0;
  let countMotivator = 0;
  
  answersArray.forEach((answers) => {
    Object.entries(answers).forEach(([key, value]) => {
      const questionNum = parseInt(key.replace("q", ""));
      const question = questions.find((q) => q.id === questionNum);
      
      if (question) {
        if (question.herzberg === "hygiene") {
          totalHygiene += value;
          countHygiene++;
        } else {
          totalMotivator += value;
          countMotivator++;
        }
      }
    });
  });
  
  const hygieneScore = countHygiene > 0 ? totalHygiene / countHygiene : 0;
  const motivatorScore = countMotivator > 0 ? totalMotivator / countMotivator : 0;
  
  const hygieneLevel = hygieneScore >= 3 ? "high" : "low";
  const motivatorLevel = motivatorScore >= 3 ? "high" : "low";
  
  return {
    hygieneScore,
    motivatorScore,
    profile: `${hygieneLevel}-${motivatorLevel}` as HerzbergProfile,
  };
}

export function generateTeamAdvice(employeeAvg: Record<string, number>, managerAvg: Record<string, number>): string[] {
  const advice: string[] = [];
  
  const categories = Object.keys(employeeAvg);
  
  categories.forEach((cat) => {
    const empScore = employeeAvg[cat] || 0;
    const mgrScore = managerAvg[cat];
    
    if (mgrScore !== undefined) {
      const diff = mgrScore - empScore;
      
      if (diff > 0.5) {
        advice.push(`${cat}: Er is een positieve bias bij leidinggevenden. Verwachtingen zijn hoger dan de ervaring van medewerkers. Focus op gesprekken en realiteitstoetsing.`);
      } else if (diff < -0.5) {
        advice.push(`${cat}: Medewerkers ervaren meer kwaliteit dan leidinggevenden inschatten. Versterk dit door successen te delen en alignment te zoeken.`);
      }
    }
  });
  
  // General advice based on overall scores
  const avgEmployeeScore = Object.values(employeeAvg).reduce((a, b) => a + b, 0) / Object.values(employeeAvg).length;
  const avgManagerScore = Object.values(managerAvg).length > 0 
    ? Object.values(managerAvg).reduce((a, b) => a + b, 0) / Object.values(managerAvg).length 
    : null;
  
  if (avgEmployeeScore < 3 && (avgManagerScore === null || avgManagerScore < 3)) {
    advice.push("Team heeft gedeelde werkpunten. Start met prioriteiten stellen en basisvoorwaarden verbeteren.");
  } else if (avgEmployeeScore >= 3.5 && (avgManagerScore === null || avgManagerScore >= 3.5)) {
    advice.push("Team functioneert goed. Focus op groei, innovatie en duurzame betrokkenheid.");
  }
  
  if (advice.length === 0) {
    advice.push("Bespreek de resultaten in teamverband en identificeer gezamenlijke prioriteiten.");
  }
  
  return advice;
}
