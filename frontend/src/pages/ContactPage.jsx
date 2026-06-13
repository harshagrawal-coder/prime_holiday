import ContactCTASection from "../components/contact/ContactCTASection";
import ContactForm from "../components/contact/ContactForm";
import ContactHeroSection from "../components/contact/ContactHeroSection";
import ContactInfo from "../components/contact/ContactInfo";
import MapSection from "../components/contact/MapSection";

const ContactPage = () => (
  <>
    <ContactHeroSection />

    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50/50 via-white to-sky-50/30 py-12 md:py-16">
      <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-orange-200/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 xl:grid-cols-2">
          <ContactForm />

          <div className="space-y-5">
            <ContactInfo />
            <MapSection />
          </div>
        </div>
      </div>
    </section>

    <ContactCTASection />
  </>
);

export default ContactPage;
