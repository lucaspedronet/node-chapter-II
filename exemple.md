# Status code

### A more technical breakdown of HTTP 1.1 status codes and their meanings is available at http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html. There are several versions of HTTP, but currently HTTP 1.1 is the most widely used.

## Informational

- **100 - Continue**

A status code of 100 indicates that (usually the first) part of a request has been received without any problems, and that the rest of the request should now be sent.
- **101 - Switching Protocols**

 HTTP 1.1 is just one type of protocol for transferring data on the web, and a status code of 101 indicates that the server is changing to the protocol it defines in the "Upgrade" header it returns to the client. For example, when requesting a page, a browser might receive a statis code of 101, followed by an "Upgrade" header showing that the server is changing to a different version of HTTP.

 ## Successful

- **200 - OK**
The 200 status code is by far the most common returned. It means, simply, that the request was received and understood and is being processed.

- **201 - Created**
A 201 status code indicates that a request was successful and as a result, a resource has been created (for example a new page).

- **202 - Accepted**
The status code 202 indicates that server has received and understood the request, and that it has been accepted for processing, although it may not be processed immediately.

- **203 - Non-Authoritative Information**
A 203 status code means that the request was received and understood, and that information sent back about the response is from a third party, rather than the original server. This is virtually identical in meaning to a 200 status code.

- **204 - No Content**
The 204 status code means that the request was received and understood, but that there is no need to send any data back.

- **205 - Reset Content**
The 205 status code is a request from the server to the client to reset the document from which the original request was sent. For example, if a user fills out a form, and submits it, a status code of 205 means the server is asking the browser to clear the form.

- **206 - Partial Content**
A status code of 206 is a response to a request for part of a document. This is used by advanced caching tools, when a user agent requests only a small part of a page, and just that section is returned.

## Client Error
- **400 - Bad Request**
A status code of 400 indicates that the server did not understand the request due to bad syntax.

- **401 - Unauthorized**
A 401 status code indicates that before a resource can be accessed, the client must be authorised by the server.

- **402 - Payment Required**
The 402 status code is not currently in use, being listed as "reserved for future use".

- **403 - Forbidden**
A 403 status code indicates that the client cannot access the requested resource. That might mean that the wrong username and password were sent in the request, or that the permissions on the server do not allow what was being asked.

- **404 - Not Found**
The best known of them all, the 404 status code indicates that the requested resource was not found at the URL given, and the server has no idea how long for.

- **405 - Method Not Allowed**
A 405 status code is returned when the client has tried to use a request method that the server does not allow. Request methods that are allowed should be sent with the response (common request methods are POST and GET).
