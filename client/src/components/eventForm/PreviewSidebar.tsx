import { FaArrowRight } from "react-icons/fa6";

import EventCard, { type EventItem } from "../EventCard";
import Button from "../Button";

interface PreviewSidebarProps {
    previewEvent: EventItem;
    isSubmitting: boolean;
}

function PreviewSidebar({ previewEvent, isSubmitting }: PreviewSidebarProps) {
  return (
    <aside className="w-full lg:w-[32%] sticky top-6 bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
        <p className="text-gray text-sub-1 mb-5">EVENT PREVIEW</p>

        <div className="pointer-events-none mb-6">
            <EventCard event={previewEvent} />
        </div>

        <Button
            bgColorClass="bg-brand-red"
            className="flex items-center justify-center gap-2 text-button-md py-3 rounded-xl w-full"
            form="create-event-form"
            type="submit"
            disabled={isSubmitting}
        >
            Publish event <FaArrowRight />
        </Button>
    </aside>
  )
}

export default PreviewSidebar