export default (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    desc: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    imgUrl: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    imgId: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    uid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    cat: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
  });

  return Post;
};
