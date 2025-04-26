import { HeroSection } from "./components/hero-section"
import { HowItWorksSection } from "./components/how-it-works-section"
import { ProjectsSection } from "./components/projects-section"
import { BenefitsSection } from "./components/benefits-section"

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute top-2/3 left-1/2 w-72 h-72 rounded-full bg-secondary/5 blur-3xl"></div>
      </div>
      
      <main className="max-w-7xl flex-1">
        <HeroSection />
        <HowItWorksSection />
        <ProjectsSection />
        <BenefitsSection />
      </main>
    </div>
  )
}

export default Home;
