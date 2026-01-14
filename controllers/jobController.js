const Job = require("../models/Job");
const asyncHandler = require("express-async-handler");

// @desc Create job
// @route POST /api/jobs
// @access Private
const createJob = asyncHandler(async (req, res) => {
  const { company, position, status, location, priority, followUpDate, notes } =
    req.body;

  if (!company || !position) {
    res.status(400);
    throw new Error("Company and position are required");
  }

  const job = await Job.create({
    user: req.user._id,
    company,
    position,
    status,
    location,
    priority,
    followUpDate,
    notes,
    statusHistory: [{ status: status || "applied" }],
  });

  res.status(201).json(job);
});

// @desc Get jobs (filter + search + pagination)
// @route GET /api/jobs
// @access Private
const getJobs = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 10, sort, priority } = req.query;

  const queryObject = {
    isArchived: false,
  };

  // User restriction
  if (req.user.role !== "admin") {
    queryObject.user = req.user._id;
  }

  if (status) queryObject.status = status;
  if (priority) queryObject.priority = priority;

  if (search) {
    queryObject.$or = [
      { company: { $regex: search, $options: "i" } },
      { position: { $regex: search, $options: "i" } },
    ];
  }

  let query = Job.find(queryObject);

  // Sorting
  if (sort === "latest") query = query.sort("-createdAt");
  if (sort === "oldest") query = query.sort("createdAt");

  // Pagination
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(Number(limit));

  const [jobs, totalJobs] = await Promise.all([
    query,
    Job.countDocuments(queryObject),
  ]);

  res.json({
    totalJobs,
    currentPage: Number(page),
    totalPages: Math.ceil(totalJobs / limit),
    jobs,
  });
});

// @desc Update job
// @route PUT /api/jobs/:id
// @access Private
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job || job.isArchived) {
    res.status(404);
    throw new Error("Job not found");
  }

  // Ownership check
  if (
    req.user.role !== "admin" &&
    job.user.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Not authorized");
  }

  // Track status change
  if (req.body.status && req.body.status !== job.status) {
    job.statusHistory.push({ status: req.body.status });
  }

  Object.assign(job, req.body);
  await job.save();

  res.json(job);
});

// @desc Soft delete job
// @route DELETE /api/jobs/:id
// @access Private
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  if (
    req.user.role !== "admin" &&
    job.user.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Not authorized");
  }

  job.isArchived = true;
  await job.save();

  res.json({ message: "Job archived successfully" });
});

module.exports = {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
};
