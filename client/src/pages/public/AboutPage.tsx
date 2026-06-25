import { teamMembers } from "@/components/about/data";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-16 md:py-24 min-h-[70vh] font-dm">
      <h1 className="text-4xl md:text-[40px] font-bold text-[#111111] mb-6">About EventHub</h1>
      <div className="space-y-6 text-[#6B7280] text-[15px] md:text-[16px] leading-relaxed">
        <p>
          EventHub is your central platform for discovering, registering for, and managing tickets to events that matter. Whether you're looking for an industry conference, a local meetup, or a grand concert, we make it simple to find your place and secure your spot.
        </p>
        <p>
          Our mission is to seamlessly connect event organizers with passionate attendees. We believe that great events have the power to educate, inspire, and bring communities together. That's why we've built a platform that removes the friction from ticketing, leaving you free to focus on the experience.
        </p>
        <p>
          We pride ourselves on a clean, accessible interface and a reliable infrastructure that scales from small private gatherings to massive public festivals. Welcome to a better way to experience events.
        </p>
      </div>

      <section className="mt-20">
        <h2 className="text-2xl md:text-[28px] font-bold text-[#111111] mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col h-full gap-4">
              <div className="w-full aspect-square bg-[#F5F5F6] rounded-[16px] border border-[#E5E5E7] flex items-center justify-center overflow-hidden shrink-0">
                {member.image ? (
                  <img src={member.image} alt={member.fullName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#9CA3AF] text-sm font-medium">Photo TBD</span>
                )}
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-[17px] font-bold text-[#111111] leading-tight mb-1">{member.fullName}</h3>
                <p className="text-[14px] text-[#6B7280] mb-3">{member.role}</p>
                <div className="flex items-center gap-4 mt-auto pt-1">
                  {member.facebookLink && (
                    <a href={member.facebookLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-[#9CA3AF] hover:text-[#2F5FDB] transition-colors" aria-label="Facebook">
                      <FaFacebook size={20} />
                    </a>
                  )}
                  {member.githubLink && (
                    <a href={member.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-[#9CA3AF] hover:text-[#111111] transition-colors" aria-label="Github">
                      <FaGithub size={20} />
                    </a>
                  )}
                  {member.linkedinLink && (
                    <a href={member.linkedinLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-[#9CA3AF] hover:text-[#2F5FDB] transition-colors" aria-label="LinkedIn">
                      <FaLinkedin size={20} />
                    </a>
                  )}
                  {member.portfolioLink && (
                    <a href={member.portfolioLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-[#9CA3AF] hover:text-[#0D9488] transition-colors" aria-label="Portfolio">
                      <TbWorld size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
