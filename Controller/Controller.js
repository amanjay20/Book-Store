export const testjobportal = (req,res) =>{
    const {name} = req.body
    res.status(200).send(` ${name} looged in.`)
}

// export default {testjobportal}