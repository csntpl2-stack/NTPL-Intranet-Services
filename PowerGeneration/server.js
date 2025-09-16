const express = require('express');
const sql = require('mssql');
const cors = require('cors');

// Initialize Express App
const app = express();
const PORT = 5005;

app.use(cors());

// MSSQL Database Configuration
const dbConfig = {
  user: 'ntpl_gen',                // Username
  password: 'ntpl_GEN@62',         // Password
  server: '172.16.250.62',         // IP Address of the server
  database: 'Gendata',             // Database name
  options: {
    encrypt: false,                // Disable encryption
    enableArithAbort: true,
    trustServerCertificate: true,  // Ignore SSL certificate validation
  },
};

// Test database connection
sql.connect(dbConfig)
  .then(() => console.log('Connected to SQL Server Database successfully!'))
  .catch(err => console.error('Database connection failed:', err));

  app.get('/api/data', async (req, res) => {
    try {
      const result = await sql.query(`
        SELECT [NTPL_Unit1], [NTPL_Unit2], [FREQ], [EXPORT], [SCH]
        FROM [dbo].[MWGENDATA]
      `);
  
      // Send the fetched data as JSON
      res.json(result.recordset[0]);
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } 
  });

  const moment = require('moment'); // Ensure you have moment.js installed for easy date handling

app.get('/api/coaldata', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const today = moment().format('DD-MM-YYYY'); // Get today's date in 'DD-MM-YYYY' format
    const result = await sql.query(`
      SELECT [COALID], [DATE], [OPNCOALSTK], [COALCNSM], [COALRECEPIT], [CLSCOALSTK], [CPFNO]
      FROM [dbo].[COALDATA]
      WHERE [DATE] = '${today}'
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching COALDATA:', err);
    res.status(500).send('Server Error');
  } 
});
  
  // Fetch data from MWGENDATA table
  app.get('/api/mwgendata', async (req, res) => {
    try {
      await sql.connect(dbConfig);
      const result = await sql.query(`
        SELECT TOP (1000) [Data_ID], [NTPL_Unit1], [NTPL_Unit2], [FREQ], [EXPORT], [SCH], [APC], [AG_SG], 
                          [DC], [BW7FEEDRATE], [BW8FEEDRATE], [U1_AGC], [U2_AGC], [TOTAL_AGC]
        FROM [dbo].[MWGENDATA]
      `);
      res.json(result.recordset);
    } catch (err) {
      console.error('Error fetching MWGENDATA:', err);
      res.status(500).send('Server Error');
    } 
  });

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});