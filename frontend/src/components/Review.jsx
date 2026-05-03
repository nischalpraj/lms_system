import { useState, useRef, useCallback } from "react";

const reviews = [
  {
    name: "Priya Sharma",
    role: "Product Manager · Kathmandu",
    initials: "PS",
    color: "#534AB7",
    bg: "rgba(83,74,183,0.12)",
    rating: 5,
    text: "LeapFrog Connect completely transformed how our team upskills. The structured learning paths and live cohort sessions made it feel like a real classroom, not just another video platform.",
  },
  {
    name: "Daniel Okafor",
    role: "Software Engineer · Lagos",
    initials: "DO",
    color: "#0F6E56",
    bg: "rgba(15,110,86,0.12)",
    rating: 5,
    text: "I finished my backend specialization in 8 weeks. The mentorship feature is outstanding — my mentor reviewed my code weekly and the improvement was dramatic. Worth every penny.",
  },
  {
    name: "Aarav Mehta",
    role: "UX Designer · Bangalore",
    initials: "AM",
    color: "#993C1D",
    bg: "rgba(153,60,29,0.12)",
    rating: 5,
    text: "The project-based curriculum is what sets LeapFrog Connect apart. I built a real portfolio while learning, and landed my dream job two months after completing the design track.",
  },
  {
    name: "Sofia Reyes",
    role: "Data Analyst · Mexico City",
    initials: "SR",
    color: "#185FA5",
    bg: "rgba(24,95,165,0.12)",
    rating: 5,
    text: "Switching careers into data science felt impossible until I found this platform. The bite-sized lessons fit my schedule perfectly, and the community forums are incredibly active and helpful.",
  },
  {
    name: "James Whitfield",
    role: "Startup Founder · London",
    initials: "JW",
    color: "#3B6D11",
    bg: "rgba(59,109,17,0.12)",
    rating: 5,
    text: "I enrolled my entire 12-person team on LeapFrog Connect. The admin dashboard, progress tracking, and team leaderboards made learning engaging and gave me full visibility into growth.",
  },
  {
    name: "Nura Abdullahi",
    role: "ML Engineer · Nairobi",
    initials: "NA",
    color: "#993556",
    bg: "rgba(153,53,86,0.12)",
    rating: 5,
    text: "The AI-personalized learning path knew exactly what I needed to fill my gaps. It's like having a smart tutor that adjusts every week. My confidence in ML projects has skyrocketed.",
  },
];

function Stars({ count }) {
  return (
    <div style={{ display: "flex", gap: "3px", marginBottom: "18px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#EF9F27", fontSize: "14px" }}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review, distance }) {
  const isActive = distance === 0;
  const isSide = Math.abs(distance) === 1;

  const cardStyle = {
    flex: "0 0 400px",
    background: "#ffffff",
    border: isActive
      ? "1.5px solid rgba(83,74,183,0.4)"
      : "1.5px solid #e8e4f0",
    borderRadius: "20px",
    padding: "32px 28px 28px",
    position: "relative",
    overflow: "hidden",
    transition:
      "transform 0.4s ease, opacity 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
    transform: isActive
      ? "scale(1.03) translateY(-4px)"
      : isSide
        ? "scale(0.96)"
        : "scale(0.93)",
    opacity: isActive ? 1 : isSide ? 0.5 : 0.2,
    boxShadow: isActive
      ? "0 8px 40px rgba(83,74,183,0.12), 0 20px 40px rgba(0,0,0,0.07)"
      : "0 2px 12px rgba(0,0,0,0.04)",
  };

  return (
    <div style={cardStyle}>
      {/* Decorative quote mark */}
      <span
        style={{
          position: "absolute",
          top: "10px",
          right: "22px",
          fontFamily: "'DM Serif Display', serif",
          fontSize: "100px",
          color: "rgba(83,74,183,0.07)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}>
        "
      </span>

      <Stars count={review.rating} />

      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.8,
          color: "#555563",
          fontWeight: 400,
          marginBottom: "28px",
          minHeight: "80px",
        }}>
        "{review.text}"
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          borderTop: "1px solid #f0edf8",
          paddingTop: "20px",
        }}>
        {/* Avatar */}
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
            fontWeight: 700,
            flexShrink: 0,
            border: `2px solid ${review.color}30`,
            background: review.bg,
            color: review.color,
          }}>
          {review.initials}
        </div>

        <div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#1a1a2e",
              marginBottom: "2px",
            }}>
            {review.name}
          </div>
          <div style={{ fontSize: "12px", color: "#9997a8", fontWeight: 400 }}>
            {review.role}
          </div>
        </div>

        <span
          style={{
            marginLeft: "auto",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: "20px",
            background: "rgba(15,110,86,0.08)",
            color: "#0F6E56",
            border: "1px solid rgba(15,110,86,0.2)",
          }}>
          Verified
        </span>
      </div>
    </div>
  );
}

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(Math.floor(reviews.length / 2));
  const trackRef = useRef(null);
  const dragStart = useRef(null);

  const n = reviews.length;
  const CARD_W = 400 + 24;

  const goTo = useCallback(
    (idx) => {
      setCurrent(((idx % n) + n) % n);
    },
    [n],
  );

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  const onPointerDown = (e) => {
    dragStart.current = e.clientX;
    trackRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = () => {};

  const onPointerUp = (e) => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - e.clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    dragStart.current = null;
  };

  const offset = -current * CARD_W;

  return (
    <section
      style={{
        padding: "80px 0",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Sora', sans-serif",
      }}>
      {/* Soft top glow */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(83,74,183,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Heading */}
      <p
        style={{
          textAlign: "center",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#7F77DD",
          marginBottom: "12px",
        }}>
        Student Stories
      </p>
      <p
        style={{
          textAlign: "center",
          fontSize: "14px",
          color: "#9997a8",
          marginBottom: "52px",
          fontWeight: 400,
        }}>
        Real results from real people on LeapFrog Connect
      </p>

      {/* Carousel */}
      <div style={{ position: "relative", width: "100%" }}>
        {/* Fade left */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "180px",
            zIndex: 10,
            pointerEvents: "none",
            background:
              "linear-gradient(to right, #f7f5ff 0%, transparent 100%)",
          }}
        />
        {/* Fade right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "180px",
            zIndex: 10,
            pointerEvents: "none",
            background:
              "linear-gradient(to left, #f7f5ff 0%, transparent 100%)",
          }}
        />

        {/* Track */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{
            overflow: "hidden",
            padding: "20px 0 36px",
            cursor: "grab",
            userSelect: "none",
          }}>
          <div
            style={{
              display: "flex",
              gap: "24px",
              transform: `translateX(${offset}px)`,
              transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              willChange: "transform",
              padding: "0 calc(50% - 200px)",
            }}>
            {reviews.map((r, i) => (
              <ReviewCard key={i} review={r} distance={i - current} />
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          marginTop: "32px",
        }}>
        <button
          onClick={prev}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "#ffffff",
            border: "1.5px solid #e0daf0",
            color: "#534AB7",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(83,74,183,0.08)",
            transition: "all 0.2s",
          }}>
          ←
        </button>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {reviews.map((_, i) => (
            <div
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? "22px" : "6px",
                height: "6px",
                borderRadius: i === current ? "3px" : "50%",
                background: i === current ? "#534AB7" : "#ccc8e8",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "#ffffff",
            border: "1.5px solid #e0daf0",
            color: "#534AB7",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(83,74,183,0.08)",
            transition: "all 0.2s",
          }}>
          →
        </button>
      </div>
    </section>
  );
}
