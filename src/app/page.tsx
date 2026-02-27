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
        <Hero />
        <Divider />
        <Services />
        <Divider />
        <TechStack />
        <Divider />
        <Projects />
        <Divider />
        <About />
        <Divider />
        <Contact />
      </main>
      <Divider />
      <Footer />
    </>
  );
}
