const http = require("https");

/**
 * calling corresponding
 *
 * @param {Object} aOptions is request option to call msg91 server
 * @return {Promise<Object>}
 */
exports.performRequest = async (aOptions) => {

    return new Promise((resolve, reject) => {

        const req = http.request(aOptions, function (res) {

            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        if (aOptions.body) {
            req.write(JSON.stringify(aOptions.body))
        }

        req.end();
    })
}
