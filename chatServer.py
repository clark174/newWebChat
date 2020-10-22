
import os
from os import path
import sys

global world

messages={}

# put message to all users, get your messages,
def getMessages(id,message):
    keys = messages.keys()
    if id not in keys:
        messages[id]=""
    # return messages for this ID, plus message from this ID
    result=messages[id]
    if len(message) > 1:
        result+="You: "+message+"\n"
    messages[id]=""
    # Add message to all other users
    for key in keys:
        if key!=id:
            messages[key]+=message+"\n"
    return result


def chatServer():
  fifoname="skonChat" # unique name for fifos
  sendFifoFile = "/home/fifo/"+fifoname+"_sendFifo"
  getFifoFile = "/home/fifo/"+fifoname+"_getFifo"

  #Create Fifos is they don't exist
  if not path.exists(sendFifoFile):
    os.mkfifo(sendFifoFile)
    os.chmod(sendFifoFile, 0o777)
  if not path.exists(getFifoFile):
    os.mkfifo(getFifoFile)
    os.chmod(getFifoFile, 0o777)

  # Main loop.  Wait for message, process it, and return result.  Then loop.
  while True:
    print("Waiting for command");
    sendFifo=open(sendFifoFile, "r")
    getFifo=open(getFifoFile, "w")

    line = sendFifo.read()
    print("Message Recieved: ",line)
    id,message=line.split("_")

    result=getMessages(id,message)
    print("Sending:",result)

    getFifo.write(result)

    getFifo.close()
    sendFifo.close()


chatServer()
