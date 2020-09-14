module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('User',{
        username:{
            type:DataTypes.STRING(200),
            unique: true
        },
        password:{
            type:DataTypes.STRING(255),
        },
        name: {
            type:DataTypes.STRING(255)
        }
    });

    model.associate = models => {
        model.hasMany(models.TodoList, { foreignKey: 'user_id'});
    }

    return model;
}