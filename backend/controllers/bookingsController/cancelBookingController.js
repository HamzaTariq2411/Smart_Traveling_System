import bookingsModel from "../../models/bookings-Model.js";
import roomModel from "../../models/room-Model.js";

const cancelBooking = async (req, res) => {
    const id = req.params.id;
    try {
        // Find and delete the booking
        const booking = await bookingsModel.findByIdAndDelete(id);
        if (!booking) {
            return res.status(404).send('Booking not found');
        }

        // Find the room and remove the specific currentBooking entry
        const room = await roomModel.findOne({ _id: booking.roomId });
        if (room) {
            room.currentBooking = room.currentBooking.filter(
                (current) => current.bookingsId.toString() !== booking._id.toString()
            );
            await room.save();
        }

        return res.send('Booking cancelled');
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
};

export default cancelBooking;
