package Data

type SnippetData struct {
	Id          int
	Uid         int
	SnippetName string
	Data        string
}

func UpdateSnippet(Id int, Uid int, SnippetName string, Data string) {
	stmt, _ := DB.Prepare("update snippet set snippet_name=?, data=? where id=?")
	stmt.Exec(SnippetName, Data, Id)
}
