import { Router } from "express";
import { checkUserDetails, getAllUsers, getOneUser, loginUser, registerUser } from "../controllers/userControllers";
import { verifyToken } from "../middleware/verifyToken";

const user_router = Router()

user_router.post('/register', registerUser)
user_router.post('/login', loginUser)
user_router.get('/',verifyToken, getAllUsers)
user_router.get('/check_user_details',verifyToken, checkUserDetails)
user_router.get('/:UserID', verifyToken, getOneUser)

export default user_router;