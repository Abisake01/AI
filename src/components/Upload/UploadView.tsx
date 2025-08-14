import React, { useState } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
}

export const UploadView: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (fileList: File[]) => {
    const newFiles = fileList.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: 'uploading' as const,
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload and processing
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, status: 'processing', progress: 100 }
            : f
        ));
        
        // Simulate processing
        setTimeout(() => {
          setFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, status: Math.random() > 0.8 ? 'error' : 'completed' }
              : f
          ));
        }, 3000);
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, progress: Math.min(progress, 100) }
            : f
        ));
      }
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Upload Videos
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload videos for AI-powered content analysis and detection
        </p>
      </div>

      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Drop your videos here
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          or click to browse files from your computer
        </p>
        <input
          type="file"
          multiple
          accept="video/*"
          onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer transition-colors"
        >
          Choose Files
        </label>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Supported formats: MP4, AVI, MOV, WMV • Max size: 2GB per file
        </div>
      </div>

      {files.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upload Queue ({files.length})
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {files.map((file) => (
              <div key={file.id} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <File className="w-8 h-8 text-blue-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                  {file.status === 'uploading' && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>Uploading...</span>
                        <span>{Math.round(file.progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {file.status === 'processing' && (
                    <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                      Processing for AI analysis...
                    </div>
                  )}
                  {file.status === 'completed' && (
                    <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                      Analysis completed successfully
                    </div>
                  )}
                  {file.status === 'error' && (
                    <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                      Error processing file
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(file.status)}
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};