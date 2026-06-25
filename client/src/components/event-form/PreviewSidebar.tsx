import EventCard, { type EventItem } from "@/components/event-browser/EventCard";

interface PreviewSidebarProps {
    previewEvent: EventItem;
    // isSubmitting: boolean;
    // mode: 'create' | 'edit';
}

function PreviewSidebar({ previewEvent }: PreviewSidebarProps) {
  return (
    <aside className="w-full lg:w-[32%] sticky top-6 bg-white border border-gray rounded-xl p-6 shadow-sm">
        <p className="text-gray text-sub-1 mb-5">EVENT PREVIEW</p>

        <div className="pointer-events-none mb-6">
            <EventCard event={previewEvent} />
        </div>
    </aside>
  )
}

export default PreviewSidebar