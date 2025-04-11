import Job from '../models/Job.js'

export const createJob = async (req, res) => {
  try {
    const job = new Job(req.body)
    await job.save()
    res.status(201).json(job)
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error: error.message })
  }
}

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 })
    res.status(200).json(jobs)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message })
  }
}

export const updateJob = async (req, res) => {
  const { id } = req.params
  try {
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(updatedJob)
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error: error.message })
  }
}

export const deleteJob = async (req, res) => {
  const { id } = req.params
  try {
    await Job.findByIdAndDelete(id)
    res.status(200).json({ message: 'Job deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error: error.message })
  }
}

export const changeJobStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  try {
    const job = await Job.findByIdAndUpdate(id, { status }, { new: true })
    res.status(200).json(job)
  } catch (error) {
    res.status(500).json({ message: 'Error changing job status', error: error.message })
  }
}
