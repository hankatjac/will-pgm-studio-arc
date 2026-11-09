export default (sequelize, Sequelize) => {
  const Todo = sequelize.define(
    "todo",
    {
      text: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      day: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      reminder: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      uid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user", // Use the actual table name as a string
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    }
    // {
    //   tableName: "todo",
    //   timestamps: false,
    // }
  );

  return Todo;
};
