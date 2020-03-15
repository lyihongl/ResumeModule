package User

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/lyihongl/main/snippet/res"
	data "github.com/lyihongl/modulify/Backend/Data"
	"github.com/lyihongl/modulify/Backend/Session"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Username string
	Password string
}

type LoginJson struct {
	ValidCreds bool
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		var t User
		a := json.NewDecoder(r.Body)
		a.Decode(&t)
		// check for credentials against db here
		fmt.Println(time.Now())
		if !checkLoginError(t.Username, t.Password) {
			lj := LoginJson{true}
			js, err := json.Marshal(lj)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			fmt.Println(string(js))
			Session.IssueValidationToken(w, t.Username)
			w.Write(js)
		} else {
			fmt.Println("should be here")
			lj := LoginJson{false}
			js, err := json.Marshal(lj)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.Write(js)
		}
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

func checkLoginError(u, p string) bool {

	fail := false

	userCheck, err := data.DB.Query("SELECT password FROM users WHERE username=?", u)
	res.CheckErr(err)

	if !userCheck.Next() {
		fail = true
	}

	//var uid int
	//var username string
	//var email string
	var password string

	userCheck.Scan(&password)

	if bcrypt.CompareHashAndPassword([]byte(password), []byte(p)) != nil {
		fail = true
	}
	return fail
}
