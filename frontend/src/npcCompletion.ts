import type { NPC } from "./npc";
import { stateVariables } from "./stateVariables";

export function getNpcCompletionKey(npc: NPC): string {
  return npc.dialogue.questionId ?? npc.dialogue.name;
}

export function isNpcCompleted(npc: NPC): boolean {
  return stateVariables.completedNpcKeys.has(getNpcCompletionKey(npc));
}

export function markNpcCompleted(npc: NPC): void {
  stateVariables.completedNpcKeys.add(getNpcCompletionKey(npc));
}

export function renderCompletedNpcEmojiBubble(
  npc: NPC,
  ctx: CanvasRenderingContext2D,
  emoji = "😊"
): boolean {
  if (!npc.isPlayerAt()) return false;
  if (!isNpcCompleted(npc)) return false;

  const centerX = npc.startPoint.x + npc.currentWidth / 2;
  const baseY = npc.startPoint.y - 14;
  const bubbleW = 68;
  const bubbleH = 44;
  const bubbleX = centerX - bubbleW / 2;
  const bubbleTopY = baseY - bubbleH;
  const r = 10;

  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.96)";
  ctx.strokeStyle = "rgba(139, 211, 255, 0.70)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(bubbleX + r, bubbleTopY);
  ctx.lineTo(bubbleX + bubbleW - r, bubbleTopY);
  ctx.arcTo(bubbleX + bubbleW, bubbleTopY, bubbleX + bubbleW, bubbleTopY + r, r);
  ctx.lineTo(bubbleX + bubbleW, bubbleTopY + bubbleH - r);
  ctx.arcTo(bubbleX + bubbleW, bubbleTopY + bubbleH, bubbleX + bubbleW - r, bubbleTopY + bubbleH, r);
  ctx.lineTo(bubbleX + r, bubbleTopY + bubbleH);
  ctx.arcTo(bubbleX, bubbleTopY + bubbleH, bubbleX, bubbleTopY + bubbleH - r, r);
  ctx.lineTo(bubbleX, bubbleTopY + r);
  ctx.arcTo(bubbleX, bubbleTopY, bubbleX + r, bubbleTopY, r);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#09131a";
  ctx.font = '30px vtfont, "Courier New", monospace';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, centerX, bubbleTopY + bubbleH / 2 + 2);
  ctx.restore();
  return true;
}

