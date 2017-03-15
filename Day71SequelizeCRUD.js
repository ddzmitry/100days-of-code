var Sequelize = require('sequelize');
//bcrypt
//create connection
var connection = new Sequelize('demo_schema', 'root', 'Kainer2305!');
var Article = connection.define('article', {
    slug: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    title: Sequelize.STRING,
    body: Sequelize.TEXT,
    approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

connection
    .sync({
        force: true,
        log: console.log
    }).then(function() {
        //do somethng
        var req = {
            body: {
                slug: "I am a little teapot!",
                title: "Some Great Title",
                body: "Some Great Body"
            }
        }
        Article.create(req.body, {
            //Approved coloms to insert into! 
            fields: ['slug', 'title', 'body']
        }).then(function(insertArticle) {
            //better to use return
            console.log(insertArticle.dataValue)
        });
        // Article.bulkCreate([ array of values], {validate: true, ignoreDuplicates:true});
        //BUILD FUNCTION MANY TO MANY RELATIONSHIP
        // var articleInstance = Article.build({
        //     slug: 'I am a little tea pot',
        //     title: 'Some Title',
        //     body: 'Some Body'
        // });
        // articleInstance.save()
        //Add to DB
        // Article.create({
        //     slug: 'I am a little tea pot',
        //     title: 'Demo Stuff',
        //     body: 'Lorem ipsum dolor sit amet'
        // }).then(function(insertArticle) {
        //  Callback function! 
        //     console.log(insertArticle.dataValue)
        // });

    })