// 회원가입하기
// CRUD 구현하기
const { Router } = require("express");
const { Data } = require("../db/schemas/user-schema");

const router = Router();

// READ 구현하기 -> GET
router.get("/", async (req, res) => {
    const data = await Data.find({});

    res.json(data);
    // console.log("data OK");
});

router.get("/:data_id", async (req, res) => {
    const search_id = req.params.data_id;
    const data = await Data.find({ _id: search_id });

    res.json(data);
});


// CREATE 구현하기 -> POST
router.post("/", async (req, res) => {
    const { _id, name, email, password, joinTime } = req.body;
    
    const data = await Data.create({
        _id,
        name,
        email,
        password,
        joinTime,
    });
    res.json(data);
})

// UPDATE 구현하기 -> PUT
router.put("/:data_id", async (req, res) => {
    const { _id } = req.params;
    const { name, email, password, joinTime } = req.body;

    const data = await Data.updateOne(
        {
            _id,
        },
        {
            name,
            email,
            password,
            joinTime
        }
    );
    res.json(data);
});

// DELETE 구현하기 -> DELETE
router.delete(":/data_id", async (req, res) => {
    const { _id } = req.params;

    const data = await Data.deleteOne({ _id });
    res.send(data);
});

module.exports = router;