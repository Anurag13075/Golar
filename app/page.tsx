import Navbar from "@/components/shared/navbar";
import Hero from "@/components/landing/hero";
import ProblemCards from "@/components/landing/problem-cards";
import HowItWorks from "@/components/landing/how-it-works";
import FeaturesGrid from "@/components/landing/features-grid";
import AWSStack from "@/components/landing/aws-stack";
import Footer from "@/components/shared/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProblemCards />
      <HowItWorks />
      <FeaturesGrid />
      <AWSStack />
      <Footer />
    </main>
  );
}