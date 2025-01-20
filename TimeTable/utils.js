// Utility functions
const utils = {
  // Storage functions
  getStoredData: function() {
    try {
      const data = localStorage.getItem('timetableData');
      return data ? JSON.parse(data) : timetableData;
    } catch (error) {
      console.error('Error getting data:', error);
      return timetableData;
    }
  },

  saveToLocalStorage: function(data) {
    try {
      localStorage.setItem('timetableData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  },

  // UI functions
  showNotification: function(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, CONFIG.NOTIFICATION_DURATION);
  },

  // Drag and drop handlers
  handleDragStart: function(e) {
    if (!window.isEditMode) return;
    
    const td = e.target.closest('td');
    if (!td) return;

    td.classList.add('dragging');
    td.style.opacity = '0.5';
    
    // Create a custom drag image
    const dragImage = td.cloneNode(true);
    dragImage.style.width = td.offsetWidth + 'px';
    dragImage.style.height = td.offsetHeight + 'px';
    dragImage.style.background = '#ffffff';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    e.dataTransfer.setData('text/plain', td.querySelector('textarea').value);
    
    // Remove the temporary drag image after it's no longer needed
    setTimeout(() => dragImage.remove(), 0);

    // Add dragging class to all potential drop targets
    document.querySelectorAll('#timetable td').forEach(cell => {
      if (cell !== td) {
        cell.classList.add('droppable');
      }
    });
  },

  handleDragOver: function(e) {
    if (!window.isEditMode) return;
    e.preventDefault();
    
    const td = e.target.closest('td');
    if (!td || td.classList.contains('dragging')) return;

    // Add visual feedback for the current drop target
    document.querySelectorAll('.drop-target').forEach(cell => {
      cell.classList.remove('drop-target');
    });
    td.classList.add('drop-target');
  },

  handleDragEnd: function(e) {
    if (!window.isEditMode) return;
    
    const td = e.target.closest('td');
    if (td) {
      td.style.opacity = '1';
      td.classList.remove('dragging');
    }

    // Remove all drag-related classes
    document.querySelectorAll('#timetable td').forEach(cell => {
      cell.classList.remove('droppable', 'drop-target');
    });
  },

  handleDrop: function(e) {
    if (!window.isEditMode) return;
    e.preventDefault();
    
    const sourceCell = document.querySelector('.dragging');
    const targetCell = e.target.closest('td');
    
    if (!sourceCell || !targetCell || sourceCell === targetCell) {
      return;
    }

    // Get the data
    const sourceTextarea = sourceCell.querySelector('textarea');
    const targetTextarea = targetCell.querySelector('textarea');
    const tempValue = sourceTextarea.value;
    
    // Swap the values
    sourceTextarea.value = targetTextarea.value;
    targetTextarea.value = tempValue;

    // Save to localStorage
    const currentData = this.getStoredData();
    const cells = document.querySelectorAll('#timetable td');
    const sourceIndex = Array.from(cells).indexOf(sourceCell);
    const targetIndex = Array.from(cells).indexOf(targetCell);

    if (sourceIndex !== -1 && targetIndex !== -1) {
      const sourceRow = Math.floor((sourceIndex - 1) / 9);
      const sourceCol = (sourceIndex - 1) % 9;
      const targetRow = Math.floor((targetIndex - 1) / 9);
      const targetCol = (targetIndex - 1) % 9;

      currentData[sourceRow].periods[sourceCol] = sourceTextarea.value;
      currentData[targetRow].periods[targetCol] = targetTextarea.value;
      this.saveToLocalStorage(currentData);
    }

    // Clean up
    sourceCell.style.opacity = '1';
    sourceCell.classList.remove('dragging');
    targetCell.classList.remove('drop-target');
    document.querySelectorAll('.droppable').forEach(cell => {
      cell.classList.remove('droppable');
    });
  }
}; 