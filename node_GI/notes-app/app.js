
// **NPM Packages: We load it in by providing its name inside of the string we oass ti require** 
// EX: const chalk = require('chalk')


const chalk = require('chalk') // Chalk is a utility that allows us (the user) customize how text gets printed to the console when working with Node
const yargs = require('yargs') // Yargs helps build interactive command line tools, by parsing arguments and generating an elegant user interface.
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({ 
    command: 'add', // command add is --> node app.js add
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, // When putting in --title="", there must be a name for it
            type: 'string' // The title must be a 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true, // When putting in --body="", there must be a name for it
            type: 'string' // The body must be a 'string'
        }
    },
    handler(argv) { // Handler actually make the code run when someone uses the command
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove', // command remove is --> node app.js remove
    describe: 'Remove a note', // when putting in command, it would print this as a message
    builder: {
        title: {
            describe: 'Note title', // when putting in command, it would print this as a message
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { // Handler actually make the code run when someone uses the command
        notes.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list', // command list is --> node app.js list
    describe: 'List your notes', // when putting in command, it would print this as a message
    handler() { // Handler actually make the code run when someone uses the command
        notes.listNotes()
    }
})

// Create read command
yargs.command({
    command: 'read', // command read is --> node app.js read
    describe: 'Read a note', // when putting in command, it would print this as a message
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { // Handler actually make the code run when someone uses the command
        notes.readNote(argv.title)
    }
})

yargs.parse()