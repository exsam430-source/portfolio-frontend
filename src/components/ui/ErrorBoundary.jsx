import { Component } from 'react';
import { TbAlertTriangle, TbRefresh } from 'react-icons/tb';

/**
 * Catches render errors so one broken section never blanks the whole page.
 * Wrap individual sections (granular recovery) and the app root (last resort).
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production, forward this to Sentry / LogRocket / your logger.
    console.error('[ErrorBoundary]', this.props.name || 'app', error, info?.componentStack);
  }

  handleReset = () => this.setState({ hasError: false, error: null });

  render() {
    const { hasError, error } = this.state;
    const { children, name, compact } = this.props;

    if (!hasError) return children;

    return (
      <div
        role="alert"
        className={`container-x ${compact ? 'py-12' : 'py-20'} flex items-center justify-center`}
      >
        <div className="card card-gradient-edge w-full max-w-lg p-8 text-center">
          <div className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-danger/12 text-danger">
            <TbAlertTriangle size={26} aria-hidden="true" />
          </div>

          <h3 className="text-xl font-bold">
            {name ? `The ${name} section failed to load` : 'Something went wrong'}
          </h3>

          <p className="mx-auto mt-2.5 max-w-sm text-sm leading-relaxed text-muted">
            An unexpected error occurred while rendering this part of the page. The rest of the
            site is still working — you can retry below.
          </p>

          {import.meta.env.DEV && error?.message && (
            <pre className="mt-4 overflow-x-auto rounded-xl bg-black/40 p-3 text-left text-[0.6875rem] text-danger/90">
              {error.message}
            </pre>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={this.handleReset} className="btn btn-primary">
              <TbRefresh aria-hidden="true" /> Try again
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn btn-ghost"
            >
              Reload page
            </button>
          </div>
        </div>
      </div>
    );
  }
}
