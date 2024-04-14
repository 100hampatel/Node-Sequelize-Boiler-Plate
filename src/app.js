const express = require("express");
const app = express();
const { PORT ,IS_SSL } = require("../config/key");
const i18n = require("./i18n/i18n");
const cors = require("cors");
const path = require("path")
app.use(express.json());
// cors
app.use(cors());
app.options("*", cors());

const helmet = require("helmet")
const rateLimit = require("express-rate-limit");
// language file
app.use(i18n);
app.use(helmet())
app.use(helmet.hsts({ maxAge: 300, includeSubDomains: true, preload: true }));
app.use(function(req, res, next) {
    res.setHeader("X-XSS-Protection", "1");
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Security-Policy', `frame-src 'none'; object-src 'none'; script-src 'self'; style-src 'self';`);

    next();
});
app.set('trust proxy', 1)
app.use(
    rateLimit({
        windowMs: 30 * 60 * 1000, // 12 hour duration in milliseconds
        max: 500,
        message: "You exceeded 30 requests in 1 hour limit!",
        headers: true,
        handler: function(req, res, /*next*/ ) {
            return res.status(429).json({
                "message": "You sent too many requests.Please try again after 30 minutes",
                "statusCode": 429
            })
        }
    })
);

app.listen(PORT, () => {
    console.log("server listening on port: ", PORT);
});

const publicDirectory = path.join(__dirname, "../");
app.use(express.static(publicDirectory))

app.use(require("./routes/commanRoutes"));

app.get("/", (req, res) => {
    res.send("Testing from the node service.");
});

app.use('*', (req, res, next) => {
    res.status(404).json({
        success: 'false',
        message: 'Page not found',
        error: {
            statusCode: 404,
            message: 'You reached a route that is not defined on this server',
        },
    });
})


