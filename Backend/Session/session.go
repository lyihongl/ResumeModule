package Session

import (
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
)

//Credentials stores a json username and password
type Credentials struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

//Claims jwt claims
type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

var JwtKey = []byte("secret_key")

func IssueValidationToken(w http.ResponseWriter, Username string) {
	expirationTime := time.Now().Add(7 * 24 * time.Hour)
	fmt.Println(Username)

	//var _username string

	//if len(r.Form.Get("username")) == 0 {
	//	_username = username
	//} else {
	//	_username = r.Form.Get("username")
	//}
	claims := &Claims{
		Username: Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(JwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Path:    "/",
		Expires: expirationTime,
	})
}

func ValidateToken(r *http.Request) (bool, string) {
	c, err := r.Cookie("token")
	if err != nil {
		return false, ""
	}
	tknStr := c.Value
	if err != nil {
		return false, ""
	}

	claims := &Claims{}

	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return JwtKey, nil
	})

	if tkn == nil || err != nil {
		return false, ""
	}

	if !tkn.Valid {
		return false, ""
	}
	fmt.Println("validate token username: ", claims.Username)

	return true, claims.Username
}
