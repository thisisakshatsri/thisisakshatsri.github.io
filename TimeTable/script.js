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
