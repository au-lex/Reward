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
    /* 1. w-full: Take available width.
      2. overflow-hidden: Ensure the outer wrapper never causes page scroll.
      3. min-w-0: Crucial for nested flex layouts; tells browser this can shrink.
    */
    <div className="w-full overflow-hidden min-w-0"> 
      <div 
        className="
          flex items-center gap-3 
          overflow-x-auto 
          pb-2
          w-full
          touch-pan-x 
          no-scrollbar
          /* snap-x mandatory: Optional, makes scrolling feel 'sticky' like a native app */
        "
      >
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              /* flex-shrink-0 ensures the button keeps its size and forces the scroll */
              className={`
                flex-shrink-0 relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200
                ${
                  isActive
                    ? 'bg-purple-500/10 text-purple-700 border-b-2 border-purple-600 rounded-b-none'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              {item.label}
              {item.count !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                    isActive
                      ? 'bg-purple-500/10 text-purple-800'
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
    </div>
  );
}