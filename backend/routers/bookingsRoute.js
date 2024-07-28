import express from 'express'
import bookingsController from '../controllers/bookingsController/bookingsController.js';
import getMyBookings from '../controllers/bookingsController/getMyBookings.js';
import authMiddleware from '../middleware/authMiddleware.js';
import getBookedRooms from '../controllers/bookingsController/getBookedRooms.js';
import cancelBooking from '../controllers/bookingsController/cancelBookingController.js';
import updateBookingController from '../controllers/bookingsController/updatedBookingController.js';



const bookingsRouter = express.Router();
bookingsRouter.route('/bookings/bookroom').post(bookingsController);
bookingsRouter.route('/bookings/mybookings').get(authMiddleware,getMyBookings); 
bookingsRouter.route('/bookings/mybookedrooms').get(authMiddleware,getBookedRooms); 
bookingsRouter.route('/cancelbooking/:id').delete(authMiddleware,cancelBooking); 
bookingsRouter.route('/updatebooking/:id').put(authMiddleware,updateBookingController); 







export default bookingsRouter;