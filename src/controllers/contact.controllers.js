const client = require("../database");

const contactControllers = {
  getAllContacts: async (req, res) => {
    try {
      const response = await client.query(
        "SELECT * FROM contacts WHERE user_id=$1",
        [req.user.id]
      );
      res.status(200).render("contacts", {
        contacts: response.rows,
      });
    } catch (err) {
      console.error(err);
      res.status(501).send(err);
    }
  },
  getPostFormContacts: (req, res) => {
    res.render("contacts/post");
  },
  postContact: async (req, res) => {
    const { name, description, phone, email } = req.body;
    try {
      await client.query(
        "INSERT INTO contacts (name, description, phone, email, user_id) VALUES ($1, $2, $3, $4, $5);",
        [name, description, phone, email, req.user.id]
      );
      req.flash("success", "Contact added succesfully");
      res.redirect("/contact");
    } catch (err) {
      console.error(err);
      res.status(501).send(err);
    }
  },
  getPutFormContact: async (req, res) => {
    const { id } = req.params;
    try {
      const response = await client.query(
        "SELECT * FROM contacts WHERE id=$1",
        [id]
      );
      res.render("contacts/put", {
        editContact: response.rows[0],
      });
    } catch (err) {
      console.error(err);
      res.status(501).send(err);
    }
  },
  putContact: async (req, res) => {
    const { id } = req.params;
    const { name, description, phone, email } = req.body;
    try {
      await client.query(
        "UPDATE contacts SET name=$1, description=$2, phone=$3, email=$4 WHERE id=$5",
        [name, description, phone, email, id]
      );
      req.flash("success", "Contact edited succesfully");
      res.redirect("/contact");
    } catch (err) {
      console.error(err);
      res.status(501).send(err);
    }
  },
  deleteContact: async (req, res) => {
    const { id } = req.params;
    try {
      await client.query("DELETE FROM contacts WHERE id=$1", [id]);
      req.flash("success", "Contact deleted succesfully");
      res.redirect("/contact");
    } catch (err) {
      console.error(err);
      res.status(501).send(err);
    }
  },
};

module.exports = contactControllers;
