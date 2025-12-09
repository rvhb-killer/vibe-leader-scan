import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users, UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import { saveTeamSession, TeamSession } from "@/lib/teamUtils";

interface RegisterPageProps {
  onComplete: (session: TeamSession) => void;
  onBack: () => void;
}

const RegisterPage = ({ onComplete, onBack }: RegisterPageProps) => {
  const [company, setCompany] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState<"employee" | "manager">("employee");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!company.trim()) {
      setError("Vul een bedrijfsnaam in");
      return;
    }

    const session: TeamSession = {
      company: company.trim(),
      team: team.trim(),
      role,
    };

    saveTeamSession(session);
    onComplete(session);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen py-12 px-4 flex items-center justify-center"
    >
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
              <UserCircle className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-display font-bold text-primary mb-2">
              Wie ben je?
            </h1>
            <p className="text-muted-foreground">
              Vul je gegevens in om de VIBE-scan te starten
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Bedrijfsnaam *
              </Label>
              <Input
                id="company"
                placeholder="Naam van je organisatie"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  setError("");
                }}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="team" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Teamnaam (optioneel)
              </Label>
              <Input
                id="team"
                placeholder="Naam van je team of afdeling"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <UserCircle className="w-4 h-4" />
                Jouw rol
              </Label>
              <Select value={role} onValueChange={(value: "employee" | "manager") => setRole(value)}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Medewerker</SelectItem>
                  <SelectItem value="manager">Leidinggevende</SelectItem>
                </SelectContent>
              </Select>
              {role === "manager" && (
                <p className="text-sm text-muted-foreground mt-2">
                  Als leidinggevende krijg je 3 extra vragen over je teamperceptie.
                </p>
              )}
            </div>

            {error && (
              <p className="text-destructive text-sm">{error}</p>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onBack}
                className="flex-1 h-12"
              >
                Terug
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 h-12 gradient-accent hover:opacity-90"
              >
                Start vragenlijst
              </Button>
            </div>
          </div>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Je antwoorden worden anoniem opgeslagen. <br />
          Alleen geaggregeerde teamresultaten worden getoond.
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
