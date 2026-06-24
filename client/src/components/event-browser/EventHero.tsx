import React from 'react';
import heroBG from '@/assets/hero-bg.png';
import Button from '@/components/Button';

interface EventHeroProps {
  greeting?: string;
  mainTitle: React.ReactNode;
  subTitle?: string;
}

export function EventHero({ greeting, mainTitle, subTitle }: EventHeroProps) {
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

        <div className="mx-auto mt-10 flex max-w-xl flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-xl bg-white p-2 shadow">
          <input
            className="min-w-0 flex-1 rounded-lg px-4 py-3 outline-none"
            placeholder="Search events, workshops, meetups..."
          />
          <Button bgColorClass="bg-brand-red" className="shrink-0 rounded-lg px-4 py-3 sm:px-6 text-white w-full sm:w-auto">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
