import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LeaveHistoryTable = ({ requests, userRole, onApprove, onReject }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approverComments, setApproverComments] = useState('');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [actionType, setActionType] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-success/10 text-success';
      case 'Pending':
        return 'bg-warning/10 text-warning';
      case 'Rejected':
        return 'bg-error/10 text-error';
      case 'Cancelled':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleApprovalAction = (request, type) => {
    setSelectedRequest(request);
    setActionType(type);
    setShowApprovalModal(true);
  };

  const handleSubmitAction = () => {
    if (actionType === 'approve') {
      onApprove?.(selectedRequest?.id, approverComments);
    } else {
      onReject?.(selectedRequest?.id, approverComments);
    }
    setShowApprovalModal(false);
    setApproverComments('');
    setSelectedRequest(null);
    setActionType(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <div className="leave-history-table glassmorphism rounded-xl p-6 md:p-8 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
              Leave History
            </h2>
            <p className="text-sm font-body text-muted-foreground mt-1">
              Track all leave requests and their status
            </p>
          </div>
          {userRole === 'admin' && (
            <Button variant="outline" size="default" iconName="Filter" iconPosition="left">
              Filter
            </Button>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {userRole === 'admin' && (
                  <th className="text-left p-4 font-heading font-semibold text-foreground">Employee</th>
                )}
                <th className="text-left p-4 font-heading font-semibold text-foreground">Leave Type</th>
                <th className="text-left p-4 font-heading font-semibold text-foreground">Start Date</th>
                <th className="text-left p-4 font-heading font-semibold text-foreground">End Date</th>
                <th className="text-left p-4 font-heading font-semibold text-foreground">Days</th>
                <th className="text-left p-4 font-heading font-semibold text-foreground">Status</th>
                <th className="text-left p-4 font-heading font-semibold text-foreground">Applied Date</th>
                {userRole === 'admin' && (
                  <th className="text-right p-4 font-heading font-semibold text-foreground">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {requests?.map((request) => (
                <tr key={request?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                  {userRole === 'admin' && (
                    <td className="p-4">
                      <p className="font-body font-medium text-foreground">{request?.employeeName}</p>
                    </td>
                  )}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={16} color="var(--color-primary)" />
                      <span className="font-body text-foreground">{request?.leaveType}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-body text-foreground">{formatDate(request?.startDate)}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-body text-foreground">{formatDate(request?.endDate)}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-body font-medium text-foreground">{request?.days}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-md text-sm font-body font-medium ${getStatusColor(request?.status)}`}>
                      {request?.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-body text-muted-foreground">{formatDate(request?.appliedDate)}</span>
                  </td>
                  {userRole === 'admin' && (
                    <td className="p-4">
                      {request?.status === 'Pending' && (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="success"
                            size="sm"
                            iconName="Check"
                            onClick={() => handleApprovalAction(request, 'approve')}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            iconName="X"
                            onClick={() => handleApprovalAction(request, 'reject')}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {requests?.map((request) => (
            <div key={request?.id} className="p-4 rounded-lg border border-border hover:shadow-md transition-smooth">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-md text-sm font-body font-medium ${getStatusColor(request?.status)}`}>
                  {request?.status}
                </span>
                <span className="text-sm font-body text-muted-foreground">{formatDate(request?.appliedDate)}</span>
              </div>

              {userRole === 'admin' && (
                <p className="font-body font-semibold text-foreground mb-2">{request?.employeeName}</p>
              )}

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={16} color="var(--color-primary)" />
                  <span className="text-sm font-body text-foreground">{request?.leaveType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
                  <span className="text-sm font-body text-muted-foreground">
                    {formatDate(request?.startDate)} - {formatDate(request?.endDate)} ({request?.days} days)
                  </span>
                </div>
              </div>

              {userRole === 'admin' && request?.status === 'Pending' && (
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="success"
                    size="sm"
                    iconName="Check"
                    fullWidth
                    onClick={() => handleApprovalAction(request, 'approve')}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    iconName="X"
                    fullWidth
                    onClick={() => handleApprovalAction(request, 'reject')}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="glassmorphism rounded-xl p-6 md:p-8 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-heading font-semibold text-foreground">
                {actionType === 'approve' ? 'Approve' : 'Reject'} Leave Request
              </h3>
              <button
                onClick={() => {
                  setShowApprovalModal(false);
                  setApproverComments('');
                  setSelectedRequest(null);
                  setActionType(null);
                }}
                className="p-2 rounded-md hover:bg-muted transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm font-body text-muted-foreground">Employee</p>
                <p className="font-body font-medium text-foreground">{selectedRequest?.employeeName}</p>
              </div>
              <div>
                <p className="text-sm font-body text-muted-foreground">Leave Type</p>
                <p className="font-body font-medium text-foreground">{selectedRequest?.leaveType}</p>
              </div>
              <div>
                <p className="text-sm font-body text-muted-foreground">Duration</p>
                <p className="font-body font-medium text-foreground">
                  {formatDate(selectedRequest?.startDate)} - {formatDate(selectedRequest?.endDate)} ({selectedRequest?.days} days)
                </p>
              </div>
              <div>
                <p className="text-sm font-body text-muted-foreground">Reason</p>
                <p className="font-body text-foreground">{selectedRequest?.reason}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-2 block">Comments</label>
              <textarea
                className="w-full h-24 px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="Add your comments..."
                value={approverComments}
                onChange={(e) => setApproverComments(e?.target?.value)}
              />
            </div>

            <div className="flex gap-4">
              <Button
                variant={actionType === 'approve' ? 'success' : 'danger'}
                size="default"
                fullWidth
                onClick={handleSubmitAction}
              >
                {actionType === 'approve' ? 'Approve' : 'Reject'}
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => {
                  setShowApprovalModal(false);
                  setApproverComments('');
                  setSelectedRequest(null);
                  setActionType(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaveHistoryTable;