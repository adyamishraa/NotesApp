const  fs=require('fs');
const _=require('lodash');
const yargs=require('yargs');
const notes=require('./notes.js')

var titleOptions={
    describe:'Title of the note',
    demand:true,
    alias:'t'
}
var bodyOptions={
        describe:'Body of the note',
        demand:true,
        alias:'b'
}
const argv=yargs
.command('add','Add a new note',{
    title:titleOptions,
    body:bodyOptions
})
.command('list','Show all note(s)')
.command('read','Show a particular note',{
    title:titleOptions
})
.command('remove','Remove a single note',{
    title:titleOptions,
})
.command('clear','Clear all notes')
.help()
.argv;
var command=argv._[0];

if(command==='add'){
    var note=notes.addNote(argv.title,argv.body);
    if(note){
        console.log("Note created");
        notes.logNote(note);
    }else
        console.log("Note already in use");
    }


else if(command==='list'){
   var allNotes=notes.getAll();
   console.log(`Printing ${allNotes.length} note(s).`);
   allNotes.forEach((note)=> notes.logNote(note)
   );
   
}


else if(command==='read'){
    var note=notes.getNote(argv.title);
    if(note){
        console.log("Note Read");
        notes.logNote(note);
    }else 
    console.log("Note not found");
}


else if(command==='remove'){
   var noteRemoved=notes.removeNote(argv.title);
   var message=noteRemoved ? 'Note was removed':'Note not found';
   console.log(message);
}

else if(command==='clear'){
    var allNotes=notes.removeAll();
    console.log("All notes deleted!");
    
}
else
console.log("command not recognized");



