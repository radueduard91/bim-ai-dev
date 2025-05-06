import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ControlPanel from '../../components/ControlPanel';

// Mock the dependencies
jest.mock('../../components/FileUpload', () => {
  return function MockFileUpload(props) {
    return (
      <div data-testid="file-upload">
        <button onClick={props.handleFileUpload}>Upload</button>
      </div>
    );
  };
});

describe('ControlPanel Component', () => {
  const mockProps = {
    isLoading: false,
    handleFileChange: jest.fn(),
    handleFileUpload: jest.fn(),
    loadAttributeDescriptions: jest.fn(),
    harmonizeAttributes: jest.fn(),
    generateDiagram: jest.fn(),
    toggleHarmonisedColumn: jest.fn(),
    toggleDiagram: jest.fn(),
    showHarmonisedColumn: false,
    showDiagram: false,
    hasHarmonisedData: true,
    hasDiagramData: true,
  };

  it('renders without crashing', () => {
    render(<ControlPanel {...mockProps} />);
    expect(screen.getByText('Generate Definitions')).toBeInTheDocument();
    expect(screen.getByText('Harmonise Attributes')).toBeInTheDocument();
    expect(screen.getByText('Generate Diagram')).toBeInTheDocument();
  });

  it('calls loadAttributeDescriptions when the Generate Definitions button is clicked', () => {
    render(<ControlPanel {...mockProps} />);
    fireEvent.click(screen.getByText('Generate Definitions'));
    expect(mockProps.loadAttributeDescriptions).toHaveBeenCalledTimes(1);
  });

  it('calls harmonizeAttributes when the Harmonise Attributes button is clicked', () => {
    render(<ControlPanel {...mockProps} />);
    fireEvent.click(screen.getByText('Harmonise Attributes'));
    expect(mockProps.harmonizeAttributes).toHaveBeenCalledTimes(1);
  });

  it('calls generateDiagram when the Generate Diagram button is clicked', () => {
    render(<ControlPanel {...mockProps} />);
    fireEvent.click(screen.getByText('Generate Diagram'));
    expect(mockProps.generateDiagram).toHaveBeenCalledTimes(1);
  });

  it('disables buttons when loading', () => {
    render(<ControlPanel {...mockProps} isLoading={true} />);
    expect(screen.getByText('Generate Definitions')).toBeDisabled();
    expect(screen.getByText('Harmonise Attributes')).toBeDisabled();
    expect(screen.getByText('Generate Diagram')).toBeDisabled();
  });
});