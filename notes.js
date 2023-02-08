const fs = require('fs') //fs is one of the node core modules
const chalk = require('chalk')

// ADD
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) { // !duplicateNote making sure there is no duplicate title/body
        notes.push({
            title: title, // title = title
            body: body // body = body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!')) // if it's not duplicate, it'll add the notes and it would print 'New note added!' in a background green
    } else {
        console.log(chalk.red.inverse('Note title taken!'))// if it's duplicate, it'll not the notes and it would print 'New title taken!' in a background red
    }
}

// REMOVE
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }    
}

// LIST
const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

// READ
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    //console.log(note)
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}