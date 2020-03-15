package User

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/lyihongl/modulify/Backend/Session"
)

type User struct {
	Username string
	Password string
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		var t User
		a := json.NewDecoder(r.Body)
		a.Decode(&t)
		fmt.Println(t)

		//js, err := json.Marshal(t)
		//if err != nil {
		//	http.Error(w, err.Error(), http.StatusInternalServerError)
		//	return
		//}

		//w.Header().Set("Content-Type", "application/json")
		//fmt.Println(string(js))
		Session.IssueValidationToken(w, t.Username)
		//w.Write(js)
	}
}

func CreateAccountHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		//stmt, err := data.DB.Prepare("INSERT INTO users (username,email,password) VALUES (?,?,?)")
		//res.CheckErr(err)
		//hash, err := bcrypt.GenerateFromPassword([]byte(r.Form.Get("password")), bcrypt.DefaultCost)
		//res.CheckErr(err)
		//stmt.Exec(r.Form.Get("username"), r.Form.Get("email"), hash)
		//http.Redirect(w, r, "..", http.StatusFound)
	}
}
