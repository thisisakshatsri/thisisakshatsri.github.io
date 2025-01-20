// Main script
let isEditMode = false;

// DOM Elements
const timetableBody = document.getElementById('timetable-body');
const editBtn = document.getElementById('edit-btn');
const saveBtn = document.getElementById('save-btn');
const exportBtn = document.getElementById('export-btn');

// Debug function to check data
function logCurrentData() {
    console.log('Current localStorage data:', utils.getStoredData());
}

function initializeTimetable() {
    // Only initialize if no data exists
    if (!localStorage.getItem('timetableData')) {
        console.log('Initializing with default data');
        localStorage.setItem('timetableData', JSON.stringify(timetableData));
    }
}

function renderTimetable(data) {
    console.log('Starting render with data:', data);
    const tableBody = document.getElementById('timetable-body');
    if (!tableBody) {
        console.error('Timetable body element not found!');
        return;
    }

    // Clear existing content
    tableBody.innerHTML = '';

    // Create data rows
    data.forEach((dayData) => {
        console.log('Rendering day:', dayData.day);
        const row = document.createElement('tr');
        
        // Add day cell
        const dayCell = document.createElement('td');
        dayCell.className = 'day-cell';
        dayCell.textContent = dayData.day;
        row.appendChild(dayCell);

        // Add period cells
        dayData.periods.forEach((periodData) => {
            const cell = document.createElement('td');
            const textarea = document.createElement('textarea');
            textarea.className = 'editable';
            textarea.value = periodData || '';
            textarea.readOnly = true;
            textarea.rows = 4;
            cell.appendChild(textarea);
            row.appendChild(cell);
        });

        // Fill remaining cells if needed
        const remainingCells = 9 - dayData.periods.length;
        for (let i = 0; i < remainingCells; i++) {
            const cell = document.createElement('td');
            const textarea = document.createElement('textarea');
            textarea.className = 'editable';
            textarea.readOnly = true;
            textarea.rows = 4;
            cell.appendChild(textarea);
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    });
    
    console.log('Render complete');

    // Add event listeners for edit functionality
    if (editBtn && saveBtn) {
        editBtn.addEventListener('click', () => {
            document.querySelectorAll('.editable').forEach(textarea => {
                textarea.readOnly = false;
            });
            editBtn.style.display = 'none';
            saveBtn.style.display = 'inline-flex';
        });

        saveBtn.addEventListener('click', () => {
            document.querySelectorAll('.editable').forEach(textarea => {
                textarea.readOnly = true;
            });
            saveBtn.style.display = 'none';
            editBtn.style.display = 'inline-flex';
            // Add save functionality here if needed
        });
    }
}

function saveChange(rowIndex, colIndex, value) {
    const currentData = utils.getStoredData();
    currentData[rowIndex].periods[colIndex] = value;
    utils.saveToLocalStorage(currentData);
    console.log('Saved change:', {rowIndex, colIndex, value});
}

function adjustTextareaHeights() {
    document.querySelectorAll('.editable').forEach(textarea => {
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight + 2) + 'px';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    if (typeof timetableData === 'undefined') {
        console.error('Timetable data not loaded!');
        return;
    }
    console.log('Script initialized with data:', timetableData);
    renderTimetable(timetableData);
    
    // Add window resize listener to adjust textarea heights
    window.addEventListener('resize', adjustTextareaHeights);

    // Add export button listener
    if (exportBtn) {
        exportBtn.addEventListener('click', captureTableScreenshot);
    }

    // Check if html2canvas is loaded
    if (typeof html2canvas === 'undefined') {
        console.error('html2canvas not loaded');
        utils.showNotification('Screenshot feature not available', 'error');
    } else {
        console.log('html2canvas loaded successfully');
    }

    console.log('Initializing search functionality');
    initializeSearch();

    // Initialize theme toggle
    initializeThemeToggle();
    
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark && !localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    }

    // Initialize drag and drop
    initializeDragAndDrop();
    
    // Re-initialize after any content changes
    const observer = new MutationObserver(() => {
        initializeDragAndDrop();
    });
    
    observer.observe(document.getElementById('timetable'), {
        childList: true,
        subtree: true
    });

    // Enable scrolling for all textareas regardless of edit mode
    document.querySelectorAll('.editable').forEach(textarea => {
        textarea.addEventListener('wheel', (e) => {
            if (textarea.scrollHeight > textarea.clientHeight) {
                const scrollTop = textarea.scrollTop;
                const scrollHeight = textarea.scrollHeight;
                const height = textarea.clientHeight;
                
                // Allow scrolling if there's more content
                if ((e.deltaY < 0 && scrollTop > 0) || 
                    (e.deltaY > 0 && scrollTop < scrollHeight - height)) {
                    e.preventDefault();
                    e.stopPropagation();
                    textarea.scrollTop += e.deltaY;
                }
            }
        }, { passive: false });
    });
});

function toggleEditMode() {
    isEditMode = !isEditMode;
    window.isEditMode = isEditMode;
    
    const textareas = document.querySelectorAll('.editable');
    textareas.forEach(textarea => {
        textarea.readOnly = !isEditMode;
        textarea.style.cursor = isEditMode ? 'move' : 'default';
    });

    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');
    
    editBtn.style.display = isEditMode ? 'none' : 'flex';
    saveBtn.style.display = isEditMode ? 'flex' : 'none';

    // Show notification
    const message = isEditMode ? 'Edit mode enabled - You can now drag cells to swap them' : 'Changes saved';
    showNotification(message);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove after animation
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Reset functionality
function resetToDefaultData() {
    if (confirm('Are you sure you want to reset to default data? This cannot be undone.')) {
        localStorage.setItem('timetableData', JSON.stringify(timetableData));
        renderTimetable(timetableData);
        utils.showNotification('Timetable reset to default!');
    }
}

// Add this function for better screenshot handling
function captureTableScreenshot() {
    // Get only the timetable element
    const timetableElement = document.querySelector('.timetable-container');
    
    // Configure html2canvas options for better quality
    const options = {
        scale: 2, // Higher resolution
        useCORS: true, // Handle cross-origin images
        backgroundColor: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1f2937' : '#ffffff',
        logging: false, // Disable logging
        removeContainer: true, // Clean up after capture
        windowWidth: timetableElement.scrollWidth,
        windowHeight: timetableElement.scrollHeight
    };

    // Show loading indicator
    showNotification('Capturing screenshot...');

    // Capture the table
    html2canvas(timetableElement, options).then(canvas => {
        // Convert to image and download
        const image = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = 'timetable.png';
        link.href = image;
        link.click();
        
        // Show success message
        showNotification('Screenshot saved!');
    }).catch(err => {
        console.error('Screenshot failed:', err);
        showNotification('Screenshot failed. Please try again.');
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const clearButton = document.querySelector('.clear-search');

    if (!searchInput || !clearButton) {
        console.error('Search elements not found');
        return;
    }

    // Search event listener
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        // Show/hide clear button
        clearButton.style.display = searchTerm ? 'block' : 'none';
        
        // Get all cells with content
        const cells = document.querySelectorAll('#timetable td .editable');
        let foundMatch = false;

        cells.forEach(cell => {
            const content = cell.value.toLowerCase();
            const parentCell = cell.closest('td');
            
            if (searchTerm === '') {
                // Reset styles if search is empty
                parentCell.style.backgroundColor = '';
                cell.style.opacity = '1';
            } else if (content.includes(searchTerm)) {
                // Highlight matches
                parentCell.style.backgroundColor = '#fef3c7';
                cell.style.opacity = '1';
                foundMatch = true;
            } else {
                // Dim non-matches
                parentCell.style.backgroundColor = '';
                cell.style.opacity = '0.3';
            }
        });

        // Update no results message
        updateNoResultsMessage(searchTerm, foundMatch);
    });

    // Clear button event listener
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        clearButton.style.display = 'none';
        
        // Reset all cells
        document.querySelectorAll('#timetable td .editable').forEach(cell => {
            const parentCell = cell.closest('td');
            parentCell.style.backgroundColor = '';
            cell.style.opacity = '1';
        });
        
        // Hide no results message
        updateNoResultsMessage('', true);
    });
}

function updateNoResultsMessage(searchTerm, foundMatch) {
    let messageElement = document.getElementById('no-results-message');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'no-results-message';
        messageElement.className = 'no-results';
        document.querySelector('.search-container').appendChild(messageElement);
    }

    if (searchTerm && !foundMatch) {
        messageElement.textContent = `No results found for "${searchTerm}"`;
        messageElement.style.display = 'block';
    } else {
        messageElement.style.display = 'none';
    }
}

// Theme Toggle Implementation
function initializeThemeToggle() {
    // Create theme toggle button if it doesn't exist
    let themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.className = 'action-btn theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        
        // Add to button container
        const buttonContainer = document.querySelector('.button-container');
        if (buttonContainer) {
            buttonContainer.appendChild(themeToggle);
        }
    }

    // Get initial theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Show notification
        utils.showNotification(`Switched to ${newTheme} mode`);
    });
}

// Update theme icon
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
    }
});

function initializeDragAndDrop() {
    const textareas = document.querySelectorAll('.editable');
    let draggedTextarea = null;

    textareas.forEach(textarea => {
        // Enable dragging
        textarea.addEventListener('mousedown', function(e) {
            if (!isEditMode) return;
            draggedTextarea = this;
            this.classList.add('dragging');
        });

        // Handle drag over
        textarea.addEventListener('mouseover', function(e) {
            if (!isEditMode || !draggedTextarea) return;
            if (this !== draggedTextarea) {
                this.classList.add('drag-over');
            }
        });

        // Handle drag leave
        textarea.addEventListener('mouseout', function(e) {
            if (!isEditMode) return;
            this.classList.remove('drag-over');
        });

        // Handle drop
        textarea.addEventListener('mouseup', function(e) {
            if (!isEditMode || !draggedTextarea) return;
            
            if (this !== draggedTextarea) {
                // Swap content
                const tempValue = this.value;
                this.value = draggedTextarea.value;
                draggedTextarea.value = tempValue;
            }

            // Clean up
            textareas.forEach(ta => {
                ta.classList.remove('dragging');
                ta.classList.remove('drag-over');
            });
            draggedTextarea = null;
        });
    });

    // Clean up if mouse is released outside of any textarea
    document.addEventListener('mouseup', function() {
        if (draggedTextarea) {
            textareas.forEach(ta => {
                ta.classList.remove('dragging');
                ta.classList.remove('drag-over');
            });
            draggedTextarea = null;
        }
    });
}
