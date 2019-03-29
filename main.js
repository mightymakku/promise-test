(function (window, document, undefined) {

    "use strict";

    const button = document.getElementById("button");
    const status = document.getElementById("status");

    button.onclick = buttonClicked;

    function buttonClicked() {
        const promise = promiseFunction();

        button.disabled = true;
        status.textContent = "Waiting for promise...";

        promise.then(function (result) {
            status.textContent = ("Success: " + result);
        }, function (result) {
            status.textContent = ("Failure: " + result);
        }).finally(function () {
            button.disabled = false;
        });
    }

    function promiseFunction() {
        return new Promise(function (resolve, reject) {

            window.setTimeout(function () {
                resolve("Promise resolved.");
            }, Math.random() * 5000);

            window.setTimeout(function () {
                reject("Promise rejected.");
            }, Math.random() * 5000);

        });
    }

})(window, document);
