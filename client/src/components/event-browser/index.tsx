import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useHttp } from '@/hooks/useHttp';
import { EventCategories } from './EventCategories';
import { EventHero } from './EventHero';
import { EventStats } from './EventStats';
import { EventList } from './EventList';
import { EventFooter } from './EventFooter';
import type { EventWithCategory } from "@/types/event";
import type { Category } from "@/types/category";
import type { GetAllEventsResponse } from "@/types/response";

interface EventBrowserProps {
  greeting?: string;
  mainTitle: React.ReactNode;
  subTitle?: string;
  showStats?: boolean;
}

export default function EventBrowser({
  greeting,
  mainTitle,
  subTitle,
  showStats = false,
}: EventBrowserProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { 
    loading: getAllEventsLoading, 
    error: getAllEventsError, 
    sendRequest: getAllEvents 
  } = useHttp<GetAllEventsResponse>();
  const {
    loading: getAllCategoriesLoading,
    error: getAllCategoriesError,
    sendRequest: getAllCategories
  } = useHttp<Category[]>();

  const [categoriesData, setCategoriesData] = useState<Category[]>(() => {
    try {
      const cached = sessionStorage.getItem('eventhub_categories');
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      console.error('Failed to parse cached categories:', e);
      return [];
    }
  });

  const category = searchParams.get('category')?.toLowerCase() || null;
  const q = searchParams.get('q') || null;

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
    loadingRef.current = getAllEventsLoading || isFetchingNextPage;
  }, [getAllEventsLoading, isFetchingNextPage]);

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
    if (category) params.set('category', category);
    if (q) params.set('q', q);
    if (cursor) params.set('cursor', cursor);

    if (cursor) setIsFetchingNextPage(true);

    try {
      const response = await getAllEvents({
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
  }, [getAllEvents, category, q]);

  useEffect(() => {
    const loadInitialEvents = async () => {
      await fetchEvents(null);
    };
    loadInitialEvents();

    const handleRsvpChange = () => {
      fetchEvents(null);
    };
    window.addEventListener('rsvp-changed', handleRsvpChange);
    return () => window.removeEventListener('rsvp-changed', handleRsvpChange);
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

  useEffect(() => {
    if (categoriesData.length > 0) return;

    getAllCategories({
      method: 'GET',
      url: '/api/v1/categories',
    }).then((response) => {
      if (response && response.data) {
        sessionStorage.setItem('eventhub_categories', JSON.stringify(response.data));
        setCategoriesData(response.data);
      }
    }).catch((err) => {
      console.error("Failed to load categories:", err);
    });
  }, [getAllCategories, categoriesData.length]);

  const totalEvents = events.length;
  
  const categories: Category[] = useMemo(() => {
    const defaultCategories: Category[] = [
      { id: 'all', name: 'All', color: '#000000' },
    ];

    if (!categoriesData || categoriesData.length === 0) return defaultCategories;

    return [...defaultCategories, ...categoriesData];
  }, [categoriesData]);

  const categoriesLoading = categoriesData.length === 0 && getAllCategoriesLoading;

  const totalCategories = Math.max(0, categories.length - 1); // Exclude 'All'

  return (
    <section className="min-h-screen bg-gray-50">
      <EventHero greeting={greeting} mainTitle={mainTitle} subTitle={subTitle} />

      {showStats && (
        <EventStats totalEvents={totalEvents} totalCategories={totalCategories} />
      )}

      <div className="w-full flex flex-col items-center gap-4 pb-16">
        {!categoriesLoading && getAllCategoriesError && categories.length <= 1 ? (
          <p className="col-span-full text-center text-red-500">
            {getAllCategoriesError?.message || "Failed to load categories."}
          </p>
        ) : (
          <EventCategories 
            categories={categories}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        )}
        <EventList events={events} loading={isInitialLoad || (getAllEventsLoading && !isFetchingNextPage)} error={getAllEventsError?.message || null} />
        {hasMore && (
          <div ref={loadMoreRef} className="w-full h-10 flex items-center justify-center mt-4">
            {isFetchingNextPage && <span className="text-gray-500 font-medium">Loading more events...</span>}
          </div>
        )}
        <EventFooter />
      </div>
    </section>
  );
}
