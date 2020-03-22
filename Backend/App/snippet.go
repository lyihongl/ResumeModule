package App

import (
	"encoding/json"
	"fmt"
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

func SaveSnippet(w http.ResponseWriter, r *http.Request) {
	//fmt.Println(r)
	var response data.JsonResponse
	fmt.Println("wow")
	if r.Method == "POST" {
		if tokenValid, user := session.ValidateToken(r); tokenValid {
			fmt.Println("wow 2")
			var t data.SnippetData
			response.UserValid = true
			uid := data.GetUserId(user)
			decoder := json.NewDecoder(r.Body)
			decoder.Decode(&t)
			fmt.Println(uid, t)
		} else {
			fmt.Println("not valid")
		}
		//fmt.Println("token valid: ", tokeValid)
	}
}
