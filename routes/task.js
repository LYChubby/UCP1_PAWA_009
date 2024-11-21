const express = require("express");
const router = express.Router();

let tugas = [
  {
    task: 1,
    pekerjaan: "Bersihkan Kolam",
    status: "Process",
  },
  {
    task: 2,
    pekerjaan: "Bersihkan Kamar Mandi",
    status: "Process",
  },
];

router.get("/", (req, res) => {
  res.json(tugas);
});

router.post("/", (req, res) => {
  const newTugas = {
    task: task.length + 1,
    pekerjaan: req.body.pekerjaan,
    status: "Process",
  };
  tugas.push(newTugas);
  res.status(201).json(newTugas);
});

router.delete("/:id", (req, res) => {
  const tugasIndex = tugas.findIndex((t) => t.task === parseInt(req.params.task));
  if (tugasIndex === -1) return res.status(404).json({ message: "Tugas Tidak Ditemukan" });

  const deletedTugas = tugas.splice(tugasIndex, 1)[0];
  res.status(200).json({ message: `Tugas ${deletedTugas.pekerjaan} Telah Dihapus` });
});

router.put("/:id", (req, res) => {
  const todo = tugas.find((t) => t.task === parseInt(req.params.task));
  if (!todo) return res.status(404).json({ message: "Tugas Tidak Ditemukan" });

  res.status(200).json({
    message: `Tugas Dengan Task ${tugas.task} Telah Diperbarui`,
    updatedTodo: todo,
  });
});

module.exports = router;
