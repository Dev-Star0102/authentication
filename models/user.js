const mongoose = require('mongoose');
const uuid = require('uuid'); // for unique id
const UserSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone:{
        type:String,
        required:true,
        maxlength:12,
        minlength:11,
    },
    saldo:{
        type:Number,
        default:10000,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
    virtuals: true
});
const UserModel = mongoose.model('users', UserSchema);
//validate email
UserModel.schema.path('email').validate(function (value) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
})
//validate email is exist
UserModel.schema.path('email').validate(function (value) {
    return UserModel.findOne({ email: value }).then(function (user) {
        if (user) {
            return false;
        }
        return true;
    });
}, 'Email sudah terdaftar');
//validate numberphone isexist
UserModel.schema.path('phone').validate(function (value) {
    return UserModel.findOne({ phone: value }).then( ((user) => {
        if (user) {
            return false;
        }
        return true;
    }));
}, 'Nomor telepon sudah terdaftar');
module.exports = UserModel;