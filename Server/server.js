const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const ExcelJS = require("exceljs");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses form data


// Database configuration
const config = {
  user: 'sa',
  password: 'Ntpl@123',
  server: '172.16.251.202',
  database: 'intranet',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};



// Configure storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './hruploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });
const hrupload = multer({ storage: storage1 });

// Serve static images
app.use("/uploads", express.static("uploads"));
app.use("/hruploads", express.static("hruploads"));

// Fetch images (returns image URLs instead of binary data)
app.get("/photos", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    let query = "SELECT id, event_name, photo_data FROM photos";

    if (req.query.event) {
      query += ` WHERE event_name = @event_name`;
    }

    const request = pool.request();
    if (req.query.event) {
      request.input("event_name", sql.NVarChar, req.query.event);
    }

    const result = await request.query(query);
    const images = result.recordset.map((row) => ({
      id: row.id,
      event_name: row.event_name,
      image: `http://172.16.251.202:5006${row.photo_data}`, // Full URL
    }));

    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).send("Server error");
  }
});

// Fetch images (returns image URLs instead of binary data)
app.get("/hrphotos", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    let query = "SELECT id, event_name, photo_data FROM hrphotos";

    if (req.query.event) {
      query += ` WHERE event_name = @event_name`;
    }

    const request = pool.request();
    if (req.query.event) {
      request.input("event_name", sql.NVarChar, req.query.event);
    }

    const result = await request.query(query);
    const images = result.recordset.map((row) => ({
      id: row.id,
      event_name: row.event_name,
      image: `http://172.16.251.202:5006${row.photo_data}`, // Full URL
    }));

    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).send("Server error");
  }
});

// Fetch event names
app.get("/events", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT DISTINCT event_name FROM photos");

    const eventNames = result.recordset.map(row => row.event_name);
    res.json(eventNames);
  } catch (error) {
    console.error("Error fetching event names:", error);
    res.status(500).send("Server error");
  }
});

//hr
app.get("/hrevents", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT DISTINCT event_name FROM hrphotos");

    const eventNames = result.recordset.map(row => row.event_name);
    res.json(eventNames);
  } catch (error) {
    console.error("Error fetching event names:", error);
    res.status(500).send("Server error");
  }
});

app.get("/circulars", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .query("SELECT Circular_id, Circular_Date, Upload_Date, Division, Description, Filename, ContentType, CAST(Data AS VARBINARY(MAX)) AS Data FROM [Intranet].[dbo].[Circulars]");

    // Convert VARBINARY data to Base64
    const circulars = result.recordset.map((circular) => ({
      ...circular,
      Data: circular.Data ? Buffer.from(circular.Data).toString("base64") : null,
    }));

    res.json(circulars);
  } catch (error) {
    console.error("Error fetching circulars:", error);
    res.status(500).send("Server error");
  }
});

app.post("/upload-circular", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files.file;
    const { description, division, issueDate } = req.body;
    const fileData = file.data;
    const contentType = file.mimetype;
    const fileName = file.name;
    const uploadDate = new Date();

    // Connect to SQL Server
    const pool = await sql.connect(config);

    // Step 1: Get the current max Circular_id
    const result = await pool.request().query("SELECT MAX(Circular_id) AS maxCircularId FROM Circulars");
    let maxCircularId = result.recordset[0].maxCircularId;

    // Step 2: If there's no max ID, start from 1. Otherwise, increment the max ID.
    const newCircularId = maxCircularId ? maxCircularId + 1 : 1;

    // Step 3: Insert data into the Circulars table
    await pool.request()
      .input("Circular_id", sql.Int, newCircularId) // Pass the generated Circular_id
      .input("Circular_Date", sql.Date, issueDate)
      .input("Division", sql.NVarChar, division)
      .input("Description", sql.NVarChar, description)
      .input("Filename", sql.NVarChar, fileName)
      .input("ContentType", sql.NVarChar, contentType)
      .input("Data", sql.VarBinary(sql.MAX), fileData)
      .input("Upload_Date", sql.DateTime, uploadDate)
      .query(`
        INSERT INTO Circulars (Circular_id, Circular_Date, Division, Description, Filename, ContentType, Data, Upload_Date)
        VALUES (@Circular_id, @Circular_Date, @Division, @Description, @Filename, @ContentType, @Data, @Upload_Date)
      `);

    res.json({ message: "Circular uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading circular:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Upload image (stores file in filesystem and saves URL in DB)
app.post("/upload", upload.single("image"), async (req, res, next) => {
  console.log(req.file)
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  
  const { event_name } = req.body;
  if (!event_name) {
    return res.status(400).json({ success: false, message: "Event name is missing" });
  }
  
  try {
    // Save the URL in the database
    const pool = await sql.connect(config);
    const query = `
      INSERT INTO photos (photo_data, event_name) 
      OUTPUT INSERTED.id
      VALUES (@photo_data, @event_name)
    `;
    
    const result = await pool.request()
      .input("photo_data", sql.NVarChar, `/uploads/${req.file.filename}`) // Save the image path in the database
      .input("event_name", sql.NVarChar, event_name)
      .query(query);
    
    if (result.recordset.length > 0) {
      const imageUrl = `http://172.16.251.202:5006/uploads/${req.file.filename}`; // Construct the URL for the image
      return res.json({ success: true, message: "Image uploaded successfully", imageUrl });
    } else {
      return res.status(500).json({ success: false, message: "Image upload failed" });
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

//hr
//Upload image (stores file in filesystem and saves URL in DB)
app.post("/hrupload", hrupload.single("image"), async (req, res, next) => {
  console.log(req.file)
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  
  const { event_name } = req.body;
  if (!event_name) {
    return res.status(400).json({ success: false, message: "Event name is missing" });
  }
  
  try {
    // Save the URL in the database
    const pool = await sql.connect(config);
    const query = `
      INSERT INTO hrphotos (photo_data, event_name) 
      OUTPUT INSERTED.id
      VALUES (@photo_data, @event_name)
    `;
    
    const result = await pool.request()
      .input("photo_data", sql.NVarChar, `/hruploads/${req.file.filename}`) // Save the image path in the database
      .input("event_name", sql.NVarChar, event_name)
      .query(query);
    
    if (result.recordset.length > 0) {
      const imageUrl = `http://172.16.251.202:5006/hruploads/${req.file.filename}`; // Construct the URL for the image
      return res.json({ success: true, message: "Image uploaded successfully", imageUrl });
    } else {
      return res.status(500).json({ success: false, message: "Image upload failed" });
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Gallery login endpoint
app.post("/gallerylogin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password)
      .query("SELECT * FROM gallery_user WHERE username = @username AND password = @password");

    if (result.recordset.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/assign-task", async (req, res) => {
  const {
    task_name,
    task_status,
    task_priority,
    task_description,
    assigned_to,
    assigned_by,
    task_deadline,
  } = req.body;

  const assigned_date = new Date().toISOString().split("T")[0]; // Current Date

  // Validation
  if (!task_name || !task_status || !task_priority || !task_description || !assigned_to || !assigned_by || !task_deadline) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const pool = await sql.connect(config);
    const query = `
      INSERT INTO task_table 
        (task_name, task_status, task_priority, task_description, assigned_to, assigned_by, assigned_date, task_deadline)
      VALUES 
        (@task_name, @task_status, @task_priority, @task_description, @assigned_to, @assigned_by, @assigned_date, @task_deadline);
    `;
    
    const result = await pool.request()
      .input("task_name", sql.NVarChar, task_name)
      .input("task_status", sql.NVarChar, task_status)
      .input("task_priority", sql.NVarChar, task_priority)
      .input("task_description", sql.NVarChar, task_description)
      .input("assigned_to", sql.NVarChar, assigned_to)
      .input("assigned_by", sql.NVarChar, assigned_by)
      .input("assigned_date", sql.Date, assigned_date)
      .input("task_deadline", sql.Date, task_deadline)
      .query(query);

    // Respond with success message
    res.json({ success: true, message: "Task assigned successfully" });
  } catch (error) {
    console.error("Error inserting task:", error);
    res.status(500).json({ success: false, message: "Server error while assigning task" });
  }
});

app.get("/task_user", async (req, res) => {
  
  const { cpf_no } = req.query; 
  if (!cpf_no) {
    return res.status(400).json({ success: false, message: "CPF number is required" });
  }

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("cpf_no", sql.VarChar, cpf_no)  // SQL query to match the CPF number
      .query(`
        SELECT CPF_No, Name, Department, Role
        FROM task_users
        WHERE CPF_No = @cpf_no
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json(result.recordset); // Return user data as JSON
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/get-tasks", async (req, res) => {
  const { assigned_to } = req.body; // Get CPF from the request body
  
  if (!assigned_to) {
    return res.status(400).json({ success: false, message: "CPF number is required" });
  }

  try {
    const pool = await sql.connect(config);
    
    // SQL query to fetch tasks assigned to the user with the given CPF
    const query = `
      SELECT TOP (1000) 
        [id],
        [task_name],
        [task_status],
        [task_priority],
        [task_description],
        [assigned_to],
        [assigned_by],
        [assigned_date],
        [task_deadline],
        [pending_days]
      FROM [Intranet].[dbo].[task_table]
      WHERE assigned_to = @assigned_to
    `;

    const result = await pool.request()
      .input("assigned_to", sql.NVarChar, assigned_to) // Use input binding to avoid SQL injection
      .query(query);

    if (result.recordset.length > 0) {
      // Return the tasks as a response
      res.json({ success: true, tasks: result.recordset });
    } else {
      res.status(404).json({ success: false, message: "No tasks found for this user" });
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, message: "Server error while fetching tasks" });
  }
});

app.post("/get-assignees", async (req, res) => {
  const { cpf_no, role, department, is_role_authorized } = req.body;

  // Check if all required information is provided
  if (!cpf_no || !role || !department) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const pool = await sql.connect(config);

    // If the user is an HOD, filter users by department
    let query = "SELECT CPF_No, Name, Department, Role FROM task_users";
    
    if (role === "HOD") {
      // Only fetch users in the same department as the logged-in user
      query += ` WHERE Department = @department`;
    }

    const result = await pool.request()
      .input("department", sql.NVarChar, department) // Filter by department if HOD
      .query(query);

    if (result.recordset.length > 0) {
      res.json(result.recordset); // Return the users as JSON
    } else {
      res.status(404).json({ success: false, message: "No users found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// **Edit Task - Only Update Task Status**
app.post("/edit-task", async (req, res) => {
  try {
    const { id, task_status } = req.body;
    if(task_status == 'Completed')
      var { days } = req.body;
    console.log(id, task_status.task_status, days);
    

    let pool = await sql.connect(config);
    const query = `
      UPDATE [task_table] 
      SET task_status = @task_status
      WHERE id = @id
    `;

    await pool.request()
      .input("id", sql.Int, id)
      .input("task_status", sql.NVarChar, task_status.task_status)
      .query(query);

    if(task_status == 'Completed')
      sql.query`  update [Intranet].[dbo].[task_table] 
  set pending_days = ${days} where id = ${id}`

    res.json({ success: true, message: "Task status updated successfully" });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ success: false, message: "Error updating task status" });
  }
});

app.post("/delete-task", async (req, res) => {
  try {
    const { id } = req.body;  // Get task ID from request body

    let pool = await sql.connect(config);
    const query = `
      DELETE FROM [task_table]
      WHERE id = @id
    `;

    await pool.request()
      .input("id", sql.Int, id)
      .query(query);

    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Error deleting task" });
  }
});

app.post('/increment-deadline', async (req, res) => {
  const { taskId } = req.body; // Task ID that you want to update

  try {
    // Get the current deadline of the task from the database
    let pool = await sql.connect(config);
    const result = await pool.request()
      .input('taskId', taskId)
      .query('SELECT task_deadline FROM [task_table] WHERE id = @taskId');

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const taskDeadline = result.recordset[0].task_deadline;
    
    // Increment the deadline by one day using JavaScript Date object
    const newDeadline = new Date(taskDeadline);
    newDeadline.setDate(newDeadline.getDate() + 1); // Add one day to the current date
    
    // Format the new deadline as YYYY-MM-DD
    const formattedNewDeadline = newDeadline.toISOString().split('T')[0];

    // Update the task with the new deadline
    await pool.request()
      .input('taskId', taskId)
      .input('newDeadline', formattedNewDeadline)
      .query('UPDATE [task_table] SET task_deadline = @newDeadline WHERE id = @taskId');

    res.json({ success: true, message: 'Task deadline updated successfully', newDeadline: formattedNewDeadline });
  } catch (error) {
    console.error('Error updating task deadline:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post("/taskmnglogin", async (req, res) => {
  const { cpf_no, password } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query(
      `SELECT * FROM task_users WHERE Cpf_no = '${cpf_no}' AND password = '${password}'`
    );

    if (result.recordset.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Invalid CPF No or Password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log(error);
  }
});

app.get("/delegated-tasks", async (req, res) => {
  const { cpf_no } = req.query;

  if (!cpf_no) {
    return res.status(400).json({ success: false, message: "CPF No is required" });
  }
  try {
    await sql.connect(config);
    const result = await sql.query(
      `SELECT TOP (1000) * FROM task_table WHERE assigned_by = '${cpf_no}' OR assigned_to ='${cpf_no}'`
    );

    res.json(result.recordset);
    
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/insert_gross_generation", async (req, res) => {
  const {
    EntryDate, DayTargetMU, DayActualMU, MonthTargetMU, MonthActualMU,
    QuarterTargetMU, QuarterActualMU, YearTargetMU, YearActualMU,
    DayPAF, DayPLF, MonthPAF, MonthPLF, QuarterPAF, QuarterPLF, YearPAF, YearPLF
  } = req.body;

  // Validation
  if (!DayTargetMU || !DayActualMU || !MonthTargetMU || !MonthActualMU || 
      !QuarterTargetMU || !QuarterActualMU || !YearTargetMU || !YearActualMU ||
      !DayPAF || !DayPLF || !MonthPAF || !MonthPLF || !QuarterPAF || !QuarterPLF || !YearPAF || !YearPLF) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const pool = await sql.connect(config);
    const query = `
      INSERT INTO GrossGeneration 
        (EntryDate, DayTargetMU, DayActualMU, MonthTargetMU, MonthActualMU, 
         QuarterTargetMU, QuarterActualMU, YearTargetMU, YearActualMU,
         DayPAF, DayPLF, MonthPAF, MonthPLF, QuarterPAF, QuarterPLF, YearPAF, YearPLF)
      VALUES 
        (@EntryDate, @DayTargetMU, @DayActualMU, @MonthTargetMU, @MonthActualMU, 
         @QuarterTargetMU, @QuarterActualMU, @YearTargetMU, @YearActualMU,
         @DayPAF, @DayPLF, @MonthPAF, @MonthPLF, @QuarterPAF, @QuarterPLF, @YearPAF, @YearPLF);
    `;
    
    await pool.request()
      .input("EntryDate", sql.Date, EntryDate)
      .input("DayTargetMU", sql.Decimal(10,2), DayTargetMU)
      .input("DayActualMU", sql.Decimal(10,2), DayActualMU)
      .input("MonthTargetMU", sql.Decimal(10,2), MonthTargetMU)
      .input("MonthActualMU", sql.Decimal(10,2), MonthActualMU)
      .input("QuarterTargetMU", sql.Decimal(10,2), QuarterTargetMU)
      .input("QuarterActualMU", sql.Decimal(10,2), QuarterActualMU)
      .input("YearTargetMU", sql.Decimal(10,2), YearTargetMU)
      .input("YearActualMU", sql.Decimal(10,2), YearActualMU)
      .input("DayPAF", sql.Decimal(10,2), DayPAF)
      .input("DayPLF", sql.Decimal(10,2), DayPLF)
      .input("MonthPAF", sql.Decimal(10,2), MonthPAF)
      .input("MonthPLF", sql.Decimal(10,2), MonthPLF)
      .input("QuarterPAF", sql.Decimal(10,2), QuarterPAF)
      .input("QuarterPLF", sql.Decimal(10,2), QuarterPLF)
      .input("YearPAF", sql.Decimal(10,2), YearPAF)
      .input("YearPLF", sql.Decimal(10,2), YearPLF)
      .query(query);

    res.json({ success: true, message: "Record inserted successfully" });
  } catch (error) {
    console.error("Error inserting record:", error);
    res.status(500).json({ success: false, message: "Server error while inserting record" });
  }
});

app.get("/get_today_gross_generation", async (req, res) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() -1); // Get yesterday's date
    const formattedYesterday = yesterday.toISOString().split("T")[0]; // Format as YYYY-MM-DD

    const pool = await sql.connect(config);
    const query = `
      SELECT * FROM GrossGeneration WHERE EntryDate = @yesterday;
    `;

    const result = await pool.request()
      .input("yesterday", sql.Date, formattedYesterday)
      .query(query);

    res.json({ success: true, data: result.recordset });
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ success: false, message: "Server error while fetching records" });
  }
});



app.get("/download-generation-history", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`
       SELECT [ID], [EntryDate], [DayTargetMU], [DayActualMU], 

        [MonthTargetMU], [MonthActualMU], [QuarterTargetMU], 

        [QuarterActualMU], [YearTargetMU], [YearActualMU] 

      FROM [Intranet].[dbo].[GrossGeneration]
    `);

    if (result.recordset.length === 0) {
      return res.status(404).send("No data found.");
    }

    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Generation History");

    // Define columns
    worksheet.columns = [
      { header: "ID", key: "ID", width: 10 },
      { header: "Entry Date", key: "EntryDate", width: 15 },
      { header: "Day Target (MU)", key: "DayTargetMU", width: 15 },
      { header: "Day Actual (MU)", key: "DayActualMU", width: 15 },
      { header: "Month Target (MU)", key: "MonthTargetMU", width: 15 },
      { header: "Month Actual (MU)", key: "MonthActualMU", width: 15 },
      { header: "Quarter Target (MU)", key: "QuarterTargetMU", width: 15 },
      { header: "Quarter Actual (MU)", key: "QuarterActualMU", width: 15 },
      { header: "Year Target (MU)", key: "YearTargetMU", width: 15 },
      { header: "Year Actual (MU)", key: "YearActualMU", width: 15 },
    ];

    // Add rows to worksheet
    worksheet.addRows(result.recordset);

    // Set response headers for file download
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=GrossGenerationHistory.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Write Excel file to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/generation-history", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`
      SELECT [ID], [EntryDate], [DayTargetMU], [DayActualMU], 

             [MonthTargetMU], [MonthActualMU], [QuarterTargetMU], 

             [QuarterActualMU], [YearTargetMU], [YearActualMU] 

      FROM [Intranet].[dbo].[GrossGeneration]

    `);
    if (result.recordset.length === 0) {
      return res.status(404).send("No data found.");
    }
    res.json(result.recordset); // ✅ send as JSON
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/api/quote', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/today');
    console.log(response);
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

app.get("/api/capex-targets", async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query all rows from the capex_targets table including computed columns
    const result = await sql.query(`
      SELECT 
        id,
        head,
        be_2025_26,

        apr, may, jun, jul, aug, sep, oct, nov, dec, jan, feb, mar,
        q1, q2, q3, q4, total,

        apr_spent, may_spent, jun_spent, jul_spent, aug_spent, sep_spent,
        oct_spent, nov_spent, dec_spent, jan_spent, feb_spent, mar_spent,

        total_spent, total_spent_pct,
        q1_pct, q2_pct, q3_pct, q4_pct
      FROM capex_targets
    `);

    // Send back the records
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching capex_targets:", err);
    res.status(500).send("Internal server error");
  }
});

app.post("/api/capex-targets/update", async (req, res) => {
  const {
    id,
    head,
    be_2025_26,
    apr, may, jun, jul, aug, sep, oct, nov, dec, jan, feb, mar,
    apr_spent, may_spent, jun_spent, jul_spent, aug_spent, sep_spent,
    oct_spent, nov_spent, dec_spent, jan_spent, feb_spent, mar_spent
  } = req.body;

  if (!id) {
    return res.status(400).send("ID is required for update.");
  }

  try {
    await sql.connect(config);

    const request = new sql.Request();

    // Add parameters to prevent SQL injection
    request.input("id", sql.Int, id);
    request.input("head", sql.VarChar, head);
    request.input("be_2025_26", sql.Float, be_2025_26);

    // Monthly targets
    request.input("apr", sql.Float, apr);
    request.input("may", sql.Float, may);
    request.input("jun", sql.Float, jun);
    request.input("jul", sql.Float, jul);
    request.input("aug", sql.Float, aug);
    request.input("sep", sql.Float, sep);
    request.input("oct", sql.Float, oct);
    request.input("nov", sql.Float, nov);
    request.input("dec", sql.Float, dec);
    request.input("jan", sql.Float, jan);
    request.input("feb", sql.Float, feb);
    request.input("mar", sql.Float, mar);

    // Monthly spent
    request.input("apr_spent", sql.Float, apr_spent);
    request.input("may_spent", sql.Float, may_spent);
    request.input("jun_spent", sql.Float, jun_spent);
    request.input("jul_spent", sql.Float, jul_spent);
    request.input("aug_spent", sql.Float, aug_spent);
    request.input("sep_spent", sql.Float, sep_spent);
    request.input("oct_spent", sql.Float, oct_spent);
    request.input("nov_spent", sql.Float, nov_spent);
    request.input("dec_spent", sql.Float, dec_spent);
    request.input("jan_spent", sql.Float, jan_spent);
    request.input("feb_spent", sql.Float, feb_spent);
    request.input("mar_spent", sql.Float, mar_spent);

    // Update query
    const result = await request.query(`
      UPDATE capex_targets SET
        head = @head,
        be_2025_26 = @be_2025_26,
        apr = @apr, may = @may, jun = @jun, jul = @jul, aug = @aug, sep = @sep,
        oct = @oct, nov = @nov, dec = @dec, jan = @jan, feb = @feb, mar = @mar,
        apr_spent = @apr_spent, may_spent = @may_spent, jun_spent = @jun_spent,
        jul_spent = @jul_spent, aug_spent = @aug_spent, sep_spent = @sep_spent,
        oct_spent = @oct_spent, nov_spent = @nov_spent, dec_spent = @dec_spent,
        jan_spent = @jan_spent, feb_spent = @feb_spent, mar_spent = @mar_spent
      WHERE id = @id
    `);

    res.send("Capex target updated successfully.");
  } catch (err) {
    console.error("Error updating capex_targets:", err);
    res.status(500).send("Internal server error");
  }
});

// Start server
const PORT = 5006;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
