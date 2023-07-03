import {Schema, model} from "mongoose"
import {randomUUID} from "crypto"

interface IUser {
    name: string,
    phoneNumber: string
    email: string
    note: string
    companyAddress: string
    password: string,
    _id: any
}

const userSchema = new Schema<IUser>({
    name :  {type: String, required: true},
    phoneNumber: {type: String, required: true, min: 11},
    email:       {type: String, required:true},
    note: {type: String},
    companyAddress: {type: String, required: true},
    _id: {type: 'UUID', default: () => randomUUID()},
    password: {type: String, required: true, min: 6}

})

const UserModel = model<IUser>("User", userSchema)

export default UserModel