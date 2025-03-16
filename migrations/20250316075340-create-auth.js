module.exports = (sequelize, DataTypes) => {
  const Auth = sequelize.define('Auth', {
    idUser: {
      type: DataTypes.INTEGER,  // Usando INTEGER para gerar auto-incremento
      primaryKey: true,         // Definindo como chave primária
      autoIncrement: true,      // Definindo que deve ser auto-incrementado
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  return Auth;
};
