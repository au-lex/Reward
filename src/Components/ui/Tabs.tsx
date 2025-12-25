

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
    <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto">
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors whitespace-nowrap ${
              isActive
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {item.label}
            {item.count !== undefined && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isActive ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'
              }`}>
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}