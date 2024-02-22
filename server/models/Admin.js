const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10; // the # of times the pw is hashed. higher num is more secure but more time
const { ObjectId } = require('mongodb');
const AdminSchema = new mongoose.Schema({ 
    admin_id:{
        type:ObjectId,
        required:true,
    },
    Fname:{
        type:String,
        required:true,
    },
    Lname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true, 
    },
    password:{
        type:String,
        required:true,
    },
})

// automatically hashes the pw before any admin value is saved to the DB
AdminSchema.pre('save', function(next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    // generate a salt and hash the password
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            // replace the plaintext password with the hashed one
            this.password = hash;
            next();
        });
    });
});

module.exports = Admin = mongoose.model('admins', AdminSchema);