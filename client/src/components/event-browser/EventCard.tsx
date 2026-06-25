import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import heroBG from '@/assets/hero-bg.png';
import Button from '../Button';
import EventDetailsModal from './EventDetailsModal';
import { useAuth } from '@/hooks/useAuth';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import type { EventWithCategory } from "@/types/event";

export type EventItem = EventWithCategory;

interface EventCardProps {
  event: EventWithCategory;
}

function EventCard({ event }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const isOwner = user?.id === event.user_id;
  const isAdmin = user?.role === 'admin';
  const isInAdminPath = window.location.pathname.startsWith('/admin');
  const viewingAsAdmin = isAdmin && isInAdminPath;
  const isRegisteredPath = location.pathname.includes('/my-registrations');

  const isRegistered = !viewingAsAdmin && (isRegisteredPath || event.user_status === 'registered' || event.user_status === 'attended');
  const price = Number(event.price) === 0 ? 'Free' : `₱${Number(event.price).toLocaleString()}`
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



  const userCode = event.code || event.event_attendances?.[0]?.code || 'XXXXXXXXXXXXXXXX';

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden w-full rounded-2xl border border-border-gray bg-white shadow-sm cursor-pointer transition-all hover:shadow-md font-dm" onClick={() => setIsModalOpen(true)}>
        <div className="relative h-60 w-full overflow-hidden rounded-t-2xl">
          <img
            src={event.banner_image || heroBG}
            alt={event.title}
            className="h-full w-full object-cover"
          />

          {isOwner || viewingAsAdmin ? (
            <div className="absolute right-3 top-3 rounded-full bg-success-bg px-4 py-2 text-sm font-semibold text-success-text">
              Published
            </div>
          ) : isRegistered ? (
            <div className="absolute right-3 top-3 rounded-full bg-success-bg px-4 py-2 text-sm font-semibold text-success-text shadow-sm">
              Confirmed
            </div>
          ) : (
            <div className="absolute right-3 top-3 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white">
              {price}
            </div>
          )}

            <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-sm font-semibold text-white">
              {event.capacity - (event.attendees_count || event.event_attendances_count || 0)} slots left
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-1 p-4">
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

            {isRegistered && (
              <p className="text-gray-400 text-caption-2 tracking-wider uppercase mt-1">
                {userCode}
              </p>
            )}

            <div className="mt-auto pt-4 flex gap-2 w-full">
              {isOwner || viewingAsAdmin ? (
                <Button
                  bgColorClass="bg-transparent"
                  textColorClass="text-black"
                  className="w-full rounded-xl py-2 font-semibold border border-grau hover:bg-gray-50 transition-colors"
                  onClick={() => setIsModalOpen(true)}
                >
                  See details
                </Button>
              ) : isRegistered ? (
                  <Button
                    bgColorClass="bg-white"
                    textColorClass="text-black"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2 text-button-lg border border-gray-200 shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                    }}
                  >
                    View Event
                  </Button>
              ) : (
                <Button
                  bgColorClass="bg-blue-600"
                  className="w-full rounded-xl py-2 font-semibold text-white"
                  onClick={() => setIsModalOpen(true)}
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