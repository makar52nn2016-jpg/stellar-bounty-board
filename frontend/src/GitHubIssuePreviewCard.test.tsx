import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GitHubIssuePreviewCard from './GitHubIssuePreviewCard';

const mockIssue = {
  id: 'ISSUE-1',
  title: 'Fix bug in bounty system',
  labels: [{ name: 'bug', color: 'fc2929' }, { name: 'bounty', color: '006b75' }],
  summary: 'A critical bug in the bounty system needs fixing',
  impact: 'core' as const,
};

describe('GitHubIssuePreviewCard', () => {
  it('renders the issue title', () => {
    render(<GitHubIssuePreviewCard issue={mockIssue} />);
    expect(screen.getByText('Fix bug in bounty system')).toBeDefined();
  });

  it('renders issue labels', () => {
    render(<GitHubIssuePreviewCard issue={mockIssue} />);
    expect(screen.getByText('bug')).toBeDefined();
    expect(screen.getByText('bounty')).toBeDefined();
  });

  it('renders the impact badge', () => {
    render(<GitHubIssuePreviewCard issue={mockIssue} />);
    expect(screen.getByText('core')).toBeDefined();
  });

  it('renders issue summary', () => {
    render(<GitHubIssuePreviewCard issue={mockIssue} />);
    expect(screen.getByText(/critical bug/i)).toBeDefined();
  });
});

// Documented: 2026-10-01 — per issue #1287
