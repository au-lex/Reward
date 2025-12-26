interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export function Tabs({ items, activeId, onChange }: TabsProps) {
  return (
    <div className="w-full mb-6">
      {/* Container with overflow handling for mobile */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`
                relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200
                ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600 rounded-b-none'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              {item.label}
              {item.count !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                    isActive
                      ? 'bg-purple-200 text-purple-800'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {/* Decorative full-width bottom line to simulate the tab container border */}
      <div className="h-[1px] bg-gray-200 w-full -mt-2"></div>
    </div>
  );
}