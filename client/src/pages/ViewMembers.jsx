import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import MemberCard from '../components/MemberCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { Users, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { showToast } from '../utils/toast';
import { exportToCSV, getDownloadFilename } from '../utils/csvExport';

const ViewMembers = () => {
  const [allMembers, setAllMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState('all');
  const [roles, setRoles] = useState([]);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/members');
        setAllMembers(res.data);

        // Extract unique roles
        const uniqueRoles = [...new Set(res.data.map(m => m.role))];
        setRoles(uniqueRoles);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load team members. Ensure the server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    let processed = [...allMembers];

    if (roleFilter !== 'all') {
      processed = processed.filter(member => member.role === roleFilter);
    }

    if (searchTerm) {
      processed = processed.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    processed.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'role-asc':
          return a.role.localeCompare(b.role);
        case 'role-desc':
          return b.role.localeCompare(a.role);
        case 'date-newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'date-oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

    return processed;
  }, [allMembers, searchTerm, sortBy, roleFilter]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleRoleChange = (e) => {
    setRoleFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleExport = () => {
    if (filteredMembers.length === 0) {
      showToast('No members to export', 'error');
      return;
    }
    exportToCSV(filteredMembers, getDownloadFilename());
    showToast(`Exported ${filteredMembers.length} member(s)`, 'success');
  };

  if (loading) {
    return (
      <div className="text-center" style={{ padding: '4rem 0' }}>
        <div className="loader mb-4"></div>
        <p className="text-muted">Loading team members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center" style={{ padding: '4rem 0' }}>
        <div className="alert alert-error" style={{ maxWidth: '600px', margin: '0 auto' }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-8 text-center">
        <Users size={32} className="text-muted" />
        <h2 style={{ fontSize: '2rem' }}>Our Team Members</h2>
      </div>

      {allMembers.length === 0 ? (
        <div className="text-center card" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
          <p className="text-muted mb-4 text-lg">No team members found.</p>
          <Link to="/add-member" className="btn btn-primary">
            Add Your First Member
          </Link>
        </div>
      ) : (
        <>
          {/* Search Bar */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClear={handleClearSearch}
          />

          {/* Filters and Sort */}
          <div className="filters-container">
            <div className="filter-group">
              <label htmlFor="role-filter" className="filter-label">Filter by Role:</label>
              <select
                id="role-filter"
                value={roleFilter}
                onChange={handleRoleChange}
                className="form-control"
                style={{ maxWidth: '250px' }}
              >
                <option value="all">All Roles</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-by" className="filter-label">Sort by:</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={handleSortChange}
                className="form-control"
                style={{ maxWidth: '250px' }}
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="role-asc">Role (A-Z)</option>
                <option value="role-desc">Role (Z-A)</option>
                <option value="date-newest">Newest First</option>
                <option value="date-oldest">Oldest First</option>
              </select>
            </div>

            <button
              onClick={handleExport}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Download size={16} /> Export CSV
            </button>
          </div>

          {/* Results count */}
          <div className="results-info">
            <p className="text-muted">
              Showing {paginatedMembers.length} of {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''}
              {searchTerm && ` matching "${searchTerm}"`}
              {roleFilter !== 'all' && ` in role "${roleFilter}"`}
            </p>
          </div>

          {/* Members Grid */}
          {paginatedMembers.length > 0 ? (
            <>
              <div className="grid-layout">
                {paginatedMembers.map(member => (
                  <MemberCard key={member._id} member={member} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="text-center card" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
              <p className="text-muted mb-4">No members match your search criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('all');
                }}
                className="btn btn-outline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewMembers;
