#!/usr/bin/env python3
# nameclient.py - Program to receive send chat command
# This CGI program uses the python chatServer to send messages
# And return received messages to the web page
# adapted from James Skon, 2019
#!/usr/bin/env python
import os
from os import path
import sys

fifoname="skonChat"  # Unique name for fifos
#TODO: change the name to be actually unique, probably
sendFifoFile = "/home/fifo/"+fifoname+"_sendFifo"
getFifoFile = "/home/fifo/"+fifoname+"_getFifo"

def callChatServer(id,message):
    #Create Fifos if they don't exist
    if not path.exists(sendFifoFile):
        os.mkfifo(sendFifoFile)
        os.chmod(sendFifoFile, 0o777)
    if not path.exists(getFifoFile):
        os.mkfifo(getFifoFile)
        os.chmod(getFifoFile, 0o777)

    sendFifo=open(sendFifoFile, "w")
    getFifo=open(getFifoFile, "r")
    sendFifo.write(id+"_"+message)
    sendFifo.close()

    result=""
    for line in getFifo:
        result+=line
    getFifo.close()
    return(result)

def main():

    id=input("ID: ")
    message=input("Mess: ")
    result=callChatServer(id,message)
    result=result.replace("\n", "<br/>")
    # Send back to webpage
    print(result)


while True:
    main()
