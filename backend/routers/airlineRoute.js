import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import bookTicketController from '../controllers/airlinebookingsController/bookTicketController.js';
import getAllTickets from '../controllers/airlineticketsController/getAllTickets.js';
import getBookedTickets from '../controllers/airlinebookingsController/getBookedTickets.js';
import getMyBookedTickets from '../controllers/airlinebookingsController/getMyBookedTickets.js';
import getMyPostedTickets from '../controllers/airlineticketsController/getMyTickets.js';
import ticketsController from '../controllers/airlineticketsController/postTicketController.js';
import cancelTicket from '../controllers/airlinebookingsController/cancelTicket.js';
import { upload } from '../middleware/uploadimage.js';
import editTicketController from '../controllers/airlineticketsController/editTicketController.js';
import updateTicketBookingController from '../controllers/airlinebookingsController/updatedTicketBookingController.js';
import deleteTicketController from '../controllers/airlineticketsController/deleteTicketController.js';



const airlineRouter = express.Router();

airlineRouter.route('/postTicket').post(upload.none(),authMiddleware,ticketsController)
airlineRouter.route('/bookairlineticket').post(bookTicketController)
airlineRouter.route('/bookings/myticketsbookings').get(authMiddleware,getMyBookedTickets); //For Tourist
airlineRouter.route('/cancelticket/:id').delete(authMiddleware,cancelTicket); 
airlineRouter.route('/bookings/mybookedtickets').get(authMiddleware,getBookedTickets); 
airlineRouter.route('/getalltickets').get(getAllTickets)
airlineRouter.route('/getMyPostedTickets').get(authMiddleware,getMyPostedTickets)
airlineRouter.route('/updateTicket/:id').put(authMiddleware,editTicketController); 
airlineRouter.route('/updateTicketBooking/:id').put(authMiddleware,updateTicketBookingController); 
airlineRouter.route('/deleteTicket/:ticketId').delete(authMiddleware, deleteTicketController);


export default airlineRouter;  