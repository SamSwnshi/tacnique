
let employees = window.initialEmployees || [];
let filteredEmployees = [...employees];
let currentPage = 1;
let pageSize = 3;


function getFormData() {
  return {
    id: 'E' + (Math.floor(Math.random() * 10000)),
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    department: document.getElementById('department').value,
    role: document.getElementById('role').value
  };
}


function addEmployeeToTable(emp) {
  const tbody = document.getElementById('employee-tbody');
  const tr = document.createElement('tr');
  tr.setAttribute('data-id', emp.id);
  tr.innerHTML = `
    <td>${emp.id}</td>
    <td>${emp.firstName} ${emp.lastName}</td>
    <td>${emp.email}</td>
    <td>${emp.department}</td>
    <td>${emp.role}</td>
    <td>
      <button onclick="editEmployee('${emp.id}')">Edit</button>
      <button onclick="deleteEmployee('${emp.id}')">Delete</button>
    </td>
  `;
  tbody.appendChild(tr);
}

window.openAddForm = function() {
  document.getElementById('form-title').textContent = 'Add Employee';
  document.getElementById('emp-form').reset();
  document.getElementById('form-container').style.display = 'block';
}

window.deleteEmployee = function(id) {
  employees = employees.filter(emp => emp.id !== id);
  filteredEmployees = filteredEmployees.filter(emp => emp.id !== id);
  const maxPage = Math.ceil(filteredEmployees.length / pageSize) || 1;
  if (currentPage > maxPage) currentPage = maxPage;
  renderEmployeesPage(currentPage);
};

window.editEmployee = function(id) {
  const emp = employees.find(e => e.id === id);
  if (!emp) return;
  document.getElementById('form-title').textContent = 'Edit Employee';
  document.getElementById('firstName').value = emp.firstName;
  document.getElementById('lastName').value = emp.lastName;
  document.getElementById('email').value = emp.email;
  document.getElementById('department').value = emp.department;
  document.getElementById('role').value = emp.role;
  document.getElementById('form-container').style.display = 'block';
  window._editingId = id;
};

window.submitForm = function(event) {
  event.preventDefault();
  const emp = getFormData();
  if (window._editingId) {
    emp.id = window._editingId;
    employees = employees.map(e => e.id === emp.id ? emp : e);
    filteredEmployees = filteredEmployees.map(e => e.id === emp.id ? emp : e);
    window._editingId = null;
  } else {
    employees.push(emp);
    filteredEmployees.push(emp);
  }
  document.getElementById('form-container').style.display = 'none';
  renderEmployeesPage(currentPage);
};

function renderEmployeesPage(page) {
  const container = document.getElementById('employee-cards-container');
  container.innerHTML = '';
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageEmployees = filteredEmployees.slice(start, end);
  pageEmployees.forEach(emp => {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
      <div><strong>${emp.firstName} ${emp.lastName}</strong></div>
      <div><b>Email:</b> ${emp.email}</div>
      <div><b>Department:</b> ${emp.department}</div>
      <div><b>Role:</b> ${emp.role}</div>
      <div class="card-actions">
        <button onclick="editEmployee('${emp.id}')">Edit</button>
        <button onclick="deleteEmployee('${emp.id}')">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
  renderPagination();
}

function renderPagination() {
  const controls = document.getElementById('pagination-controls');
  controls.innerHTML = '';
  const pageCount = Math.ceil(filteredEmployees.length / pageSize);
  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.disabled = (i === currentPage);
    btn.onclick = () => {
      currentPage = i;
      renderEmployeesPage(currentPage);
    };
    controls.appendChild(btn);
  }
}

function applyFilters() {
  const searchValue = document.getElementById('search').value.trim().toLowerCase();
  filteredEmployees = employees.filter(emp =>
    emp.firstName.toLowerCase().includes(searchValue) ||
    emp.lastName.toLowerCase().includes(searchValue) ||
    emp.email.toLowerCase().includes(searchValue)
  );
  currentPage = 1;
  renderEmployeesPage(currentPage);
}

window.onload = function() {

  filteredEmployees = [...employees];
  const showCount = document.getElementById('show-count');
  if (showCount) {
    pageSize = parseInt(showCount.value, 10);
  }
  renderEmployeesPage(currentPage);
};


document.addEventListener('DOMContentLoaded', function() {
  const showCount = document.getElementById('show-count');
  if (showCount) {
    showCount.value = pageSize;
    showCount.addEventListener('change', function() {
      pageSize = parseInt(this.value, 10);
      currentPage = 1;
      renderEmployeesPage(currentPage);
    });
  }

  const searchInput = document.getElementById('search');
  const filterBtn = document.getElementById('filter-btn');
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
  if (filterBtn) {
    filterBtn.addEventListener('click', applyFilters);
  }
});


function renderEmployees(empList) {
  const tbody = document.getElementById('employee-tbody');
  tbody.innerHTML = '';
  empList.forEach(addEmployeeToTable);
}

window.sortBy = function(field) {
  if (!field) return;
  filteredEmployees.sort((a, b) => {
    if (field === 'firstName') {
      return a.firstName.localeCompare(b.firstName);
    } else if (field === 'department') {
      return a.department.localeCompare(b.department);
    }
    return 0;
  });
  currentPage = 1;
  renderEmployeesPage(currentPage);
};