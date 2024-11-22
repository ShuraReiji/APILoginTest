const user_model = (name, pass, email, contnumber)=>{

    let User = {
        user_name: name,
        password: pass,
        email: email,
        contact_number: contnumber
    }

    return User
}

module.exports = {
    user_model
}