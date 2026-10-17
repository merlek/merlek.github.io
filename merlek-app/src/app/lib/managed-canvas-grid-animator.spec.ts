import { ManagedCanvasGridAnimator } from './managed-canvas-grid-animator';

it('keeps canvas-tools from rendering a managed game layer without its state', () => {
  vi.useFakeTimers();
  let scheduledFrame: FrameRequestCallback;
  vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => {
    scheduledFrame = callback;
    return 1;
  }));
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({} as any);

  class Layer extends ManagedCanvasGridAnimator {
    draw = vi.fn();
  }

  try {
    const layer = new Layer(document.createElement('canvas'), {cols: 3, rows: 3});
    vi.runAllTimers();
    scheduledFrame(100);
    expect(layer.draw).not.toHaveBeenCalled();
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);

    const state = {turn: 'X'};
    layer.draw(state);
    expect(layer.draw).toHaveBeenCalledWith(state);
  } finally {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  }
});
