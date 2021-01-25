import { Component, State, Prop, h, Watch } from '@stencil/core';

const GIRD_SIZE_OPTIONS = { small: 10, medium: 20, large: 30 };

@Component({
  tag: 'kirun-editor',
  styleUrl: 'kirun-editor.css',
  shadow: true,
})
export class KirunEditor {
  @Prop({ attribute: 'theme', mutable: true }) theme: string = 'dark';
  @Prop({ attribute: 'gridSize', mutable: true }) gridSize: string = 'medium';
  /* Body designer states. */
  @State() bdLeft: number = 0;
  @State() bdTop: number = 0;
  @State() bdOldLeft: number = 0;
  @State() bdOldTop: number = 0;
  @State() bdStartLeft: number = 0;
  @State() bdStartTop: number = 0;
  @State() bdDragStart: boolean = false;

  ghostImage: any;

  @Watch('theme')
  themeDidChangeHandler(newTheme: string) {
    if (newTheme === 'light') this.theme = 'light';
    else this.theme = 'dark';
  }

  @Watch('gridSize')
  gridSizeDidChangeHandler(newGirdSize: string) {
    if (newGirdSize === 'small') this.gridSize = 'small';
    else if (newGirdSize === 'large') this.gridSize = 'large';
    else this.gridSize = 'medium';
  }

  componentDidUpdate() {
    this.ghostImage = new Image();
    this.ghostImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }

  bdDragStarted = e => {
    this.bdDragStart = true;
    this.bdStartLeft = e.screenX;
    this.bdStartTop = e.screenY;
    this.bdOldLeft = this.bdLeft;
    this.bdOldTop = this.bdTop;
  };

  bdDragEnd = () => {
    this.bdDragStart = false;
  };

  bdDragging = e => {
    if (!this.bdDragStart) return;
    if (e.screenX === 0 && e.screenY === 0) return;
    let x = this.bdOldLeft + (e.screenX - this.bdStartLeft);
    let y = this.bdOldTop + (e.screenY - this.bdStartTop);

    this.bdLeft = x > 0 ? 0 : x;
    this.bdTop = y > 0 ? 0 : y;
    e.preventDefault();
  };

  render() {
    return (
      <div class={`KERoot ${this.theme} `}>
        <div class="toolbar"></div>
        <div class="bodyContainer">
          <div class="bodyDesignerContainer">
            <div
              class={`bodyDesigner ${this.bdDragStart ? 'moving' : ''}`}
              style={{
                backgroundSize: `${GIRD_SIZE_OPTIONS[this.gridSize]}px ${GIRD_SIZE_OPTIONS[this.gridSize]}px`,
                transform: `translate(${this.bdLeft}px, ${this.bdTop}px)`,
              }}
              onMouseDown={this.bdDragStarted}
              onMouseUp={this.bdDragEnd}
              onMouseMove={this.bdDragging}
            ></div>
          </div>
          <kirun-editor-right-bar />
        </div>
      </div>
    );
  }
}
