console.log('Initial localStorage:', localStorage.getItem('timetableData'));

const timetableData = [
  {
    day: "Monday",
    periods: [
      "Math | TF",
      "Physics | SA",
      "Chemistry | HH",
      "Biology | AM",
      "English | MM",
      "Free Period",
      "Computer | AD",
      "Sanskrit | VS"
    ]
  },
  {
    day: "Tuesday",
    periods: [
      "Physics | SA",
      "Math | TF",
      "Chemistry | HH",
      "Biology | AM",
      "English | MM",
      "Free Period",
      "Sanskrit | VS",
      "Computer | AD"
    ]
  },
  {
    day: "Wednesday",
    periods: [
      "English | MM",
      "Math | TF",
      "Biology | AM",
      "Physics | SA",
      "Sanskrit | VS",
      "Free Period",
      "Chemistry | HH",
      "Computer | AD"
    ]
  },
  {
    day: "Thursday",
    periods: [
      "Computer | AD",
      "Chemistry | HH",
      "Math | TF",
      "Biology | AM",
      "Sanskrit | VS",
      "Free Period",
      "Physics | SA",
      "English | MM"
    ]
  },
  {
    day: "Friday",
    periods: [
      "Biology | AM",
      "Sanskrit | VS",
      "Physics | SA",
      "English | MM",
      "Computer | AD",
      "Free Period",
      "Math | TF",
      "Chemistry | HH"
    ]
  },
  {
    day: "Saturday",
    periods: [
      "Math | TF",
      "English | MM",
      "Biology | AM",
      "Physics | SA",
      "Chemistry | HH",
      "Free Period",
      "Computer | AD",
      "Sanskrit | VS"
    ]
  }
];

const timetableBody = document.getElementById("timetable-body");

// Get data from localStorage or use default timetableData
const getStoredData = () => {
  const storedData = localStorage.getItem('timetableData');
  if (storedData) {
    console.log('Found stored data:', JSON.parse(storedData));
    return JSON.parse(storedData);
  }
  console.log('Using default data');
  // Save default data to localStorage on first visit
  localStorage.setItem('timetableData', JSON.stringify(timetableData));
  return timetableData;
};

// Add this to verify changes are being saved
function saveToLocalStorage(updatedData) {
  try {
    localStorage.setItem('timetableData', JSON.stringify(updatedData));
    console.log('Data saved successfully:', updatedData);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

// Add these variables at the top of your script
let isEditMode = false;
const editBtn = document.getElementById('edit-btn');
const saveBtn = document.getElementById('save-btn');

// Add this function to toggle edit mode
function toggleEditMode() {
  isEditMode = !isEditMode;
  const textareas = document.querySelectorAll('.editable');
  
  textareas.forEach(textarea => {
    textarea.readOnly = !isEditMode;
    if (isEditMode) {
      textarea.removeAttribute('readonly');
    } else {
      textarea.setAttribute('readonly', 'true');
    }
  });

  // Toggle button visibility
  editBtn.style.display = isEditMode ? 'none' : 'flex';
  saveBtn.style.display = isEditMode ? 'flex' : 'none';

  // Toggle draggable attribute
  const draggableCells = document.querySelectorAll('.draggable');
  draggableCells.forEach(cell => {
    cell.setAttribute('draggable', isEditMode.toString());
  });
}

function renderTimetable() {
  timetableBody.innerHTML = ""; // Clear existing content
  const currentData = getStoredData();

  currentData.forEach((row, rowIndex) => {
    const tr = document.createElement("tr");

    const dayCell = document.createElement("td");
    dayCell.textContent = row.day;
    tr.appendChild(dayCell);

    row.periods.forEach((period, colIndex) => {
      const td = document.createElement("td");
      td.classList.add("draggable");
      td.setAttribute("draggable", "true");

      const textarea = document.createElement("textarea");
      textarea.value = period;
      textarea.classList.add("editable");
      textarea.setAttribute('readonly', 'true');

      // Add event listener for changes
      textarea.addEventListener('change', (e) => {
        const updatedData = getStoredData();
        updatedData[rowIndex].periods[colIndex] = e.target.value;
        saveToLocalStorage(updatedData);
      });

      td.appendChild(textarea);
      tr.appendChild(td);

      // Add drag-and-drop functionality
      td.addEventListener("dragstart", handleDragStart);
      td.addEventListener("dragover", handleDragOver);
      td.addEventListener("drop", handleDrop);
    });

    timetableBody.appendChild(tr);
  });
}

let draggedElement = null;

// Drag-and-Drop Handlers
function handleDragStart(e) {
  draggedElement = e.target;
  e.dataTransfer.effectAllowed = "move";
}

function handleDragOver(e) {
  e.preventDefault();
}

// Update the drop handler to persist dragged changes
function handleDrop(e) {
  e.preventDefault();

  if (draggedElement && e.target.closest(".draggable")) {
    const draggedCell = draggedElement.closest('td');
    const targetCell = e.target.closest(".draggable");
    
    const draggedTextarea = draggedCell.querySelector("textarea");
    const targetTextarea = targetCell.querySelector("textarea");

    // Get indices for updating localStorage
    const draggedRow = draggedCell.parentElement.rowIndex - 1;
    const draggedCol = draggedCell.cellIndex - 1;
    const targetRow = targetCell.parentElement.rowIndex - 1;
    const targetCol = targetCell.cellIndex - 1;

    // Swap values
    const tempValue = draggedTextarea.value;
    draggedTextarea.value = targetTextarea.value;
    targetTextarea.value = tempValue;

    // Update localStorage
    const updatedData = getStoredData();
    updatedData[draggedRow].periods[draggedCol] = draggedTextarea.value;
    updatedData[targetRow].periods[targetCol] = targetTextarea.value;
    localStorage.setItem('timetableData', JSON.stringify(updatedData));
  }
}

// Export Timetable Screenshot
document.getElementById('export-btn').addEventListener('click', function () {
  const timetableElement = document.getElementById("timetable");

  // Capture screenshot of the timetable
  html2canvas(timetableElement).then(function (canvas) {
    // Convert canvas to a data URL
    const imgData = canvas.toDataURL("image/png");

    // Create a download link
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'timetable-screenshot.png';

    // Programmatically click the link to trigger the download
    link.click();
  });
});

// Add event listeners for the buttons
editBtn.addEventListener('click', () => {
  toggleEditMode();
});

saveBtn.addEventListener('click', () => {
  toggleEditMode();
  // Save the current state to localStorage
  const updatedData = getStoredData();
  saveToLocalStorage(updatedData);
  
  // Show a save confirmation
  const notification = document.createElement('div');
  notification.className = 'save-notification';
  notification.textContent = 'Changes saved successfully!';
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
});

// Add this CSS for the save notification
const style = document.createElement('style');
style.textContent = `
  .save-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease-out, fadeOut 0.3s ease-in 2.7s;
  }

  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(style);

// Initial render
renderTimetable();
