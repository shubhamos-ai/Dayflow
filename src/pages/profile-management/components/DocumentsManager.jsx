import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentsManager = ({ documents: initialDocuments, onUpload, onDelete }) => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [uploadingCategory, setUploadingCategory] = useState(null);

  const documentCategories = [
    {
      id: 'identity',
      name: 'Identity Documents',
      icon: 'IdCard',
      description: 'Passport, Driver License, National ID',
    },
    {
      id: 'education',
      name: 'Educational Certificates',
      icon: 'GraduationCap',
      description: 'Degrees, Diplomas, Transcripts',
    },
    {
      id: 'employment',
      name: 'Employment Documents',
      icon: 'FileText',
      description: 'Offer Letter, Contract, Agreements',
    },
    {
      id: 'financial',
      name: 'Financial Documents',
      icon: 'DollarSign',
      description: 'Bank Details, Tax Forms, Pay Slips',
    },
  ];

  const handleFileSelect = (e, category) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      const newDocuments = files?.map((file) => ({
        id: Date.now() + Math.random(),
        name: file?.name,
        category: category,
        size: (file?.size / 1024)?.toFixed(2) + ' KB',
        uploadDate: new Date()?.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        type: file?.type,
      }));

      setDocuments((prev) => [...prev, ...newDocuments]);
      if (onUpload) onUpload(newDocuments);
      setUploadingCategory(null);
    }
  };

  const handleDelete = (docId) => {
    setDocuments((prev) => prev?.filter((doc) => doc?.id !== docId));
    if (onDelete) onDelete(docId);
  };

  const getDocumentIcon = (type) => {
    if (type?.includes('pdf')) return 'FileText';
    if (type?.includes('image')) return 'Image';
    if (type?.includes('word') || type?.includes('document')) return 'FileText';
    return 'File';
  };

  const getCategoryDocuments = (categoryId) => {
    return documents?.filter((doc) => doc?.category === categoryId);
  };

  return (
    <div className="documents-manager glassmorphism rounded-xl p-6 md:p-8">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-2">
          Document Management
        </h2>
        <p className="text-sm md:text-base font-body text-muted-foreground">
          Upload and manage your employment documents securely
        </p>
      </div>
      <div className="space-y-6 md:space-y-8">
        {documentCategories?.map((category) => {
          const categoryDocs = getCategoryDocuments(category?.id);
          return (
            <div key={category?.id} className="document-category">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={category?.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
                      {category?.name}
                    </h3>
                    <p className="text-xs md:text-sm font-caption text-muted-foreground">
                      {category?.description}
                    </p>
                  </div>
                </div>
                <label htmlFor={`upload-${category?.id}`}>
                  <Button
                    variant="outline"
                    size="default"
                    iconName="Upload"
                    iconPosition="left"
                    onClick={() => setUploadingCategory(category?.id)}
                    asChild
                  >
                    Upload
                  </Button>
                  <input
                    id={`upload-${category?.id}`}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileSelect(e, category?.id)}
                    className="hidden"
                  />
                </label>
              </div>
              {categoryDocs?.length > 0 ? (
                <div className="space-y-3">
                  {categoryDocs?.map((doc) => (
                    <div
                      key={doc?.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-muted/50 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
                          <Icon
                            name={getDocumentIcon(doc?.type)}
                            size={20}
                            color="var(--color-foreground)"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm md:text-base font-body font-medium text-foreground truncate">
                            {doc?.name}
                          </p>
                          <p className="text-xs md:text-sm font-caption text-muted-foreground">
                            {doc?.size} • Uploaded on {doc?.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Download"
                          onClick={() => {}}
                          className="text-primary hover:text-primary"
                        >
                          Download
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Trash2"
                          onClick={() => handleDelete(doc?.id)}
                          className="text-error hover:text-error"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 px-4 bg-muted/30 rounded-lg border border-dashed border-border">
                  <Icon
                    name="FileX"
                    size={40}
                    color="var(--color-muted-foreground)"
                    className="mx-auto mb-3"
                  />
                  <p className="text-sm md:text-base font-body text-muted-foreground">
                    No documents uploaded yet
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-8 p-4 md:p-6 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm md:text-base font-heading font-semibold text-foreground mb-1">
              Document Guidelines
            </h4>
            <ul className="text-xs md:text-sm font-body text-muted-foreground space-y-1">
              <li>• Accepted formats: PDF, DOC, DOCX, JPG, PNG</li>
              <li>• Maximum file size: 10 MB per document</li>
              <li>• All documents are encrypted and stored securely</li>
              <li>• Sensitive documents require admin approval for access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsManager;