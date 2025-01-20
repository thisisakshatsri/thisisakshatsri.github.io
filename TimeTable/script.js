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

function renderTimetable() {
    timetableBody.innerHTML = "";
    const currentData = utils.getStoredData();
    console.log('Rendering data:', currentData);

    if (!currentData || !Array.isArray(currentData)) {
        console.error('Invalid or missing data:', currentData);
        return;
    }

    currentData.forEach((row, rowIndex) => {
        const tr = document.createElement("tr");

        // Add day cell
        const dayCell = document.createElement("td");
        dayCell.textContent = row.day;
        dayCell.classList.add('day-cell');
        tr.appendChild(dayCell);

        // Add period cells
        row.periods.forEach((period, colIndex) => {
            const td = document.createElement("td");
            td.classList.add("draggable");
            td.setAttribute("draggable", "false");

            const textarea = document.createElement("textarea");
            textarea.value = period || '';
            textarea.classList.add("editable");
            textarea.setAttribute('readonly', 'true');
            textarea.spellcheck = false;

            // Save changes immediately on input
            textarea.addEventListener('input', (e) => {
                saveChange(rowIndex, colIndex, e.target.value);
            });

            // Handle blur event to ensure data is saved
            textarea.addEventListener('blur', (e) => {
                saveChange(rowIndex, colIndex, e.target.value);
            });

            td.appendChild(textarea);
            tr.appendChild(td);

            // Add drag-and-drop functionality
            td.addEventListener("dragstart", utils.handleDragStart);
            td.addEventListener("dragover", utils.handleDragOver);
            td.addEventListener("drop", (e) => {
                utils.handleDrop(e);
                // Re-render after drop to ensure changes are displayed
                renderTimetable();
            });
        });

        timetableBody.appendChild(tr);
    });

    adjustTextareaHeights();
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
    initializeTimetable();
    renderTimetable();
    
    // Add event listeners
    editBtn.addEventListener('click', () => {
        const password = prompt('Please enter the password to edit:');
        if (password === CONFIG.EDIT_PASSWORD) {
            toggleEditMode();
        } else {
            utils.showNotification('Incorrect password!', 'error');
        }
    });

    saveBtn.addEventListener('click', () => {
        const currentData = utils.getStoredData();
        utils.saveToLocalStorage(currentData);
        toggleEditMode();
        utils.showNotification('Changes saved successfully!');
        renderTimetable(); // Re-render to ensure all changes are displayed
    });

    // Add window resize listener to adjust textarea heights
    window.addEventListener('resize', adjustTextareaHeights);

    // Add export button listener
    if (exportBtn) {
        exportBtn.addEventListener('click', async () => {
            try {
                await exportScreenshot();
            } catch (error) {
                console.error('Export button click error:', error);
                utils.showNotification('Export failed. Please try again.', 'error');
            }
        });
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
});

function toggleEditMode() {
    isEditMode = !isEditMode;
    window.isEditMode = isEditMode;
    
    const textareas = document.querySelectorAll('.editable');
    const draggableCells = document.querySelectorAll('.draggable');
    
    textareas.forEach(textarea => {
        textarea.readOnly = !isEditMode;
    });

    draggableCells.forEach(cell => {
        cell.setAttribute('draggable', isEditMode.toString());
    });

    editBtn.style.display = isEditMode ? 'none' : 'flex';
    saveBtn.style.display = isEditMode ? 'flex' : 'none';
}

// Reset functionality
function resetToDefaultData() {
    if (confirm('Are you sure you want to reset to default data? This cannot be undone.')) {
        localStorage.setItem('timetableData', JSON.stringify(timetableData));
        renderTimetable();
        utils.showNotification('Timetable reset to default!');
    }
}

async function exportScreenshot() {
    try {
        // Show loading state
        const exportBtn = document.getElementById('export-btn');
        exportBtn.disabled = true;
        exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

        // Get the table element
        const table = document.getElementById('timetable');
        
        // Create a temporary container
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '-9999px';
        document.body.appendChild(tempContainer);
        
        // Clone the table
        const tableClone = table.cloneNode(true);
        tableClone.style.width = 'auto';
        tableClone.style.height = 'auto';
        tableClone.style.position = 'static';
        tempContainer.appendChild(tableClone);
        
        // Force all cells to show full content
        tableClone.querySelectorAll('td').forEach(td => {
            td.style.height = 'auto';
            td.style.width = 'auto';
            td.style.whiteSpace = 'pre-wrap';
            td.style.overflow = 'visible';
        });

        // Wait for rendering
        await new Promise(resolve => setTimeout(resolve, 100));

        // Take screenshot
        const canvas = await html2canvas(tableClone, {
            scale: 2,
            logging: true,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            onrendered: function(canvas) {
                console.log('Render complete');
            }
        });

        // Clean up
        document.body.removeChild(tempContainer);

        // Convert to image and download
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `timetable-${new Date().toLocaleDateString().replace(/\//g, '-')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Reset button
        exportBtn.disabled = false;
        exportBtn.innerHTML = '<i class="fas fa-camera"></i> Export Screenshot';
        utils.showNotification('Screenshot exported successfully!');

    } catch (error) {
        console.error('Screenshot error details:', {
            message: error.message,
            stack: error.stack,
            error: error
        });
        
        const exportBtn = document.getElementById('export-btn');
        exportBtn.disabled = false;
        exportBtn.innerHTML = '<i class="fas fa-camera"></i> Export Screenshot';
        utils.showNotification('Screenshot failed. Check console for details.', 'error');
    }
}

// Add debugging information
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

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
