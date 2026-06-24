import FallbackPage from "@/components/FallbackPage";
import { CiCompass1 } from "react-icons/ci";

const NotFoundPage = () => {
  return (
    <FallbackPage
      eyebrow="ERROR 404 • NOT FOUND"
      title="Page Not Found"
      description="The requested URL does not exist on this server, or the page has been moved."
      helperText="Return to safety by browsing available events, or sign in."
      illustration={<CiCompass1 className="w-10 h-10 text-brand-red relative z-10 transition-transform duration-500 group-hover:scale-110" />}
    />
  );
};

export default NotFoundPage;
