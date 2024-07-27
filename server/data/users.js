import bcrypt from "bcryptjs"

const users=[{
    name:"John Doe",
    email:"john@email.com",
    password:bcrypt.hashSync('123456',10),
    isAdmin:false
},
{
    name:"Juhi Doe",
    email:"juhi@email.com",
    password:bcrypt.hashSync('123456',10),
    isAdmin:false
},
{
    name:"Admin",
    email:"sakshijadhav1034@gmail.com",
    password:bcrypt.hashSync('admin@10',10),
    isAdmin:true
}
]

export default users