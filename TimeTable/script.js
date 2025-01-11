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
  return storedData ? JSON.parse(storedData) : timetableData;
};

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

      // Add event listener for changes
      textarea.addEventListener('change', (e) => {
        const updatedData = getStoredData();
        updatedData[rowIndex].periods[colIndex] = e.target.value;
        localStorage.setItem('timetableData', JSON.stringify(updatedData));
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

// Initial render
renderTimetable();
