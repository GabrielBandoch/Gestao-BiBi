const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    return proceed();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido.' });
  }
};
