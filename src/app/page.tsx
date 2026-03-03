import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

function Divider() {
  return <div className="h-px bg-[--border] mx-0" />;
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero : sticky z-1 */}
        <div className="sticky top-0 z-[1]">
          <Hero />
        </div>

        {/*
          Services : PAS de wrapper sticky ici.
          Les cartes internes sont elles-mêmes sticky (z-2, z-3, z-4)
          et viennent se superposer sur Hero puis les unes sur les autres.
        */}
        <Services />

        {/*
          Le reste : z-5 pour passer par-dessus la dernière carte Services.
          Fond opaque pour recouvrir proprement.
        */}
        <div className="relative" style={{ zIndex: 5, backgroundColor: "var(--background)" }}>
          <Projects />
          <Divider />
          <TechStack />
          <Divider />
          <About />
          <Divider />
          <Contact />
          <Divider />
          <Footer />
        </div>
      </main>
    </>
  );
}
