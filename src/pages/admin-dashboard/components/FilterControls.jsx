import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterControls = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  resultsCount,
  departments,
  roles,
  statuses 
}) => {
  return (
    <div className="filter-controls glassmorphism rounded-xl p-6 lg:p-8 shadow-md mb-6 lg:mb-8">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by name or employee ID..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 flex-1">
          <Select
            placeholder="All Departments"
            options={departments}
            value={filters?.department}
            onChange={(value) => onFilterChange('department', value)}
          />

          <Select
            placeholder="All Roles"
            options={roles}
            value={filters?.role}
            onChange={(value) => onFilterChange('role', value)}
          />

          <Select
            placeholder="All Statuses"
            options={statuses}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
          />
        </div>

        <Button
          variant="outline"
          iconName="X"
          iconPosition="left"
          onClick={onClearFilters}
          className="lg:w-auto"
        >
          Clear
        </Button>
      </div>
      {resultsCount !== null && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm font-caption text-muted-foreground">
            Showing <span className="font-medium text-foreground data-text">{resultsCount}</span> {resultsCount === 1 ? 'employee' : 'employees'}
          </p>
        </div>
      )}
    </div>
  );
};

export default FilterControls;