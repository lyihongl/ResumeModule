package Data

import (
	"database/sql"
	"fmt"

	//MySql driver
	_ "github.com/go-sql-driver/mysql"
)

type JsonResponse struct {
	UserValid bool
	Payload   struct{}
}

//DB connection instance to server
var DB *sql.DB

//Init connection to db
func Init() {
	dbVars := GetConfig("./Data/.env")
	user := (*dbVars)["db_user"]
	pass := (*dbVars)["db_password"]
	host := (*dbVars)["db_host"]
	database := (*dbVars)["db_database"]

	var err error
	DB, err = sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s)/%s", user, pass, host, database))
	if err != nil {
		panic(err.Error())
	}

	err = DB.Ping()
	fmt.Println("Pinging server")

	if err != nil {
		panic(err.Error())
	}
}

func GetUserId(user string) int {
	useridQuery, _ := DB.Query("select id from users where username=?", user)
	var result int
	if useridQuery.Next() {
		useridQuery.Scan(&result)
	} else {
		return -1
	}
	return result
}

func GetSnippet(uid int) []SnippetData {
	var result []SnippetData
	var tempResult SnippetData
	snippet, _ := DB.Query("select * from snippet where userid=?", uid)
	index := 0
	for snippet.Next() {
		snippet.Scan(&tempResult.Id, &tempResult.Uid, &tempResult.SnippetName, &tempResult.Data)
		result = append(result, tempResult)
		index++
	}
	return result
}
