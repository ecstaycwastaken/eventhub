function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-16 md:py-24 min-h-[70vh] font-dm">
      <h1 className="text-4xl md:text-[40px] font-bold text-[#111111] mb-6">Contact Us</h1>
      <p className="text-[#6B7280] text-[15px] md:text-[16px] leading-relaxed mb-10">
        Have questions, feedback, or need support? We're here to help. Reach out to our team using the information below.
      </p>

      <div className="bg-[#F5F5F6] rounded-[12px] p-8 border border-[#E5E5E7]">
        <h2 className="text-[17px] font-bold text-[#111111] mb-6">Get in Touch</h2>
        <div className="space-y-5 text-[#6B7280]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#9CA3AF] mb-1">Email Support</p>
            <a href="mailto:support@eventhub.com" className="text-[#2F5FDB] font-medium hover:underline text-[15px]">support@eventhub.com</a>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#9CA3AF] mb-1">General Inquiries</p>
            <a href="mailto:hello@eventhub.com" className="text-[#2F5FDB] font-medium hover:underline text-[15px]">hello@eventhub.com</a>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#9CA3AF] mb-1">Office Hours</p>
            <p className="text-[15px]">Monday – Friday, 9:00 AM – 5:00 PM (PHT)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
