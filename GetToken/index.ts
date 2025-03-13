import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios, { AxiosRequestConfig } from "axios";
import GetConfig from "../Utils/ConfigUtility";
var qs = require('qs');

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    var apiUrl = GetConfig("api_url");
    var userName = GetConfig("user_name");
    var password = GetConfig("password");
    var client_id = GetConfig("client_id");
    var client_secret = GetConfig("client_secret");
    var data = qs.stringify({
        'username': userName,
        'password': password,
        'grant_type': 'password',
        'client_id': client_id,
        'client_secret': client_secret
    });
    var config: AxiosRequestConfig = {
        method: 'get',
        url: apiUrl,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data
    };
    try {
        var res = await axios.get(apiUrl, config);
        if (res.status == 200) {
            context.res = {
                status: 200,
                body: res.data
            };
        }
    } catch (error) {

        context.res = {
            status: 400,
            body: error
        };
    }
};

export default httpTrigger;