import React, { useEffect, useMemo, useState } from 'react';
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

  const [fetchedData, setFetchedData] = useState<{ key: string; data: EventWithCategory[] } | null>(null);

  const category = searchParams.get('category')?.toLowerCase() || null;
  const q = searchParams.get('q') || null;
  const cacheKey = `eventhub_events_${category || 'all'}_${q || ''}`;

  const eventsToShow = useMemo(() => {
    if (fetchedData && fetchedData.key === cacheKey) {
      return fetchedData.data;
    }
    try {
      const cached = sessionStorage.getItem(cacheKey);
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      console.error('Failed to parse cached events:', e);
      return [];
    }
  }, [fetchedData, cacheKey]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (q) params.set('q', q);

    getAllEvents({
      method: 'GET',
      url: `/api/v1/event?${params.toString()}`,
    }).then((response) => {
      if (response && response.data) {
        const fetchedEvents = Array.isArray(response.data) 
          ? response.data 
          : (response.data.events || []);
        sessionStorage.setItem(cacheKey, JSON.stringify(fetchedEvents));
        setFetchedData({ key: cacheKey, data: fetchedEvents });
      }
    }).catch((err) => {
      console.error("Failed to load events:", err);
    });
  }, [getAllEvents, category, q, cacheKey]);

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

  const totalEvents = eventsToShow.length;
  
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
        <EventList events={eventsToShow} loading={getAllEventsLoading} error={getAllEventsError?.message || null} />
        <EventFooter />
      </div>
    </section>
  );
}
