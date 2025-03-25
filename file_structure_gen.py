import os
import pathlib

def generate_folder_structure(root_path, output_file='folder_structure.txt', ignore_patterns=None):
    """
    Generate a text representation of the folder structure.
    
    Args:
    - root_path (str): Path to the root directory to scan
    - output_file (str, optional): Name of the output file. Defaults to 'folder_structure.txt'
    - ignore_patterns (list, optional): List of patterns to ignore
    """
    # Default ignore patterns
    if ignore_patterns is None:
        ignore_patterns = [
            '.git', 
            'node_modules', 
            '__pycache__', 
            '.venv', 
            'venv', 
            '.env', 
            '.idea', 
            '.vscode', 
            '*.log', 
            '.DS_Store',
            '*.pyc',
            '*.pyo',
            '*.pyd',
            '.pytest_cache'
        ]

    def should_ignore(path):
        """Check if path should be ignored based on ignore patterns."""
        path_str = str(path)
        return any(
            pattern in path_str or 
            path.match(pattern) or 
            path.name.startswith('.') 
            for pattern in ignore_patterns
        )

    def tree(directory, prefix=''):
        """
        Recursively generate tree structure for the given directory.
        
        Args:
        - directory (pathlib.Path): Directory to generate tree for
        - prefix (str, optional): Prefix for formatting tree
        
        Returns:
        - list: Lines representing the directory tree
        """
        contents = []
        
        # Sort entries to ensure consistent output
        try:
            entries = sorted(directory.iterdir(), key=lambda p: (not p.is_dir(), p.name.lower()))
        except PermissionError:
            print(f"Warning: Unable to access directory {directory}")
            return contents
        
        # Iterate through entries
        for index, entry in enumerate(entries):
            # Skip ignored paths
            if should_ignore(entry):
                continue
            
            # Determine tree formatting
            is_last = index == len(entries) - 1
            connector = '└── ' if is_last else '├── '
            new_prefix = prefix + ('    ' if is_last else '│   ')
            
            # Add directory or file to contents
            try:
                if entry.is_dir():
                    contents.append(f"{prefix}{connector}{entry.name}/")
                    contents.extend(tree(entry, new_prefix))
                else:
                    contents.append(f"{prefix}{connector}{entry.name}")
            except PermissionError:
                print(f"Warning: Unable to access {entry}")
        
        return contents

    # Ensure root path exists
    root = pathlib.Path(root_path)
    if not root.is_dir():
        print(f"Error: {root_path} is not a valid directory.")
        return

    # Generate tree structure
    try:
        tree_lines = [f"{root.name}/"] + tree(root)
        
        # Write to output file
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(tree_lines))
        
        print(f"Folder structure saved to {output_file}")
        
        # Optional: print to console
        print('\n'.join(tree_lines))
    
    except Exception as e:
        print(f"An error occurred: {e}")

# Directly run for the specified directory
if __name__ == '__main__':
    directory = r'C:\Users\R40008\Asset Model Server\python\bim-ai-poc'
    output_file = 'bim_ai_poc_structure.txt'
    generate_folder_structure(directory, output_file)