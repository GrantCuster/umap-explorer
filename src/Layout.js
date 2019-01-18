import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Projection from './Projection'
import About from './About'
import * as _ from 'lodash'

// padding constructor
function p(tb, lr) {
  return `${tb}px ${lr}px`
}

let color_array = [
  [141, 211, 199],
  [255, 255, 179],
  [190, 186, 218],
  [251, 128, 114],
  [128, 177, 211],
  [253, 180, 98],
  [179, 222, 105],
  [252, 205, 229],
  [188, 128, 189],
  [204, 235, 197],
]

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ww: null,
      wh: null,
      sidebar_height: null,
      hover_index: null,
      show_about: null,
    }
    this.sidebar_ctx = null
    this.setSize = _.debounce(this.setSize.bind(this), 200)
    this.setSidebarCanvas = this.setSidebarCanvas.bind(this)
    this.toggleAbout = this.toggleAbout.bind(this)
  }

  setSize() {
    this.setState({ ww: window.innerWidth, wh: window.innerHeight })
    let sidebar_height = this.sidebar_mount.offsetHeight
    this.setState({ sidebar_height: sidebar_height })
    if (this.sidebar_ctx) this.sidebar_ctx.imageSmoothingEnabled = false
  }

  setSidebarCanvas(canvas) {
    let ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false
    this.sidebar_ctx = ctx
  }

  toggleAbout(state) {
    if (state === true) {
      window.history.pushState(null, 'About UMAP Explorer', '#about')
      this.setState({ show_about: true })
    } else if (state === false) {
      window.history.pushState(null, 'UMAP Explorer', window.location.pathname)
      this.setState({ show_about: false })
    }
  }

  setHoverIndex(hover_index) {
    this.setState({ hover_index: hover_index })
  }

  componentWillMount() {
    this.setSize()
  }

  componentDidMount() {
    window.addEventListener('resize', this.setSize)
    if (window.location.hash && window.location.hash === '#about') {
      this.setState({ show_about: true })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setSize)
  }

  render() {
    let { mnist_embeddings, mnist_labels } = this.props
    let { ww, wh, sidebar_height, hover_index, show_about } = this.state
    let sidebar_ctx = this.sidebar_ctx

    let line_height = 1.5

    let sidebar_style = {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100vh',
      overflow: 'auto',
      background: '#222',
      display: 'flex',
      flexDirection: 'column',
    }
    let main_style = {
      position: 'relative',
      height: '100vh',
      background: '#111',
      overflow: 'hidden',
    }

    let sidebar_image_size, sidebar_orientation
    let font_size = 16
    if (ww < 800) {
      font_size = 14
      sidebar_style = {
        ...sidebar_style,
        flexDirection: 'row',
        width: '100%',
        top: 'auto',
        height: 'auto',
        bottom: 0,
      }
      main_style = { width: ww, height: wh - sidebar_height }
      sidebar_image_size = font_size * line_height * 3
      sidebar_orientation = 'horizontal'
    } else if (ww < 800 + 600) {
      let scaler = 200 + (300 - 200) * ((ww - 800) / 600)
      font_size = 14 + 2 * ((ww - 800) / 600)
      sidebar_style = {
        ...sidebar_style,
        width: scaler,
      }
      sidebar_image_size = sidebar_style.width
      main_style = {
        ...main_style,
        width: ww - scaler,
        left: scaler,
        height: wh,
      }
      sidebar_orientation = 'vertical'
    } else {
      sidebar_style = {
        ...sidebar_style,
        width: 300,
      }
      main_style = {
        ...main_style,
        width: ww - 300,
        left: 300,
        height: wh,
      }
      sidebar_image_size = sidebar_style.width
      sidebar_orientation = 'vertical'
    }

    let grem = font_size * line_height

    let general_style = {
      fontSize: font_size,
      lineHeight: line_height,
    }

    return ww !== null ? (
      <div style={general_style}>
        <div
          style={sidebar_style}
          ref={sidebar_mount => {
            this.sidebar_mount = sidebar_mount
          }}
        >
          <Sidebar
            sidebar_orientation={sidebar_orientation}
            sidebar_image_size={sidebar_image_size}
            grem={grem}
            p={p}
            color_array={color_array}
            setSidebarCanvas={this.setSidebarCanvas}
            hover_index={hover_index}
            mnist_labels={mnist_labels}
            toggleAbout={this.toggleAbout}
          />
        </div>
        <div style={main_style}>
          <Projection
            width={main_style.width}
            height={main_style.height}
            mnist_embeddings={mnist_embeddings}
            mnist_labels={mnist_labels}
            color_array={color_array}
            sidebar_ctx={sidebar_ctx}
            sidebar_image_size={sidebar_image_size}
            setHoverIndex={this.setHoverIndex.bind(this)}
          />
        </div>
        {show_about ? (
          <About grem={grem} p={p} toggleAbout={this.toggleAbout} />
        ) : null}
      </div>
    ) : (
      <div>loading layout</div>
    )
  }
}

export default Layout
