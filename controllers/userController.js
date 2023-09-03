// login user
const loginUser = async (req, res) => {

  const db = req.app.locals.db;
  const email = req.body.email;
  console.log(req.body);
  try {
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      let userId = existingUser.userId
      const userData = await db.collection("users-data").findOne({ userId });
      return res.status(200).json({ success: { userinfo: existingUser, userData: userData } });
    } else {
      return res.status(200).json({ error: 'user not found' });
    }
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// add user
const addUser = async (req, res) => {

  const db = req.app.locals.db;

  let userId = Math.random().toString(36).slice(2);
  try {
    const email = req.body.email;

    console.log(req.body);

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(200).json({ error: "An account with the provided email already exists" });
    }

    await db.collection("users").insertOne({
      userId: userId,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isLoggedIn: false,
      isAllowed: req.body.isAllowed,
      isAllowedTill: req.body.isAllowedTill,
    }).then(async (user) => {
      await db.collection("users-data").insertOne({ userId: userId, gameRestarts: 0, mpRaces: 0, ads: 0, huntRaces: 0, huntBpCount: 0 })
      return res.status(200).json({ success: "User added successfully" });
    })
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
// delete user
const deleteUser = async (req, res) => {

  const db = req.app.locals.db;

  try {
    const query = { name: { $regex: "sheraz" } };
    // const result = await db.collection("users").deleteMany(query)
    console.log("Deleted " + result.deletedCount + " documents");
    res.send("Deleted " + result.deletedCount + " documents")
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// get all users
const users = async (req, res) => {

  const db = req.app.locals.db;
  const itemsCollection = db.collection("users");

  try {
    const items = await itemsCollection.find({}).toArray();
    res.json(items);
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addUser, users, deleteUser, loginUser };
