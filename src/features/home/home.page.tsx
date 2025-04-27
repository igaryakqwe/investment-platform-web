import { HeroSection } from "./components/hero-section";
import { HowItWorksSection } from "./components/how-it-works-section";
import { ProjectsSection } from "./components/projects-section";
import { BenefitsSection } from "./components/benefits-section";
import { getProjects } from "@/api/projects/projects.api";
import FeaturesSection from "@/features/home/components/features-section";

const Home = async () => {
  const projects = await getProjects();

  return (
    <div className="bg-background flex min-h-screen flex-col overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="bg-primary/5 absolute top-1/4 left-1/4 h-64 w-64 rounded-full blur-3xl"></div>
        <div className="bg-primary/10 absolute right-1/3 bottom-1/3 h-96 w-96 rounded-full blur-3xl"></div>
        <div className="bg-secondary/5 absolute top-2/3 left-1/2 h-72 w-72 rounded-full blur-3xl"></div>
      </div>

      <main className="mx-auto w-full max-w-7xl flex-1">
        <HeroSection projects={projects} />
        <HowItWorksSection />
        <FeaturesSection />
        <ProjectsSection projects={projects} />
        <BenefitsSection />
      </main>
    </div>
  );
};

export default Home;
