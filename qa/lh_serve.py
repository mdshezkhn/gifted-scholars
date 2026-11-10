import functools, http.server, socketserver, threading, os, sys, time
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H=functools.partial(http.server.SimpleHTTPRequestHandler,directory=".")
class Q(socketserver.ThreadingMixIn,http.server.HTTPServer):daemon_threads=True
srv=Q(("127.0.0.1",8975),H)
threading.Thread(target=srv.serve_forever,daemon=True).start()
time.sleep(float(sys.argv[1]) if len(sys.argv)>1 else 150)
