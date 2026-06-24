import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import heroBG from '@/assets/hero-bg.png';
import Button from '@/components/Button';

interface EventHeroProps {
  greeting?: string;
  mainTitle: React.ReactNode;
  subTitle?: string;
}

export function EventHero({ greeting, mainTitle, subTitle }: EventHeroProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      newParams.set('q', searchQuery.trim());
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ backgroundImage: `url(${heroBG})` }}
    >
      <div className="relative z-10">
        {greeting ? (
          <p className="mx-auto mb-4 max-w-xl text-sm font-bold tracking-widest text-white uppercase">
            {greeting}
          </p>
        ) : (
          <p className="mx-auto mb-4 max-w-xl text-sm uppercase tracking-widest text-gray-300 sm:text-base">
            Discover · Register · Attend
          </p>
        )}

        <h1 className="mx-auto max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          {mainTitle}
        </h1>

        {subTitle && (
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-300 sm:text-base">
            {subTitle}
          </p>
        )}

        <form 
          className="mx-auto mt-10 flex max-w-xl flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-xl bg-white p-2 shadow"
          onSubmit={handleSearch}
        >
          <input
            className="min-w-0 flex-1 rounded-lg px-4 py-3 outline-none text-black"
            placeholder="Search events, workshops, meetups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            bgColorClass="bg-brand-red" 
            className="shrink-0 rounded-lg px-4 py-3 sm:px-6 text-white w-full sm:w-auto"
          >
            Search
          </Button>
        </form>
      </div>
    </div>
  );
}
