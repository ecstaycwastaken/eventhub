import FallbackPage from "@/components/FallbackPage";
import { CiLock } from "react-icons/ci";

const UnauthorizedPage = () => {
  return (
    <FallbackPage
      eyebrow="ERROR 403 • UNAUTHORIZED"
      title="Access Restricted"
      description="This page is reserved for administrators. Your current account does not have the required permissions to view this content."
      helperText="Return to browse events, or sign in with a different account."
      eyebrowColorClass="text-danger"
      glowBgClass="bg-danger/10 group-hover:bg-danger/20"
      borderGlowClass="border-danger/15"
      illustration={<CiLock className="w-10 h-10 text-danger relative z-10 transition-transform duration-500 group-hover:scale-110" />}
    />
  );
};

export default UnauthorizedPage;
