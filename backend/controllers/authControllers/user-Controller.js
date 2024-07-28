const userController = async (req,res) => {
    try {
        const userData = req.user;
        return res.status(200).json({userData});

    } catch (error) {
        console.log('error in user controller',error);
    }
}
export default userController