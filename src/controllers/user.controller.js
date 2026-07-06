import { asyncHandler } from "../utils/asynchandlers";

const registeruser = asyncHandler( async (req, res) => {
     res.status(200).json ({
        message: "ok"
    })
})


export {registeruser}