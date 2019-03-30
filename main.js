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

    const multiButton = document.getElementById("multi-button");
    const multiStatus = document.getElementById("multi-status");
    const multiTypeSelect = document.getElementById("multi-type");

    multiButton.onclick = multiButtonClicked;

    function multiButtonClicked() {
        const type = multiTypeSelect.value;

        const promises = [];

        multiButton.disabled = true;
        multiStatus.textContent = "Waiting for promises...";

        for (let i = 0; i < 3; i++) {
            promises.push(promiseFunction("{" + i + "}"));
        }

        const promise = (type === "all")
            ? Promise.all(promises)
            : Promise.race(promises);

        promise.then(function (result) {
            multiStatus.textContent = ("Success: " + ((type === "all") ? result.join(", ") : result));
        }, function (result) {
            multiStatus.textContent = ("Failure: " + result);
        }).finally(function () {
            multiButton.disabled = false;
        });
    }

    function promiseFunction(identifier) {
        return new Promise(function (resolve, reject) {

            const resolveMessage = identifier
                ? "Promise " + identifier + " resolved."
                : "Promise resolved.";

            const rejectMessage = identifier
                ? "Promise " + identifier + " rejected."
                : "Promise rejected.";

            window.setTimeout(function () {
                resolve(resolveMessage);
            }, Math.random() * 2500);

            window.setTimeout(function () {
                reject(rejectMessage);
            }, Math.random() * 5000);

        });
    }

})(window, document);
