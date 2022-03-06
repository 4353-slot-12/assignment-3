class SampleService {
    static getSample(req, res) {
        res.status(200).send({ echo: req.body?.message })
    }
}

export default SampleService;