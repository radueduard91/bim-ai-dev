import { renderHook, act } from '@testing-library/react-hooks';
import useNotifications from '../../hooks/useNotifications';

// Mock setTimeout and clearTimeout
jest.useFakeTimers();

describe('useNotifications Hook', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useNotifications());
    
    expect(result.current.notification).toEqual({
      show: false,
      message: '',
      type: ''
    });
  });

  it('should show notification when showNotification is called', () => {
    const { result } = renderHook(() => useNotifications());
    
    act(() => {
      result.current.showNotification('Test message', 'success');
    });
    
    expect(result.current.notification).toEqual({
      show: true,
      message: 'Test message',
      type: 'success'
    });
  });

  it('should automatically hide notification after timeout', () => {
    const { result } = renderHook(() => useNotifications());
    
    act(() => {
      result.current.showNotification('Test message', 'success');
    });
    
    expect(result.current.notification.show).toBe(true);
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    expect(result.current.notification.show).toBe(false);
  });

  it('should use "info" as default type if not specified', () => {
    const { result } = renderHook(() => useNotifications());
    
    act(() => {
      result.current.showNotification('Test message');
    });
    
    expect(result.current.notification.type).toBe('info');
  });
});