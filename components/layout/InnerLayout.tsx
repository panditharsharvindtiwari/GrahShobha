import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LeadPopup from "@/components/ui/LeadPopup";

export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <LeadPopup />
    </>
  );
}
