import { useState } from 'react';
import heroBG from '@/assets/hero-bg.png';
import Button from '../Button';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import type { EventWithCategory } from "@/types/event";
import EventDetailsModal from './EventDetailsModal';

export type EventItem = EventWithCategory;

interface EventCardProps {
  event: EventWithCategory;
  currentUserId?: string;
  isOwned?: boolean;
}

function EventCard({ event, currentUserId, isOwned }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOwner = currentUserId === event.user_id;

  const price =
    Number(event.price) === 0 ? 'Free' : `₱${Number(event.price).toLocaleString()}`

  const date = new Date(event.date)

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <>
      <div className="overflow-hidden w-full rounded-2xl border border-border-gray bg-white shadow-sm">
        <div className="relative h-60 w-full overflow-hidden rounded-t-2xl">
          <img
            src={event.banner_image || heroBG}
            alt={event.title}
            className="h-full w-full object-cover"
          />

          {isOwned ? (
            <div className="absolute right-3 top-3 rounded-full bg-success-bg px-4 py-2 text-sm font-semibold text-success-text">
              Published
            </div>
          ) : (
            <div className="absolute right-3 top-3 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white">
              {price}
            </div>
          )}

            <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-sm font-semibold text-white">
              {event.capacity} slots left
            </div>
          </div>

          <div className="flex flex-col gap-1 p-4">
            <h3 className="truncate text-lg font-semibold">{event.title}</h3>

            <p className="flex items-center justify-left gap-2 text-gray-500">
              <FiCalendar size={16} />{formattedDate} · {formattedTime}
            </p>

            <p className="font-semibold" style={{ color: event.category.color }}>
              {event.category.name}
            </p>

            <p className="flex items-center justify-left gap-2 text-gray-500">
              <FiMapPin size={16} />
              <span className="truncate">{event.venue}</span>
            </p>

            <div className="mt-auto pt-2">
              {isOwner ? (
                <Button
                  bgColorClass="bg-transparent"
                  textColorClass="text-black"
                  className="w-full rounded-xl py-2 font-semibold border border-grau hover:bg-gray-50 transition-colors"
                  onClick={() => setIsModalOpen(true)}
                >
                  See details
                </Button>
              ) : (
                <Button
                  bgColorClass="bg-blue-600"
                  className="w-full rounded-xl py-2 font-semibold text-white"
                >
                  Request to Join
                </Button>
              )}
            </div>
          </div>
        </div>

        <EventDetailsModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          event={event} 
        />
    </>
  )
}

export default EventCard