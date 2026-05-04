package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"tasks/back/models"
	"tasks/back/service"
)

func GetTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(service.GetAll())
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
	var t models.Task
	if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	created := service.Create(t)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(created)
}

func UpdateTask(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var t models.Task
	if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	updated, ok := service.Update(id, t)
	if !ok {
		http.Error(w, "Task Not Found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updated)
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if !service.Delete(id) {
		http.Error(w, "Not found", http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
