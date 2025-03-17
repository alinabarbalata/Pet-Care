    const Pet=require('../../models/pet');

    const createPet=async(req,res)=>{

        try{
            const{name,age,breed,color,type,vaccinated}=req.body;
            const ownerId=req.user._id;
            const newPet=new Pet({
                name,
                age,
                breed,
                color,
                type,
                vaccinated,
                owner:ownerId,
            });

            await newPet.save();
            res.status(201).json({message: 'Pet created succesfully', pet:newPet});
        }catch(error){
            res.status(500).json({message:'Error creating pet',error});
        }
    };

    module.exports={createPet};
