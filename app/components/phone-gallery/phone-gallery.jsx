import { useId, useRef, useState } from 'react';
import { Icon } from '~/components/icon';
import styles from './phone-gallery.module.css';

export function PhoneGallery({ images, title = 'Nami' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef(null);
  const id = useId();
  const screenId = `${id}-screen`;
  const hintId = `${id}-hint`;

  if (!images?.length) return null;

  const currentIndex = Math.min(activeIndex, images.length - 1);
  const currentImage = images[currentIndex];

  function showImage(index) {
    setActiveIndex(Math.max(0, Math.min(index, images.length - 1)));
    setDragOffset(0);
  }

  function handleKeyDown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const destinations = {
      ArrowLeft: currentIndex - 1,
      ArrowRight: currentIndex + 1,
      Home: 0,
      End: images.length - 1,
    };

    if (!(event.key in destinations)) return;
    event.preventDefault();
    showImage(destinations[event.key]);
  }

  function handlePointerDown(event) {
    if (!event.isPrimary || event.button !== 0 || images.length < 2) return;
    gesture.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      width: event.currentTarget.clientWidth,
      axis: null,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    const start = gesture.current;
    if (!start || start.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (!start.axis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 8) {
      start.axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y';
    }
    if (start.axis !== 'x') return;

    const atEdge = (currentIndex === 0 && deltaX > 0) ||
      (currentIndex === images.length - 1 && deltaX < 0);
    const offset = atEdge ? deltaX * 0.2 : deltaX;
    setDragging(true);
    setDragOffset(Math.max(-start.width, Math.min(offset, start.width)));
  }

  function endGesture(event, cancelled = false) {
    const start = gesture.current;
    if (!start || start.pointerId !== event.pointerId) return;
    gesture.current = null;

    const deltaX = event.clientX - start.x;
    if (!cancelled && start.axis === 'x' && Math.abs(deltaX) > Math.min(64, start.width * 0.18)) {
      showImage(currentIndex + (deltaX < 0 ? 1 : -1));
    }
    setDragging(false);
    setDragOffset(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <section
      className={styles.gallery}
      aria-label={`${title} screenshots`}
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
    >
      <div className={styles.stage}>
        <button
          className={styles.arrow}
          type="button"
          aria-label="Previous screenshot"
          aria-controls={screenId}
          disabled={currentIndex === 0}
          onClick={() => showImage(currentIndex - 1)}
        >
          <Icon icon="arrow-left" />
        </button>
        <div className={styles.phone}>
          <div
            id={screenId}
            className={styles.screen}
            role="group"
            aria-label={`${title} screenshot viewer`}
            aria-describedby={hintId}
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endGesture}
            onPointerCancel={event => endGesture(event, true)}
            onLostPointerCapture={event => endGesture(event, true)}
            data-dragging={dragging}
            style={{ aspectRatio: `${images[0].width} / ${images[0].height}` }}
          >
            <div
              className={styles.track}
              data-dragging={dragging}
              style={{ transform: `translateX(calc(${-currentIndex * 100}% + ${dragOffset}px))` }}
            >
              {images.map((image, index) => (
                <div
                  className={styles.slide}
                  key={image.src}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${images.length}: ${image.label}`}
                  aria-hidden={index !== currentIndex}
                >
                  <img
                    className={styles.image}
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    decoding="async"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          className={styles.arrow}
          type="button"
          aria-label="Next screenshot"
          aria-controls={screenId}
          disabled={currentIndex === images.length - 1}
          onClick={() => showImage(currentIndex + 1)}
        >
          <Icon icon="arrow-right" />
        </button>
      </div>

      <div className={styles.dots} aria-label="Choose a screenshot">
        {images.map((image, index) => (
          <button
            key={image.src}
            className={styles.dot}
            type="button"
            aria-label={`Show screenshot ${index + 1} of ${images.length}: ${image.label}`}
            aria-current={index === currentIndex ? 'true' : undefined}
            aria-controls={screenId}
            onClick={() => showImage(index)}
          >
            <span />
          </button>
        ))}
      </div>

      <p className={styles.caption} aria-live="polite" aria-atomic="true">
        <span className={styles.label}>{currentImage.label}</span>
      </p>
      <p className={styles.hint} id={hintId}>Swipe or drag to explore. Use the arrows or dots to choose a screen.</p>
    </section>
  );
}
