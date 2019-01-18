import React, { Component } from 'react'
import Layout from './Layout'

class Data extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mnist_embeddings: null,
      mnist_labels: null,
    }
  }

  componentDidMount() {
    fetch(`${process.env.PUBLIC_URL}/mnist_embeddings.json`)
      .then(response => response.json())
      .then(mnist_embeddings =>
        this.setState({
          mnist_embeddings: mnist_embeddings,
        })
      )
    fetch(`${process.env.PUBLIC_URL}/mnist_labels.json`)
      .then(response => response.json())
      .then(mnist_labels =>
        this.setState({
          mnist_labels: mnist_labels,
        })
      )
  }

  render() {
    return this.state.mnist_embeddings && this.state.mnist_labels ? (
      <Layout {...this.state} />
    ) : (
      <div style={{ padding: '1rem' }}>Loading data...</div>
    )
  }
}

export default Data
