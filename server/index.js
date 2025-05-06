const express = require('express');
const cors = require('cors');
const salleRouter = require('./routes/salle.routes');
const professeurRoutes = require('./routes/professeur.routes');
const niveauRouter = require('./routes/niveau.routes');
const matiereRouter = require('./routes/matiere.routes');
const edtRouter = require('./routes/edt.routes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.use('/matiere', matiereRouter)
app.use('/niveau', niveauRouter)
app.use('/salle', salleRouter)
app.use('/professeur', professeurRoutes)
app.use('/emploiDutemps', edtRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
