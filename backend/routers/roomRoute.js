import express from 'express'
import getAllRooms from '../controllers/roomControllers/getAllRooms.js';
import roomController from '../controllers/roomControllers/roomController.js';
import { upload } from '../middleware/uploadimage.js';
import authMiddleware from '../middleware/authMiddleware.js';
import getMyRooms from '../controllers/roomControllers/getMyRooms.js';
import updateRoomController from '../controllers/roomControllers/updateRoomController.js';
import deleteRoomController from '../controllers/roomControllers/deleteRoomController.js';

 
const roomRouter = express.Router();
roomRouter.route('/postRooms').post(upload.array("images"),authMiddleware,roomController)
roomRouter.route('/getallrooms').get(getAllRooms)
roomRouter.route('/getMyRooms').get(authMiddleware,getMyRooms)
roomRouter.route('/updateRoom/:id').put(authMiddleware,updateRoomController); 
roomRouter.route('/deleteRoom/:roomId').delete(authMiddleware, deleteRoomController);




export default roomRouter;  