import { Router } from 'express'

const router = Router()

// /api/item/
router
  .route('/')
  .get((req, res) => res.send({ message: 'heyo get /' }))
  .post((req, res) => res.send({ message: 'heyo post /' }))

// /api/item/:id
router
  .route('/:id')
  .get((req, res) => res.send({ message: 'heyo get /:id' }))
  .delete((req, res) => res.send({ message: 'heyo delete /:id' }))
  .put((req, res) => res.send({ message: 'heyo put /:id' }))

// router.get('/', (req, res) => res.send({ message: 'heyo get' }))
// router.post('/', (req, res) => res.send({ message: 'heyo post' }))
// router.get('/:id', (req, res) => res.send({ message: 'heyo get /:id' }))
// router.put('/:id', (req, res) => res.send({ message: 'heyo put /:id' }))
// router.delete('/:id', (req, res) => res.send({ message: 'heyo delete /:id' }))

export default router
