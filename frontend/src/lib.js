function connectionRequest(method, requestData, responseCallback, errorCallback){

    return(
        fetch(
            "http://localhost:8000/task/",
            method != "GET" ? {
              method: method,
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(requestData)
            } : null
        )
        .then(responseCallback)
        .catch(errorCallback)
    );

    
};