// import mysql from 'mysql2';

// const db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: '12345',
//   database: 'budget_tracker'
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// export default async function handler(req, res) {
//     const { method } = req;

//     switch (method) {
//       case 'GET':
//         // Example: Fetch data from MySQL database
//         db.query('SELECT * FROM budget_table', (error, results) => {
//           if (error) {
//             res.status(500).json({ error: 'Error querying database' });
//           } else {
//             res.status(200).json(results);
//           }
//         });
//         break;
//       default:
//         res.setHeader('Allow', ['GET']);
//         res.status(405).end(`Method ${method} Not Allowed`);
//     }
//   }
