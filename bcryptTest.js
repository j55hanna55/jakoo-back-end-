const bcrypt = require("bcryptjs")

bcrypt.compare('SuperSecretPassword', '$2a$08$geoceb1uR65rwRMOvYGquONq6jf0g3U2CUt0.ztRDRqrqWOa4Aoji', 
function(err, res){
if (err) {
    console.log(err)
}if (res) {
    console.log(res)
}
})


