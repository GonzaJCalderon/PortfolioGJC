import Hero from "@/components/Hero";
import About3D from "@/components/About3D";
import SelectedCases from "@/components/SelectedCases";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      <Hero />
      <About3D />
      <SelectedCases />
      <Experience />
      <Footer />
    </main>
  );
}
