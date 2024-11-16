const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'productos_db', 
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = file.originalname.split('.').pop();
      cb(null, `image-${uniqueSuffix}.${extension}`);
    }
  });
  
  const upload = multer({ storage: storage });
  
  app.use('/uploads', express.static('uploads'));

  app.post('/addCategoria', upload.single('imagen'), async (req, res) => {
    const { nombre, descripcion } = req.body;
    const imagen = req.file ? req.file.filename : null;
    
    if (!nombre || !descripcion || !imagen) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
  
    try {
      const query = 'INSERT INTO categorias (imagen, nombre, descripcion, fechaCreacion) VALUES (?, ?, ?, ?)';
      const fechaCreacion = new Date();
      await db.promise().execute(query, [imagen, nombre, descripcion, fechaCreacion]);
      
      res.status(201).json({ message: 'Categoría creada correctamente' });
    } catch (error) {
      console.error('Error insertando categoría:', error);
      res.status(500).json({ message: 'Hubo un problema al guardar la categoría' });
    }
  });

app.get('/categorias', async (req, res) => {
    try {
      const [rows] = await db.promise().query('SELECT * FROM categorias ORDER BY fechaCreacion DESC');
  
      const categoriasConImagenes = rows.map(categoria => ({
        ...categoria,
        imagen: categoria.imagen 
          ? `http://192.168.1.103:3000/uploads/${categoria.imagen.replace('uploads\\', '').replace('\\', '/')}`
          : null
      }));
      
      res.json(categoriasConImagenes);
    } catch (error) {
      console.error('Error fetching categorias:', error);
      res.status(500).json({ message: 'Error al obtener las categorías' });
    }
  });

//Servidor de la API
app.listen(port,'192.168.1.103',() => {
  console.log(`Servidor backend corriendo en http://192.168.1.103:${port}`);
});
