package App

import (
	"encoding/json"
	"net/http"

	"github.com/lyihongl/main/snippet/session"
	data "github.com/lyihongl/modulify/Backend/Data"
)

func RetrieveSnippet(w http.ResponseWriter, r *http.Request) {
	var response data.JsonResponse
	if tokenValid, user := session.ValidateToken(r); tokenValid {
		response.UserValid = true
		uid := data.GetUserId(user)
		snippet := data.GetSnippet(uid)
		js, err := json.Marshal(snippet)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(js)
	}
}
