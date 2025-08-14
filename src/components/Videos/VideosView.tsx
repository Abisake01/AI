import React, { useState } from 'react';
import { Play, Eye, Download, Trash2, AlertTriangle, CheckCircle, Filter } from 'lucide-react';

interface VideoItem {
  id: string;
  filename: string;
  uploadedAt: string;
  duration: string;
  size: string;
  status: 'processed' | 'processing' | 'failed';
  detections: number;
  confidence: number;
  thumbnail: string;
}

const mockVideos: VideoItem[] = [
  {
    id: '1',
    filename: 'marketing_video.mp4',
    uploadedAt: '2024-01-15 10:30 AM',
    duration: '05:42',
    size: '245 MB',
    status: 'processed',
    detections: 0,
    confidence: 98,
    thumbnail: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    filename: 'user_content_001.mp4',
    uploadedAt: '2024-01-15 09:15 AM',
    duration: '12:18',
    size: '567 MB',
    status: 'processed',
    detections: 3,
    confidence: 87,
    thumbnail: 'https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    filename: 'educational_content.mp4',
    uploadedAt: '2024-01-15 08:45 AM',
    duration: '08:33',
    size: '398 MB',
    status: 'processing',
    detections: 0,
    confidence: 0,
    thumbnail: 'https://images.pexels.com/photos/5439381/pexels-photo-5439381.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '4',
    filename: 'action_sequence.mp4',
    uploadedAt: '2024-01-15 07:20 AM',
    duration: '15:27',
    size: '892 MB',
    status: 'processed',
    detections: 8,
    confidence: 94,
    thumbnail: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '5',
    filename: 'tutorial_video.mp4',
    uploadedAt: '2024-01-15 06:10 AM',
    duration: '22:15',
    size: '1.2 GB',
    status: 'processed',
    detections: 0,
    confidence: 99,
    thumbnail: 'https://images.pexels.com/photos/5439381/pexels-photo-5439381.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export const VideosView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'clean' | 'flagged'>('all');
  const [videos] = useState(mockVideos);

  const filteredVideos = videos.filter(video => {
    if (filter === 'clean') return video.detections === 0;
    if (filter === 'flagged') return video.detections > 0;
    return true;
  });

  const getStatusBadge = (status: string, detections: number) => {
    if (status === 'processing') {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
          Processing...
        </span>
      );
    }
    if (detections > 0) {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
          <AlertTriangle className="w-3 h-3 mr-1" />
          {detections} Issues
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
        <CheckCircle className="w-3 h-3 mr-1" />
        Clean
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Video Library
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and review all uploaded videos and their analysis results
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              All ({videos.length})
            </button>
            <button
              onClick={() => setFilter('clean')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                filter === 'clean'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Clean ({videos.filter(v => v.detections === 0).length})
            </button>
            <button
              onClick={() => setFilter('flagged')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                filter === 'flagged'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Flagged ({videos.filter(v => v.detections > 0).length})
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
              <img
                src={video.thumbnail}
                alt={video.filename}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <Play className="w-12 h-12 text-white opacity-0 hover:opacity-100 transition-opacity cursor-pointer" />
              </div>
              <div className="absolute top-3 right-3">
                {getStatusBadge(video.status, video.detections)}
              </div>
              <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2 truncate">
                {video.filename}
              </h3>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>{video.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uploaded:</span>
                  <span>{video.uploadedAt.split(' ')[0]}</span>
                </div>
                {video.status === 'processed' && (
                  <div className="flex justify-between">
                    <span>Confidence:</span>
                    <span className={`font-medium ${
                      video.confidence >= 95 ? 'text-green-600 dark:text-green-400' :
                      video.confidence >= 85 ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {video.confidence}%
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No videos found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filter settings or upload some videos to get started.
          </p>
        </div>
      )}
    </div>
  );
};