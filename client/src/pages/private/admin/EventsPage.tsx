import { useState, useEffect, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import EventCreationForm from "@/components/event-form/EventCreationForm";
import { AdminEventsFilter, AdminEventsGrid, AdminEventsHeader } from "@/components/admin/events";
import { useHttp, useDebounce } from "@/hooks";
import type { GetAllEventsResponse } from "@/types/response";
import type { Category } from "@/types/category";

function AdminEvents() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [category, setCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { 
    loading: eventsLoading, 
    error: eventsError, 
    sendRequest: getEvents,
    data: eventsResponse
  } = useHttp<GetAllEventsResponse>();

  const {
    data: fetchedCategories,
    sendRequest: getCategories
  } = useHttp<Category[]>();

  useEffect(() => {
    getCategories({
      method: 'GET',
      url: '/api/v1/categories',
    });
  }, [getCategories]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set('category', category);
    if (debouncedSearch) params.set('q', debouncedSearch);

    getEvents({
      method: 'GET',
      url: `/api/v1/event?${params.toString()}`,
    });
  }, [getEvents, category, debouncedSearch]);

  const events = useMemo(() => {
    if (!eventsResponse) return [];
    return Array.isArray(eventsResponse) ? eventsResponse : (eventsResponse.events || []);
  }, [eventsResponse]);

  const activeCategories = useMemo(() => {
    const defaultCats = [{ id: 'all', name: 'All', color: '#000000' } as Category];
    return fetchedCategories ? [...defaultCats, ...fetchedCategories] : defaultCats;
  }, [fetchedCategories]);

  return (
    <div className="flex flex-col h-full font-dm pb-10">
      <AdminEventsHeader 
        totalEvents={events.length} 
        onCreateClick={() => setIsModalOpen(true)} 
      />

      <AdminEventsFilter 
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        activeCategories={activeCategories}
      />

      <AdminEventsGrid 
        events={events}
        loading={eventsLoading}
        error={eventsError}
        onClearFilters={() => { setSearch(''); setCategory('all'); }}
      />

      {/* Create Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 overflow-y-auto no-scrollbar">
          <div className="relative w-full max-w-7xl max-h-full overflow-y-auto rounded-xl shadow-2xl bg-white no-scrollbar">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 z-10 text-white/80 hover:text-white bg-black/40 p-2 rounded-full backdrop-blur-sm"
            >
              <FaTimes size={20} />
            </button>
            <EventCreationForm onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEvents;