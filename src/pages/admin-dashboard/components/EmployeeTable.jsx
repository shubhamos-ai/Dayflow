import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EmployeeTable = ({ employees, onViewProfile, onEditEmployee, onDeleteEmployee }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = React.useMemo(() => {
    let sortableEmployees = [...employees];
    if (sortConfig?.key) {
      sortableEmployees?.sort((a, b) => {
        if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableEmployees;
  }, [employees, sortConfig]);

  const handleSelectAll = (e) => {
    if (e?.target?.checked) {
      setSelectedEmployees(employees?.map(emp => emp?.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (id) => {
    setSelectedEmployees(prev => 
      prev?.includes(id) ? prev?.filter(empId => empId !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-success/10 text-success';
      case 'Absent':
        return 'bg-error/10 text-error';
      case 'Half-day':
        return 'bg-warning/10 text-warning';
      case 'Leave':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="employee-table">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  checked={selectedEmployees?.length === employees?.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-border"
                  aria-label="Select all employees"
                />
              </th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 hover:text-primary transition-smooth"
                >
                  Employee
                  <Icon name="ArrowUpDown" size={16} />
                </button>
              </th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">
                <button
                  onClick={() => handleSort('department')}
                  className="flex items-center gap-2 hover:text-primary transition-smooth"
                >
                  Department
                  <Icon name="ArrowUpDown" size={16} />
                </button>
              </th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">
                <button
                  onClick={() => handleSort('role')}
                  className="flex items-center gap-2 hover:text-primary transition-smooth"
                >
                  Role
                  <Icon name="ArrowUpDown" size={16} />
                </button>
              </th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 hover:text-primary transition-smooth"
                >
                  Status
                  <Icon name="ArrowUpDown" size={16} />
                </button>
              </th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">
                Recent Activity
              </th>
              <th className="text-right p-4 font-heading font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees?.map((employee) => (
              <tr
                key={employee?.id}
                className="border-b border-border hover:bg-muted/50 transition-smooth cursor-pointer"
                onClick={() => onViewProfile(employee)}
              >
                <td className="p-4" onClick={(e) => e?.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedEmployees?.includes(employee?.id)}
                    onChange={() => handleSelectEmployee(employee?.id)}
                    className="w-4 h-4 rounded border-border"
                    aria-label={`Select ${employee?.name}`}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={employee?.avatar}
                        alt={employee?.avatarAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-body font-medium text-foreground">
                        {employee?.name}
                      </p>
                      <p className="text-sm font-caption text-muted-foreground data-text">
                        {employee?.employeeId}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-body text-foreground">{employee?.department}</p>
                </td>
                <td className="p-4">
                  <p className="font-body text-foreground">{employee?.role}</p>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-md text-sm font-body font-medium ${getStatusColor(employee?.status)}`}>
                    {employee?.status}
                  </span>
                </td>
                <td className="p-4">
                  <p className="text-sm font-caption text-muted-foreground">
                    {employee?.recentActivity}
                  </p>
                </td>
                <td className="p-4" onClick={(e) => e?.stopPropagation()}>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Eye"
                      onClick={() => onViewProfile(employee)}
                      aria-label="View profile"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Edit"
                      onClick={() => onEditEmployee(employee)}
                      aria-label="Edit employee"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Trash2"
                      onClick={() => onDeleteEmployee(employee)}
                      aria-label="Delete employee"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {sortedEmployees?.map((employee) => (
          <div
            key={employee?.id}
            className="glassmorphism rounded-xl p-6 shadow-md"
            onClick={() => onViewProfile(employee)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedEmployees?.includes(employee?.id)}
                  onChange={() => handleSelectEmployee(employee?.id)}
                  onClick={(e) => e?.stopPropagation()}
                  className="w-4 h-4 rounded border-border"
                  aria-label={`Select ${employee?.name}`}
                />
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={employee?.avatar}
                    alt={employee?.avatarAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-body font-medium text-foreground">
                    {employee?.name}
                  </p>
                  <p className="text-sm font-caption text-muted-foreground data-text">
                    {employee?.employeeId}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-md text-sm font-body font-medium ${getStatusColor(employee?.status)}`}>
                {employee?.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Briefcase" size={16} className="text-muted-foreground" />
                <span className="font-caption text-muted-foreground">Department:</span>
                <span className="font-body text-foreground">{employee?.department}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <span className="font-caption text-muted-foreground">Role:</span>
                <span className="font-body text-foreground">{employee?.role}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="font-caption text-muted-foreground">{employee?.recentActivity}</span>
              </div>
            </div>

            <div className="flex gap-2" onClick={(e) => e?.stopPropagation()}>
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={() => onViewProfile(employee)}
                fullWidth
              >
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Edit"
                iconPosition="left"
                onClick={() => onEditEmployee(employee)}
                fullWidth
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;