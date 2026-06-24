import React, { useEffect, useMemo } from 'react';
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
    data: getAllEventsData, 
    loading: getAllEventsLoading, 
    error: getAllEventsError, 
    sendRequest: getAllEvents 
  } = useHttp<GetAllEventsResponse>();
  const {
    data: getAllCategoriesData,
    loading: getAllCategoriesLoading,
    error: getAllCategoriesError,
    sendRequest: getAllCategories
  } = useHttp<Category[]>();

  const category = searchParams.get('category')?.toLowerCase() || null;

  useEffect(() => {
    getAllEvents({
      method: 'GET',
      url: `/api/v1/event?category=${category || ''}`,
    });
  }, [getAllEvents, category]);

  useEffect(() => {
    getAllCategories({
      method: 'GET',
      url: '/api/v1/categories',
    });
  }, [getAllCategories]);

  // Handle the response which could be an array or an object with an events property
  const events: EventWithCategory[] = useMemo(() => {
    if (!getAllEventsData) return [];
    console.log('Received data:', getAllEventsData);
    return Array.isArray(getAllEventsData) ? getAllEventsData : (getAllEventsData.events || []);
  }, [getAllEventsData]);

  const totalEvents = events.length;
  
  const categories: Category[] = useMemo(() => {
    const defaultCategories: Category[] = [
      { id: 'all', name: 'All', color: '#000000' },
    ];

    if (!getAllCategoriesData) return defaultCategories;

    return [...defaultCategories, ...getAllCategoriesData];
  }, [getAllCategoriesData]);

  const totalCategories = Math.max(0, categories.length - 1); // Exclude 'All'

  return (
    <section className="min-h-screen bg-gray-50">
      <EventHero greeting={greeting} mainTitle={mainTitle} subTitle={subTitle} />

      {showStats && (
        <EventStats totalEvents={totalEvents} totalCategories={totalCategories} />
      )}

      <div className="w-full flex flex-col items-center gap-4 pb-16">
        {!getAllCategoriesLoading && getAllCategoriesError ? (
          <p className="col-span-full text-center text-red-500">
            Failed to load categories.
          </p>
        ) : (
          <EventCategories 
            categories={categories}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        )}
        <EventList events={events} loading={getAllEventsLoading} error={getAllEventsError?.message || null} />
        <EventFooter />
      </div>
    </section>
  );
}
