import { Animators } from 'canvas-tools';

/** Game managers own their render loop and supply the current state to draw(). */
export abstract class ManagedCanvasGridAnimator extends Animators.CanvasGridAnimator {
  setup(): void {}

  // Recent canvas-tools releases start an automatic loop that calls draw()
  // without state. These game layers are rendered explicitly by their manager.
  protected override update = (_previous: number) => (_now: number): void => {};
}
