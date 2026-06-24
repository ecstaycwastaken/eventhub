import Button from '@/components/Button';
import type { Category } from '@/types/category';

interface EventCategoriesProps {
  categories: Category[];
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

export function EventCategories({ categories, searchParams, setSearchParams }: EventCategoriesProps) {

  const isActive = (categoryName: string) => {
    const currentCategory = searchParams.get('category')?.toLowerCase() || null;
    if (currentCategory === categoryName.toLowerCase()) {
      return true;
    } else if (currentCategory === null && categoryName.toLowerCase() === 'all') {
      return true;
    }
    return false;
  };

  const handleCategoryClick = (categoryName: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    if (categoryName.toLowerCase() === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', categoryName.toLowerCase());
    }
    
    setSearchParams(newParams);
  };

  return (
    <div className="w-full mx-auto border-b border-gray-400 flex flex-wrap gap-3 px-4 md:px-8 lg:px-16 py-4">
      {categories.map((category) => {
        const item = { ...category }; // Create a new object to avoid mutating the original category
        const active = isActive(item.name.toLowerCase()); 

        return (
          <Button
            key={item.id}
            bgColorClass={active ? 'bg-brand-red' : 'bg-white'}
            textColorClass={active ? 'text-white' : 'text-black'}
            className={`
              rounded-full px-6 py-2 text-sm whitespace-nowrap text-center 
              ${active ? 'outline-none' : 'outline'}
            `}
            style={{ borderColor: item.color }}
            onClick={() => handleCategoryClick(item.name.toLowerCase())} 
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
}