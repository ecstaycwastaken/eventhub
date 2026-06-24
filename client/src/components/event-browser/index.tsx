import React, { useEffect, useMemo } from 'react';
import { useHttp } from '@/hooks/useHttp';
import type { EventItem } from '@/components/EventCard';
import { EventHero } from './EventHero';
import { EventStats } from './EventStats';
import { EventCategories, type CategoryItem } from './EventCategories';
import { EventList } from './EventList';
import { EventFooter } from './EventFooter';

interface EventBrowserProps {
  greeting?: string;
  mainTitle: React.ReactNode;
  subTitle?: string;
  showStats?: boolean;
}

interface EventResponse {
  events?: EventItem[];
}

export default function EventBrowser({
  greeting,
  mainTitle,
  subTitle,
  showStats = false,
}: EventBrowserProps) {
  const { data, loading, error, sendRequest } = useHttp<EventItem[] | EventResponse>();

  useEffect(() => {
    sendRequest({
      method: 'GET',
      url: '/api/v1/event',
    });
  }, [sendRequest]);

  // Handle the response which could be an array or an object with an events property
  const events: EventItem[] = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : (data.events || []);
  }, [data]);

  const totalEvents = events.length;
  
  const categories: CategoryItem[] = useMemo(() => {
    const defaultCategories: CategoryItem[] = [
      { id: 'all', name: 'All', color: '#000000' },
    ];
    
    if (events.length === 0) return defaultCategories;

    const uniqueCategories = Array.from(
      new Map(events.map((event) => [event.category.id, event.category])).values()
    );

    return [...defaultCategories, ...uniqueCategories];
  }, [events]);

  const totalCategories = Math.max(0, categories.length - 1); // Exclude 'All'

  return (
    <section className="min-h-screen bg-gray-50">
      <EventHero greeting={greeting} mainTitle={mainTitle} subTitle={subTitle} />

      {showStats && (
        <EventStats totalEvents={totalEvents} totalCategories={totalCategories} />
      )}

      <div className="flex flex-col items-center gap-4 pb-16">
        <EventCategories categories={categories} />
        <EventList events={events} loading={loading} error={error?.message || null} />
        <EventFooter />
      </div>
    </section>
  );
}
