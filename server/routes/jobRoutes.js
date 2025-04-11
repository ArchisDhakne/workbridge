import express from 'express'
import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  changeJobStatus,
} from '../controllers/jobController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

// Protect all routes with token check
router.use(verifyToken)

router.post('/', createJob)
router.get('/', getAllJobs)
router.put('/:id', updateJob)
router.delete('/:id', deleteJob)
router.patch('/:id/status', changeJobStatus)

export default router
