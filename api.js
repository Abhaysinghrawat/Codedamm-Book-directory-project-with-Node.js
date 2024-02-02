const router = require('express').Router()
const books = require('./data')

let booksDirectory = books

router.get('/reset', function (req, res) {
	booksDirectory = books
	res.send('ok')
})

router.get('/books', function (req, res) {
    console.log("hiiiii");
	booksDirectory= books;
	res.send(booksDirectory)
})

router.get('/books/:id', function (req, res) {
	const id= req.params.id;
    console.log(id);
	let bookToFind = booksDirectory.find(book=>book.isbn == String(id))
	if(!bookToFind){
		res.statusCode(404);
	}
	else
	    res.send(bookToFind)
})

router.post('/books', function (req, res) {
	const {
		title,
		isbn,
		pageCount,
		publishedDate,
		thumbnailUrl,
		shortDescription,
		longDescription,
		status,
		authors,
		categories,
	} = req.body
	booksDirectory.push({...req.body})
	res.send(req.body)
})

router.put('/books/:id', function (req, res) {
	// const { id } = req.params
	const {
		title,
		isbn,
		pageCount,
		publishedDate,
		thumbnailUrl,
		shortDescription,
		longDescription,
		status,
		authors,
		categories,
	} = req.body
	const id = parseInt(req.params.id);
	let bookToUpdate=booksDirectory.find(book=>book.isbn==id)
	if(!bookToUpdate)
	{
	res.status(404);
	}
    else
	{
		booksToUpdate={...bookToUpdate,...req.body}
	}
	booksDirectory=booksDirectory.map(book=>{
		if(book.isbn==id)
		{
			return book = {...bookToUpdate}
		}
		return book;
	})

	res.send(booksDirectory)
})

router.delete('/books/:id', function (req, res) {
	const id = req.params.id;
	let bookToUpdate=booksDirectory.find(book=>book.isbn=== String(id))
	if(!bookToUpdate)
	{
	res.status(404);
	}
    else
	{
		booksDirectory=booksDirectory.filter(book=>book.isbn !==id)
	
	res.send('Deleted the book')
	}
})

module.exports = router
