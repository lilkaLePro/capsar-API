import mongoose, { Schema } from "mongoose";

interface IUser {
    _id?: string,
    fullname: string,
    email: string,
    authentication: {
        password: string,
        salt: string,
        sessionToken: string
    },
    userType: "user" | 'admin'
}

const UserSchema: Schema = new mongoose.Schema<IUser>({
    fullname : {type : String , required : true, min : 2 , max : 30 },
    email : {type : String , required : true , unique : true },
    userType: {type: String, required: true} ,
    authentication: {
        password : { type : String , required : true, select: false},
        salt: {type: String, select: false },
        sessionToken: {type: String, select: false }
},
}, {
    timestamps: true
})

export const UserModel = mongoose.model('users' , UserSchema)

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken' : sessionToken,
});

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (value: Record<string, any>) => new UserModel(value)
    .save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, value: Record<string, any>) => UserModel.findByIdAndUpdate(id, value);
