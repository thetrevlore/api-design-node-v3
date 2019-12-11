export const getOne = model => async (req, res) => {
  const doc = await model
    .findOne({
      _id: req.params.id,
      createdBy: req.user._id
    })
    .exec()

  if (!doc) {
    return res.status(404).end()
  }

  res.status(200).json({ data: doc })
}

export const getMany = model => async (req, res) => {
  const docs = await model.find({ createdBy: req.user._id })

  res.status(200).json({ data: docs })
}

export const createOne = model => async (req, res) => {
  const doc = await model.create({
    // name: req.body.name
    ...req.body,
    createdBy: req.user._id
  })

  res.status(201).json({ data: doc })
}

export const updateOne = model => async (req, res) => {
  const updatedDoc = await model.findOneAndUpdate(
    {
      createdBy: req.user._id,
      _id: req.params.id
    },
    req.body,
    { new: true } // gets the updated document back rather than the old one
  )

  if (!updatedDoc) {
    return res.status(400).end()
  }

  res.status(200).json({ data: updatedDoc })
}

export const removeOne = model => async (req, res) => {
  const removedDoc = await model.findOneAndRemove({
    createdBy: req.user._id,
    _id: req.params.id
  })

  if (!removedDoc) {
    return res.status(400).end()
  }

  res.status(200).json({ data: removedDoc })
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
