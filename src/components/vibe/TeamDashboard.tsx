import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Users, BarChart3, AlertCircle, RefreshCw, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { getTeamResults, TeamResults, generateTeamAdvice } from "@/lib/teamUtils";
import { categories } from "@/lib/vibeQuestions";
import HerzbergMatrix from "./HerzbergMatrix";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface TeamDashboardProps {
  onBack: () => void;
}

const TeamDashboard = ({ onBack }: TeamDashboardProps) => {
  const [company, setCompany] = useState("");
  const [team, setTeam] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<TeamResults | null>(null);

  const handleSearch = async () => {
    if (!company.trim()) {
      setError("Vul een bedrijfsnaam in");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const data = await getTeamResults(company.trim(), team.trim() || undefined);
      setResults(data);
    } catch (err) {
      console.error("Error fetching results:", err);
      setError("Er ging iets mis bij het ophalen van de resultaten.");
    } finally {
      setLoading(false);
    }
  };

  const chartData = results?.success && results.employeeAvg
    ? Object.entries(categories).map(([cat, config]) => ({
        name: config.short,
        category: cat,
        Medewerkers: results.employeeAvg?.[cat]?.toFixed(2) || 0,
        Leidinggevenden: results.managerAvg?.[cat]?.toFixed(2) || null,
      }))
    : [];

  const advice = results?.success && results.employeeAvg && results.managerAvg
    ? generateTeamAdvice(results.employeeAvg, results.managerAvg)
    : [];

  const getDiffIcon = (empScore: number, mgrScore?: number) => {
    if (mgrScore === undefined) return null;
    const diff = mgrScore - empScore;
    if (diff > 0.3) return <TrendingUp className="w-4 h-4 text-amber-500" />;
    if (diff < -0.3) return <TrendingDown className="w-4 h-4 text-emerald-500" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            Team Dashboard
          </h1>
          <p className="text-muted-foreground">
            Bekijk geaggregeerde resultaten van je team
          </p>
        </div>

        {/* Search Form */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="search-company" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Bedrijfsnaam *
              </Label>
              <Input
                id="search-company"
                placeholder="Zoek op bedrijfsnaam"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  setError("");
                }}
                className="h-12"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="search-team" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Teamnaam (optioneel)
              </Label>
              <Input
                id="search-team"
                placeholder="Filter op teamnaam"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="h-12"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="h-12 px-8 gradient-accent"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <BarChart3 className="w-4 h-4 mr-2" />
              )}
              Bekijk resultaten
            </Button>
          </div>
          {error && (
            <p className="text-destructive text-sm mt-4">{error}</p>
          )}
        </Card>

        {/* Results */}
        {results && !results.success && (
          <Card className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-primary mb-2">
              Onvoldoende data beschikbaar
            </h2>
            <p className="text-muted-foreground mb-4">
              {results.message}
            </p>
            <div className="flex justify-center gap-8 text-sm">
              <div>
                <span className="font-semibold text-primary">{results.employeeCount}</span>
                <span className="text-muted-foreground"> medewerkers</span>
              </div>
              <div>
                <span className="font-semibold text-primary">{results.managerCount}</span>
                <span className="text-muted-foreground"> leidinggevenden</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Er zijn minimaal 4 medewerker-antwoorden nodig om anonieme resultaten te tonen.
            </p>
          </Card>
        )}

        {results?.success && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{results.employeeCount}</div>
                <div className="text-sm text-muted-foreground">Medewerkers</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{results.managerCount}</div>
                <div className="text-sm text-muted-foreground">Leidinggevenden</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-accent">
                  {results.employeeAvg
                    ? (Object.values(results.employeeAvg).reduce((a, b) => a + b, 0) / Object.values(results.employeeAvg).length).toFixed(1)
                    : "-"}
                </div>
                <div className="text-sm text-muted-foreground">Gem. score</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold" style={{ color: categories["Impact & Purpose"].color }}>
                  {results.employeeHerzberg?.profile.replace("-", " / ") || "-"}
                </div>
                <div className="text-sm text-muted-foreground">Herzberg profiel</div>
              </Card>
            </div>

            {/* Comparison Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                VIBE-scores per domein
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 5]} />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Medewerkers" fill="hsl(var(--accent))" />
                    {results.managerAvg && Object.keys(results.managerAvg).length > 0 && (
                      <Bar dataKey="Leidinggevenden" fill="hsl(var(--primary))" />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Detailed Scores */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">
                Gedetailleerde scores
              </h3>
              <div className="space-y-4">
                {Object.entries(categories).map(([cat, config]) => {
                  const empScore = results.employeeAvg?.[cat] || 0;
                  const mgrScore = results.managerAvg?.[cat];
                  
                  return (
                    <div key={cat} className="flex items-center gap-4">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: config.color }}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{cat}</div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Medewerkers: </span>
                          <span className="font-semibold">{empScore.toFixed(2)}</span>
                        </div>
                        {mgrScore !== undefined && (
                          <>
                            <div>
                              <span className="text-muted-foreground">Leidinggevenden: </span>
                              <span className="font-semibold">{mgrScore.toFixed(2)}</span>
                            </div>
                            {getDiffIcon(empScore, mgrScore)}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Herzberg Analysis */}
            {results.employeeHerzberg && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">
                  Herzberg Analyse (Team)
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <HerzbergMatrix 
                      hygieneScore={results.employeeHerzberg.hygieneScore}
                      motivatorScore={results.employeeHerzberg.motivatorScore}
                      profile={results.employeeHerzberg.profile}
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Hygiëne score</div>
                      <div className="text-2xl font-bold text-primary">
                        {results.employeeHerzberg.hygieneScore.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Motivatie score</div>
                      <div className="text-2xl font-bold text-accent">
                        {results.employeeHerzberg.motivatorScore.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Profiel</div>
                      <div className="text-lg font-semibold">
                        {results.employeeHerzberg.profile === "high-high" && "Hoge hygiëne & hoge motivatie"}
                        {results.employeeHerzberg.profile === "high-low" && "Hoge hygiëne & lage motivatie"}
                        {results.employeeHerzberg.profile === "low-high" && "Lage hygiëne & hoge motivatie"}
                        {results.employeeHerzberg.profile === "low-low" && "Lage hygiëne & lage motivatie"}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Advice */}
            {advice.length > 0 && (
              <Card className="p-6 bg-accent/5 border-accent/20">
                <h3 className="text-lg font-semibold text-primary mb-4">
                  Teamadvies
                </h3>
                <ul className="space-y-3">
                  {advice.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-accent font-bold">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={onBack} size="lg">
            Terug naar home
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamDashboard;
