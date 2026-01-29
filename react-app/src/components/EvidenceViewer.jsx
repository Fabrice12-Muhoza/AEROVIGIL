// src/components/EvidenceViewer.jsx
import React, { useEffect, useRef, useState } from 'react';
import { CameraIcon, PlayIcon, PauseIcon, ArrowsPointingOutIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const EvidenceViewer = ({ vehicleId }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [evidence, setEvidence] = useState(null);
  const [streamUrl, setStreamUrl] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    if (vehicleId) {
      fetchEvidence();
      setupWebSocket();
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [vehicleId]);

  const setupWebSocket = () => {
    // Connect to WebSocket for real-time video stream
    ws.current = new WebSocket(`ws://localhost:8000/api/stream/${vehicleId}`);
    
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'video_chunk') {
        // Handle video chunks (simplified)
        if (videoRef.current) {
          // In production, use proper video stream handling
          // This is a simplified version
        }
      } else if (data.type === 'evidence_update') {
        setEvidence(data.evidence);
      }
    };

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };
  };

  const fetchEvidence = async () => {
    try {
      const response = await fetch(`/api/evidence/${vehicleId}`);
      const data = await response.json();
      setEvidence(data);
      setStreamUrl(data.video_url);
    } catch (error) {
      toast.error('Failed to load evidence');
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const copyHash = () => {
    if (evidence?.hash) {
      navigator.clipboard.writeText(evidence.hash);
      toast.success('Hash copied to clipboard');
    }
  };

  if (!vehicleId) {
    return (
      <div className="p-8 text-center">
        <CameraIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select a vehicle
        </h4>
        <p className="text-gray-500 dark:text-gray-400">
          Click on a vehicle from Live Alerts to view evidence
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              Vehicle {vehicleId} - Plate: {evidence?.plate || 'Loading...'}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Evidence ID: {evidence?.id || 'N/A'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
              {evidence?.status || 'PROCESSING'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Timestamp</p>
            <p className="font-mono text-sm text-gray-900 dark:text-white">
              {evidence?.timestamp || '2025-01-06 08:12:45'}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Evidence Hash</p>
                <p className="font-mono text-sm text-gray-900 dark:text-white truncate">
                  {evidence?.hash || 'af23d4f67bc...'}
                </p>
              </div>
              <button
                onClick={copyHash}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                title="Copy hash"
              >
                <DocumentDuplicateIcon className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="relative bg-black rounded-lg overflow-hidden">
        {streamUrl ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-64 object-contain"
              controls
              src={streamUrl}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePlayPause}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full"
                  >
                    {isPlaying ? (
                      <PauseIcon className="w-5 h-5 text-white" />
                    ) : (
                      <PlayIcon className="w-5 h-5 text-white" />
                    )}
                  </button>
                  <div className="text-white">
                    <span className="text-sm">LIVE</span>
                    <span className="w-2 h-2 bg-red-500 rounded-full ml-2 inline-block animate-pulse"></span>
                  </div>
                </div>
                <button
                  onClick={handleFullscreen}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded"
                >
                  <ArrowsPointingOutIcon className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Overlay Information */}
            <div className="absolute top-4 left-4">
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-black/70 text-white text-xs rounded">
                  {evidence?.timestamp?.split(' ')[1] || '08:12:45'}
                </span>
                <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">
                  {evidence?.plate || 'RAB123'}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <CameraIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-400">Loading video stream...</p>
            </div>
          </div>
        )}
      </div>

      {/* Additional Evidence */}
      {evidence?.additional_evidence && (
        <div className="mt-4">
          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Additional Evidence
          </h5>
          <div className="flex space-x-2 overflow-x-auto">
            {evidence.additional_evidence.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                <img src={item.thumbnail} alt={`Evidence ${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceViewer;