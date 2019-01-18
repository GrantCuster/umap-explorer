import React, { Component } from 'react'

class Sidebar extends Component {
  componentDidMount() {
    this.props.setSidebarCanvas(this.side_canvas)
  }

  render() {
    let {
      sidebar_orientation,
      sidebar_image_size,
      grem,
      p,
      hover_index,
      mnist_labels,
      color_array,
    } = this.props
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection:
              sidebar_orientation === 'horizontal' ? 'row' : 'column',
          }}
        >
          <canvas
            ref={side_canvas => {
              this.side_canvas = side_canvas
            }}
            width={sidebar_image_size}
            height={sidebar_image_size}
          />
          <div style={{ flexGrow: 1 }}>
            <div
              style={{
                background: hover_index
                  ? `rgb(${color_array[mnist_labels[hover_index]].join(',')})`
                  : 'transparent',
                color: hover_index ? '#000' : '#fff',
                padding: p(grem / 4, grem / 2),
                display: 'flex',
                justifyContent: 'space-between',
                transition: 'all 0.1s linear',
              }}
            >
              <div>Label:</div>
              {hover_index ? <div>{mnist_labels[hover_index]}</div> : null}
            </div>
            <div
              style={{
                padding: p(grem / 4, grem / 2),
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              Index:
              {hover_index ? <div>{hover_index}</div> : null}
            </div>
          </div>
        </div>
        <div style={{ padding: grem / 2 }}>
          <div>
            An interactive UMAP visualization of the MNIST data set.{' '}
            <button
              onClick={() => {
                this.props.toggleAbout(true)
              }}
            >
              About
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar
