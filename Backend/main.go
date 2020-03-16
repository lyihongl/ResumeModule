package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/lyihongl/modulify/Backend/App"
	data "github.com/lyihongl/modulify/Backend/Data"
	"github.com/lyihongl/modulify/Backend/User"
	"github.com/mholt/certmagic"
)

func main() {
	prod := os.Args
	//fmt.Println(prod[1])
	//fmt.Println(prod[1] == "prod")

	certmagic.Default.Agreed = true
	certmagic.Default.Email = "yihongliu00@gmail.com"

	//init database
	data.Init()

	r := mux.NewRouter()
	headers := handlers.AllowedHeaders([]string{"Accept", " Content-Type", " Content-Length", " Accept-Encoding", " X-CSRF-Token", " Authorization", " application/json"})
	origins := handlers.AllowedOrigins([]string{"http://127.0.0.1:3000"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})
	credentials := handlers.AllowCredentials()

	r.HandleFunc("/api/login", User.LoginHandler)
	r.HandleFunc("/api/get_snippets", App.RetrieveSnippet)

	if prod[1] == "prod" {
		certmagic.HTTPS([]string{"yihong.ca"}, r)
	} else {
		err := http.ListenAndServe(":9090", handlers.CORS(origins, headers, methods, credentials)(r)) //set listen port
		if err != nil {
			log.Fatal("ListenAndServer:", err)
		}
	}

}

//type Test struct {
//	Username string `json:"username"`
//	Password string `json:"password"`
//}
//
//func handler(w http.ResponseWriter, r *http.Request) {
//	fmt.Println(r)
//	if r.Method == "POST" {
//		var t Test
//		a := json.NewDecoder(r.Body)
//		a.Decode(&t)
//		fmt.Println(t)
//	}
//}
