function updateSemesterOptions() {
  const year = document.getElementById("yearSelect").value;
  const semSelect = document.getElementById("semSelect");
  semSelect.innerHTML = '<option value="">-- Select Semester --</option>';

  if (year) {
    const start = (parseInt(year) - 1) * 2 + 1;
    const end = start + 1;
    for (let i = start; i <= end; i++) {
      semSelect.innerHTML += `<option value="${i}">Semester ${i}</option>`;
    }
  }
  document.getElementById("previousCgpaInputs").innerHTML = "";
  document.getElementById("missingResult").innerHTML = "";
}

function generatePreviousFields() {
  const sem = parseInt(document.getElementById("semSelect").value);
  const inputDiv = document.getElementById("previousCgpaInputs");
  inputDiv.innerHTML = "";

  for (let i = 1; i < sem; i++) {
    const label = document.createElement("label");
    label.textContent = `Overall after Semester ${i}:`;
    const input = document.createElement("input");
    input.type = "number";
    input.step = "0.01";
    input.min = "0";
    input.max = "10";
    input.id = `overall${i}`;
    input.placeholder = `e.g., 7.${i}`;
    inputDiv.appendChild(label);
    inputDiv.appendChild(input);
  }
}

function calculateMissingSemester() {
  const sem = parseInt(document.getElementById("semSelect").value);
  const finalOverall = parseFloat(document.getElementById("overallCgpa").value);
  const resultDiv = document.getElementById("missingResult");

  if (!sem || isNaN(finalOverall)) {
    resultDiv.innerHTML = "Please select a semester and enter overall CGPA.";
    return;
  }

  let individualCGPAs = [];
  let output = "<strong>Calculated Semester CGPAs:</strong><br>";

  for (let i = 1; i <= sem; i++) {
    let overall = i === sem ? finalOverall : parseFloat(document.getElementById(`overall${i}`)?.value);
    if (isNaN(overall)) {
      resultDiv.innerHTML = `Please enter valid overall CGPA for Semester ${i}.`;
      return;
    }

    let sumPrev = individualCGPAs.reduce((a, b) => a + b, 0);
    let semCGPA = (overall * i - sumPrev);
    individualCGPAs.push(semCGPA);
    output += `Semester ${i}: ${semCGPA.toFixed(2)}<br>`;
  }

  resultDiv.innerHTML = output;
}
