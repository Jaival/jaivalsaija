'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        // CSS entrance: the JS that would drive an animation is exactly what
        // just failed. `scale(0.9)`, never `scale(0)` — an icon growing from
        // nothing reads as a cartoon, not as UI.
        <div className='min-h-svh flex items-center justify-center px-4'>
          <div className='animate-enter text-center max-w-md mx-auto'>
            <div className='w-24 h-24 mx-auto mb-6 bg-destructive rounded-full flex items-center justify-center'>
              <svg
                className='w-12 h-12 text-destructive-foreground'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z'
                />
              </svg>
            </div>

            <h2 className='text-2xl font-bold tracking-tight text-foreground mb-4'>
              This page broke
            </h2>

            <p className='text-muted-foreground mb-6'>
              Refreshing usually fixes it. If it doesn&apos;t, the homepage
              should still work.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button
                type='button'
                onClick={() => window.location.reload()}
                className='px-6 py-3 bg-gradient-to-r from-brand-from to-brand-to text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-[box-shadow,transform] duration-200 ease-out active:scale-[0.97]'
              >
                Refresh Page
              </button>

              <button
                type='button'
                onClick={() => (window.location.href = '/')}
                className='px-6 py-3 bg-transparent border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-primary-foreground transition-[color,background-color,transform] duration-200 ease-out active:scale-[0.97]'
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
