import React from 'react';
import { render, screen } from '@testing-library/react';
import TableVisualization from '../../components/TableVisualization';

// Mock the subcomponents
jest.mock('../../components/TableVisualization/components/TableFilters', () => {
  return function MockTableFilters() {
    return <div data-testid="table-filters">Filters</div>;
  };
});

jest.mock('../../components/TableVisualization/components/TableHeader', () => {
  return function MockTableHeader() {
    return <div data-testid="table-header">Header</div>;
  };
});

jest.mock('../../components/TableVisualization/components/TableBody', () => {
  return function MockTableBody() {
    return <div data-testid="table-body">Body</div>;
  };
});

jest.mock('../../components/TableVisualization/components/Pagination', () => {
  return function MockPagination() {
    return <div data-testid="pagination">Pagination</div>;
  };
});

jest.mock('../../components/ConfirmationPopup', () => {
  return function MockConfirmationPopup() {
    return <div data-testid="confirmation-popup">Confirmation</div>;
  };
});

describe('TableVisualization Component', () => {
  const mockGraphData = {
    nodeDataArray: [
      { key: '1', category: 'system', label: 'Cluster1' },
      { key: '2', category: 'object', label: 'Object1' },
      { key: '3', category: 'attribute', label: 'Attribute1', harmonisedAttribute: 'Harmonised1' }
    ],
    linkDataArray: [
      { from: '1', to: '2' },
      { from: '2', to: '3' }
    ]
  };

  const mockProps = {
    graphData: mockGraphData,
    handleLabelChange: jest.fn(),
    openPopup: jest.fn(),
    setGraphData: jest.fn(),
    fetchGraphData: jest.fn(),
    showHarmonisedColumn: false,
    draggedItem: null,
    handleDragStart: jest.fn(),
    handleDragEnd: jest.fn(),
    handleDragOver: jest.fn(),
    handleDragLeave: jest.fn(),
    processDragDrop: jest.fn(),
    showNotification: jest.fn()
  };

  it('renders without crashing', () => {
    render(<TableVisualization {...mockProps} />);
    
    // Check that subcomponents are rendered
    expect(screen.getByTestId('table-filters')).toBeInTheDocument();
    expect(screen.getByTestId('table-header')).toBeInTheDocument();
    expect(screen.getByTestId('table-body')).toBeInTheDocument();
  });

  it('displays a message when no data is available', () => {
    const propsWithNoData = { ...mockProps, graphData: { nodeDataArray: [] } };
    render(<TableVisualization {...propsWithNoData} />);
    
    expect(screen.getByText('No data available. Please upload a file.')).toBeInTheDocument();
  });
});