UGLIFY=node_modules/.bin/uglifyjs
JSLINT=node_modules/.bin/jslint

all:	check dist

dist:	lib/viewport.min.js

lib/viewport.min.js:
	$(UGLIFY) -o lib/viewport.min.js lib/viewport.js

clean:
	rm lib/viewport.min.js

check:
	$(JSLINT) --indent 2 --plusplus --predef window --predef document --predef navigator lib/viewport.js
