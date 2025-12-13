import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Modal from './Modal';

vi.mock('@/assets/svg/CloseIcon', () => ({
  default: () => <span data-testid="close-icon">X</span>,
}));

describe('Modal', () => {
  const mockOnClose = vi.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    mockOnClose.mockClear();
    document.body.innerHTML = '';
    document.body.style.overflowY = 'auto';
    document.body.style.paddingRight = '0';
  });

  // Test Case 1: Modal doesn't render when closed
  it('should now render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // Test Case 2: Modal renders when open
  it('should render when isOpen is true', async () => {
    render(<Modal {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  // Test Case 3: Title rendering
  it('should render when title is provided', async () => {
    render(<Modal {...defaultProps} title="Test Modal" />);
    await waitFor(() => {
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });
  });

  // Test Case 4: Close button functionality
  it('should call onClose when close button is clicked', async () => {
    render(<Modal {...defaultProps} />);
    const closeButton = screen.getByLabelText('close-modal');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledWith(false);
  });

  // Test Case 5: backdrop close
  it('should call onClose when backdrop is clicked', async () => {
    render(<Modal {...defaultProps} />);
    const closeButton = screen.getByRole('dialog');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledWith(false);
  });

  // Test Case 6: content click dosen't close
  it('should not call onClose when modal content is clicked', async () => {
    render(<Modal {...defaultProps} />);
    const content = screen.getByText('Modal content');
    fireEvent.click(content);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  // Test Case 7: escape key
  it('should call onClose when Escape key is pressed', async () => {
    render(<Modal {...defaultProps} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledWith(false);
  });

  // Test Case 8: browser back button
  it('should call onClose when browser back button clicked', async () => {
    render(<Modal {...defaultProps} />);
    fireEvent.popState(window);
    expect(mockOnClose).toHaveBeenCalledWith(false);
  });

  // Test Case 9: portal rendering
  it('should render modal content as a portal to document.body', async () => {
    render(<Modal {...defaultProps} />);
    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog.parentElement).toBe(document.body);
    });
  });
});
