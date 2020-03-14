package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/mholt/certmagic"
)

func main() {
	prod := os.Args
	//fmt.Println(prod[1])
	//fmt.Println(prod[1] == "prod")

	certmagic.Default.Agreed = true
	certmagic.Default.Email = "yihongliu00@gmail.com"

	//init database
	//data.Init()

	r := mux.NewRouter()
	//r.HandleFunc("/api/login", func(w http.ResponseWriter, r *http.Request) {
	//	w.Header().Set("Access-Control-Allow-Origin", "127.0.0.1:3000")
	//	fmt.Println(r.Method)
	//})

	r.HandleFunc("/api/login", handler)
	if prod[1] == "prod" {
		certmagic.HTTPS([]string{"yihong.ca"}, r)
	} else {
		err := http.ListenAndServe(":9090", r) //set listen port
		if err != nil {
			log.Fatal("ListenAndServer:", err)
		}
	}

}

type Test struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:3000")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, application/json")
	fmt.Println(r)
	if r.Method == "POST" {
		var t Test
		a := json.NewDecoder(r.Body)
		a.Decode(&t)
		fmt.Println(t)
	}
}
