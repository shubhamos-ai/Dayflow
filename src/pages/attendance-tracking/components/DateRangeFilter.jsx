import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DateRangeFilter = ({ onFilterApply }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApply = () => {
    if (startDate && endDate) {
      onFilterApply({ startDate, endDate });
      setIsExpanded(false);
    }
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    onFilterApply({ startDate: '', endDate: '' });
  };

  const quickFilters = [
    { label: 'Today', days: 0 },
    { label: 'Last 7 Days', days: 7 },
    { label: 'Last 30 Days', days: 30 },
    { label: 'This Month', days: 'month' },
  ];

  const handleQuickFilter = (days) => {
    const end = new Date();
    let start = new Date();

    if (days === 'month') {
      start = new Date(end.getFullYear(), end.getMonth(), 1);
    } else {
      start?.setDate(end?.getDate() - days);
    }

    const formatDate = (date) => date?.toISOString()?.split('T')?.[0];
    setStartDate(formatDate(start));
    setEndDate(formatDate(end));
    onFilterApply({ startDate: formatDate(start), endDate: formatDate(end) });
  };

  return (
    <div className="date-range-filter bg-card border border-border rounded-xl p-6 lg:p-8 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Filter Attendance
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted transition-smooth active-press"
        >
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} />
        </button>
      </div>
      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="flex flex-wrap gap-2 lg:gap-3">
          {quickFilters?.map((filter) => (
            <button
              key={filter?.label}
              onClick={() => handleQuickFilter(filter?.days)}
              className="px-4 py-2 rounded-md text-sm font-body font-medium text-foreground bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth active-press"
            >
              {filter?.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e?.target?.value)}
            max={endDate || undefined}
          />
          <Input
            type="date"
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e?.target?.value)}
            min={startDate || undefined}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-3">
          <Button
            variant="default"
            fullWidth
            iconName="Filter"
            iconPosition="left"
            onClick={handleApply}
            disabled={!startDate || !endDate}
            className="lg:flex-1"
          >
            Apply Filter
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="X"
            iconPosition="left"
            onClick={handleReset}
            className="lg:flex-1"
          >
            Reset
          </Button>
        </div>

        {startDate && endDate && (
          <div className="flex items-center gap-2 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <Icon name="Info" size={20} color="var(--color-primary)" />
            <p className="text-sm font-body text-foreground">
              Showing records from{' '}
              <span className="font-semibold data-text">
                {new Date(startDate)?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>{' '}
              to{' '}
              <span className="font-semibold data-text">
                {new Date(endDate)?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangeFilter;