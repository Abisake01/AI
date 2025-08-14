export interface Video {
  id: string;
  filename: string;
  uploadedAt: string;
  size: number;
  duration: number;
  status: 'processing' | 'completed' | 'failed';
  userId: string;
  analysisResults?: AnalysisResult[];
}

export interface AnalysisResult {
  id: string;
  videoId: string;
  detectionType: DetectionType;
  confidence: number;
  timestamp: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface DetectionType {
  id: string;
  name: string;
  category: 'content' | 'copyright' | 'violence' | 'spam';
  color: string;
}

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Dashboard {
  totalVideos: number;
  processedVideos: number;
  detectedIssues: number;
  processingTime: number;
  recentActivity: AnalysisResult[];
}