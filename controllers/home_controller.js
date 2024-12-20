const Post = require('../models/post');
const User = require('../models/user');

/*module.exports.home = function(req, res){
     console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
      //  return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
     //   });
   // });

    // populate the user of each post
    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){

        User.find({}, function(err, users){
            return res.render('home', {
                title: "Codeial | Home",
                posts:  posts,
                all_users: users
            });
        });

       
    })

}*/



module.exports.home = async function(req, res){
    
    try{
        // CHANGE :: populate the likes of each post and comment
        
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('comments')
        .populate('likes');

    
        let users = await User.find({});
        console.log('cookie passed');
        return res.render('home', {
            title: "Webingo | home",
            posts:  posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()


// module.exports.actionName = function(req, res){}


// module.exports.actionName = function(req, res){}
