import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BountyDetailPage from './BountyDetailPage';
import type { Bounty } from './types';

const mockBounty: Bounty = {
  id: 'BNTY-1',
  repo: 'test/repo',
  issueNumber: 1,
  title: 'Test Bounty',
  summary: 'Test summary',
  maintainer: 'GTEST',
  tokenSymbol: 'XLM',
  amount: 100,
  labels: [],
  status: 'open',
  createdAt: 1700000000,
  deadlineAt: 1700086400,
  version: 1,
  events: [],
};

describe('BountyDetailPage', () => {
  it('renders bounty title', () => {
    render(<BountyDetailPage bounty={mockBounty} />);
    expect(screen.getByText('Test Bounty')).toBeDefined();
  });

  it('renders bounty amount', () => {
    render(<BountyDetailPage bounty={mockBounty} />);
    expect(screen.getByText(/100/)).toBeDefined();
  });

  it('renders token symbol', () => {
    render(<BountyDetailPage bounty={mockBounty} />);
    expect(screen.getByText(/XLM/)).toBeDefined();
  });
});
