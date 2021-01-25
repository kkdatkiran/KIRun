import { Component, h, Host } from '@stencil/core';

const STEPS = [
  { name: 'Start', color: '#4DBC9C' },
  { name: 'End', color: '#A50C2C' },
];

@Component({
  tag: 'kirun-editor-right-bar',
  styleUrl: 'kirun-editor.css',
  shadow: true,
})
export class KirunEditorRightBar {
  render() {
    const buttons = STEPS.map(e => {
      return (
        <div class="step">
          <div class="stepIconBlob" style={{ backgroundColor: `${e.color}` }}></div>
          <div class="stepLabel">{e.name}</div>
        </div>
      );
    });
    return <Host className="rightBar">{buttons}</Host>;
  }
}
