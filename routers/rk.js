const express= require("express")
const router= express.Router()
const RK= require("../models/rk")
router.get('/', async (req,res)=>{
    try{
        const rk= await RK.find()
        res.json(rk)
    }catch(err)
    {
        res.send('Error'+err)
    }
})

router.get('/:id',async(req,res) => {
    try{
        const rk = await RK.findById(req.params.id)
        res.json(rk)
    }catch(err)
    {
        res.send("error"+err)
    }
})

router.post('/',async(req,res)=>{
    const rk= new RK(
        {
            name:req.body.name,
            age:req.body.age
        }
    );
    try{
        const a1= await rk.save()
        res.json(a1)
    }catch(err)
    {
        res.send("error"+err)
    }
})

router.patch('/:id', async(req,res) =>{
    try{
        const rk= await RK.findById(req.params.id)
        rk.age=req.body.age
        const a1= await rk.save()
        res.json(a1)
    }catch(err)
    {
        res.send("error"+err)
    }
})

router.delete('/:id', async(req,res) =>{
    try {
        const rk = await RK.findByIdAndRemove(req.params.id);
        if (!rk) {
          res.json({ message: 'Record not found' });
        } else {
          res.json({ message: 'Record deleted successfully' });
        }
      } catch (err) {
        res.send("error"+err)
      }
})

module.exports=router