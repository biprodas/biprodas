"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import type { Diagram, DiagramEdge, DiagramNode, DiagramNodeKind } from "@/content/types";

const CELL_W = 232;
const CELL_H = 112;
const NODE_W = 168;
const NODE_H = 56;
const PAD = 8;

const KIND_CODE: Record<DiagramNodeKind, string> = {
  client: "UI",
  service: "SVC",
  data: "DB",
  queue: "MQ",
  external: "EXT",
  worker: "JOB",
};

const nodeX = (n: DiagramNode) => PAD + n.col * CELL_W;
const nodeY = (n: DiagramNode) => PAD + n.row * CELL_H;

/** Orthogonal routing: straight when aligned, one elbow through the gutter otherwise. */
function route(a: DiagramNode, b: DiagramNode) {
  const ax = nodeX(a);
  const ay = nodeY(a);
  const bx = nodeX(b);
  const by = nodeY(b);
  const acx = ax + NODE_W / 2;
  const acy = ay + NODE_H / 2;
  const bcy = by + NODE_H / 2;

  if (a.col === b.col) {
    const down = b.row > a.row;
    const sy = down ? ay + NODE_H : ay;
    const ey = down ? by : by + NODE_H;
    return { d: `M ${acx} ${sy} V ${ey}`, lx: acx + 7, ly: (sy + ey) / 2 + 3, anchor: "start" as const };
  }

  const right = b.col > a.col;
  const sx = right ? ax + NODE_W : ax;
  const ex = right ? bx : bx + NODE_W;

  if (a.row === b.row) {
    return { d: `M ${sx} ${acy} H ${ex}`, lx: (sx + ex) / 2, ly: acy - 7, anchor: "middle" as const };
  }

  const mx = (sx + ex) / 2;
  return {
    d: `M ${sx} ${acy} H ${mx} V ${bcy} H ${ex}`,
    lx: mx + 7,
    ly: (acy + bcy) / 2 + 3,
    anchor: "start" as const,
  };
}

/** A project's system drawn from its node/edge graph. Hover a node to trace its connections. */
export function ArchitectureDiagram({ diagram, className }: { diagram: Diagram; className?: string }) {
  const id = useId();
  const [active, setActive] = useState<string | null>(null);
  const byId = new Map(diagram.nodes.map((n) => [n.id, n]));

  const width = PAD * 2 + (diagram.cols - 1) * CELL_W + NODE_W;
  const height = PAD * 2 + (diagram.rows - 1) * CELL_H + NODE_H;

  const touches = (e: DiagramEdge) => active !== null && (e.from === active || e.to === active);
  const linked = new Set(active === null ? [] : diagram.edges.filter(touches).flatMap((e) => [e.from, e.to]));

  const description = diagram.edges
    .map((e) => `${byId.get(e.from)?.label} to ${byId.get(e.to)?.label}${e.label ? ` (${e.label})` : ""}`)
    .join("; ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby={`${id}-t ${id}-d`}
      data-diagram="animated"
      className={cn("h-auto w-full select-none", className)}
      onPointerLeave={() => setActive(null)}
    >
      <title id={`${id}-t`}>{`Architecture: ${diagram.title}`}</title>
      <desc id={`${id}-d`}>{description}</desc>
      <defs>
        <marker
          id={`${id}-arrow`}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 8 4 L 0 8 z" fill="context-stroke" />
        </marker>
      </defs>

      <g fill="none" strokeWidth={1.25}>
        {diagram.edges.map((e) => {
          const a = byId.get(e.from);
          const b = byId.get(e.to);
          if (!a || !b) return null;
          const g = route(a, b);
          const hot = touches(e);
          return (
            <g
              key={`${e.from}->${e.to}`}
              className={cn(
                "transition-[color,opacity] duration-200",
                hot ? "text-primary" : "text-muted-foreground",
                active !== null && !hot && "opacity-30",
              )}
            >
              <path
                d={g.d}
                pathLength={e.async ? undefined : 1}
                stroke="currentColor"
                strokeDasharray={e.async ? "4 4" : undefined}
                markerEnd={`url(#${id}-arrow)`}
                data-edge=""
                data-async={e.async ? "" : undefined}
              />
              {e.label && (
                <text
                  x={g.lx}
                  y={g.ly}
                  textAnchor={g.anchor}
                  fill="currentColor"
                  stroke="none"
                  className="font-mono text-[9px]"
                >
                  {e.label}
                </text>
              )}
            </g>
          );
        })}
      </g>

      {diagram.nodes.map((n) => {
        const hot = active === n.id;
        const dim = active !== null && !hot && !linked.has(n.id);
        return (
          <g
            key={n.id}
            transform={`translate(${nodeX(n)} ${nodeY(n)})`}
            onPointerEnter={() => setActive(n.id)}
            className={cn("cursor-crosshair transition-opacity duration-200", dim && "opacity-40")}
          >
            <rect
              width={NODE_W}
              height={NODE_H}
              className={cn("fill-card transition-colors", hot ? "stroke-primary" : "stroke-foreground/30")}
              strokeWidth={hot ? 1.5 : 1}
              strokeDasharray={n.kind === "external" ? "4 3" : undefined}
            />
            {n.kind === "data" && (
              <line x1={0} x2={NODE_W} y1={4} y2={4} className="stroke-foreground/20" strokeWidth={1} />
            )}
            <text
              x={NODE_W - 7}
              y={13}
              textAnchor="end"
              className={cn("font-mono text-[8px] tracking-widest", hot ? "fill-primary" : "fill-muted-foreground")}
            >
              {KIND_CODE[n.kind]}
            </text>
            <text x={10} y={n.sub ? 27 : 33} className="fill-foreground font-sans text-[13px] font-semibold">
              {n.label}
            </text>
            {n.sub && (
              <text x={10} y={44} className="fill-muted-foreground font-mono text-[9.5px]">
                {n.sub}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
