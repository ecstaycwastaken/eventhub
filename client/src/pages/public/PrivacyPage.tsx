function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-16 md:py-24 min-h-[70vh] font-dm">
      <h1 className="text-4xl md:text-[40px] font-bold text-[#111111] mb-2">Privacy Policy</h1>
      <p className="text-[#9CA3AF] text-[13px] mb-10">Last updated: June 2026</p>

      <div className="space-y-8 text-[#6B7280] text-[15px] md:text-[16px] leading-relaxed">
        <section>
          <h2 className="text-[17px] font-bold text-[#111111] mb-3">1. Information We Collect</h2>
          <p>
            When you register for an account or sign up for an event, we collect personal information such as your name, email address, and optionally your profile details. We also collect usage data regarding your interactions with the platform to help improve our services.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-bold text-[#111111] mb-3">2. How We Use Your Data</h2>
          <p>
            Your information is used strictly to provide, maintain, and improve the EventHub platform. This includes processing your event registrations, sending important updates regarding your tickets, and verifying attendance. We do not sell your personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-bold text-[#111111] mb-3">3. Data Security</h2>
          <p>
            We implement robust security measures to protect your personal information from unauthorized access, alteration, or disclosure. All sensitive transactions and credentials are encrypted using industry-standard protocols.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-bold text-[#111111] mb-3">4. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data at any time. If you wish to exercise these rights or have concerns about how we handle your data, please contact our support team.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPage;
