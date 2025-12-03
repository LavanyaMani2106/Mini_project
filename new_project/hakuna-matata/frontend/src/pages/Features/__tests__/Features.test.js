import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Features from '../Features';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders Features and opens Learn More modal', () => {
  render(
    <Router>
      <Features />
    </Router>
  );

  // The Try Stress Detection button is present
  expect(screen.getByText(/Try Stress Detection/i)).toBeInTheDocument();

  // Click the Learn More button to open modal
  const learnBtn = screen.getByRole('button', { name: /Learn More/i });
  fireEvent.click(learnBtn);

  // Modal title should now be visible
  expect(screen.getByText(/Learn More about Stress Detection/i)).toBeInTheDocument();
});
