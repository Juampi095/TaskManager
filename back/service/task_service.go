package service

import "tasks/back/models"

var tasks []models.Task
var nextID = 1

func GetAll() []models.Task {
	return tasks
}

func Create(t models.Task) models.Task {
	t.ID = nextID
	nextID++
	tasks = append(tasks, t)
	return t
}

func Update(id int, updated models.Task) (models.Task, bool) {
	for i, t := range tasks {
		if t.ID == id {
			updated.ID = id
			tasks[i] = updated
			return updated, true
		}
	}
	return models.Task{}, false
}

func Delete(id int) bool {
	for i, t := range tasks {
		if t.ID == id {
			tasks = append(tasks[:i], tasks[i+1:]...)
			return true
		}
	}
	return false
}
