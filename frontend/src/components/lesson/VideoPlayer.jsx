import React, { useEffect, useRef } from 'react';

export const VideoPlayer = ({
  videoId = 'dQw4w9WgXcQ',
  title = 'Lesson Video',
  startTime = 0,
  onTimeUpdate,
}) => {
  const iframeRef = useRef(null);
  const lastVideoIdRef = useRef(videoId);
  const initialStartRef = useRef(null);

  if (lastVideoIdRef.current !== videoId) {
    lastVideoIdRef.current = videoId;
    initialStartRef.current = null;
  }

  if (initialStartRef.current === null && startTime > 0) {
    initialStartRef.current = Math.floor(startTime);
  }

  const effectiveStart = initialStartRef.current || Math.floor(startTime || 0);
  const startParam = effectiveStart > 0 ? `&start=${effectiveStart}` : '';
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1${startParam}`;

  useEffect(() => {
    if (!onTimeUpdate) return;

    const handleMessage = (e) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data?.event === 'infoDelivery' && typeof data.info?.currentTime === 'number') {
          onTimeUpdate(data.info.currentTime);
        }
      } catch {
        // Ignore non-json messages
      }
    };

    window.addEventListener('message', handleMessage);

    const interval = setInterval(() => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'listening' }),
          '*'
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'getCurrentTime', args: [] }),
          '*'
        );
      }
    }, 5000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(interval);
    };
  }, [onTimeUpdate]);

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-neutral-900 shadow-lg border border-neutral-800">
      <iframe
        ref={iframeRef}
        key={`${videoId}-${effectiveStart}`}
        id={`yt-player-${videoId}`}
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
};
