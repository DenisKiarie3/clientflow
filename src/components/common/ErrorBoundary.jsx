import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Uncaught render error:', error, info)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-paper text-center px-4">
          <p className="font-display font-bold text-xl text-ink">Something went wrong</p>
          <p className="text-sm text-slate max-w-sm">
            The app hit an unexpected error. Reloading usually fixes it.
          </p>
          <button onClick={this.handleReload} className="bg-violet text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-violet/90">
            Reload app
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary