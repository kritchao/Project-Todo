module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('TodoList', {
        task: {
            type: DataTypes.STRING(255)
        },
        detail: {
            type: DataTypes.STRING(255)
        },
        priority: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        date: {
            type: DataTypes.DATE,
        }

    }, {
        tableName: 'todolists',
        timeStamp: false
    });

    model.associate = models => {
        model.belongsTo(models.User, { foreignKey : 'user_id'})
    }

    return model;
}