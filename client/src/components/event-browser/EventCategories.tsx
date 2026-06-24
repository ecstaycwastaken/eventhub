import { useParams } from 'react-router-dom';
import Button from '@/components/Button';

export interface CategoryItem {
  id: string;
  name: string;
  color: string;
}

interface EventCategoriesProps {
  categories: CategoryItem[];
}

export function EventCategories({ categories }: EventCategoriesProps) {
  const { category } = useParams<{ category: string }>();

  if (categories.length === 0) return null;

  return (
    <div className="w-full mx-auto border-b border-gray-400 flex flex-wrap gap-3 px-16 py-4">
      {categories.map((item) => (
        <Button
          key={item.id}
          bgColorClass="bg-white"
          textColorClass="text-black"
          className={`
              rounded-full px-6 py-2 text-sm whitespace-nowrap text-center 
              ${category === item.name.toLowerCase() 
                ? 'bg-brand-red text-white outline-none'
                : 'outline'
              }
            `}
          style={{ borderColor: item.color }}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}
