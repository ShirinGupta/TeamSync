import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, onClear }) => {
  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search members by name, role, or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button
            onClick={onClear}
            className="btn-clear-search"
            title="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
