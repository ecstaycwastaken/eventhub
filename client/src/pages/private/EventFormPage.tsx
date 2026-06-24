import { useNavigate } from "react-router-dom";
import EventCreationForm from "@/components/event-form/EventCreationForm";
import Button from "@/components/Button";
import { FaArrowLeft } from "react-icons/fa6";

function EventFormPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col font-dm min-h-screen px-20 py-10">
            <div className="mb-4">
                <Button 
                    bgColorClass="bg-transparent"
                    textColorClass="text-black"
                    className="flex items-center gap-2 text-button-sm"
                    onClick={() => navigate('/home/my-events')}
                >
                    <FaArrowLeft size={20} /> Back to My Events
                </Button>
            </div>

            <EventCreationForm onClose={() => navigate('/u/my-events')} />
        </div>
    );
}

export default EventFormPage;