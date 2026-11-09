export default (sequelize, Sequelize) => {
  const Event = sequelize.define("event", {
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    desc: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    start: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end: {
      type: Sequelize.DATE,
      allowNull: false,
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
  });

  return Event;
};
