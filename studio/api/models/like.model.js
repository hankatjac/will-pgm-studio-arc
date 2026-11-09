export default (sequelize, Sequelize) => {
  const Like = sequelize.define("like", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "post",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  });
  return Like;
};