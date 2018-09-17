from http.server import HTTPServer, BaseHTTPRequestHandler

from io import BytesIO


class SimpleHttpRequestHandler(BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        BaseHTTPRequestHandler.end_headers(self)

    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"GET Response")
    
    def do_POST(self):
        content_length = int(self.headers["Content-Length"])
        body = self.rfile.read(content_length)
        self.send_response(200)
        self.end_headers()

        response = BytesIO()
        response.write(b'This is POST.\n')
        response.write(b'Recevied: ')
        response.write(body)
        self.wfile.write(response.getvalue())


httpd = HTTPServer(('localhost', 8000), SimpleHttpRequestHandler)
httpd.serve_forever()