const tasksModel = require('../models/tasksModel');

const getAll = async (request, response) => {
  const tasks = await tasksModel.getAll(request.userId);
  return response.status(200).json(tasks);
};

const getByStatus = async (request, response) => {
	const { status } = request.params 
  const { id } = request.userId 
	const tasks = await tasksModel.getByStatus(status, id);
	return response.status(200).json(tasks);
};

const getByPriority = async (request, response) => {
	const { priority } = request.params
  const { id } = request.userId 
	const tasks = await tasksModel.getByStatus(priority, id);
	return response.status(200).json(tasks);
};

const createTask = async (request, response) => {
  const createdTask = await tasksModel.createTask(request.body, request.userId);
  return response.status(201).json(createdTask);
};

const deleteTask = async (request, response) => {
  const { id } = request.params;

  await tasksModel.deleteTask(id);
  return response.status(204).json();
};

const updateTask = async (request, response) => {
  const { id } = request.params;

  await tasksModel.updateTask(id, request.body);
  return response.status(204).json();

};

module.exports = {
  getAll,
  getByStatus,
  getByPriority,
  createTask,
  deleteTask,
  updateTask,
};
