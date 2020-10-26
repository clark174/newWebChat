#MakeFile to build a website chat program using ajax
# For Kenyon 2020 Software Development
# team2: Andy Kelleher, Jimmy Clark, Lucas Lu

user = team2

all:  PutHTML PutCGI

PutCGI:
	chmod 757 webchat.py
	cp webchat.py /usr/lib/cgi-bin/$(user)_webchat.py

	echo "Current contents of your cgi-bin directory: "
	ls -l /usr/lib/cgi-bin/

PutHTML:
	cp webchat.html /var/www/html/class/softdev/$(user)/webchat/
	cp webchat.css /var/www/html/class/softdev/$(user)/webchat/
	cp webchat.js /var/www/html/class/softdev/$(user)/webchat/
	ls -l /var/www/html/class/softdev/$(user)/webchat/
clean:
	rm -f *.o  webchat
