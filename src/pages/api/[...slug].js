import httpProxyMiddleware from 'next-http-proxy-middleware'
import {BASE_URL_API} from "../../services/api";

export default (req, res) => httpProxyMiddleware(req, res, {
    target: `${process.env.LOCAL_SERVER_URL || BASE_URL_API}`,
    pathRewrite: {
        '^/api/': ''
    }
})