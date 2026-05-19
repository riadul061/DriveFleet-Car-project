"use client";

import { useEffect, useRef, useState } from "react";
import {
  PenLine,
  MessageSquare,
  GitBranch,
  Globe,
  Layers3,
  Box,
  Cpu,
  Zap,
} from "lucide-react";

const integrations = [
  { Icon: PenLine,        label: "Design",      color: "#F24E1E", bg: "#FFF1EE", delay: 0   },
  { Icon: MessageSquare,  label: "Messaging",   color: "#611f69", bg: "#F4EDF8", delay: 60  },
  { Icon: GitBranch,      label: "Version Ctrl",color: "#1a1a1a", bg: "#F0F0F0", delay: 120 },
  { Icon: Globe,          label: "Browser",     color: "#1A73E8", bg: "#EBF3FE", delay: 180 },
  { Icon: Layers3,        label: "Layers",      color: "#0D9F6E", bg: "#E8F8F3", delay: 240 },
  { Icon: Box,            label: "Storage",     color: "#D97706", bg: "#FEF3E2", delay: 300 },
  { Icon: Cpu,            label: "Engine",      color: "#DC2626", bg: "#FEE9E9", delay: 360 },
  { Icon: Zap,            label: "Automations", color: "#0891B2", bg: "#E0F5FA", delay: 420 },
];

const IntegrationSection = () => {
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .int-section {
          font-family: 'DM Sans', sans-serif;
          background: #fafaf8;
          padding: 120px 0;
          overflow: hidden;
        }

        .int-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .int-card {
          background: #fff;
          border-radius: 32px;
          border: 1px solid #e8e6e0;
          padding: 72px 60px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 40px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02);
        }

        .int-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(220,38,38,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .int-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fff7ed;
          border: 1px solid #fed7aa;
          color: #ea580c;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
        }

        .int-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(38px, 5vw, 58px);
          font-weight: 400;
          color: #1a1714;
          line-height: 1.15;
          margin: 20px 0 16px;
          letter-spacing: -0.02em;
        }

        .int-heading em {
          font-style: italic;
          color: #dc2626;
        }

        .int-sub {
          color: #857f77;
          font-size: 16px;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
          font-weight: 300;
        }

        .int-divider {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, #dc2626, #f97316);
          border-radius: 2px;
          margin: 36px auto;
          opacity: 0.6;
        }

        .int-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          margin-top: 48px;
        }

        .int-icon-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0;
          transform: translateY(24px) scale(0.9);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }

        .int-icon-wrap.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .int-icon-box {
          width: 76px;
          height: 76px;
          border-radius: 20px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
          position: relative;
        }

        .int-icon-box:hover {
          transform: translateY(-6px) scale(1.06);
          box-shadow: 0 16px 32px rgba(0,0,0,0.10);
        }

        .int-icon-box.active {
          transform: translateY(-8px) scale(1.1);
        }

        .int-icon-label {
          font-size: 11px;
          font-weight: 500;
          color: #a09890;
          letter-spacing: 0.03em;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.2s, transform 0.2s;
        }

        .int-icon-wrap:hover .int-icon-label {
          opacity: 1;
          transform: translateY(0);
        }

        .int-connector {
          margin-top: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #c5bfb7;
          font-size: 13px;
          font-weight: 400;
        }

        .int-connector-line {
          flex: 1;
          max-width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ddd8d0);
        }

        .int-connector-line.right {
          background: linear-gradient(90deg, #ddd8d0, transparent);
        }

        .int-connector-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #dc2626;
          opacity: 0.6;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        .int-stat-row {
          display: flex;
          justify-content: center;
          gap: 48px;
          margin-top: 52px;
          padding-top: 36px;
          border-top: 1px solid #f0ece6;
          flex-wrap: wrap;
        }

        .int-stat { text-align: center; }

        .int-stat-num {
          font-family: 'Instrument Serif', serif;
          font-size: 32px;
          color: #1a1714;
          line-height: 1;
        }

        .int-stat-label {
          font-size: 12px;
          color: #b0a9a0;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-top: 6px;
        }
      `}</style>

      <section className="int-section" ref={ref}>
        <div className="int-inner">
          <div className="int-card">
            <div style={{ textAlign: "center" }}>
              <span className="int-badge">
                <Zap size={11} />
                Integrations
              </span>
              <h2 className="int-heading">
                Connect your <em>entire</em><br />workflow in one place
              </h2>
              <p className="int-sub">
                DriveFleet plugs into the tools your team already uses — from
                design handoffs to real-time alerts and deployment pipelines.
              </p>
            </div>

            <div className="int-divider" />

            <div className="int-grid">
              {integrations.map(({ Icon, label, color, bg, delay }, i) => (
                <div
                  key={label}
                  className={`int-icon-wrap ${visible ? "visible" : ""}`}
                  style={{ transitionDelay: `${delay}ms` }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div
                    className={`int-icon-box ${hoveredIdx === i ? "active" : ""}`}
                    style={{
                      background: bg,
                      borderColor: hoveredIdx === i ? color + "40" : "#ede9e3",
                      boxShadow: hoveredIdx === i
                        ? `0 8px 24px ${color}22`
                        : "0 1px 4px rgba(0,0,0,0.05)",
                    }}
                  >
                    <Icon size={28} color={color} strokeWidth={1.6} />
                  </div>
                  <span className="int-icon-label">{label}</span>
                </div>
              ))}
            </div>

            <div className="int-connector">
              <div className="int-connector-line" />
              <div className="int-connector-dot" />
              <span>8 native integrations · more coming soon</span>
              <div className="int-connector-dot" />
              <div className="int-connector-line right" />
            </div>

            <div className="int-stat-row">
              {[
                { num: "2×",     label: "Faster Workflows" },
                { num: "99.9%",  label: "Uptime SLA"       },
                { num: "< 50ms", label: "Sync Latency"     },
              ].map(({ num, label }) => (
                <div className="int-stat" key={label}>
                  <div className="int-stat-num">{num}</div>
                  <div className="int-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IntegrationSection;