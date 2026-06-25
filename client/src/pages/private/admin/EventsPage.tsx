import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { EventForm } from "@/components/event-form";
import { AdminEventsFilter, AdminEventsGrid, AdminEventsHeader } from "@/components/admin/events";
import { useHttp, useDebounce } from "@/hooks";
import type { GetAllEventsResponse } from "@/types/response";
import type { Category } from "@/types/category";
import type { EventWithCategory } from "@/types/event";

function AdminEvents() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [category, setCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { 
    loading: eventsLoading, 
    error: eventsError, 
    sendRequest: getEvents,
    data: eventsData
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

  const [events, setEvents] = useState<EventWithCategory[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const fetchIdRef = useRef(0);

  const loadingRef = useRef(false);
  const paginationRef = useRef({ hasMore, nextCursor });

  useEffect(() => {
    loadingRef.current = eventsLoading || isFetchingNextPage;
  }, [eventsLoading, isFetchingNextPage]);

  useEffect(() => {
    paginationRef.current = { hasMore, nextCursor };
  }, [hasMore, nextCursor]);

  const fetchEvents = useCallback(async (cursor: string | null = null) => {
    const currentFetchId = ++fetchIdRef.current;
    
    if (!cursor) {
      setEvents([]);
      setNextCursor(null);
      setHasMore(true);
      setIsInitialLoad(true);
    }

    const params = new URLSearchParams();
    if (category !== "all") params.set('category', category);
    if (debouncedSearch) params.set('q', debouncedSearch);
    if (cursor) params.set('cursor', cursor);

    if (cursor) setIsFetchingNextPage(true);

    try {
      const response = await getEvents({
        method: 'GET',
        url: `/api/v1/event?${params.toString()}`,
      });

      if (currentFetchId !== fetchIdRef.current) return;

      if (response && response.data) {
        const fetchedEvents = response.data.events || [];
        
        if (cursor) {
          setEvents(prev => [...prev, ...fetchedEvents]);
        } else {
          setEvents(fetchedEvents);
        }

        setNextCursor(response.data.pagination?.next_cursor || null);
        setHasMore(response.data.pagination?.has_more ?? false);
      }
    } catch (err) {
      if (currentFetchId !== fetchIdRef.current) return;
      console.error("Failed to load events:", err);
    } finally {
      if (currentFetchId === fetchIdRef.current) {
        if (cursor) {
          setIsFetchingNextPage(false);
        } else {
          setIsInitialLoad(false);
        }
      }
    }
  }, [getEvents, category, debouncedSearch]);

  useEffect(() => {
    const loadInitialEvents = async () => {
      await fetchEvents(null);
    };
    loadInitialEvents();
  }, [fetchEvents]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current && paginationRef.current.hasMore) {
          fetchEvents(paginationRef.current.nextCursor);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchEvents]);

  const activeCategories = useMemo(() => {
    const defaultCats = [{ id: 'all', name: 'All', color: '#000000' } as Category];
    return fetchedCategories ? [...defaultCats, ...fetchedCategories] : defaultCats;
  }, [fetchedCategories]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="flex flex-col h-full font-dm pb-10">
      <AdminEventsHeader 
        totalEvents={eventsData?.total_events || 0} 
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
        loading={isInitialLoad || (eventsLoading && !isFetchingNextPage)}
        error={eventsError}
        onClearFilters={() => { setSearch(''); setCategory('all'); }}
      />

      {hasMore && (
        <div ref={loadMoreRef} className="w-full h-10 flex items-center justify-center mt-4 pb-8">
          {isFetchingNextPage && <span className="text-gray-500 font-medium">Loading more events...</span>}
        </div>
      )}

      {/* Create Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 overflow-y-auto no-scrollbar">
          <div className="relative w-full max-w-7xl max-h-full overflow-y-auto rounded-xl shadow-2xl bg-white no-scrollbar">
            <button 
              onClick={handleModalClose}
              className="absolute top-6 right-6 z-10 text-white/80 hover:text-white bg-black/40 p-2 rounded-full backdrop-blur-sm"
            >
              <FaTimes size={20} />
            </button>
            <EventForm
              mode="create"
              fetchedCategories={fetchedCategories || []}
              onCancel={handleModalClose}
              onSuccess={handleModalClose}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEvents;