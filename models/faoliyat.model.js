const Faoliyat = sequelize.define("Faoliyat", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
    filialId: {
      type: DataTypes.BIGINT,
      references: {
        model: "Filial",
        key: "id",
      },
    },
  });
  
  Filial.hasMany(Faoliyat);
  Faoliyat.belongsTo(Filial);

  export default Faoliyat;