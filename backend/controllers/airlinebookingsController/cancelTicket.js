import bookTicketModel from "../../models/bookTicket-Model.js";

const cancelTicket = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await bookTicketModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send('Booking not found');
        }
        return res.send('Booking cancelled');
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
};

export default cancelTicket;
