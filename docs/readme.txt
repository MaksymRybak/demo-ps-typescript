link al corso https://app.pluralsight.com/library/courses/getting-started-typescript/exercise-files

Installare TypeScript e configurazione progetto
	la struttura base dell'app e' abbastanza semplice
		- cartella app per i file *.ts
		- cartella css per gli stili 
		- index.html con il markup base
		- favicon.png
		- package.json		// per scaricare le dipendenze di webpack
		- webpack.config.js // configurazione webpack per avere il web server di sviluppo che eseguira' la nostra app
	per installare typescript digitiamo "npm install typescript --save-dev"
	NOTA: un JS valido e' sempre anche un TS (TypeScript) valido
	per compilare un file *.ts usiamo "tsc *.ts"
	referenziamo il file *.js nella nostra pagina HTML e avviamo il web server usando webpack, digitando "npm start"
	configurazione progetto typescript
		viene usato il file di configurazione tsconfig.json
			- non dobbiamo specificare tante opzioni durante la compilazione di ts in js
			- possiamo specificare i file da compilare o no
			- supportata l'ereditarieta' di configurazione (possiamo avere un file base a livello root dell'app e tanti file in diverse cartelle 
				che estendono la configurazione base aggiungendo quella specifica.)
		il file e' un insieme di chiavi valori dove il valore puo' essere una cosa semplice come numero/codice oppure una sezione con propri chiavi valori (oggetto)
		il file tsconfig.json di default viene creato difitando "tsc --init"
			sezione compilerOptions contiene opzioni di compilazione (es. target:es5 per compilare in ECMA2015)
			abilitando "sourceMap": true, possiamo eseguire il debug nel codice ts usando il tool di sviluppo del browser
			abilitiamo "outDir": "js" per impostare la cartella dove salvare il risultato di compilazione
			nella sezione compilerOptions aggiungiamo "watch": true per abilitare autoricompilazione quando un file *.ts viene modificato
			aggiungiamo sezione dove specifichiamo i file da compilare:
			"files": [
				"app/app.ts"
			]
			avendo il file di configurazione ora e' sufficiente digitare tsc 
				possiamo lanciare questo comando anche all'interno di una sottocartella che non contiene tsconfig, la ricerca risale alla cartella padre 
				finche non trova il file 
		lanciando tsc rimaniamo in attesa delle modifiche ai file *.ts, ricompilazione automatica
		avviamo il web server per vedere il risultato 
		ricordiamo che possiamo avere i file di condifurazione di typescript in diverse cartelle (per es. per ogni funzionalita')
			questo file estendo una configurazione base aggiungendo dei nuovi parametri necessari (parametro extends...). 
			vedi esempio nel codice
	compilazione con webpack (in modo da evitare esecuzione di tsc manualmente)
		webpack viene usato per fornire la nostra app al browser
			module.exports = {
			  entry: './app/app.ts',					// entry point per l'app
			  devtool: 'inline-source-map',				// source map viene creata inline 
			  resolve: {
				extensions: [ '.tsx', '.ts', '.js' ]	// i file da usare per la risoluzione di modulo
			  },
			  output: {	
				filename: 'bundle.js'					// il nome del file di bunde webpack produce, viene inviato al browser 
			  },
			  devServer: {
				inline: false							// impostato a false disabilita l'aggiornamento di budle lato browser dopo qualche modifica 
			  }
			};
		webpack ha un concetto a plugin
		abbiamo il plugin ts-loader, che consente a webpack di compilare il codice typescript come parte del suo processo di bundling 
			installiamo il plugin usando npm install --save-dev ts-loader
			aggiungiamo 
				module: {
					rules: [
					  {
						test: /\.tsx?$/,		// con questa sezione diciamo di usare ts-loader per compilare tutti i file che rispettano espressione regolare
						use: 'ts-loader',		// quindi tutti i file *.ts o *.tsx. escludiamo tutti i file ts sotto node_modules
						exclude: /node_modules/
					  }
					]
				  },
			nel file di configurazione di webpack webpack.config.js
			a questo punto noi abbiamo la compilazione di file *.ts con webpack e non lo dobbiamo fare a mano 
			(eliminiamo cartella js...)
			aggiorniamo index.html referenziando bundle.js NOTA: non lo vedremo com un file fisico, webpack lo genera in memoria e invia subito al browser
			
Vantaggio di tipi in TS
	tipi supportati: Boolean, Number, String, Array, Enum
	dichiarare una variabile
		usiamo let e const 
	type annotation e type inference
		let x: string = 'Hello World';	// use of type annotation
		let y = 'Hello';				// use of type inference
	tipo Void - rappresenta l'assenta del tipo di ritorno
	Null
	Undefined
	Never - usato poco, per esempio in una funzione che non ritorna mai un risoltato, per la colpa di una eccezione magari
	Any - la variabile puo' avere qualsiasi valore
	union types
		let someValue: number | string;
	di default Null e Undefined puo' essere assegnato a tutti i tipi
		usando l'opzione --strictNullCheck del compilatore, rende i due tipi non validi per nessun altro
		solo se specifichiamo null in un tipo union, la variabile puo' essere null
	type assertion
		es. let value: any = 5;
			let fixedString: string = (<number>value).toFixed(4);	// si usano <> e il tipo specifico 
			let fixedString: string = (value as number).toFixed(4);	// risultato e' lo stesso
	nel caso di union types il compilatore analizzando il codice ci fornisce il tipo piu' concreto della variabile 
	
Funzioni in TypeScript
	possiamo specificare il tipo per ogni parametro della fn
		possiamo specificare il tipo di ritorno 
		in ts tutti i parametri sono obbligatori, tranne quelli segnati con ?
	per non usare associazione implicita del tipo any ai parametri senza tipo possiamo abilitare opzione noImplicitAny di tsc 
	un parametro puo' avere un valore di default(es. greeting: string = "Good Morning")
		in questo caso non siamo costretti di passare il suo valore nella chiamata della fn
	arrow functions (aka lambda)
		formato: parameters => function body
		es.
			let squareit = x => x * x;
			let result = squareit(4);
			let adder = (a, b) => a + b;
			let greeting = () => console.log('Hello World');
		array hanno una funzione built-in 'filter' che consente filtrare gli elementi di un array 
	vantaggi di tipi funzione
		es:
			  let logger: (value: string) => void;		// tipo funzione, possiamo assegnare il rif. ad una funzione con unico parametro di tipo string e tipo di ritorno void
			  if (score < 0) {
				logger = logError;
			  } else {
				logger = logMessage;
			  }
			  
Creare e usare tipi Custom
	Entrano in gioco i concetti di Interfaces e Classes
	Interfaces 
		definisce nuovo tipo
		definisce proprieta' (firma) - una prop ha solo il nome e tipo
		definisce metodi, firma di metodi, tipi di parametri, tipo di ritorno 
		NOTA: definisce il contratto, non puo' essere istanziata
	Classes
		definisce nuovo tipo
		definisce proprieta' (implementazione) - getters a setters
		definisce metodi con l'implementazione
		modificatori di accesso: public, private, protected
		NOTA: puo' essere istanziata, ogni nuova istanza e' un oggetto con proprio stato
	typescript implementa un sistema di tipi strutturato
		possiamo associare alla variabile di tipi di una interfaccia un oggetto (object literal) che contiene tutto quello dichiarato dall'interfaccia + qualcosa altro
		importante che l'interfaccia e' stata implementata ('soddisfatta')
	membri della classe
		tutti i membri di una classe di default sono public 
		es:
			class Developer {
				department: string;
				private _title: string;
				get title(): string {
					return this._title;
				}
				set title(newTitle: string) {
					this._title = newTitle.toUpperCase();
				}
				printInfo(): void {
					console.log(`${this.title} of ${this.department}`);
				}
			}
		i metodi di una classe sono identici alle funzioni, con differenza che non e' richiesto di scrivere function davanti
	estendere la classe
		class WebDeveloper extends Developer {
			...
		}
	implementare interfaccia
		interface Employee {
			name: string;
			title: string;
			logID: () => string;
		}
		class Engineer implements Employee {
			name: string;
			title: string;
			logID() {
				return `${this.name}_${this.title}`;
			}
		}
	e' comune mettere le interfacce e le classi nei file *.ts dedicati
		dobbimo tener conto nel momento di compilazione in modo da includere i file *.js creati dopo la compilazione nella pagina HTML
	configurare il progetto con piu' file *.ts
		modifichiamo tsconfig nella cartella che contiene i nostr *.ts
		eliminiamo sezione "include"
		aggiungiamo sezione "files" contenente solo app.ts 
		all'inizio di app.ts aggiungiamo 
			/// <reference path="player.ts" />				// aka triple slash directive
			riferimento per il compilatore ai file da cui app.ts dipende 
		in questo modo in ogni file importiamo le sue dipendenze
		rieseguendo tsc dalla cartella app vediamo di nuovo la cartella js con tutti i file e le mappe compilati
		per questo non risolve il problema come possiamo referenziare tutti i file nella pagine index.html
		questo si risolve aggiungengo 
			"outFile": "../js/app.js"
		nella sezione compilerOptions del file tsconfig.json 
		il risultato della compilazione di tutti *.ts e' contenuto nel file app.js referenziato in index.html
	membri statici
		sono membri acceduti direttamente senza usare l'istanza di una classe
		si usare il nome della classe, punto, seguito dalla proprieta' / metodo statico 
		utili per fare di metodi helper o di utility
	costruttori
		class Developer {
			constructor() {
				console.log('Creating new developer');
			} 
		}
		class WebDeveloper extends Developer {
			readonly favoriteEditor: string;
			constructor(editor: string) {
				super();
				this.favoriteEditor = editor;
			}
		}
		in TS c'e' il concetto di "parameter properties" - parametri con modificatori di accesso (es. public) dichiarati nel costruttore sono anche 
			delle proprieta' della classe.
creazione e utilizzo di moduli
	vantaggi di usare i moduli:
		- incapsulamento codice, facilita manutenzione e refactoring futuro (es. un modulo contiene il codice di una funzionalita')
		- riutilizzabilita', e' possibile riutilizzare un modulo in diversi parti dell'app, o in un'altra app
		- consente creare un'astrazione ad alto livello della nosta app, un modulo e' un "building bloke" dell'app
	ES2015 fornisce un supporto nativo per i moduli 
		se il nostro ambiente non supporta ancora i moduli di ES2015, possiamo specificare nei parametri del file tsconfig quale sistema di moduli usare 
		(prima di ES2015 esistevano gia' soluzioni che consentivano utilizzo di moduli)
		possiamo scegliere tra: AMD, CommonJS, UMD, System, ES2015
		finche non abbiamo supporto a ES2015, tsc nativamente usa CommonJS per caricare i moduli, se non abbiamo scelto CommonJS, dobbiamo 
			scegliere il loader/bundler tra i  Node, RequireJS, SystemJS, Webpack
		NOTA: per approfondire il funzionamento di moduli, bundler e i loader c'e' il corso dedicato https://app.pluralsight.com/library/courses/javascript-module-fundamentals/table-of-contents
	Sintassi di TS x utilizzare i moduli
		moduli possano essere esportati 
			es.
				// person.ts
				export interface Person { }
			possiamo esportare le classi e le funzioni nello stesso modo
			es.
				export function hireDeveloper(): void { } 
				export default class Employee { }	// NOTA: la keyword default conta nel momento di import, se non viene specificato cosa importiamo, 
													//		 di default viene importata la classe Employee 
			se omettiamo la keyword export, la classe/fn/interfaccia non e' visibile agli altri moduli (rimane private per modulo corrente)
			quello che viene esportato dal modulo puo' essere specificato alla fine del file tra {  }
				es. export { Person, hireDeveloper, Employee as StaffMember }	// NOTA: StaffMember e' un alias, usato nel momento di import 
		moduli possano essere importati
			es.
				// player.ts
				import { Person, hireDeveloper } from './person';	// importazione usando il riferimento relativo al file (viene cercatp person.ts)
				import Worker from './person'						// per importare un export 'default'
																	// in questo caso quello che e' stato esportato qui viene usato con il nome Worker
																	// non contato il nome usato nel momento 'export default'
				possiamo usare anche alias nel momento di importo con la keyword 'as'
				per importato tutto usiamo sintassi
					import * as HR from './person'
					dopo usiamo HR.hireDeveloper()..
		demo
			modifichiamo tsconfig.json per usare il bundler CommonJS
			convertiamo tutti *.ts in moduli 
			dobbiamo configurare il module bundler (vedi sotto)
		come TS risolve la location di moduli
			(dobbiamo capire la differenza tra import relativo e non)
			import relativo
				iniziano con / (root del sistema operativo), ./ (dir corrente) o ../ (saliamo su di 1 nella struttura cartelle)
				va usato per importare i moduli della nostra app 
			import non relativi
				es. 
					import * as $ from 'jquery'
				va usato per importare i moduli di terzi
			ts fa il parsing di import e addotta una strategia di risoluzione moduli 
				 es.
					tsc --moduleResolution Classic | Node 
				Classic in teoria e' lasciato per la retrocompatibilita' (come dice autore)
				la strategia dipende dal tipo di moduli che abbiamo settato nel file tsconfig
					di default il compilatore usa Classic se abbiamo scelto: AMD, System, ES2015; o Node se: CommonJS, UMD 
				Classic - risoluzione semplice, tutto si basa sullo scansionamento della struttura di cartelle, meno configurabile
					import relativo: si cerca nella cartella corrente 
					import non relativo: si cerca nella cartella corrente, se non trova, si va nella cartella padre e cosi via
				Node - e' vicino a come fa il Node a risolvere i moduli, piu' configurabile 
					vedi dettagli nel video / slide ...
		demo
			vedi video/slide per vedere cosa possiamo cambiare in tsconfig che riguarda dove il tsc cerca i nostri moduli 
			(es. basePath, etc..)
		demo
			dobbiamo configurare il module bundler per far funzionare i nostri moduli
			webpack e' il nostro module bundler 
			apportiamo le modifiche a webpack.config.js (per dettagli vedi il codice, commit della modifica)
Essere piu' produttivi con i file di dichiarazione tipi (type declaration files)
	Cosa sono i file di dichiarazione tipi
		noti anche come i file di definizione di tipi o libreria di tipi
		sono i wrapper per le librerie JS 
			lo scopo e' di dichiarare i tipi delle variabili, funzioni, oggetti
			definizioni validi nomi delle proprieta'
			definizione parametri delle funzioni 
			e altro
		consentono a tsc di verificare la corretezza di utilizzo della libreria JS
		questi file non sostituiscono la libreria JS che usiamo ma aiuta il compilatore a verificare la correttezza di utilizzo di tipi/oggetti/funzioni della libreria
		dobbiamo cmq installare/distribuire la libreria originale
		i file hanno estensione *.d.ts
		le librerie piu' utilizzare di solito hanno il proprio file *.d.ts 
	dove trovare i file di dichiarazione tipi
		di solito le librerie hanno i file *.d.ts nel pacchetto di propria distribuzione 
		es. core.d.ts di @angular/core
		esiste un grande repo per questi file ed e' DefinitelyTyped - repo github praticamente per tutte le librerie che possiamo immaginare
		per installare i file di dichiarazione tipi usiamo npm 
			tutti file presenti nell'organizzazione @types
			es. @types/<name>, il nome e' spesso della libreria corrispondente
	demo
		per cercare il sito e' https://www.typescriptlang.org/dt/search?search=
			qui vediamo per ogni libreria come installare sia la libreria che i file di dichiarazione tipi
		NOTA: la versione di *.d.ts puo' essere disalineata con quella della libreria, la manutenzione di *.d.ts e' fatta di diverse persone / community
		quando installiamo sia libreria che file *.d.ts VS Code e' in grado di dare suggerimenti su quello che possiamo usare dopo una volta importato un 
			modulo della libreria (le funzioni disponibili, parametri e tipi delle funzione, et...)

Corsi da seguire successivamente che approfondiscono il linguaggio TS
	TypeScript In-depth
		https://app.pluralsight.com/library/courses/typescript-in-depth/table-of-contents
	Advanced TypeScript
		https://app.pluralsight.com/library/courses/typescript-advanced/table-of-contents
		
	
		
				
	