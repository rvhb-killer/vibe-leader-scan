import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Target, Sparkles, Heart, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import VibeHighlight from "./VibeHighlight";

interface LandingPageProps {
  onStart: () => void;
  onViewDashboard: () => void;
}

const LandingPage = ({ onStart, onViewDashboard }: LandingPageProps) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-sm font-medium">Leadership Assessment Tool</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              It's all about the <span className="text-secondary">VIBE</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Ontdek hoe jij leiderschap en motivatie binnen jouw team kan versterken met evidence-based inzichten.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onStart}
                size="lg"
                className="gradient-accent hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl"
              >
                Start de VIBE-scan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                onClick={onViewDashboard}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-xl bg-white/10 border-white/30 hover:bg-white/20 text-white"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                Team Dashboard
              </Button>
            </div>
            
            <p className="mt-6 text-sm text-white/70">
              ⏱️ Slechts 5 minuten • 29 vragen • Directe inzichten
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is VIBE Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-6 text-primary">
              Wat is VIBE?
            </h2>
            
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              <strong className="text-foreground">VIBE</strong> is een praktisch framework dat leiders helpt om de motivatie binnen hun team gericht te versterken. Het model richt zich op vier fundamentele bouwstenen die bepalend zijn voor werkplezier, betrokkenheid en prestaties.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-accent">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2 text-primary">
                      <VibeHighlight text="Voice & Autonomy" />
                    </h3>
                    <p className="text-muted-foreground">
                      Geef medewerkers inspraak en vertrouwen. Autonomie verhoogt eigenaarschap, creativiteit en motivatie.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-accent">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2 text-primary">
                      <VibeHighlight text="Impact & Purpose" />
                    </h3>
                    <p className="text-muted-foreground">
                      Laat mensen voelen dat hun werk ertoe doet. Verbind dagelijkse taken aan betekenisvolle doelen.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-accent">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2 text-primary">
                      <VibeHighlight text="Bold Leadership" />
                    </h3>
                    <p className="text-muted-foreground">
                      Leiderschap dat duidelijk, ondersteunend en aanwezig is. Geen micromanagement, wel richting en coaching.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-accent">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2 text-primary">
                      <VibeHighlight text="Empathy & Recognition" />
                    </h3>
                    <p className="text-muted-foreground">
                      Toon oprechte waardering en menselijkheid. Erken inzet en geef ruimte voor welzijn.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why VIBE Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-6 text-primary">
              Waarom VIBE?
            </h2>
            
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              VIBE is gebaseerd op inzichten uit organisatiepsychologie, motivatieonderzoek en moderne leiderschapstheorieën. Dit raamwerk helpt leidinggevenden om structureel te bouwen aan vertrouwen, zingeving, leiderschap en erkenning.
            </p>

            <div className="space-y-6">
              <Card className="p-8 shadow-md">
                <h3 className="text-2xl font-display font-semibold mb-3 text-primary">
                  Meetbaar & Wetenschappelijk Onderbouwd
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Grootschalige meta-analyses tonen aan dat autonomie, zingeving, ondersteunend leiderschap en erkenning direct correleren met hogere motivatie, betere prestaties en verminderde burn-out.
                </p>
              </Card>

              <Card className="p-8 shadow-md">
                <h3 className="text-2xl font-display font-semibold mb-3 text-primary">
                  Directe Actiepunten
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  De VIBE-scan geeft je niet alleen scores, maar ook concrete, toepasbare adviezen per thema. Geen vage hypothese, maar heldere stappen die je vandaag nog kunt nemen om je leiderschap te verbeteren.
                </p>
              </Card>

              <Card className="p-8 shadow-md">
                <h3 className="text-2xl font-display font-semibold mb-3 text-primary">
                  Snel & Effectief
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  In slechts 5 minuten krijg je een visueel overzicht van je leiderschapsstijl en ontdek je waar de grootste kansen liggen. Perfect voor drukke leiders die wel impact willen maken.
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-primary">
              Klaar om te starten?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Doe de VIBE-scan en ontvang binnen enkele minuten inzicht in jouw leiderschapsstijl en concrete adviezen om je team nog beter te motiveren.
            </p>
            
            <Button 
              onClick={onStart}
              size="lg"
              className="gradient-accent hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl"
            >
              Start de VIBE-scan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
