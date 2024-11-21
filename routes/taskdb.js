const express = require("express");
const router = express.Router();
const db = require("../database/db"); // Mengimpor koneksi database

// Endpoint untuk mendapatkan semua tugas
router.get("/", (req, res) => {
  db.query("SELECT * FROM tugas", (err, results) => {
    if (err) return res.status(500).send("Internal Server Error");
    res.json(results);
  });
});

// Endpoint untuk mendapatkan tugas berdasarkan ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM tugas WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).send("Internal Server Error");
    if (results.length === 0) return res.status(404).send("Tugas tidak ditemukan");
    res.json(results[0]);
  });
});

// Endpoint untuk menambahkan tugas baru
router.post("/", (req, res) => {
  const { pekerjaan } = req.body;

  if (!pekerjaan || pekerjaan.trim() === "") {
    return res.status(400).send("Tugas tidak boleh kosong");
  }

  db.query("INSERT INTO tugas (pekerjaan, status) VALUES (?, ?)", [pekerjaan.trim(), "Process"], (err, results) => {
    if (err) return res.status(500).send("Internal Server Error");
    const newTodo = { id: results.insertId, pekerjaan: pekerjaan.trim(), status: "Process" };
    res.status(201).json(newTodo);
  });
});

// Endpoint untuk memperbarui tugas
router.put("/:id", (req, res) => {
  const { pekerjaan, status } = req.body;

  if (!pekerjaan || pekerjaan.trim() === "") {
    return res.status(400).send("Tugas tidak boleh kosong");
  }

  db.query("UPDATE tugas SET pekerjaan = ?, status = ? WHERE id = ?", [pekerjaan.trim(), status || "Process", req.params.id], (err, results) => {
    if (err) return res.status(500).send("Internal Server Error");
    if (results.affectedRows === 0) return res.status(404).send("Tugas tidak ditemukan");
    res.json({ id: req.params.id, pekerjaan: pekerjaan.trim(), status });
  });
});

// Endpoint untuk menghapus tugas
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM tugas WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).send("Internal Server Error");
    if (results.affectedRows === 0) return res.status(404).send("Tugas tidak ditemukan");
    res.status(204).send();
  });
});

module.exports = router;
