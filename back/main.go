package main

import (
	"fmt"
	"net/http"

	"tasks/back/handler"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST , PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /tasks", handler.GetTasks)
	mux.HandleFunc("POST /tasks", handler.CreateTask)
	mux.HandleFunc("PUT /tasks/{id}", handler.UpdateTask)
	mux.HandleFunc("DELETE /tasks/{id}", handler.DeleteTask)

	fmt.Println("Server running on port 3000")
	http.ListenAndServe(":3000", corsMiddleware(mux))
}
