"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Search, Users, GraduationCap, BookOpen, Calendar, DollarSign, FileText, Building, TrendingUp, X, LucideIcon, LayoutDashboard, MessageSquare } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

// Interface for category type
interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
}

export default function SearchBar() {
  const [searchText, setSearchText] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Categories with icons
  const categories: Category[] = [
    {
      id: 'global', name: 'Everywhere', icon: LayoutDashboard, color: 'text-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-200'
    },
    { id: 'students', name: 'Students', icon: Users, color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { id: 'faculty', name: 'Faculty', icon: GraduationCap, color: 'text-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
    { id: 'chat', name: 'Ask Chatbot', icon: MessageSquare, color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Open dropdown when typing
  useEffect(() => {
    if (searchText.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false)
    }
  }, [searchText]);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategories(prev => {
      const isAlreadySelected = prev.some(cat => cat.id === category.id);
      if (!isAlreadySelected) {
        const updated = [...prev, category];

        // Perform any side effect (like search) right here
        if (searchText.trim()) {
          handleSearch(updated);
        }

        return updated;
      }
      return prev;
    });

    setIsOpen(false);
    setHoveredIndex(-1);
  };


  const handleRemoveCategory = (categoryId: string) => {
    setSelectedCategories(selectedCategories.filter(cat => cat.id !== categoryId));
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  const handleSearch = (updatedCategories: Category[] = selectedCategories) => {
    // Don't search if empty
    if (!searchText.trim()) {
      return;
    }

    // Encode the search query for URL
    const encodedQuery = encodeURIComponent(searchText.trim());

    // Check if chat is selected (either alone or with other categories)
    const hasChatSelected = updatedCategories.some(cat => cat.id === 'chat');

    // Check if other categories are selected (not chat)
    const hasOtherCategories = updatedCategories.some(cat => cat.id !== 'chat');

    if (hasChatSelected) {
      setSelectedCategories([])
      setSearchText('')
      router.push(`/chat/${encodedQuery}`);
      return;
    }

    // CASE 2: Other categories are selected (not chat)
    if (hasOtherCategories) {
      // Get category IDs as URL params
      const categoryIds = updatedCategories.map(cat => cat.id).join(',');
      router.push(`/search-results/${encodedQuery}?categories=${categoryIds}`);
      return;
    }

    // CASE 3: No category selected - search everywhere
    router.push(`/search-results/${encodedQuery}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle Ctrl+Backspace - Remove last selected category
    if ((e.altKey || e.metaKey) && e.key === 'Backspace') {
      e.preventDefault();
      if (selectedCategories.length > 0) {
        // Remove the last category
        const newCategories = [...selectedCategories];
        newCategories.pop();
        setSelectedCategories(newCategories);
      }
      return;
    }

    // Handle Escape key
    if (e.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    // Handle Enter key
    if (e.key === 'Enter') {
      // If dropdown is open and something is hovered, select that category
      if (isOpen && hoveredIndex >= 0) {
        handleSelectCategory(availableCategories[hoveredIndex]);
        e.preventDefault();
        return;
      }

      // If dropdown is open but nothing hovered, close dropdown and search
      if (isOpen) {
        e.preventDefault();
        setIsOpen(false);
        handleSearch();
        return;
      }

      // If dropdown is closed, just search
      e.preventDefault();
      handleSearch();
      return;
    }

    // Handle arrow keys
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setHoveredIndex((prev) => Math.min(prev + 1, availableCategories.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHoveredIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  // Filter out already selected categories
  const availableCategories = categories.filter(
    cat => !selectedCategories.some(selected => selected.id === cat.id)
  );


  if (pathname.startsWith('/chat')) {
    return <></>;
  }

  return (
    <div ref={searchRef} className="fixed top-0 z-10 lg:w-[calc(100vw-15em)] w-screen lg:left-60 ">
      <div className="bg-white border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
        {/* Selected Categories Badges */}
        {selectedCategories.length > 0 && (
          <div className="px-4 pt-3 pb-2 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-gray-500">Searching in:</span>
              {selectedCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 ${category.bgColor} border ${category.borderColor} rounded-lg text-sm group hover:shadow-sm transition-all`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${category.color}`} />
                    <span className="font-medium text-gray-700">{category.name}</span>
                    <button
                      onClick={() => handleRemoveCategory(category.id)}
                      className="ml-0.5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
              <button
                onClick={clearAllCategories}
                className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
              >
                Clear all
              </button>
            </div>
          </div>
        )}

        {/* Search Input */}
        <div className="flex items-center px-4 py-4 bg-white">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder={selectedCategories.length > 0
              ? "Type to search in selected categories..."
              : "Search students, faculty, courses, and more..."}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyPress}
            onClick={() => searchText && setIsOpen(true)}
            onFocus={() => searchText && setIsOpen(true)}
            className="flex-1 text-base text-gray-900 placeholder-gray-400 outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && availableCategories.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Add search category
            </div>

            {availableCategories.map((category, index) => {
              const Icon = category.icon;
              const isHovered = hoveredIndex === index;

              return (
                <button
                  key={category.id}
                  onClick={() => handleSelectCategory(category)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${isHovered ? 'bg-gray-50' : ''
                    }`}
                >
                  <div className={`w-8 h-8 rounded-lg ${category.bgColor} flex items-center justify-center transition-transform duration-150 ${isHovered ? 'scale-110' : ''
                    }`}>
                    <Icon className={`w-4 h-4 ${category.color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900 text-sm">{category.name}</div>
                    <div className="text-xs text-gray-500">
                      Add {category.name.toLowerCase()} to search
                    </div>
                  </div>
                  {isHovered && (
                    <div className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                      ↵
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer hint */}
          <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs">↵</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs">Esc</kbd>
                Close
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Message when all categories selected */}
      {isOpen && availableCategories.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
          <p className="text-sm text-gray-500 text-center">All categories selected! 🎉</p>
        </div>
      )}
    </div>
  );
}