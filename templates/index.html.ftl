<#ftl outputFormat="HTML">
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Employee Directory</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="../styles.css" />
</head>
<body>
  <header>
    <h1>Employee Directory</h1>
  </header>
  <main class="container">
    <div class="search-bar">
      <input type="text" id="search" placeholder="Search by name or email" />
      <button id="filter-btn">Filter</button>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
      <div>
        Sort: 
        <select id="sort-select" onchange="sortBy(this.value)">
          <option value="">--Select--</option>
          <option value="firstName">First Name</option>
          <option value="department">Department</option>
        </select>
        Show: 
        <select id="show-count">
          <option value="3" selected>3</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <button class="add-employee-btn" onclick="openAddForm()">Add Employee</button>
    </div>
    <div id="employee-cards-container" class="employee-cards"></div>
    <div id="pagination-controls" class="pagination"></div>
    <!-- Add/Edit Form -->
    <div id="form-container" class="modal-form" style="display:none;">
      <form id="emp-form" onsubmit="submitForm(event)">
        <h2 id="form-title">Add Employee</h2>
        <div class="form-row single">
          <label for="firstName">First name</label>
          <input id="firstName" name="firstName" required />
        </div>
        <div class="form-row single">
          <label for="lastName">Last name</label>
          <input id="lastName" name="lastName" required />
        </div>
        <div class="form-row">
          <div>
            <label for="email">Email</label>
            <input id="email" name="email" required />
          </div>
          <div>
            <label for="department">Department</label>
            <select id="department" name="department" required>
              <option value="">Select...</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
            </select>
          </div>
        </div>
        <div class="form-row single">
          <label for="role">Role</label>
          <input id="role" name="role" required />
        </div>
        <div class="form-actions">
          <button type="button" class="cancel-btn" onclick="document.getElementById('form-container').style.display='none'">Cancel</button>
          <button type="submit" class="add-btn">Add</button>
        </div>
      </form>
    </div>
  </main>
  <footer>
    &copy; 2025 Employee Directory App. All rights reserved.
  </footer>
  <script>
    window.initialEmployees = [
      <#if employees??>
        <#list employees as emp>
          {
            id: "${emp.id}",
            firstName: "${emp.firstName}",
            lastName: "${emp.lastName}",
            email: "${emp.email}",
            department: "${emp.department}",
            role: "${emp.role}"
          }<#if emp_has_next>,</#if>
        </#list>
      </#if>
    ];
  </script>
  <script src="../app.js"></script>
</body>
</html>
